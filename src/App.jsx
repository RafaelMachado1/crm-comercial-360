import { useState } from "react";

import { clientes as clientesMock, produtos } from "./data/mockData";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import PageTitle from "./components/layout/PageTitle";

import Section from "./components/ui/Section";

import CardIndicador from "./components/crm/CardIndicador";
import ClienteCard from "./components/crm/ClienteCard";
import ProdutoCard from "./components/crm/ProdutoCard";
import ClienteModal from "./components/crm/ClienteModal";
import ClienteFilters from "./components/crm/ClienteFilters";
import ClienteForm from "./components/crm/ClienteForm";

import "./App.css";

const formClienteInicial = {
  nome: "",
  cidade: "",
  segmento: "",
  status: "ativo",
};

function App() {
  const [clientes, setClientes] = useState(clientesMock);
  const [sidebarAberta, setSidebarAberta] = useState(true);
  const [termoBusca, setTermoBusca] = useState("");
  const [statusSelecionado, setStatusSelecionado] = useState("todos");
  const [segmentoSelecionado, setSegmentoSelecionado] = useState("todos");
  const [clientePrioritarioId, setClientePrioritarioId] = useState(null);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [formCliente, setFormCliente] = useState(formClienteInicial);
  const [erroFormulario, setErroFormulario] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const clientesAtivos = clientes.filter((cliente) => cliente.status === "ativo");
  const produtosComEstoque = produtos.filter((produto) => produto.estoque > 0);

  const clientesFiltrados = clientes.filter((cliente) => {
    const correspondeBusca = cliente.nome
      .toLowerCase()
      .includes(termoBusca.toLowerCase());

    const correspondeStatus =
      statusSelecionado === "todos" || cliente.status === statusSelecionado;

    const correspondeSegmento =
      segmentoSelecionado === "todos" ||
      cliente.segmento === segmentoSelecionado;

    return correspondeBusca && correspondeStatus && correspondeSegmento;
  });

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

  function handleChangeFormCliente(event) {
    const { name, value } = event.target;

    setFormCliente({
      ...formCliente,
      [name]: value,
    });
  }

  function handleSubmitCliente(event) {
    event.preventDefault();

    setErroFormulario("");
    setMensagemSucesso("");

    if (!formCliente.nome || !formCliente.cidade || !formCliente.segmento) {
      setErroFormulario("Preencha nome, cidade e segmento.");
      return;
    }

    const novoCliente = {
      id: Date.now(),
      nome: formCliente.nome,
      cidade: formCliente.cidade,
      segmento: formCliente.segmento,
      status: formCliente.status,
      totalComprado: 0,
    };

    setClientes([...clientes, novoCliente]);
    setFormCliente(formClienteInicial);
    setMensagemSucesso("Cliente cadastrado com sucesso.");
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

          <Section title="Cadastrar novo cliente">
            <ClienteForm
              formCliente={formCliente}
              onChangeFormCliente={handleChangeFormCliente}
              onSubmitCliente={handleSubmitCliente}
              erroFormulario={erroFormulario}
              mensagemSucesso={mensagemSucesso}
            />
          </Section>

          <Section title="Controles de clientes">
            <ClienteFilters
              termoBusca={termoBusca}
              onChangeTermoBusca={setTermoBusca}
              statusSelecionado={statusSelecionado}
              onChangeStatusSelecionado={setStatusSelecionado}
              segmentoSelecionado={segmentoSelecionado}
              onChangeSegmentoSelecionado={setSegmentoSelecionado}
            />

            <div className="controls">
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
                Nenhum cliente encontrado com os filtros selecionados.
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