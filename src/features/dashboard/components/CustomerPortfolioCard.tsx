import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { CustomerPortfolio } from "../types/dashboard.types";
import { formatPercentageBR } from "../utils/dashboardUtils";

type CustomerPortfolioCardProps = {
  data: CustomerPortfolio;
};

const portfolioColors = ["#22C55E", "#F59E0B", "#EF4444", "#CBD5E1"];

export function CustomerPortfolioCard({ data }: CustomerPortfolioCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
            Carteira de clientes
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Distribuição da carteira por status.
          </p>
        </div>

        <span className="text-xs font-bold uppercase text-slate-500">
          Mês atual
        </span>
      </div>

      <div className="flex flex-col items-center p-5">
        <div className="relative h-56 min-h-56 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.statuses}
                dataKey="value"
                nameKey="label"
                innerRadius={70}
                outerRadius={92}
                paddingAngle={2}
              >
                {data.statuses.map((status, index) => (
                  <Cell
                    key={status.label}
                    fill={portfolioColors[index % portfolioColors.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [value, name]}
                labelFormatter={() => "Carteira"}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <strong className="text-4xl font-bold text-slate-900">
              {data.totalCustomers}
            </strong>
            <span className="text-sm text-slate-400">Clientes</span>
          </div>
        </div>

        <div className="mt-4 grid w-full grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          {data.statuses.map((status, index) => (
            <div key={status.label} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-slate-600">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      portfolioColors[index % portfolioColors.length],
                  }}
                />
                {status.value} {status.label.toLowerCase()}
              </span>

              <strong className="text-slate-900">
                {formatPercentageBR(status.percentage)}
              </strong>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-5 appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-none transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          Detalhar carteira
        </button>
      </div>
    </div>
  );
}
