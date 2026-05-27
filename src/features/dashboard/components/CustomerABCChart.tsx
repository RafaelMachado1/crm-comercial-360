import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { CustomerABCItem } from "../types/dashboard.types";
import { formatPercentageBR } from "../utils/dashboardUtils";

type CustomerABCChartProps = {
  data: CustomerABCItem[];
};

const abcColors: Record<CustomerABCItem["curve"], string> = {
  A: "#6D28D9",
  B: "#A855F7",
  C: "#E9D5FF",
};

export function CustomerABCChart({ data }: CustomerABCChartProps) {
  const totalCustomers = data.reduce((total, item) => total + item.customers, 0);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
            Curva ABC de clientes
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Classificação da carteira por participação.
          </p>
        </div>

        <span className="text-xs font-bold uppercase text-slate-500">
          Últ. 12 meses
        </span>
      </div>

      <div className="flex flex-col items-center p-5">
        <div className="relative h-56 min-h-56 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="customers"
                nameKey="curve"
                innerRadius={70}
                outerRadius={92}
                paddingAngle={2}
              >
                {data.map((item) => (
                  <Cell key={item.curve} fill={abcColors[item.curve]} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [value, `Curva ${name}`]}
                labelFormatter={() => "Curva ABC"}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <strong className="text-4xl font-bold text-slate-900">
              {totalCustomers}
            </strong>
            <span className="text-sm text-slate-400">Clientes</span>
          </div>
        </div>

        <div className="mt-4 grid w-full grid-cols-1 gap-3 text-sm">
          {data.map((item) => (
            <div key={item.curve} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-slate-600">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: abcColors[item.curve] }}
                />
                {item.customers} clientes na Curva {item.curve}
              </span>

              <strong className="text-slate-900">
                {formatPercentageBR(item.percentage)}
              </strong>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-5 appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-none transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          Detalhar curva ABC
        </button>
      </div>
    </div>
  );
}
