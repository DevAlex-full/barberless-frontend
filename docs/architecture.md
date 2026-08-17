# Arquitetura — barberless-frontend

## Stack

Next.js 16 (App Router, Turbopack) · TypeScript strict · React 19 ·
Tailwind CSS 3 (tokens CSS) · next-themes · TanStack Query · React Hook
Form · Zod 3 · Vitest 4 + Testing Library · Playwright · ESLint 9 (flat
config)

## Decisões de versão (migração Next 16 / React 19)

O projeto foi migrado de Next 14 + React 18 para **Next 16.3.0 (estável,
não-canary) + React 19.2.x** logo na Fase 4, antes da implementação de
autenticação e módulos de negócio — decisão do proprietário, já que o Next
14 saiu da política oficial de suporte.

Nem toda dependência foi levada para sua última major disponível. Cada
decisão abaixo foi verificada contra as _peer dependencies_ reais dos
pacotes (não por suposição):

| Pacote                           | Versão usada                          | Por quê não a última major                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tailwindcss`                    | `^3.4.19` (não v4)                    | Tailwind v4 é um motor novo (config CSS-first, sem `tailwind.config.ts` obrigatório). Não é exigido pelo Next 16/React 19 — ambos funcionam normalmente com Tailwind 3. Migrar agora alteraria a superfície de configuração dos tokens sem necessidade, contrariando a instrução explícita de não alterar design/escopo nesta fase.                                                                                                                                                                                      |
| `zod`                            | `^3.25.76` (não v4)                   | Zod 4 muda API (`z.string().email()` → `z.email()`, formato de erros, etc.). `@hookform/resolvers@5.7.1` aceita `zod ^3.25.0 \|\| ^4.0.0` — ou seja, Zod 3 mais recente já é totalmente compatível, sem forçar rewrite de schemas.                                                                                                                                                                                                                                                                                       |
| `vitest` / `@vitest/coverage-v8` | **`4.1.10`** (pin exato, não v5)      | Migrado nesta correção para zerar a cadeia de vulnerabilidades `esbuild`/`vite`/`vitest` (ver `docs/phase-4-report.md`). Vitest 4 exige `vite ^6 \|\| ^7 \|\| ^8`; por isso `@vitejs/plugin-react` subiu para `^6.0.5` (exige `vite ^8`) e `vite@^8.2.1` passou a ser declarado explicitamente. **Não foi usado Vitest 5**: exige Node `>=22.12.0`, incompatível com a decisão de manter Node.js 20. `@vitest/coverage-v8` fica pinado sem `^` porque o próprio `vitest` declara essa versão como peer dependency exata. |
| `eslint`                         | `^9.39.5` (não v10)                   | `eslint-config-next@16.3.0` depende internamente de `typescript-eslint@^8.46.0`, cujo peer é `eslint: ^8.57.0 \|\| ^9.0.0` — **não inclui ESLint 10**. Usar ESLint 10 quebraria essa dependência interna do próprio `eslint-config-next`.                                                                                                                                                                                                                                                                                |
| `typescript`                     | `^5.9.3` (não a "latest" da registry) | Pelo mesmo motivo do ESLint: `typescript-eslint@8.46.0` declara peer `typescript: '>=4.8.4 <6.0.0'` — não suporta a major mais nova do registro.                                                                                                                                                                                                                                                                                                                                                                         |

Essas restrições foram confirmadas via `npm view <pacote> peerDependencies`
contra as versões reais resolvidas, não deduzidas — ver
`docs/phase-4-report.md` para o log completo da investigação.

## Estrutura de pastas

```
src/
├── app/
│   ├── layout.tsx            # layout raiz (ThemeProvider, QueryProvider, SkipLink)
│   ├── globals.css            # tokens de design (Tailwind @layer base)
│   ├── loading.tsx / error.tsx / global-error.tsx / not-found.tsx
│   ├── sitemap.ts / robots.ts
│   ├── (public)/               # site público — layout com topbar/footer
│   │   ├── layout.tsx
│   │   └── page.tsx             # "/"
│   ├── (auth)/                  # autenticação — layout centralizado
│   │   ├── layout.tsx
│   │   ├── login/page.tsx       # "/login"
│   │   └── cadastro/page.tsx    # "/cadastro"
│   ├── (client)/                 # área do cliente — sidebar + topbar + mobile nav
│   │   ├── layout.tsx
│   │   └── cliente/page.tsx      # "/cliente"
│   └── (admin)/                  # painel administrativo — mesmo padrão de (client)
│       ├── layout.tsx
│       └── painel/page.tsx        # "/painel"
├── components/
│   ├── ui/                        # design system: Button, Input, Card, Dialog, etc.
│   ├── layout/                    # Topbar, Sidebar, MobileNav, SkipLink
│   └── providers/                  # ThemeProvider, QueryProvider
├── lib/                             # utils (cn), env (Zod), http-client
└── config/                          # site.ts — navegação por área
```

Route groups (`(public)`, `(auth)`, `(client)`, `(admin)`) organizam layouts
distintos por área **sem** afetar a URL final — por isso `(public)/page.tsx`
responde em `/`, `(client)/cliente/page.tsx` responde em `/cliente`, etc.

## Design tokens

A paleta oficial provisória (bronze, marfim, bases clara/escura) é
declarada como variáveis CSS em `src/app/globals.css` (`:root` e `.dark`),
nunca como valores fixos no `tailwind.config.ts` — isso permite ajustar a
paleta em um único lugar quando o manual de marca definitivo for aprovado
pelo proprietário (pendência registrada no PRD).

As fontes de marca também ainda não foram definidas — os tokens `--font-sans`
e `--font-display` usam pilhas de fontes de sistema como placeholder seguro
(sem depender de download de webfonts externas).

## Tema claro/escuro

- `next-themes` gerencia a escolha do usuário (`light` / `dark` / `system`),
  persistida em `localStorage`.
- `attribute="class"` no `<html>` + `suppressHydrationWarning` no layout
  raiz previnem o "flash" de tema incorreto: o next-themes injeta um script
  inline que aplica a classe correta **antes** da hidratação do React.
- `ThemeToggle` (em `components/ui`) alterna entre os três modos e só
  renderiza o estado real após montar no cliente, evitando mismatch de
  hidratação.

## Cliente HTTP

`src/lib/http-client.ts` é um wrapper fino sobre `fetch`, preparado para
consumir o `barberless-backend`:

- aplica `NEXT_PUBLIC_API_URL` como base;
- timeout configurável via `AbortController` (`NEXT_PUBLIC_API_TIMEOUT_MS`);
- normaliza tanto erros de rede quanto o formato de erro padronizado do
  backend (`{ error: { code, message, requestId } }`) em uma única classe
  `HttpError`.

Nesta fase não há chamadas de negócio reais — nenhuma página consome
endpoints do backend ainda. O client existe como fundação para a fase de
Autenticação.

## Acessibilidade (RNF-007)

- Skip link como primeiro elemento focável de toda página.
- Foco visível consistente (`:focus-visible` com `ring` nos tokens de cor).
- `prefers-reduced-motion` respeitado globalmente (animações neutralizadas).
- Componentes interativos usam padrões ARIA apropriados: `Switch`
  (`role="switch"` + `aria-checked`), `Dialog` (elemento nativo `<dialog>`,
  focus trap e fechamento por Escape vêm do navegador), `Tooltip`
  (`aria-describedby`, visível em hover **e** foco de teclado).

## Testes

- **Vitest + Testing Library**: componentes de UI, layouts e utilitários,
  rodando em `jsdom`, sem depender de rede.
- **Playwright**: fluxo real de navegação (`/` → `/login`), skip link
  funcional, contra um build de produção (`npm run start`) — ver
  `docs/phase-4-report.md` para o status de execução neste ambiente.

## Lint (ESLint 9, flat config)

A partir do Next.js 16, `next lint` foi removido e `next build` não roda
mais lint automaticamente. O projeto usa `eslint.config.mjs` (flat config,
padrão do ESLint 9+), importando diretamente os arrays já no formato flat
que o `eslint-config-next@16` passou a exportar (`eslint-config-next/core-web-vitals`
e `eslint-config-next/typescript`), combinados com `eslint-config-prettier`
para desativar regras de formatação que conflitam com o Prettier. O antigo
`.eslintrc.json` foi removido.

`npm run lint` chama o ESLint CLI diretamente (`eslint .`), não mais
`next lint`.

## Não incluído nesta fase (por instrução explícita)

- Conteúdo real da landing page (RF-065).
- Autenticação funcional (as páginas de login/cadastro validam localmente
  mas não chamam o backend).
- Qualquer módulo de negócio do PRD.
