import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ImagePlaceholderProps = {
  label: string;
  variant?: 'light' | 'dark';
  className?: string;
  children?: ReactNode;
};

const backgroundClasses = {
  light: 'bg-[repeating-linear-gradient(135deg,#F0E5D9_0_14px,#EADCCD_14px_28px)]',
  dark: 'bg-[repeating-linear-gradient(135deg,#46332B_0_14px,#3F2E27_14px_28px)]',
};

// TODO(api): reemplazar por <Image> cuando el diseño entregue las fotos reales.
export function ImagePlaceholder({ label, variant = 'light', className, children }: ImagePlaceholderProps) {
  return (
    <div className={cn('relative flex', backgroundClasses[variant], className)}>
      <span
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs whitespace-nowrap',
          variant === 'light' ? 'bg-crema px-3.5 py-2 text-[#8A7264]' : 'border border-marron-border px-3.5 py-2 text-[#C7A896]'
        )}
      >
        [ {label} ]
      </span>
      {children}
    </div>
  );
}
