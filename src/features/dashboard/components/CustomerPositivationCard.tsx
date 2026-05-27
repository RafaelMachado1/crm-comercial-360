import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { CustomerPositivation } from "../types/dashboard.types";
import { formatPercentageBR } from "../utils/dashboardUtils";

type CustomerPositivationCardProps = {
  data: CustomerPositivation;
};

const POSITIVATED_COLOR = "#A855F7";
const NOT_POSITIVATED_COLOR = "#E9D5FF";

export function CustomerPositivationCard({
  data,
}: CustomerPositivationCardProps) {
  const notPositivatedCustomers = Math.max(
    data.totalActiveCustomers - data.positivatedCustomers,
    0
  );

  const chartData = [
    {
      label: "Positivados",
      value: data.positivatedCustomers,
    },
    {
      label: "Não positivados",
      value: notPositivatedCustomers,
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
            Positivação
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Clientes ativos que compraram no mês.
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
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={70}
                outerRadius={92}
                paddingAngle={2}
              >
                <Cell fill={POSITIVATED_COLOR} />
                <Cell fill={NOT_POSITIVATED_COLOR} />
              </Pie>

              <Tooltip
                formatter={(value, name) => [value, name]}
                labelFormatter={() => "Positivação"}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <strong className="text-4xl font-bold text-slate-900">
              {data.positivatedCustomers}
            </strong>
            <span className="text-center text-sm text-slate-400">
              Clientes positivados
            </span>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-slate-600">
          <strong className="text-slate-950">
            {formatPercentageBR(data.positivatedPercentage)}
          </strong>{" "}
          dos clientes ativos foram positivados neste mês.
        </p>

        <button
          type="button"
          className="mt-5 appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-none transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          Detalhar positivação
        </button>
      </div>
    </div>
  );
}
