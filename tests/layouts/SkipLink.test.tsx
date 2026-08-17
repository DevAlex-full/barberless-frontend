import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipLink } from '@/components/layout/SkipLink';

describe('SkipLink', () => {
  it('aponta para #main-content', () => {
    render(<SkipLink />);
    const link = screen.getByRole('link', { name: 'Pular para o conteúdo principal' });
    expect(link).toHaveAttribute('href', '#main-content');
  });
});
