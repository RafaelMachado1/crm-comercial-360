import PageTitle from "../components/layout/PageTitle";
import Section from "../components/ui/Section";

import CardIndicador from "../components/crm/CardIndicador";
import ClienteCard from "../components/crm/ClienteCard";
import ClienteModal from "../components/crm/ClienteModal";
import ClienteFilters from "../components/crm/ClienteFilters";
import ClienteForm from "../components/crm/ClienteForm";

import useCustomers from "../hooks/useCustomers";
import useCustomerForm from "../hooks/useCustomerForm";
import useCustomerFilters from "../hooks/useCustomerFilters";

import {
  createCustomerPayload,
  getActiveCustomers,
  validateCustomerForm,
} from "../utils/customerUtils";

import { useState } from "react";

function ClientesPage() {
  const {
    customers,
    loading,
    error,
    loadCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    clearError,
    simulateError,
  } = useCustomers();

  const {
    formCustomer,
    formError,
    successMessage,
    customerEditing,
    handleChangeFormCustomer,
    startEditCustomer,
    clearForm,
    setFormError,
    setSuccessMessage,
    setCustomerEditing,
  } = useCustomerForm();

  const {
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedSegment,
    setSelectedSegment,
    filteredCustomers,
  } = useCustomerFilters(customers);

  const [clientePrioritarioId, setClientePrioritarioId] = useState(null);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  const activeCustomers = getActiveCustomers(customers);

  function alternarPrioridade(customerId) {
    if (clientePrioritarioId === customerId) {
      setClientePrioritarioId(null);
      return;
    }

    setClientePrioritarioId(customerId);
  }

  async function handleSubmitCliente(event) {
    event.preventDefault();

    setFormError("");
    setSuccessMessage("");

    const validationError = validateCustomerForm(formCustomer);

    if (validationError) {
      setFormError(validationError);
      return;
    }

    if (customerEditing) {
      const updatedCustomer = {
        ...customerEditing,
        ...formCustomer,
      };

      await updateCustomer(updatedCustomer);

      setCustomerEditing(null);
      clearForm();
      setSuccessMessage("Cliente atualizado com sucesso.");
      return;
    }

    const newCustomer = createCustomerPayload(formCustomer);

    await createCustomer(newCustomer);

    clearForm();
    setSuccessMessage("Cliente cadastrado com sucesso.");
  }

  async function handleDeleteCustomer(customerId) {
    const confirmar = window.confirm("Deseja realmente excluir este cliente?");

    if (!confirmar) {
      return;
    }

    await deleteCustomer(customerId);

    if (clientePrioritarioId === customerId) {
      setClientePrioritarioId(null);
    }

    if (clienteSelecionado?.id === customerId) {
      setClienteSelecionado(null);
    }

    if (customerEditing?.id === customerId) {
      clearForm();
    }

    setSuccessMessage("Cliente excluído com sucesso.");
  }

  return (
    <>
      <PageTitle
        label="Roadmap React • Fase 08"
        title="Clientes"
        description="Gerencie cadastro, edição, filtros e acompanhamento de clientes."
      />

      <Section title="Indicadores de clientes">
        <div className="grid indicators-grid">
          <CardIndicador
            titulo="Clientes cadastrados"
            valor={customers.length}
            descricao="Total de clientes no CRM"
          />

          <CardIndicador
            titulo="Clientes ativos"
            valor={activeCustomers.length}
            descricao="Clientes em acompanhamento"
          />
        </div>
      </Section>

      <Section title={customerEditing ? "Editar cliente" : "Cadastrar novo cliente"}>
        <ClienteForm
          formCliente={formCustomer}
          onChangeFormCliente={handleChangeFormCustomer}
          onSubmitCliente={handleSubmitCliente}
          erroFormulario={formError}
          mensagemSucesso={successMessage}
          clienteEmEdicao={customerEditing}
          onCancelarEdicao={clearForm}
        />
      </Section>

      <Section title="Controles de clientes">
        <ClienteFilters
          termoBusca={searchTerm}
          onChangeTermoBusca={setSearchTerm}
          statusSelecionado={selectedStatus}
          onChangeStatusSelecionado={setSelectedStatus}
          segmentoSelecionado={selectedSegment}
          onChangeSegmentoSelecionado={setSelectedSegment}
        />

        <div className="controls">
          <button type="button" onClick={loadCustomers}>
            Simular carregamento
          </button>

          <button type="button" onClick={simulateError} className="button-danger">
            Simular erro
          </button>

          {error && (
            <button type="button" onClick={clearError} className="button-secondary">
              Limpar erro
            </button>
          )}
        </div>

        {loading && <p className="feedback">Carregando clientes...</p>}

        {error && <p className="feedback error">{error}</p>}
      </Section>

      <Section title="Lista de clientes">
        {loading ? (
          <p className="empty-message">Aguarde enquanto os clientes são carregados.</p>
        ) : filteredCustomers.length > 0 ? (
          <div className="grid">
            {filteredCustomers.map((customer) => (
              <ClienteCard
                key={customer.id}
                cliente={customer}
                isPrioritario={clientePrioritarioId === customer.id}
                onTogglePrioridade={alternarPrioridade}
                onVerDetalhes={setClienteSelecionado}
                onEditarCliente={startEditCustomer}
                onExcluirCliente={handleDeleteCustomer}
              />
            ))}
          </div>
        ) : (
          <p className="empty-message">
            Nenhum cliente encontrado com os filtros selecionados.
          </p>
        )}
      </Section>

      <ClienteModal
        cliente={clienteSelecionado}
        onClose={() => setClienteSelecionado(null)}
      />
    </>
  );
}

export default ClientesPage;