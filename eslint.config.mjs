import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';

/**
 * Flat config (ESLint 9+), padrão obrigatório a partir do Next.js 16 —
 * `next lint` foi removido e `eslint-config-next` agora exporta arrays
 * de flat config prontos (`core-web-vitals` e `typescript`) em vez do
 * antigo `.eslintrc.json` + `next/core-web-vitals` legado.
 */
const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      'next-env.d.ts',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  eslintConfigPrettier,
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];

export default config;
