import type { CustomerHistoryEvent } from "../../customerHistory/types/customerHistory.types";
import type { CustomerTask } from "../../customerInteractions/types/customerInteraction.types";
import type { CustomerOpportunity } from "../../customerOpportunities/types/customerOpportunity.types";
import type { CustomerOrder } from "../../customerOrders/types/customerOrder.types";

type CustomerCommercialSummaryProps = {
  orders: CustomerOrder[];
  opportunities: CustomerOpportunity[];
  tasks: CustomerTask[];
  historyEvents: CustomerHistoryEvent[];
  loading?: boolean;
};

type CustomerSummaryMetricCardProps = {
  label: string;
  value: string;
  description: string;
};

const openOpportunityStatuses = ["aberta", "pausada"];
const pendingTaskStatuses = ["pendente", "atrasada"];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(dateValue?: string) {
  if (!dateValue) {
    return "Data não informada";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function formatDateTime(dateValue?: string) {
  if (!dateValue) {
    return "Data não informada";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function getTaskDateTime(task: CustomerTask) {
  return new Date(`${task.dueDate}T${task.dueTime || "00:00"}`);
}

function getNextPendingTask(tasks: CustomerTask[]) {
  const pendingTasks = tasks
    .filter((task) => pendingTaskStatuses.includes(task.status))
    .sort((firstTask, secondTask) => {
      return getTaskDateTime(firstTask).getTime() - getTaskDateTime(secondTask).getTime();
    });

  if (pendingTasks.length === 0) {
    return undefined;
  }

  const now = new Date();
  const nextFutureTask = pendingTasks.find((task) => {
    return getTaskDateTime(task).getTime() >= now.getTime();
  });

  return nextFutureTask || pendingTasks[0];
}

function CustomerSummaryMetricCard({
  label,
  value,
  description,
}: CustomerSummaryMetricCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <span className="block text-xs font-bold uppercase text-slate-400">
        {label}
      </span>
      <strong className="mt-2 block text-xl font-bold text-slate-950">
        {value}
      </strong>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </article>
  );
}

export function CustomerCommercialSummary({
  orders,
  opportunities,
  tasks,
  historyEvents,
  loading = false,
}: CustomerCommercialSummaryProps) {
  const totalCommercialValue = orders.reduce((total, order) => {
    return total + order.totalValue;
  }, 0);
  const openOpportunities = opportunities.filter((opportunity) => {
    return openOpportunityStatuses.includes(opportunity.status);
  });
  const pendingTasks = tasks.filter((task) => {
    return pendingTaskStatuses.includes(task.status);
  });
  const latestInteraction = historyEvents[0];
  const nextPendingTask = getNextPendingTask(tasks);

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
      <CustomerSummaryMetricCard
        label="Total comercial"
        value={formatCurrency(totalCommercialValue)}
        description={`${orders.length} pedido(s) ou orçamento(s)`}
      />
      <CustomerSummaryMetricCard
        label="Oportunidades abertas"
        value={String(openOpportunities.length)}
        description="Negociações em aberto ou pausadas"
      />
      <CustomerSummaryMetricCard
        label="Tarefas pendentes"
        value={String(pendingTasks.length)}
        description="Ações pendentes ou atrasadas"
      />
      <CustomerSummaryMetricCard
        label="Última interação"
        value={loading ? "Carregando..." : latestInteraction?.title || "Nenhuma"}
        description={
          loading
            ? "Atualizando histórico comercial"
            : latestInteraction
              ? formatDateTime(latestInteraction.dateTime)
              : "Nenhuma interação registrada"
        }
      />
      <CustomerSummaryMetricCard
        label="Próxima ação"
        value={nextPendingTask?.title || "Nenhuma"}
        description={
          nextPendingTask
            ? `${formatDate(nextPendingTask.dueDate)} às ${nextPendingTask.dueTime}`
            : "Nenhuma ação pendente"
        }
      />
    </section>
  );
}
