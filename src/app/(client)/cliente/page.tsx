import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ClienteOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Visão geral"
        description="Seus próximos agendamentos e novidades aparecem aqui."
      />
      <EmptyState
        title="Nenhum dado ainda"
        description="Esta área será preenchida quando os módulos de agendamento e cliente forem implementados."
      />
    </div>
  );
}
