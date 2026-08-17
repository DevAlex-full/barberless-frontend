'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Provider de tema (claro / escuro / sistema). Usa `next-themes`, que:
 * - persiste a escolha do usuário em localStorage;
 * - aplica a classe `dark` no `<html>` antes da hidratação (via script
 *   inline injetado automaticamente), prevenindo o "flash" de tema
 *   incorreto no carregamento da página.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
