import type { Role } from '@/types';

// Contrato confirmado el 2026-08-29 probando directamente
// https://backend-maxwear.onrender.com/api/v1 (backend real desplegado, no
// local): la API usa camelCase y no manda `expiresIn` — el vencimiento del
// access token se lee decodificando el propio JWT. El registro NO devuelve
// tokens: la cuenta queda pendiente de verificación por OTP hasta llamar a
// POST /auth/verify-email.
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken?: string; // presente si el backend rota el refresh token
};

export type RegisterResponse = {
  email: string;
  otpSent: boolean;
  message: string;
};

export type VerifyEmailResponse = {
  message?: string;
};

const DEFAULT_EXPIRY_MS = 15 * 60 * 1000; // fallback si el token no trae `exp`

export function getTokenExpiry(accessToken: string): number {
  try {
    const [, payload] = accessToken.split('.');
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString()) as {
      exp?: number;
    };
    if (decoded.exp) {
      return decoded.exp * 1000;
    }
  } catch {
    // token opaco, no JWT decodificable — se usa el fallback
  }
  return Date.now() + DEFAULT_EXPIRY_MS;
}

export function dashboardPathForRole(role: Role | null | undefined): string {
  return role === 'ADMIN' ? '/dashboard/admin' : '/cuenta';
}
