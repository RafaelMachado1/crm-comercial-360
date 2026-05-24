import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Product } from "../../types/crm";

type ProdutosEstoqueChartProps = {
  products: Product[];
};

function ProdutosEstoqueChart({ products }: ProdutosEstoqueChartProps) {
  const data = products.map((product) => ({
    nome: product.nome,
    estoque: product.estoque,
  }));

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Estoque por produto</h3>
        <span>Visão inicial da disponibilidade</span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="estoque" name="Estoque" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProdutosEstoqueChart;