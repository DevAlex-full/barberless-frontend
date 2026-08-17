import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes condicionalmente (clsx) e resolve conflitos de
 * classes Tailwind (tailwind-merge) — padrão usado por todos os
 * componentes em `src/components/ui`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
