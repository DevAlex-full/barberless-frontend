import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/config/site';

export interface SidebarProps {
  items: NavItem[];
  className?: string;
}

/**
 * Sidebar de desktop. Em telas pequenas fica oculta (ver MobileNav, que
 * cobre a mesma navegação em formato apropriado para toque).
 */
export function Sidebar({ items, className }: SidebarProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className={cn('hidden w-60 shrink-0 border-r border-border p-4 md:block', className)}
    >
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
