import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function PainelDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard" description="Indicadores operacionais da BarberLess." />
      <EmptyState
        title="Nenhum indicador ainda"
        description="Os relatórios e indicadores aparecem aqui conforme os módulos de negócio forem implementados."
      />
    </div>
  );
}
