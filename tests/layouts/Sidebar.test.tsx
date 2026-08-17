import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '@/components/layout/Sidebar';

describe('Sidebar', () => {
  it('renderiza todos os itens de navegação recebidos', () => {
    render(
      <Sidebar
        items={[
          { label: 'Item A', href: '/a' },
          { label: 'Item B', href: '/b' },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Item A' })).toHaveAttribute('href', '/a');
    expect(screen.getByRole('link', { name: 'Item B' })).toHaveAttribute('href', '/b');
  });
});
