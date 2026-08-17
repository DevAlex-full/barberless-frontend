import { test, expect } from '@playwright/test';

test.describe('Página inicial pública', () => {
  test('carrega e exibe os links de entrar/cadastrar', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /Bem-vindo à/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Entrar' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Criar conta|Cadastrar/i }).first()).toBeVisible();
  });

  test('skip link é o primeiro elemento focável', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');

    const focused = await page.evaluate(() => document.activeElement?.textContent);
    expect(focused).toContain('Pular para o conteúdo principal');
  });

  test('navega para /login ao clicar em "Entrar"', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Entrar' }).first().click();
    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible();
  });
});
