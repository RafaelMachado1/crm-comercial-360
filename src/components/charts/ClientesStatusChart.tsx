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

type ClientesStatusChartProps = {
  customers: Customer[];
};

function ClientesStatusChart({ customers }: ClientesStatusChartProps) {
  const data = [
    {
      status: "Ativos",
      quantidade: customers.filter((customer) => customer.status === "ativo")
        .length,
    },
    {
      status: "Pendentes",
      quantidade: customers.filter((customer) => customer.status === "pendente")
        .length,
    },
    {
      status: "Inativos",
      quantidade: customers.filter((customer) => customer.status === "inativo")
        .length,
    },
  ];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Clientes por status</h3>
        <span>Distribuição da carteira comercial</span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="quantidade" name="Clientes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ClientesStatusChart;