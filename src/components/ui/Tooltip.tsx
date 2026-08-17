'use client';

import { useId, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  content: string;
  children: ReactNode;
  className?: string;
}

/**
 * Tooltip acessível: some com Escape, aparece em hover *e* em foco de
 * teclado (não depende só de mouse), e usa `aria-describedby` para que
 * leitores de tela anunciem o conteúdo associado ao elemento ativo.
 */
export function Tooltip({ content, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setVisible(false);
      }}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>
      {visible ? (
        <span
          role="tooltip"
          id={id}
          className={cn(
            'absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background',
            className,
          )}
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
