import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Customer } from "../../types/crm";

type TotalCompradoChartProps = {
  customers: Customer[];
};

function TotalCompradoChart({ customers }: TotalCompradoChartProps) {
  const data = customers.map((customer) => ({
    nome: customer.nome,
    total: customer.totalComprado,
  }));

  return (
    <div className="chart-card chart-card-wide">
      <div className="chart-header">
        <h3>Total comprado por cliente</h3>
        <span>Comparativo de valor acumulado por conta</span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" name="Total comprado (R$)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TotalCompradoChart;