import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/config/site';

export interface MobileNavProps {
  items: NavItem[];
  className?: string;
}

/**
 * Navegação para telas pequenas: barra fixa na base da tela (padrão
 * comum em apps mobile), visível apenas abaixo do breakpoint `md`.
 */
export function MobileNav({ items, className }: MobileNavProps) {
  return (
    <nav
      aria-label="Navegação principal (mobile)"
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background md:hidden',
        className,
      )}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-1 items-center justify-center py-3 text-xs font-medium text-foreground hover:bg-muted"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
