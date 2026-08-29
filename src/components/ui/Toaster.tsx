'use client';

import { Toaster as Sonner } from 'sonner';

function SuccessIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-terracota">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.157a.75.75 0 00-1.214-.886l-3.44 4.73-1.55-1.55a.75.75 0 10-1.06 1.06l2.2 2.2a.75.75 0 001.137-.086l4-5.468z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-terracota-light">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 8a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Toasts de sonner, sin estilos propios (`unstyled`) y reconstruidos por
// completo con la paleta/tipografía de la marca — sin esquinas redondeadas,
// como el resto de la interfaz.
export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      gap={10}
      closeButton
      icons={{ success: <SuccessIcon />, error: <ErrorIcon /> }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'flex w-[92vw] max-w-[360px] items-start gap-3 border px-4.5 py-4 font-sans text-[15px] shadow-lg',
          title: 'leading-snug',
          description: 'text-[13px] leading-snug opacity-85',
          closeButton:
            '!rounded-none !border-none !bg-transparent !text-current !shadow-none !opacity-40 hover:!opacity-100',
          success: 'border-linea-fuerte bg-crema text-tinta',
          error: 'border-marron-border bg-marron text-crema-3',
        },
      }}
    />
  );
}
