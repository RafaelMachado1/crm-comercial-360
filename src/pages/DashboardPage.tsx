import { clientes, produtos } from "../data/mockData";

import PageTitle from "../components/layout/PageTitle";
import Section from "../components/ui/Section";
import CardIndicador from "../components/crm/CardIndicador";

import ClientesStatusChart from "../components/charts/ClientesStatusChart";
import ProdutosEstoqueChart from "../components/charts/ProdutosEstoqueChart";
import TotalCompradoChart from "../components/charts/TotalCompradoChart";

function DashboardPage() {
  const clientesAtivos = clientes.filter((cliente) => cliente.status === "ativo");
  const produtosComEstoque = produtos.filter((produto) => produto.estoque > 0);

  const totalComprado = clientes.reduce((total, cliente) => {
    return total + cliente.totalComprado;
  }, 0);

  return (
    <>
      <PageTitle
        label="Roadmap React • Fase 10"
        title="Dashboard Comercial"
        description="Visão geral dos principais indicadores do CRM."
      />

      <Section title="Indicadores">
        <div className="grid indicators-grid">
          <CardIndicador
            titulo="Clientes cadastrados"
            valor={clientes.length}
            descricao="Clientes base do CRM"
          />

          <CardIndicador
            titulo="Clientes ativos"
            valor={clientesAtivos.length}
            descricao="Clientes em acompanhamento"
          />

          <CardIndicador
            titulo="Produtos cadastrados"
            valor={produtos.length}
            descricao="Produtos disponíveis no catálogo"
          />

          <CardIndicador
            titulo="Total comprado"
            valor={totalComprado}
            descricao="Valor acumulado na carteira"
          />
        </div>
      </Section>

      <Section title="Gráficos comerciais">
        <div className="charts-grid">
          <ClientesStatusChart customers={clientes} />
          <ProdutosEstoqueChart products={produtos} />
          <TotalCompradoChart customers={clientes} />
        </div>
      </Section>

      <Section title="Resumo">
        <div className="empty-message">
          A gestão completa de clientes está na página <strong>Clientes</strong>.
          Use a navegação lateral para acessar as áreas do CRM Comercial 360.
        </div>
      </Section>
    </>
  );
}

export default DashboardPage;