import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ClienteTable from "../components/crm/ClienteTable";

import PageTitle from "../components/layout/PageTitle";
import Section from "../components/ui/Section";

import CardIndicador from "../components/crm/CardIndicador";
import ClienteModal from "../components/crm/ClienteModal";
import ClienteFilters from "../components/crm/ClienteFilters";
import ClienteForm from "../components/crm/ClienteForm";

import useCustomers from "../hooks/useCustomers";
import useCustomerFilters from "../hooks/useCustomerFilters";

import {
  createCustomerPayload,
  getActiveCustomers,
} from "../utils/customerUtils";

import {
  customerSchema,
  type CustomerSchemaData,
} from "../schemas/customerSchema";

import type { Customer } from "../types/crm";

const customerFormDefaultValues: CustomerSchemaData = {
  nome: "",
  cidade: "",
  segmento: "",
  status: "ativo",
};

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
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerSchemaData>({
    resolver: zodResolver(customerSchema),
    defaultValues: customerFormDefaultValues,
    mode: "onChange",
  });

  const {
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedSegment,
    setSelectedSegment,
    resetFilters,
    filteredCustomers,
  } = useCustomerFilters(customers);

  const [clientePrioritarioId, setClientePrioritarioId] = useState<
    number | null
  >(null);

  const [clienteSelecionado, setClienteSelecionado] = useState<Customer | null>(
    null,
  );

  const [customerEditing, setCustomerEditing] = useState<Customer | null>(null);

  const activeCustomers = getActiveCustomers(customers);

  function alternarPrioridade(customerId: number) {
    if (clientePrioritarioId === customerId) {
      setClientePrioritarioId(null);
      return;
    }

    setClientePrioritarioId(customerId);
  }

  function handleSimulateError() {
    simulateError();
    toast.error("Erro ao carregar clientes.");
  }

  async function onSubmitCliente(data: CustomerSchemaData) {
    if (customerEditing) {
      const updatedCustomer: Customer = {
        ...customerEditing,
        ...data,
      };

      await updateCustomer(updatedCustomer);

      setCustomerEditing(null);
      reset(customerFormDefaultValues);
      toast.success("Cliente atualizado com sucesso.");
      return;
    }

    const newCustomer = createCustomerPayload(data);

    await createCustomer(newCustomer);

    reset(customerFormDefaultValues);
    toast.success("Cliente cadastrado com sucesso.");
  }

  function startEditCustomer(customer: Customer) {
    setCustomerEditing(customer);

    reset({
      nome: customer.nome,
      cidade: customer.cidade,
      segmento: customer.segmento,
      status: customer.status,
    });
  }

  function clearForm() {
    setCustomerEditing(null);
    reset(customerFormDefaultValues);
  }

  async function handleDeleteCustomer(customerId: number) {
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

    toast.success("Cliente excluído com sucesso.");
  }

  return (
    <>
      <PageTitle
        label="Roadmap React • Fase 10"
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

      <Section
        title={customerEditing ? "Editar cliente" : "Cadastrar novo cliente"}
      >
        <ClienteForm
          register={register}
          errors={errors}
          onSubmitCliente={handleSubmit(onSubmitCliente)}
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

          <button
            type="button"
            onClick={handleSimulateError}
            className="button-danger"
          >
            Simular erro
          </button>

          <button
            type="button"
            onClick={resetFilters}
            className="button-secondary"
          >
            Limpar filtros
          </button>

          {error && (
            <button
              type="button"
              onClick={clearError}
              className="button-secondary"
            >
              Limpar erro
            </button>
          )}
        </div>

        {loading && <p className="feedback">Carregando clientes...</p>}

        {error && <p className="feedback error">{error}</p>}
      </Section>

      <Section title="Tabela de clientes">
        <ClienteTable
          clientes={filteredCustomers}
          clientePrioritarioId={clientePrioritarioId}
          onTogglePrioridade={alternarPrioridade}
          onVerDetalhes={setClienteSelecionado}
          onEditarCliente={startEditCustomer}
          onExcluirCliente={handleDeleteCustomer}
        />
      </Section>

      <ClienteModal
        cliente={clienteSelecionado}
        onClose={() => setClienteSelecionado(null)}
      />
    </>
  );
}

export default ClientesPage;
