import type { DefaultSession } from 'next-auth';
import type { AuthUser } from '@/lib/auth';

declare module 'next-auth' {
  interface Session {
    access_token: string;
    refresh_token: string;
    role: AuthUser['role'] | null;
    user: AuthUser & DefaultSession['user'];
    // RefreshTokenError: el refresh token es inválido/revocado — cerrar sesión.
    // RefreshBackendUnreachable: el backend no respondió — la sesión sigue
    // siendo válida, solo no se pudo renovar el token todavía.
    error?: 'RefreshTokenError' | 'RefreshBackendUnreachable';
  }

  interface User {
    access_token: string;
    refresh_token: string;
    role: AuthUser['role'];
    user: AuthUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    access_token_expires_at?: number;
    role?: AuthUser['role'] | null;
    user?: AuthUser;
    error?: 'RefreshTokenError' | 'RefreshBackendUnreachable';
  }
}
