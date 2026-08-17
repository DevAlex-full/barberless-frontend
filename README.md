# BarberLess — Frontend

Aplicação web oficial da plataforma BarberLess.

> **Status:** Fase 4 — Fundação Técnica. Sem conteúdo de negócio real, sem
> autenticação funcional. Este repositório contém a base estrutural
> (design system, temas, layouts por área, rotas estruturais, testes e CI)
> sobre a qual as próximas fases serão construídas.

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript (strict) · React 19 ·
Tailwind CSS 3 (tokens CSS) · next-themes · TanStack Query · React Hook
Form · Zod 3 · Vitest 4 + Testing Library · Playwright · ESLint 9 (flat
config)

## Requisitos

- Node.js `20.x` (ver `.nvmrc`)
- npm
- Backend (`barberless-backend`) rodando localmente, se for testar chamadas
  de API nas próximas fases

## Como rodar localmente

```bash
npm install
cp .env.example .env.local
# preencha NEXT_PUBLIC_API_URL / NEXT_PUBLIC_SITE_URL
npm run dev
```

Aplicação disponível em `http://localhost:3000`.

## Scripts disponíveis

| Script                                      | Descrição                                                                         |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| `npm run dev`                               | Sobe o servidor de desenvolvimento                                                |
| `npm run build`                             | Build de produção                                                                 |
| `npm start`                                 | Roda a build de produção                                                          |
| `npm run lint` / `lint:fix`                 | ESLint 9 (flat config, `eslint.config.mjs`) — `next lint` foi removido no Next 16 |
| `npm run typecheck`                         | Checagem de tipos sem emitir arquivos                                             |
| `npm test` / `test:watch` / `test:coverage` | Vitest 4 (componentes, layouts, utils)                                            |
| `npm run test:e2e`                          | Playwright (fluxo real de navegação)                                              |
| `npm run format` / `format:check`           | Prettier (com plugin Tailwind)                                                    |
| `npm run validate`                          | lint + typecheck + test + build (gate de CI local)                                |

## Rotas estruturais desta fase

| Rota        | Área                  | Descrição                                             |
| ----------- | --------------------- | ----------------------------------------------------- |
| `/`         | Pública               | Home placeholder                                      |
| `/login`    | Autenticação          | Formulário validado (sem submissão real ainda)        |
| `/cadastro` | Autenticação          | Formulário validado (sem submissão real ainda)        |
| `/cliente`  | Área do cliente       | Dashboard placeholder (sidebar + topbar + nav mobile) |
| `/painel`   | Painel administrativo | Dashboard placeholder (mesmo padrão de layout)        |

## Documentação adicional

- [`docs/architecture.md`](./docs/architecture.md) — decisões de arquitetura e design system
- [`docs/environment.md`](./docs/environment.md) — variáveis de ambiente
- [`docs/phase-4-report.md`](./docs/phase-4-report.md) — relatório de entrega da Fase 4

## Licença

Uso proprietário — BarberLess. Todos os direitos reservados.
