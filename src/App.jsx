import { clientes, produtos } from "./data/mockData";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import PageTitle from "./components/layout/PageTitle";

import Section from "./components/ui/Section";

import CardIndicador from "./components/crm/CardIndicador";
import ClienteCard from "./components/crm/ClienteCard";
import ProdutoCard from "./components/crm/ProdutoCard";

import "./App.css";

function App() {
  const clientesAtivos = clientes.filter((cliente) => cliente.status === "ativo");

  const produtosComEstoque = produtos.filter((produto) => produto.estoque > 0);

  return (
    <div className="app-shell">
      <Header />

      <div className="app-body">
        <Sidebar />

        <main className="main-content">
          <PageTitle
            title="Dashboard Comercial"
            description="Acompanhe clientes, produtos e indicadores iniciais do CRM."
          />

          <Section title="Indicadores">
            <div className="grid indicators-grid">
              <CardIndicador
                titulo="Clientes cadastrados"
                valor={clientes.length}
                descricao="Total de clientes no CRM"
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
                titulo="Produtos com estoque"
                valor={produtosComEstoque.length}
                descricao="Produtos com estoque maior que zero"
              />
            </div>
          </Section>

          <Section title="Clientes">
            <div className="grid">
              {clientes.map((cliente) => (
                <ClienteCard key={cliente.id} cliente={cliente} />
              ))}
            </div>
          </Section>

          <Section title="Produtos">
            <div className="grid">
              {produtos.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))}
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}

export default App;