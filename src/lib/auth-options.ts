import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import { api, ApiError } from '@/lib/api';
import { getTokenExpiry, type AuthUser, type LoginResponse } from '@/lib/auth';
import { refreshAccessToken } from '@/lib/refresh-token';

type AuthorizedUser = {
  id: string;
  email: string;
  name: string;
  access_token: string;
  refresh_token: string;
  role: AuthUser['role'];
  user: AuthUser;
};

// Validación mínima de credenciales. El schema completo (con las reglas de
// negocio del formulario) vive en `schemas/auth.schema.ts`.
const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// How many ms before expiry to proactively refresh (60 seconds).
const REFRESH_BUFFER_MS = 60 * 1000;

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        try {
          const data = await api<LoginResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(parsed.data),
          });

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            access_token: data.accessToken,
            refresh_token: data.refreshToken,
            role: data.user.role,
            user: data.user,
          } satisfies AuthorizedUser;
        } catch (error) {
          if (error instanceof ApiError) {
            // 403 EMAIL_NOT_VERIFIED: cuenta registrada pero sin verificar el
            // correo por OTP. Se propaga el código tal cual para que
            // LoginForm mande al usuario al paso de verificación en vez de
            // mostrar "credenciales inválidas".
            if (error.code === 'EMAIL_NOT_VERIFIED') {
              throw new Error('EMAIL_NOT_VERIFIED');
            }
            // 401 INVALID_CREDENTIALS: `authorize` devuelve null y NextAuth
            // lo mapea a `result.error === "CredentialsSignin"` en el cliente.
            if (error.status === 401) {
              return null;
            }
            // Cualquier otro código (validación, rate limit, etc.): se
            // propaga el mensaje crudo del backend.
            throw new Error(error.message);
          }
          throw new Error('El servicio de autenticación no está disponible.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // ── Login inicial: poblar el token desde el usuario autorizado ──────
      if (user) {
        const authorizedUser = user as AuthorizedUser;

        return {
          ...token,
          access_token: authorizedUser.access_token,
          refresh_token: authorizedUser.refresh_token,
          access_token_expires_at: getTokenExpiry(authorizedUser.access_token),
          user: authorizedUser.user,
          role: authorizedUser.role,
          error: undefined,
        };
      }

      // ── session.update() desde el cliente: parchear campos de perfil ────
      if (trigger === 'update' && token.user) {
        const patch = (session as { user?: Partial<AuthUser> } | undefined)?.user;
        if (patch) {
          token.user = {
            ...token.user,
            ...(patch.name != null && { name: patch.name }),
            ...(patch.email != null && { email: patch.email }),
          };
        }
        return token;
      }

      // ── Ya en estado de error final: no reintentar ───────────────────────
      if (token.error === 'RefreshTokenError') {
        return token;
      }

      // ── Sesiones previas a esta migración: calcular expiración ───────────
      if (token.access_token && token.access_token_expires_at === undefined) {
        return {
          ...token,
          access_token_expires_at: getTokenExpiry(token.access_token),
        };
      }

      // ── Token todavía válido (con margen de 60s): devolver tal cual ──────
      if (Date.now() < (token.access_token_expires_at ?? 0) - REFRESH_BUFFER_MS) {
        return token;
      }

      // ── Access token vencido (o expiración desconocida): refrescar ───────
      if (!token.refresh_token) {
        return { ...token, error: 'RefreshTokenError' as const };
      }

      try {
        const refreshed = await refreshAccessToken(token.refresh_token);

        return {
          ...token,
          access_token: refreshed.accessToken,
          refresh_token: refreshed.refreshToken ?? token.refresh_token,
          access_token_expires_at: getTokenExpiry(refreshed.accessToken),
          error: undefined,
        };
      } catch (err) {
        // Sin respuesta = backend caído/inalcanzable, no que el refresh token
        // sea inválido — se deja el token viejo intacto y se reintenta en la
        // próxima request en vez de cerrar sesión por una caída temporal.
        if (!(err instanceof ApiError)) {
          return { ...token, error: 'RefreshBackendUnreachable' as const };
        }
        return { ...token, error: 'RefreshTokenError' as const };
      }
    },

    async session({ session, token }) {
      if (!token.user) {
        return session;
      }

      session.access_token = typeof token.access_token === 'string' ? token.access_token : '';
      session.refresh_token = typeof token.refresh_token === 'string' ? token.refresh_token : '';
      session.role = token.role ?? null;
      session.user = { ...token.user, role: token.role ?? token.user.role };

      if (token.error) {
        session.error = token.error;
      }

      return session;
    },
  },
};
