import type { ReactNode } from 'react';
import { AppLogo } from '@/components/ui/AppLogo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

export interface TopbarProps {
  className?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export function Topbar({ className, leftSlot, rightSlot }: TopbarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75 sm:px-6',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {leftSlot}
        <AppLogo />
      </div>
      <div className="flex items-center gap-2">
        {rightSlot}
        <ThemeToggle />
      </div>
    </header>
  );
}
