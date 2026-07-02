import {
  getCustomerOpportunityFunnelLabel,
  getCustomerOpportunityLabelLabel,
  getCustomerOpportunityStageLabel,
  getCustomerOpportunityStatusLabel,
} from "../data/customerOpportunityOptions";
import type { CustomerOpportunity } from "../types/customerOpportunity.types";

type CustomerOpportunitiesSectionProps = {
  opportunities: CustomerOpportunity[];
  loading?: boolean;
  onCreateOpportunity: () => void;
  onOpenOpportunity: (opportunity: CustomerOpportunity) => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatOpportunityDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getDaysInStage(opportunity: CustomerOpportunity) {
  const stageDate = new Date(opportunity.updatedAt || opportunity.createdAt);

  if (Number.isNaN(stageDate.getTime())) {
    return "0 dia";
  }

  const todayStart = new Date(new Date().toISOString().slice(0, 10) + "T00:00:00");
  const stageStart = new Date(stageDate.toISOString().slice(0, 10) + "T00:00:00");
  const days = Math.max(
    0,
    Math.floor((todayStart.getTime() - stageStart.getTime()) / 86400000)
  );

  return days === 1 ? "1 dia" : `${days} dias`;
}

export function CustomerOpportunitiesSection({
  opportunities,
  loading = false,
  onCreateOpportunity,
  onOpenOpportunity,
}: CustomerOpportunitiesSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase text-slate-950">
              Oportunidades abertas
            </h2>
          </div>

          <button
            type="button"
            onClick={onCreateOpportunity}
            className="h-10 w-fit appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-4 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Criar oportunidade
          </button>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando oportunidades...
          </div>
        ) : opportunities.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-600">
              Acompanhe as oportunidades criadas para seu cliente.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {opportunities.map((opportunity) => {
              const funnelLabel = getCustomerOpportunityFunnelLabel(
                opportunity.funnel
              );
              const stageLabel = getCustomerOpportunityStageLabel(
                opportunity.stage
              );

              return (
                <button
                  type="button"
                  key={opportunity.id}
                  onClick={() => onOpenOpportunity(opportunity)}
                  className="block w-full rounded-lg border border-slate-200 !bg-slate-50 p-4 text-left !shadow-none transition hover:border-blue-200 hover:!bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 gap-3">
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-sm font-bold text-blue-700">
                        F
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-950">
                          {funnelLabel}
                        </p>
                        <h3 className="mt-1 text-sm font-semibold text-slate-800">
                          {opportunity.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {formatOpportunityDate(opportunity.createdAt)}
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                          Responsável: Não informado
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {getDaysInStage(opportunity)} na fase: {stageLabel}
                        </p>
                        {opportunity.details ? (
                          <p className="mt-2 text-sm text-slate-500">
                            {opportunity.details}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {formatCurrency(opportunity.value)}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {getCustomerOpportunityStatusLabel(opportunity.status)}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {getCustomerOpportunityLabelLabel(opportunity.label)}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
