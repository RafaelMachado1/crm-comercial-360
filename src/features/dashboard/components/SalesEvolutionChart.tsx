import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { SalesEvolutionPoint } from "../types/dashboard.types";
import { formatCurrencyBR } from "../utils/dashboardUtils";

type SalesEvolutionChartProps = {
  data: SalesEvolutionPoint[];
};

type SalesEvolutionTooltipPayload = {
  payload: SalesEvolutionPoint;
};

type SalesEvolutionTooltipProps = {
  active?: boolean;
  payload?: SalesEvolutionTooltipPayload[];
};

function SalesEvolutionTooltip({
  active,
  payload,
}: SalesEvolutionTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0]?.payload;

  if (!point) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        Dia {point.day}
      </p>

      <p className="mt-2 text-sm text-slate-700">
        Vendido no dia:{" "}
        <strong className="text-slate-950">
          {formatCurrencyBR(point.salesAmount)}
        </strong>
      </p>

      <p className="text-sm text-slate-700">
        Vendas no mês:{" "}
        <strong className="text-slate-950">
          {formatCurrencyBR(point.accumulatedSalesAmount)}
        </strong>
      </p>

      {typeof point.salesForecast === "number" ? (
        <p className="text-sm text-slate-700">
          Previsão:{" "}
          <strong className="text-slate-950">
            {formatCurrencyBR(point.salesForecast)}
          </strong>
        </p>
      ) : null}
    </div>
  );
}

export function SalesEvolutionChart({ data }: SalesEvolutionChartProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
            Evolução de venda
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Acompanhe as vendas acumuladas ao longo do mês.
          </p>
        </div>
      </div>

      <div className="h-[360px] min-h-[360px] w-full min-w-0 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{
              top: 16,
              right: 24,
              bottom: 16,
              left: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => String(value)}
            />

            <Tooltip content={<SalesEvolutionTooltip />} />

            <Area
              type="monotone"
              dataKey="accumulatedSalesAmount"
              fill="#DCFCE7"
              stroke="#22C55E"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="Vendas no mês"
            />

            <Line
              type="monotone"
              dataKey="salesForecast"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              connectNulls
              name="Previsão de vendas"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-5 border-t border-slate-100 px-5 py-3 text-xs text-slate-600">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          Vendas no mês
        </span>

        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 border-t-2 border-dashed border-amber-500" />
          Previsão de vendas
        </span>
      </div>
    </div>
  );
}
