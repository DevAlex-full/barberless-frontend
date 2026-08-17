import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn()', () => {
  it('combina classes condicionalmente', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c');
  });

  it('resolve conflitos de classes Tailwind (última vence)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });
});
