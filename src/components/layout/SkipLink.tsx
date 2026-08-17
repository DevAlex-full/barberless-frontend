/**
 * Skip link: primeiro elemento focável da página, permite pular a
 * navegação e ir direto para o conteúdo principal — essencial para
 * quem navega por teclado (RNF-007 / WCAG 2.2 AA).
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      Pular para o conteúdo principal
    </a>
  );
}
