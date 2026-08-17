import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ErrorStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

/**
 * Estado de erro: explica o que aconteceu e como resolver, sem tom de
 * desculpa e sem ambiguidade sobre o que falhou.
 */
export function ErrorState({ title, description, action, className }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-10 text-center',
        className,
      )}
    >
      <p className="font-display text-lg font-semibold text-destructive">{title}</p>
      {description ? <p className="max-w-sm text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
