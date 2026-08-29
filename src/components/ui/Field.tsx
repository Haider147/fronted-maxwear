import type { InputHTMLAttributes } from 'react';
import type { FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils';

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: FieldError;
};

export function Field({ label, error, id, name, className, ...props }: FieldProps) {
  const inputId = id ?? name;

  return (
    <label htmlFor={inputId} className="flex flex-col gap-2">
      <span className="text-[13px] font-bold tracking-[0.1em] text-marron uppercase">{label}</span>
      <input
        id={inputId}
        name={name}
        aria-invalid={error ? true : undefined}
        className={cn(
          'border bg-crema px-4.5 py-4 text-[15px] text-tinta placeholder:text-texto-soft focus:outline-none',
          error ? 'border-terracota-dark' : 'border-linea-fuerte focus:border-terracota',
          className
        )}
        {...props}
      />
      {error && <span className="font-mono text-xs text-terracota-dark">{error.message}</span>}
    </label>
  );
}
