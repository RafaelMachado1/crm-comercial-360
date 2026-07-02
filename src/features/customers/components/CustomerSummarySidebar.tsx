import type { ProfessionalCustomer } from "../types/customer.types";
import { CustomerTitlesSection } from "./CustomerTitlesSection";
import type { CustomerSummaryMetrics } from "../utils/customerSummaryMetrics";

type CustomerSummarySidebarProps = {
  metrics: CustomerSummaryMetrics;
  customer: ProfessionalCustomer;
  customerId: number;
  loading?: boolean;
  onOpenOrder: (orderId: string) => void;
};

const fallbackCompanyName = "Santorini Limpeza Profissional";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatRanking(position: number | null) {
  if (!position) {
    return "Sem posição no ranking";
  }

  return `${position}º Cliente que mais compra`;
}

function formatOrdersCount(count: number) {
  return count === 1 ? "1 Pedido realizado" : `${count} Pedidos realizados`;
}

function formatDaysWithoutPurchase(days: number | null) {
  if (days === null) {
    return "Nenhuma compra registrada";
  }

  return days === 1 ? "1 Dia sem comprar" : `${days} Dias sem comprar`;
}

function formatCreditValue(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "Não definido";
  }

  return formatCurrency(value);
}

function readOptionalNumberField(
  customer: ProfessionalCustomer,
  fieldNames: string[]
) {
  const customerRecord = customer as unknown as Record<string, unknown>;

  for (const fieldName of fieldNames) {
    const value = customerRecord[fieldName];

    if (typeof value === "number") {
      return value;
    }
  }

  return undefined;
}

function SummaryMetric({
  value,
  description,
}: {
  value: string;
  description?: string;
}) {
  return (
    <div className="flex gap-3 border-b border-slate-100 py-4 last:border-b-0">
      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
      <div className="min-w-0">
        <p className="text-base font-bold text-slate-950">{value}</p>
        {description ? (
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function CustomerSummarySidebar({
  metrics,
  customer,
  customerId,
  loading = false,
  onOpenOrder,
}: CustomerSummarySidebarProps) {
  const companyName = fallbackCompanyName;
  const availableCredit = readOptionalNumberField(customer, [
    "availableCredit",
    "limiteDisponivel",
  ]);
  const totalCreditLimit = readOptionalNumberField(customer, [
    "totalCreditLimit",
    "creditLimit",
    "limiteCredito",
  ]);

  return (
    <aside className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-bold uppercase text-slate-950">Resumo</h2>
        </div>

        <div className="p-5">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-950">Últimos 6 meses</p>

            {loading ? (
              <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
                Carregando resumo...
              </div>
            ) : (
              <div className="mt-2">
                <SummaryMetric value={formatRanking(metrics.rankingPosition)} />
                <SummaryMetric
                  value={formatCurrency(metrics.totalPurchases)}
                  description="Em compras"
                />
                <SummaryMetric value={formatOrdersCount(metrics.ordersCount)} />
                <SummaryMetric
                  value={formatCurrency(metrics.averageTicket)}
                  description="De ticket médio"
                />
                <SummaryMetric
                  value={formatDaysWithoutPurchase(metrics.daysWithoutPurchase)}
                />
              </div>
            )}

            <p className="mt-4 text-xs font-semibold text-slate-400">
              Apenas pedidos do tipo venda
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-bold uppercase text-slate-950">
            Portal do Cliente
          </h2>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm font-semibold text-slate-500">
            Área futura para acesso externo do cliente.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-bold uppercase text-slate-950">
            Limite de Crédito
          </h2>
        </div>

        <div className="p-5">
          <p className="text-sm font-bold text-slate-950">
            {companyName || customer.legalName}
          </p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <span className="text-sm font-semibold text-slate-500">
                Limite disponível
              </span>
              <span className="text-sm font-bold text-slate-950">
                {formatCreditValue(availableCredit)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-slate-500">
                Limite total
              </span>
              <span className="text-sm font-bold text-slate-950">
                {formatCreditValue(totalCreditLimit)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <CustomerTitlesSection customerId={customerId} onOpenOrder={onOpenOrder} />
    </aside>
  );
}
