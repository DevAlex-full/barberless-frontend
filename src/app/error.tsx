'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/ui/ErrorState';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <ErrorState
        title="Algo deu errado nesta página"
        description="Tente novamente. Se o problema continuar, volte mais tarde."
        action={
          <Button onClick={reset} variant="secondary">
            Tentar novamente
          </Button>
        }
      />
    </div>
  );
}
