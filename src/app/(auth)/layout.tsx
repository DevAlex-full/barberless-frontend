import type { ReactNode } from 'react';
import { AppLogo } from '@/components/ui/AppLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between px-4 sm:px-6">
        <AppLogo />
        <ThemeToggle />
      </header>
      <main id="main-content" className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-6 text-surface-foreground">
          {children}
        </div>
      </main>
    </div>
  );
}
