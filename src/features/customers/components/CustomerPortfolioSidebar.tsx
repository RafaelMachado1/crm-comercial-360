import type { CustomerPortfolioSummary } from "../types/customer.types";

type CustomerPortfolioSidebarProps = {
  summary: CustomerPortfolioSummary;
  monthLabel?: string;
  year?: number;
  onDetailsClick?: () => void;
};

function calculatePercentage(value: number, total: number): string {
  if (total <= 0) {
    return "0,00%";
  }

  const percentage = (value / total) * 100;

  return `${percentage.toFixed(2).replace(".", ",")}%`;
}

type PortfolioRowProps = {
  label: string;
  value: number;
  total: number;
  dotClassName: string;
};

function PortfolioRow({ label, value, total, dotClassName }: PortfolioRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="flex items-center gap-2 text-slate-600">
        <span className={`h-3 w-3 rounded-full ${dotClassName}`} />
        {label}
      </span>

      <span className="font-semibold text-slate-900">
        {value}{" "}
        <span className="text-xs font-medium text-slate-500">
          ({calculatePercentage(value, total)})
        </span>
      </span>
    </div>
  );
}

export function CustomerPortfolioSidebar({
  summary,
  monthLabel = "Mês atual",
  year,
  onDetailsClick,
}: CustomerPortfolioSidebarProps) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Carteira de clientes
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Resumo da situação da carteira.
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase text-slate-500">
            {monthLabel}
            {year ? `/${year}` : ""}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="rounded-xl bg-slate-50 p-5 text-center">
          <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Total de clientes
          </span>

          <strong className="mt-2 block text-4xl font-bold text-slate-950">
            {summary.totalCustomers}
          </strong>
        </div>

        <div className="mt-5 space-y-3">
          <PortfolioRow
            label="Ativos"
            value={summary.activeCustomers}
            total={summary.totalCustomers}
            dotClassName="bg-green-500"
          />

          <PortfolioRow
            label="Inativos recentes"
            value={summary.recentInactiveCustomers}
            total={summary.totalCustomers}
            dotClassName="bg-amber-500"
          />

          <PortfolioRow
            label="Inativos antigos"
            value={summary.oldInactiveCustomers}
            total={summary.totalCustomers}
            dotClassName="bg-red-500"
          />

          <PortfolioRow
            label="Prospects"
            value={summary.prospects}
            total={summary.totalCustomers}
            dotClassName="bg-slate-300"
          />
        </div>

        <button
          type="button"
          onClick={onDetailsClick}
          className="mt-5 h-10 w-full appearance-none rounded-lg border border-slate-200 !bg-white px-4 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          Detalhar carteira
        </button>
      </div>
    </aside>
  );
}
