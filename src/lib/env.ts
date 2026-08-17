import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_API_TIMEOUT_MS: z.coerce.number().int().positive().default(10_000),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

/**
 * Valida as variáveis de ambiente públicas (`NEXT_PUBLIC_*`) em tempo de
 * import. Falha rápido e com mensagem clara caso alguma esteja ausente
 * ou mal formatada — evita descobrir isso só em produção, na hora de uma
 * chamada de API falhar silenciosamente.
 */
function loadClientEnv(): ClientEnv {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_TIMEOUT_MS: process.env.NEXT_PUBLIC_API_TIMEOUT_MS,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  });

  if (!parsed.success) {
    const formatted = parsed.error.flatten().fieldErrors;
    throw new Error(`Variáveis de ambiente públicas inválidas: ${JSON.stringify(formatted)}`);
  }

  return parsed.data;
}

export const env = loadClientEnv();
