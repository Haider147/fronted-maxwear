import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { requireSession } from '@/lib/auth-guards';
import { SignOutButton } from '@/components/auth/SignOutButton';

export const metadata: Metadata = { title: 'Mi cuenta' };

export default async function CuentaPage() {
  const session = await requireSession();
  const isAdmin = session.role === 'ADMIN';
  const firstName = session.user.name.split(' ')[0];

  return (
    <>
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Mi cuenta' }]} />

      <div className="flex flex-col gap-14 px-6 pt-2 pb-16 md:px-14 md:pb-20">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.22em] text-terracota uppercase">Mi cuenta</span>
          <h1 className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.03em] text-tinta md:text-[52px]">
            Hola, {firstName}
            <span className="font-serif text-terracota italic font-normal">.</span>
          </h1>
          <p className="max-w-[480px] text-lg leading-[1.6] text-pretty text-texto">
            {isAdmin
              ? 'Sesión de administrador activa. El panel de gestión llega en la próxima fase.'
              : 'Tu sesión quedó guardada — la próxima vez no vas a tener que volver a loguearte.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-6 border border-linea-fuerte bg-crema-2 px-7 py-7">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-[15px] text-texto">
              <dt className="font-mono text-xs tracking-[0.1em] text-texto-soft uppercase">Correo</dt>
              <dd className="text-tinta">{session.user.email}</dd>
              <dt className="font-mono text-xs tracking-[0.1em] text-texto-soft uppercase">Rol</dt>
              <dd className="text-tinta">{isAdmin ? 'Administrador' : 'Cliente'}</dd>
            </dl>
            <SignOutButton />
          </div>

          <div className="flex flex-col gap-5 border border-dashed border-linea-fuerte px-7 py-7">
            <div className="flex flex-col gap-1.5">
              <strong className="text-[17px] text-tinta">Seguir explorando</strong>
              <p className="text-[15px] text-texto">
                Pedidos, direcciones y edición de perfil se activan en las próximas fases — por ahora,
                a elegir boxers.
              </p>
            </div>
            <Button href="/" variant="outline" className="self-start">
              Ver catálogo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
