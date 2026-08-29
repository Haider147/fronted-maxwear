import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { LoginForm } from '@/components/auth/LoginForm';
import { redirectIfAuthenticated } from '@/lib/auth-guards';

export const metadata: Metadata = { title: 'Iniciar sesión' };

export default async function LoginPage({ searchParams }: PageProps<'/login'>) {
  await redirectIfAuthenticated();
  const params = await searchParams;
  const callbackUrl = typeof params.callbackUrl === 'string' ? params.callbackUrl : undefined;

  return (
    <>
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Iniciar sesión' }]} />

      <div className="grid grid-cols-1 items-stretch md:grid-cols-[1fr_1.05fr]">
        <ImagePlaceholder
          label="foto · Max esperando el pedido"
          className="min-h-[280px] md:min-h-[560px]"
        />

        <div className="flex flex-col justify-center gap-8 px-6 py-16 md:px-14 md:py-20">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.22em] text-terracota uppercase">
              Cuenta Maxwear
            </span>
            <h1 className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.03em] text-tinta md:text-[52px]">
              Qué bueno
              <br />
              verte otra vez<span className="font-serif text-terracota italic font-normal">.</span>
            </h1>
          </div>

          <LoginForm callbackUrl={callbackUrl} />

          <p className="font-mono text-[13px] text-texto-soft">
            ¿Todavía no tienes cuenta?{' '}
            <Link href="/register" className="border-b border-terracota text-terracota">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
