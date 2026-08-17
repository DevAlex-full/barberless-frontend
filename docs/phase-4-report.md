# Relatório — Fase 4 (Fundação Técnica) — Frontend

> **Segunda atualização:** este relatório foi revisado após a migração da
> cadeia de testes para **Vitest 4.1.10 (estável) + Vite 8.2.1 +
> `@vitejs/plugin-react` 6.0.5**, para zerar as vulnerabilidades reportadas
> pelo `npm audit` na cadeia `esbuild`/`vite`/`vitest` que restaram após a
> migração anterior (Next 16 / React 19). **Node.js continua na série 20**
> (agora `>=20.19.0`, requisito do Vite 8) — **não foi usado Vitest 5**,
> que exige Node `>=22.12.0`. Next.js, React, Tailwind, Zod, design,
> componentes, layouts e rotas **não foram alterados** nesta correção.

## Escopo entregue (inalterado desde a primeira entrega)

- Tailwind configurado via tokens CSS (`globals.css`), não cores hardcoded no config — paleta bronze/marfim, bases clara/escura.
- `next-themes` com tema claro, escuro e sistema, persistido, com prevenção de flash (script inline + `suppressHydrationWarning`).
- 4 layouts separados: público, autenticação, cliente, painel.
- 5 rotas estruturais: `/`, `/login`, `/cadastro`, `/cliente`, `/painel`.
- Sidebar responsiva (desktop) + Topbar + navegação mobile (barra inferior) nas áreas cliente/painel.
- Skip link, estados `loading`/`error`/`global-error`/`not-found`.
- 18 componentes fundamentais: Button, Input, Textarea, Checkbox, Switch, Badge, Card, Dialog, DropdownMenu, Tooltip, Skeleton, Spinner, EmptyState, ErrorState, PageHeader, ThemeToggle, AppLogo, Container.
- TanStack Query, Zod, React Hook Form (formulários de login/cadastro com validação real).
- Cliente HTTP com URL base, timeout via `AbortController` e erro normalizado (`HttpError`).
- Validação de variáveis de ambiente públicas (Zod, fail-fast).
- Metadata base, `robots.ts`, `sitemap.ts`, `manifest.webmanifest`.
- Acessibilidade: skip link, foco visível, `prefers-reduced-motion`, ARIA nos componentes interativos.
- Vitest 4 + Testing Library (13 testes) e Playwright configurado + 1 spec com 3 casos.
- Scripts: `test`, `test:watch`, `test:coverage`, `test:e2e`, `format`, `format:check`, `validate`.
- GitHub Actions com lint, typecheck, testes, build e testes E2E.
- `.nvmrc`, `.editorconfig`, `.gitignore` (com `*.tsbuildinfo`).
- README + `docs/architecture.md` + `docs/environment.md`.
- Assets reais do frontend legado preservados em `public/assets/`; HTML/CSS/JS antigos **não** fazem parte da nova aplicação.

## Migração Next 14 → 16 / React 18 → 19 (mantida da entrega anterior, sem alterações nesta correção)

Ver histórico completo na seção correspondente mais abaixo — nada mudou
aqui: `next@16.3.0`, `react`/`react-dom@^19.2.8`, `eslint-config-next@16.3.0`,
`eslint.config.mjs` (flat config), `tailwindcss@^3.4.19` e `zod@^3.25.76`
mantidos por decisão consciente já documentada.

## Correção desta rodada: Vitest 2 → Vitest 4 (zerar vulnerabilidades, Node 20 mantido)

### Motivação

Após a migração para Next 16, `npm audit` ainda reportava **6
vulnerabilidades (3 moderate, 1 high, 2 critical)** na cadeia
`esbuild`/`vite`/`vitest`, usada apenas pelo Vitest em desenvolvimento/CI
(não pelo build de produção, que usa Turbopack). A correção completa
exigia migrar para Vitest 4, que foi feito nesta rodada.

### Versões alteradas (verificadas via `npm view <pacote> peerDependencies`/`engines`)

| Pacote                 | Antes                        | Depois                                  | Motivo                                                                                                                                                                                                                                                                    |
| ---------------------- | ---------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vitest`               | `^2.1.9`                     | **`4.1.10`** (pin exato)                | Zera a cadeia de vulnerabilidades.                                                                                                                                                                                                                                        |
| `@vitest/coverage-v8`  | `^2.1.9`                     | **`4.1.10`** (pin exato)                | O próprio `vitest@4.1.10` declara esta versão como peer dependency **exata** (`'@vitest/coverage-v8': '4.1.10'`, sem `^`), então ambos ficam pinados sem range para não haver drift entre eles.                                                                           |
| `@vitejs/plugin-react` | `^4.7.0`                     | **`^6.0.5`**                            | `vitest@4.1.10` exige `vite: '^6.0.0 \|\| ^7.0.0 \|\| ^8.0.0'` via peer dependency. `@vitejs/plugin-react@6.0.5` exige `vite ^8.0.0` — agora compatível, o que **não era o caso** na versão anterior (Vitest 2 dependia de `vite ^5`, incompatível com o plugin React 6). |
| `vite`                 | _(implícito, não declarado)_ | **`^8.2.1`** (declarado explicitamente) | Passou a ser dependência direta para deixar explícita a versão real usada pela cadeia de testes, em vez de depender de resolução transitiva.                                                                                                                              |

### Por que **não** Vitest 5

`vitest@5.0.0-beta` declara `engines.node: '>=22.12.0'` e exige
`vite >= 6.4.0`. Isso quebraria a decisão explícita de manter **Node.js
20** nesta arquitetura. Confirmado via `npm view vitest@5.0.0-beta.7 engines`
antes de descartar essa opção — não foi suposição.

### Consequência real: `engines.node` subiu para `>=20.19.0`

`vite@8.2.1` (e `@vitejs/plugin-react@6.0.5`) declaram
`engines.node: '^20.19.0 || >=22.12.0'`. Continuamos na série 20.x — mas o
mínimo dentro dela subiu de `20.9.0` para `20.19.0`. Isso está refletido em
`package.json` (`engines.node`) e documentado em `docs/environment.md`. O
`.nvmrc` (`20`) não precisou mudar, pois resolve para a última patch da
série 20.x, que já é `>= 20.19.0`.

### Ajustes de código necessários (breaking changes reais do Vitest 4, não hipotéticos)

1. **Coverage agora exige padrões `include` explícitos.** Adicionado
   `coverage.include: ['src/**/*.{ts,tsx}']` em `vitest.config.ts` — sem
   isso, o relatório de cobertura do Vitest 4 fica incompleto/impreciso
   (o provider V8 foi reescrito nesta major com remapeamento baseado em
   AST, mais preciso, mas depende de saber quais arquivos considerar).
2. **Aviso do config loader nativo do Vite 8**: `vitest.config.ts` usava
   sintaxe ESM (`import`/`export default`) sendo carregado como CommonJS
   (`package.json` sem `"type": "module"`), o que o Vite 8 sinaliza como
   descontinuado. Corrigido **renomeando o arquivo para
   `vitest.config.mts`** (extensão que força interpretação ESM
   independente do `package.json`), em vez de adicionar `"type": "module"`
   ao `package.json` inteiro (o que afetaria outros arquivos `.js` do
   projeto sem necessidade).
3. Como consequência do item anterior, `__dirname` (API do CommonJS, não
   existe em módulos ESM) foi substituído por `import.meta.dirname`
   (disponível nativamente a partir do Node 20.11 — nosso mínimo agora é
   20.19, então sem risco de incompatibilidade).
4. Os **13 testes existentes não precisaram de nenhuma alteração** —
   nenhum deles usa `workspace`, `poolOptions`, `singleThread`/`singleFork`,
   o terceiro argumento de opções em `test()`/`describe()`, nem APIs de
   browser mode — nada do que o Vitest 4 removeu ou renomeou era usado
   neste projeto. Revisei cada um deles manualmente contra o guia de
   migração oficial antes de concluir isso, não presumi.

## `npm audit` — resultado real (não usei `npm audit fix --force`)

```
$ npm audit
found 0 vulnerabilities
```

**Zero vulnerabilidades.** A cadeia inteira `esbuild`/`vite`/`vitest` que
restava (3 moderate, 1 high, 2 critical) foi eliminada pela migração para
Vitest 4 + Vite 8. Não há nenhum advisory pendente para documentar nesta
entrega — o objetivo da correção foi cumprido integralmente, sem
downgrades disfarçados nem supressão de avisos.

## O que foi executado e validado de fato (nesta correção)

| Comando                                                 | Resultado                                                                              |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `npm install` (do zero, `package-lock.json` regenerado) | ✅ 513 pacotes instalados                                                              |
| `npm audit`                                             | ✅ **0 vulnerabilidades**                                                              |
| `npm run lint`                                          | ✅ sem erros                                                                           |
| `npm run typecheck`                                     | ✅ sem erros                                                                           |
| `npm run test`                                          | ✅ 13/13 testes passando (9 arquivos), sem nenhum ajuste nos testes em si              |
| `npm run test:coverage`                                 | ✅ executado com sucesso (provider V8 reescrito do Vitest 4, relatório mais preciso)   |
| `npm run format:check`                                  | ✅ sem divergências (após `npm run format`)                                            |
| `npm run build`                                         | ✅ Next 16 + Turbopack — 9 rotas geradas, inalterado                                   |
| `npm run validate`                                      | ✅ passou (lint + typecheck + test + build)                                            |
| Smoke test manual (`npm start` + `curl`)                | ✅ todas as 5 rotas retornaram `200`, rota inexistente retornou `404`                  |
| `npm run test:e2e` (Playwright)                         | ❌ Bloqueado neste sandbox — mesma causa raiz de sempre, tentado novamente, ver abaixo |

## ⚠️ Limitação de ambiente (terceira tentativa, mesma causa raiz de sempre): download do Chromium do Playwright

Tentei novamente após esta correção, exatamente como pedido. O domínio
`cdn.playwright.dev` continua **fora da allowlist de rede deste sandbox**:

```
Error: Download failed: server returned code 403 body 'Host not in
allowlist: cdn.playwright.dev. Add this host to your network egress
settings to allow access.'
```

Isso não tem relação com a migração do Vitest — é a mesma restrição de
rede do sandbox já documentada nas duas entregas anteriores.
`playwright.config.ts` e `e2e/home.spec.ts` continuam corretos e prontos;
o workflow de CI já instala os browsers normalmente em runners do GitHub
Actions (rede irrestrita).

### Como validar localmente (fora deste sandbox)

```bash
npm install
npx playwright install --with-deps chromium
npm run build
npm run test:e2e
```

## GitHub Actions

Nenhuma alteração foi necessária no `.github/workflows/ci.yml` — o
workflow já chamava `npm run lint`, `npm run typecheck`,
`npm run test:coverage` e `npm run build` via scripts do `package.json`
(não comandos hardcoded), então a migração de Vitest 2 → 4 é transparente
para o CI. O `node-version-file: '.nvmrc'` também continua correto, já que
`.nvmrc` (`20`) resolve para a última patch da série 20.x, que satisfaz o
novo mínimo `>=20.19.0`.

## Não incluído nesta fase (por instrução explícita)

- Conteúdo real da landing page (RF-065).
- Autenticação funcional (login/cadastro validam localmente, não chamam o backend).
- Qualquer módulo de negócio do PRD.
- Migração para Tailwind v4, Zod v4 ou Vitest 5 (decisões conscientes registradas em `docs/architecture.md`).
