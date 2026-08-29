'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  registerSchema,
  verifyEmailSchema,
  type RegisterFormData,
  type VerifyEmailFormData,
} from '@/schemas/auth.schema';
import { Field } from '@/components/ui/Field';
import { api, ApiError } from '@/lib/api';
import type { RegisterResponse, VerifyEmailResponse } from '@/lib/auth';

const SUBMIT_CLASSES =
  'h-[58px] bg-terracota text-[15px] font-bold tracking-[0.08em] text-crema-2 uppercase transition-colors hover:bg-terracota-dark disabled:cursor-not-allowed disabled:opacity-60';

type Step = 'register' | 'verify';

export function RegisterForm({
  initialStep = 'register',
  initialEmail = '',
}: {
  initialStep?: Step;
  initialEmail?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(initialStep);
  const [email, setEmail] = useState(initialEmail);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const registerForm = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });
  const verifyForm = useForm<VerifyEmailFormData>({ resolver: zodResolver(verifyEmailSchema) });

  async function onRegister(data: RegisterFormData) {
    setFormError(null);
    setSubmitting(true);
    try {
      const res = await api<RegisterResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });
      setEmail(res.email);
      setStep('verify');
      toast.success(res.message || 'Cuenta creada. Revisa tu correo.');
    } catch (error) {
      setFormError(
        error instanceof ApiError ? error.message : 'No pudimos crear tu cuenta. Intenta de nuevo.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function onVerify(data: VerifyEmailFormData) {
    setFormError(null);
    setSubmitting(true);
    try {
      const res = await api<VerifyEmailResponse>('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email, code: data.code }),
      });
      toast.success(res.message || 'Cuenta verificada. Ya puedes iniciar sesión.');
      router.push(`/login?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setFormError(
        error instanceof ApiError ? error.message : 'No pudimos verificar el código.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (step === 'verify') {
    return (
      <form onSubmit={verifyForm.handleSubmit(onVerify)} className="flex flex-col gap-5.5" noValidate>
        <p className="text-[15px] leading-[1.6] text-texto">
          Enviamos un código de 6 dígitos a <strong className="text-tinta">{email}</strong>. Revisa
          también la carpeta de spam.
        </p>
        <Field
          label="Código de verificación"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="000000"
          error={verifyForm.formState.errors.code}
          {...verifyForm.register('code')}
        />
        {formError && <p className="font-mono text-xs text-terracota-dark">{formError}</p>}
        <button type="submit" disabled={submitting} className={SUBMIT_CLASSES}>
          {submitting ? 'Verificando…' : 'Verificar cuenta'}
        </button>
        <button
          type="button"
          onClick={() => setStep('register')}
          className="self-start font-mono text-xs tracking-[0.1em] text-texto-soft uppercase hover:text-terracota"
        >
          ← Volver a los datos
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={registerForm.handleSubmit(onRegister)} className="flex flex-col gap-5.5" noValidate>
      <Field
        label="Nombre"
        autoComplete="name"
        error={registerForm.formState.errors.name}
        {...registerForm.register('name')}
      />
      <Field
        label="Correo"
        type="email"
        autoComplete="email"
        error={registerForm.formState.errors.email}
        {...registerForm.register('email')}
      />
      <Field
        label="Contraseña"
        type="password"
        autoComplete="new-password"
        error={registerForm.formState.errors.password}
        {...registerForm.register('password')}
      />
      <Field
        label="Confirmar contraseña"
        type="password"
        autoComplete="new-password"
        error={registerForm.formState.errors.confirmPassword}
        {...registerForm.register('confirmPassword')}
      />

      {formError && <p className="font-mono text-xs text-terracota-dark">{formError}</p>}

      <button type="submit" disabled={submitting} className={SUBMIT_CLASSES}>
        {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>
    </form>
  );
}
