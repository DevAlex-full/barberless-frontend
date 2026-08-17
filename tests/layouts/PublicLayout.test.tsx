import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PublicLayout from '@/app/(public)/layout';

describe('PublicLayout', () => {
  it('renderiza a navegação pública e o conteúdo filho', () => {
    render(
      <PublicLayout>
        <p>Conteúdo da página</p>
      </PublicLayout>,
    );

    expect(screen.getByRole('link', { name: 'Início' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Entrar' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Cadastrar' })).toBeInTheDocument();
    expect(screen.getByText('Conteúdo da página')).toBeInTheDocument();
  });

  it('possui uma landmark <main> com id="main-content" para o skip link', () => {
    render(
      <PublicLayout>
        <p>Conteúdo</p>
      </PublicLayout>,
    );

    expect(document.getElementById('main-content')).toBeInTheDocument();
  });
});
