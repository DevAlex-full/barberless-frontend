import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '@/components/ui/Switch';

describe('Switch', () => {
  it('expõe role="switch" e aria-checked correto', () => {
    const onCheckedChange = vi.fn();
    render(<Switch checked={false} onCheckedChange={onCheckedChange} label="Notificações" />);

    const el = screen.getByRole('switch', { name: 'Notificações' });
    expect(el).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(el);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
