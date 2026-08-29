'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { loginSchema, type LoginFormData } from '@/schemas/auth.schema';
import { Field } from '@/components/ui/Field';

export function LoginForm({ callbackUrl = '/cuenta' }: { callbackUrl?: string }) {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginFormData) {
    setFormError(null);
    setSubmitting(true);
    const result = await signIn('credentials', { ...data, redirect: false });
    setSubmitting(false);

    // EMAIL_NOT_VERIFIED: la cuenta existe pero le falta el paso de OTP —
    // se manda al mismo formulario de verificación que usa el registro.
    if (result?.error === 'EMAIL_NOT_VERIFIED') {
      toast.error('Todavía no verificaste tu correo. Ingresa el código que te enviamos.');
      router.push(`/register?step=verify&email=${encodeURIComponent(data.email)}`);
      return;
    }

    // NextAuth mapea un `authorize()` que devuelve null a este código fijo.
    if (result?.error === 'CredentialsSignin') {
      setFormError('Correo o contraseña incorrectos.');
      return;
    }

    if (result?.error) {
      setFormError(result.error);
      return;
    }

    toast.success('Bienvenido de nuevo.');
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5.5" noValidate>
      <Field
        label="Correo"
        type="email"
        autoComplete="email"
        error={errors.email}
        {...register('email')}
      />
      <Field
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        error={errors.password}
        {...register('password')}
      />

      {formError && <p className="font-mono text-xs text-terracota-dark">{formError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="h-[58px] bg-terracota text-[15px] font-bold tracking-[0.08em] text-crema-2 uppercase transition-colors hover:bg-terracota-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Entrando…' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
