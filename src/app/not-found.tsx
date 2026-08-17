import Link from 'next/link';
import { EmptyState } from '@/components/ui/EmptyState';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <EmptyState
        title="Página não encontrada"
        description="A página que você tentou acessar não existe ou foi movida."
        action={
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Voltar para o início
          </Link>
        }
      />
    </div>
  );
}
