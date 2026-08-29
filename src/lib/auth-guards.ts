import { getServerSession, type Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth-options';
import { dashboardPathForRole } from '@/lib/auth';
import type { Role } from '@/types';

// RefreshTokenError = el refresh token es inválido/revocado: la sesión ya no
// sirve aunque NextAuth siga devolviendo un objeto de sesión truthy.
// RefreshBackendUnreachable no cuenta aquí — esa sesión sigue siendo válida,
// solo no se pudo confirmar porque el backend estaba caído.
function hasExpiredToken(session: Session): boolean {
  return session.error === 'RefreshTokenError';
}

export async function requireSession() {
  const session = await getServerSession(authOptions);

  if (!session || hasExpiredToken(session)) {
    redirect('/login');
  }

  return session;
}

export async function requireRole(expectedRole: Role) {
  const session = await requireSession();

  if (session.role !== expectedRole) {
    redirect(dashboardPathForRole(session.role));
  }

  return session;
}

export async function redirectIfAuthenticated() {
  const session = await getServerSession(authOptions);

  if (!session || hasExpiredToken(session)) {
    return;
  }

  redirect(dashboardPathForRole(session.role));
}
