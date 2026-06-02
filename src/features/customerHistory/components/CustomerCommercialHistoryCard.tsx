import type {
  CustomerHistoryEvent,
  CustomerHistoryEventSource,
  CustomerHistoryEventType,
} from "../types/customerHistory.types";

type CustomerCommercialHistoryCardProps = {
  events: CustomerHistoryEvent[];
  loading?: boolean;
};

function getHistorySourceLabel(source: CustomerHistoryEventSource): string {
  const labels: Record<CustomerHistoryEventSource, string> = {
    activity: "Atividade",
    task: "Tarefa",
    opportunity: "Oportunidade",
    order: "Pedido",
    invoice: "Nota fiscal",
    system: "Sistema",
  };

  return labels[source];
}

function getHistoryTypeLabel(type: CustomerHistoryEventType): string {
  const labels: Record<CustomerHistoryEventType, string> = {
    activity_registered: "Atividade registrada",
    task_completed: "Tarefa concluída",
    opportunity_created: "Oportunidade criada",
    opportunity_updated: "Oportunidade atualizada",
    opportunity_closed: "Oportunidade encerrada",
  };

  return labels[type];
}

function formatHistoryDateTime(dateTime: string): string {
  const date = new Date(dateTime);

  if (Number.isNaN(date.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export function CustomerCommercialHistoryCard({
  events,
  loading = false,
}: CustomerCommercialHistoryCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Histórico comercial
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Linha do tempo consolidada do relacionamento com o cliente.
        </p>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando histórico comercial...
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <h3 className="text-sm font-semibold text-slate-900">
              Nenhum histórico comercial registrado.
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              As interações, tarefas concluídas e oportunidades deste cliente
              aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="relative border-l-2 border-blue-200 py-1 pl-5"
              >
                <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full border-2 border-white bg-blue-500" />

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {getHistorySourceLabel(event.source)}
                      </span>

                      <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {getHistoryTypeLabel(event.type)}
                      </span>
                    </div>

                    <time
                      dateTime={event.dateTime}
                      className="text-xs font-semibold text-slate-500"
                    >
                      {formatHistoryDateTime(event.dateTime)}
                    </time>
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-slate-900">
                    {event.title}
                  </h3>

                  {event.description && (
                    <p className="mt-2 text-sm text-slate-500">
                      {event.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
