import type { MetadataRoute } from 'next';

/**
 * Sitemap estrutural da Fase 4 — cobre apenas as rotas técnicas já
 * existentes. Conforme os módulos de negócio do PRD forem implementados
 * (serviços, produtos, blog, etc.), suas páginas devem ser adicionadas
 * aqui.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/cadastro`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
