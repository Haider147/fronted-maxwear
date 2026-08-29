import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'inverse';

type ButtonProps = ComponentPropsWithoutRef<'a'> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-terracota text-crema-2 hover:bg-terracota-dark',
  outline:
    'border border-linea-fuerte text-marron hover:border-terracota hover:text-terracota',
  inverse: 'bg-crema-3 text-tinta hover:bg-terracota-light',
};

export function Button({ variant = 'primary', href = '#', className, children, ...props }: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center justify-center px-8 py-[18px] text-[15px] font-bold tracking-[0.08em] uppercase transition-colors',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
