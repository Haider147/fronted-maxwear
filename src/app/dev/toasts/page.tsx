'use client';

import { toast } from 'sonner';

// PÁGINA TEMPORAL — solo para revisar visualmente el estilo de los toasts
// (sonner + paleta de marca) antes de darlo por bueno. Borrar este directorio
// (`src/app/dev`) una vez aprobado.

const btn =
  'h-14 border border-linea-fuerte px-6 text-[15px] font-bold tracking-[0.06em] text-marron uppercase transition-colors hover:border-terracota hover:text-terracota';

export default function ToastPreviewPage() {
  return (
    <div className="flex flex-col gap-8 px-6 py-16 md:px-14">
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs tracking-[0.22em] text-terracota uppercase">Preview interno</span>
        <h1 className="text-[34px] font-extrabold tracking-[-0.03em] text-tinta md:text-[44px]">
          Toasts · sonner + marca
        </h1>
        <p className="max-w-[560px] text-[15px] leading-[1.6] text-texto">
          Dispara cada variante para revisar color, tipografía, ícono y animación. Cuando quede aprobado
          se borra <code className="font-mono text-[13px]">src/app/dev</code>.
        </p>
      </div>

      <div className="flex flex-wrap gap-3.5">
        <button type="button" onClick={() => toast.success('Bienvenido de nuevo.')} className={btn}>
          Success corto
        </button>
        <button
          type="button"
          onClick={() => toast.error('Correo o contraseña incorrectos.')}
          className={btn}
        >
          Error corto
        </button>
        <button
          type="button"
          onClick={() =>
            toast.success(
              'Cuenta creada. Revisa tu correo y escribe el código de 6 dígitos que te enviamos.'
            )
          }
          className={btn}
        >
          Success largo
        </button>
        <button
          type="button"
          onClick={() =>
            toast.error(
              'No pudimos conectar con el servidor para verificar tu sesión. Reintentando automáticamente…'
            )
          }
          className={btn}
        >
          Error largo
        </button>
        <button
          type="button"
          onClick={() => {
            toast.success('Cuenta verificada.');
            setTimeout(() => toast.error('Sesión expirada.'), 250);
            setTimeout(() => toast.success('Pedido confirmado.'), 500);
          }}
          className={btn}
        >
          Apilados (3)
        </button>
      </div>
    </div>
  );
}
