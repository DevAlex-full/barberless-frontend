'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
              A aplicação encontrou um erro crítico
            </h1>
            <p style={{ marginTop: '0.5rem', color: '#666' }}>
              Recarregue a página. Se o problema persistir, entre em contato com o suporte.
            </p>
            <button
              onClick={reset}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: '1px solid #ccc',
              }}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
