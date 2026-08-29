'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/Toaster';
import { SessionErrorWatcher } from '@/components/SessionErrorWatcher';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionErrorWatcher />
      <Toaster />
      {children}
    </SessionProvider>
  );
}
