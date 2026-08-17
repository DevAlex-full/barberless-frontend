import type { ReactNode } from 'react';
import Link from 'next/link';
import { AppLogo } from '@/components/ui/AppLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Container } from '@/components/ui/Container';
import { publicNav } from '@/config/site';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <AppLogo />
          <nav aria-label="Navegação do site" className="flex items-center gap-4">
            {publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </Container>
      </header>

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border py-8">
        <Container className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} BarberLess. Todos os direitos reservados.
        </Container>
      </footer>
    </div>
  );
}
