'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'sonner';

// Montado en Providers (app-wide): una sesión que expira en una página
// pública (catálogo, carrito) también debe avisar y cerrar sesión, no solo
// las protegidas por requireSession()/requireRole().
export function SessionErrorWatcher() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const triggered = useRef(false);

  // Se captura en un ref (no se lee directo en el timeout) para que el
  // redirect vuelva a la página donde estaba el usuario cuando se detectó la
  // sesión vencida, no a la que tenga activa unos segundos después.
  const pathnameRef = useRef(pathname);
  useEffect(() => {
    pathnameRef.current = pathname;
  });

  useEffect(() => {
    if (!session?.error || triggered.current) return;
    triggered.current = true;

    // RefreshBackendUnreachable: el backend no respondió al renovar el token
    // (caído/timeout) — la sesión sigue siendo válida, solo se avisa; el
    // callback jwt() en auth-options.ts reintenta solo en la próxima request.
    if (session.error === 'RefreshBackendUnreachable') {
      toast.error(
        'No pudimos conectar con el servidor para verificar tu sesión. Reintentando automáticamente…',
        { duration: 5000 }
      );
      // Se rearma tras el mismo tiempo que dura el toast, para poder avisar
      // de nuevo si vuelve a fallar más adelante en la misma visita.
      setTimeout(() => {
        triggered.current = false;
      }, 5000);
      return;
    }

    // RefreshTokenError: el refresh token es realmente inválido/revocado —
    // aquí sí corresponde cerrar sesión.
    toast.error('Tu sesión ha expirado. Serás redirigido al inicio de sesión...', { duration: 5000 });

    setTimeout(() => {
      const current = pathnameRef.current;
      const loginUrl =
        current && current !== '/login' ? `/login?callbackUrl=${encodeURIComponent(current)}` : '/login';
      signOut({ callbackUrl: loginUrl });
    }, 4500);
  }, [session?.error]);

  return null;
}
