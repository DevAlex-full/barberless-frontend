import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

function renderWithTheme() {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe('ThemeToggle', () => {
  it('renderiza um botão acessível para alternar tema', async () => {
    renderWithTheme();

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  it('alterna o tema ao clicar', async () => {
    renderWithTheme();

    const button = await screen.findByRole('button');
    const initialLabel = button.getAttribute('aria-label');

    fireEvent.click(button);

    await waitFor(() => {
      expect(button.getAttribute('aria-label')).not.toBe(initialLabel);
    });
  });
});
