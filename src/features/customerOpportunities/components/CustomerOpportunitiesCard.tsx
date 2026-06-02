import {
  getCustomerOpportunityFunnelLabel,
  getCustomerOpportunityLabelLabel,
  getCustomerOpportunityStageLabel,
  getCustomerOpportunityStatusLabel,
} from "../data/customerOpportunityOptions";
import type { CustomerOpportunity } from "../types/customerOpportunity.types";

type CustomerOpportunitiesCardProps = {
  opportunities: CustomerOpportunity[];
  loading?: boolean;
  onCreateOpportunity: () => void;
  onEditOpportunity: (opportunity: CustomerOpportunity) => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function CustomerOpportunitiesCard({
  opportunities,
  loading = false,
  onCreateOpportunity,
  onEditOpportunity,
}: CustomerOpportunitiesCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Oportunidades abertas
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Negociações e possibilidades comerciais em andamento.
            </p>
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
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando oportunidades...
          </div>
        ) : opportunities.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <h3 className="text-sm font-semibold text-slate-900">
              Nenhuma oportunidade aberta.
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              As negociações comerciais deste cliente aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {opportunities.map((opportunity) => (
              <article
                key={opportunity.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {opportunity.title}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {formatCurrency(opportunity.value)}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {getCustomerOpportunityFunnelLabel(opportunity.funnel)}
                      </span>

                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {getCustomerOpportunityStageLabel(opportunity.stage)}
                      </span>

                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {getCustomerOpportunityStatusLabel(opportunity.status)}
                      </span>

                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {getCustomerOpportunityLabelLabel(opportunity.label)}
                      </span>
                    </div>

                    {opportunity.expectedCloseDate && (
                      <p className="mt-3 text-sm text-slate-600">
                        Fechamento previsto: {opportunity.expectedCloseDate}
                      </p>
                    )}

                    {opportunity.details && (
                      <p className="mt-2 text-sm text-slate-500">
                        {opportunity.details}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onEditOpportunity(opportunity)}
                      className="appearance-none rounded-lg border border-slate-200 !bg-white px-3 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
