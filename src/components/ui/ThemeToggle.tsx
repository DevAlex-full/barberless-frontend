'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const THEME_ORDER = ['light', 'dark', 'system'] as const;
type ThemeOption = (typeof THEME_ORDER)[number];

const THEME_LABEL: Record<ThemeOption, string> = {
  light: 'Tema claro',
  dark: 'Tema escuro',
  system: 'Tema do sistema',
};

export interface ThemeToggleProps {
  className?: string;
}

/**
 * Alterna entre claro → escuro → sistema → claro... Só renderiza o
 * estado real após montar no cliente (evita mismatch de hidratação,
 * já que o tema resolvido depende de localStorage/preferência do SO).
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Padrão de detecção de montagem recomendado para bibliotecas como
    // next-themes: evita mismatch de hidratação (o tema resolvido no
    // servidor difere do tema real do cliente). É um único setState,
    // sem efeitos em cascata — a regra `react-hooks/set-state-in-effect`
    // é conservadora demais para este caso específico e amplamente aceito.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const current = (mounted ? (theme as ThemeOption) : 'system') ?? 'system';

  function handleClick() {
    const currentIndex = THEME_ORDER.indexOf(current);
    const next = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length] ?? 'system';
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Alternar tema. Atual: ${THEME_LABEL[current]}. Clique para mudar.`}
      title={THEME_LABEL[current]}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground hover:bg-muted',
        className,
      )}
    >
      {current === 'light' ? '☀️' : current === 'dark' ? '🌙' : '💻'}
    </button>
  );
}
