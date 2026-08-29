import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { redirectIfAuthenticated } from '@/lib/auth-guards';

export const metadata: Metadata = { title: 'Crear cuenta' };

export default async function RegisterPage({ searchParams }: PageProps<'/register'>) {
  await redirectIfAuthenticated();
  const params = await searchParams;
  const initialStep = params.step === 'verify' ? 'verify' : 'register';
  const initialEmail = typeof params.email === 'string' ? params.email : '';

  return (
    <>
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Crear cuenta' }]} />

      <div className="grid grid-cols-1 items-stretch md:grid-cols-[1fr_1.05fr]">
        <ImagePlaceholder
          label="foto · pack de boxers recién llegado"
          className="min-h-[280px] md:min-h-[560px]"
        />

        <div className="flex flex-col justify-center gap-8 px-6 py-16 md:px-14 md:py-20">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.22em] text-terracota uppercase">
              Cuenta Maxwear
            </span>
            <h1 className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.03em] text-tinta md:text-[52px]">
              Únete y arma
              <br />
              tu primer pack<span className="font-serif text-terracota italic font-normal">.</span>
            </h1>
          </div>

          <RegisterForm initialStep={initialStep} initialEmail={initialEmail} />

          <p className="font-mono text-[13px] text-texto-soft">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="border-b border-terracota text-terracota">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
