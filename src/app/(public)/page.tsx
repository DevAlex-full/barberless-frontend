import Link from 'next/link';
import { Container } from '@/components/ui/Container';

/**
 * Placeholder da Fase 4 — Fundação Técnica. O conteúdo real da landing
 * (hero, serviços em destaque, galeria, avaliações, etc. — RF-065)
 * será implementado na fase de conteúdo público, seguindo os tokens de
 * design já configurados em `globals.css` e `tailwind.config.ts`.
 */
export default function HomePage() {
  return (
    <Container className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Bem-vindo à <span className="text-primary">BarberLess</span>
      </h1>
      <p className="max-w-xl text-muted-foreground">
        A fundação técnica da plataforma está pronta. O conteúdo público completo (serviços,
        agendamento, galeria e clube de fidelidade) chega nas próximas fases.
      </p>
      <div className="flex gap-3">
        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Entrar
        </Link>
        <Link
          href="/cadastro"
          className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-medium text-foreground hover:bg-muted"
        >
          Criar conta
        </Link>
      </div>
    </Container>
  );
}
