import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface AppLogoProps {
  className?: string;
  href?: string;
}

/**
 * Logo textual provisória. O proprietário ainda não definiu o manual de
 * marca (ver PRD, pendência "Manual de marca") — quando a identidade
 * visual final for aprovada, este componente passa a renderizar o
 * arquivo de logo real em vez do texto.
 */
export function AppLogo({ className, href = '/' }: AppLogoProps) {
  return (
    <Link
      href={href}
      className={cn('font-display text-lg font-semibold tracking-tight text-foreground', className)}
    >
      Barber<span className="text-primary">Less</span>
    </Link>
  );
}
