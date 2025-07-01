'use client';

import { AuthProvider } from '@/context/auth-context';
import { LanguageProvider } from '@/context/language-context';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
    </AuthProvider>
  );
}
