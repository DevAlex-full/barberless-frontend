# Variáveis de ambiente — barberless-frontend

# Variáveis de ambiente — barberless-frontend

> **Node.js:** a partir da migração para Vitest 4 (que depende de Vite 8),
> a versão mínima exigida subiu para `20.19.0` (`engines.node` no
> `package.json`: `>=20.19.0 <21`). Continua sendo a série 20.x — não
> subimos para Node 22/24, mantendo a decisão explícita de ficar em
> Node.js 20 nesta arquitetura. O `.nvmrc` continua apontando para `20`,
> que resolve para a última patch da série (>= 20.19.0).

Todas as variáveis públicas (`NEXT_PUBLIC_*`) são validadas via Zod em
`src/lib/env.ts`, com falha rápida e mensagem clara caso alguma esteja
ausente ou mal formatada.

| Variável                     | Obrigatória | Padrão  | Descrição                                                 |
| ---------------------------- | ----------- | ------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`        | Sim         | —       | URL base do `barberless-backend`                          |
| `NEXT_PUBLIC_API_TIMEOUT_MS` | Não         | `10000` | Timeout (ms) das chamadas HTTP ao backend                 |
| `NEXT_PUBLIC_SITE_URL`       | Sim         | —       | URL pública do site (usada em metadata, sitemap e robots) |

## Configuração local

```bash
cp .env.example .env.local
# preencha NEXT_PUBLIC_API_URL apontando para o backend local (ex.: http://localhost:3333)
npm install
npm run dev
```

> Variáveis `NEXT_PUBLIC_*` são embutidas no bundle client-side em tempo de
> build — nunca coloque segredos nelas. Segredos de servidor (quando
> existirem, em fases futuras com rotas server-side) devem usar variáveis
> sem o prefixo `NEXT_PUBLIC_`.
