import { useState } from "react";

import { clientes, produtos } from "./data/mockData";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import PageTitle from "./components/layout/PageTitle";

import Section from "./components/ui/Section";

import CardIndicador from "./components/crm/CardIndicador";
import ClienteCard from "./components/crm/ClienteCard";
import ProdutoCard from "./components/crm/ProdutoCard";
import ClienteModal from "./components/crm/ClienteModal";

import "./App.css";

function App() {
  const [sidebarAberta, setSidebarAberta] = useState(true);
  const [statusSelecionado, setStatusSelecionado] = useState("todos");
  const [clientePrioritarioId, setClientePrioritarioId] = useState(null);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const clientesAtivos = clientes.filter((cliente) => cliente.status === "ativo");

  const produtosComEstoque = produtos.filter((produto) => produto.estoque > 0);

  const clientesFiltrados =
    statusSelecionado === "todos"
      ? clientes
      : clientes.filter((cliente) => cliente.status === statusSelecionado);

  function alternarSidebar() {
    setSidebarAberta(!sidebarAberta);
  }

  function alternarPrioridade(clienteId) {
    if (clientePrioritarioId === clienteId) {
      setClientePrioritarioId(null);
      return;
    }

    setClientePrioritarioId(clienteId);
  }

  function simularCarregamento() {
    setErro("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  function simularErro() {
    setLoading(false);
    setErro("Erro ao carregar clientes.");
  }

  function limparErro() {
    setErro("");
  }

  return (
    <div className="app-shell">
      <Header
        sidebarAberta={sidebarAberta}
        onToggleSidebar={alternarSidebar}
      />

      <div className="app-body">
        {sidebarAberta && <Sidebar />}

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

          <Section title="Controles de clientes">
            <div className="controls">
              <label>
                Filtrar por status:
                <select
                  value={statusSelecionado}
                  onChange={(event) => setStatusSelecionado(event.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="ativo">Ativos</option>
                  <option value="pendente">Pendentes</option>
                  <option value="inativo">Inativos</option>
                </select>
              </label>

              <button type="button" onClick={simularCarregamento}>
                Simular carregamento
              </button>

              <button type="button" onClick={simularErro} className="button-danger">
                Simular erro
              </button>

              {erro && (
                <button type="button" onClick={limparErro} className="button-secondary">
                  Limpar erro
                </button>
              )}
            </div>

            {loading && <p className="feedback">Carregando clientes...</p>}

            {erro && <p className="feedback error">{erro}</p>}
          </Section>

          <Section title="Clientes">
            {loading ? (
              <p className="empty-message">Aguarde enquanto os clientes são carregados.</p>
            ) : clientesFiltrados.length > 0 ? (
              <div className="grid">
                {clientesFiltrados.map((cliente) => (
                  <ClienteCard
                    key={cliente.id}
                    cliente={cliente}
                    isPrioritario={clientePrioritarioId === cliente.id}
                    onTogglePrioridade={alternarPrioridade}
                    onVerDetalhes={setClienteSelecionado}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-message">
                Nenhum cliente encontrado para este filtro.
              </p>
            )}
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

      <ClienteModal
        cliente={clienteSelecionado}
        onClose={() => setClienteSelecionado(null)}
      />
    </div>
  );
}

export default App;