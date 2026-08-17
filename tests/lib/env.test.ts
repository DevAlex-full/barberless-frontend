import { describe, expect, it } from 'vitest';

describe('env', () => {
  it('carrega as variáveis públicas configuradas no setup de teste', async () => {
    const { env } = await import('@/lib/env');
    expect(env.NEXT_PUBLIC_API_URL).toBe('http://localhost:3333');
    expect(env.NEXT_PUBLIC_SITE_URL).toBe('http://localhost:3000');
    expect(env.NEXT_PUBLIC_API_TIMEOUT_MS).toBeGreaterThan(0);
  });
});
