import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renderiza o texto e responde a clique', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Salvar</Button>);

    const button = screen.getByRole('button', { name: 'Salvar' });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('fica desabilitado quando disabled=true e não dispara onClick', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Salvar
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Salvar' });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
