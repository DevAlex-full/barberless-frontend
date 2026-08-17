import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/ui/EmptyState';

describe('EmptyState', () => {
  it('renderiza título e descrição', () => {
    render(<EmptyState title="Nada por aqui" description="Volte mais tarde." />);

    expect(screen.getByText('Nada por aqui')).toBeInTheDocument();
    expect(screen.getByText('Volte mais tarde.')).toBeInTheDocument();
  });
});
