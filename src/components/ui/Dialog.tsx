'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Dialog construído sobre o elemento nativo `<dialog>`: focus trap,
 * fechamento com Escape e semântica de "modal" já vêm de graça do
 * navegador, sem reimplementar gerenciamento de foco manualmente.
 */
export function Dialog({ open, onClose, title, description, children, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (open && !node.open) {
      node.showModal();
    } else if (!open && node.open) {
      node.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      aria-labelledby="dialog-title"
      aria-describedby={description ? 'dialog-description' : undefined}
      className={cn(
        'w-full max-w-md rounded-lg border border-border bg-surface p-6 text-surface-foreground backdrop:bg-foreground/40',
        className,
      )}
    >
      <h2 id="dialog-title" className="font-display text-lg font-semibold">
        {title}
      </h2>
      {description ? (
        <p id="dialog-description" className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      <div className="mt-4">{children}</div>
    </dialog>
  );
}
