'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
      className="self-start border border-linea-fuerte px-7 py-4 text-[15px] font-bold tracking-[0.08em] text-marron uppercase transition-colors hover:border-terracota hover:text-terracota"
    >
      Cerrar sesión
    </button>
  );
}
