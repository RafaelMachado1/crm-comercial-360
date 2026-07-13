import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import PageTitle from "../components/layout/PageTitle";
import { OpportunityKanbanBoard } from "../features/customerOpportunities/components/OpportunityKanbanBoard";
import {
  OpportunityKanbanDrawer,
  type OpportunityKanbanDrawerMode,
  type OpportunityKanbanFormValues,
} from "../features/customerOpportunities/components/OpportunityKanbanDrawer";
import {
  OpportunityKanbanFilters,
  type OpportunityKanbanFiltersValues,
} from "../features/customerOpportunities/components/OpportunityKanbanFilters";
import {
  customerOpportunityFunnelOptions,
  customerOpportunityLabelOptions,
  customerOpportunityStageOptions,
  customerOpportunityStatusOptions,
} from "../features/customerOpportunities/data/customerOpportunityOptions";
import { useAllCustomerOpportunities } from "../features/customerOpportunities/hooks/useAllCustomerOpportunities";
import type {
  CustomerOpportunity,
  CustomerOpportunityFormValues,
  CustomerOpportunityStage,
} from "../features/customerOpportunities/types/customerOpportunity.types";
import {
  groupOpportunitiesByStage,
} from "../features/customerOpportunities/utils/opportunityKanban";
import useCustomers from "../hooks/useCustomers";

function createLocalId(prefix: string) {
  return (
    prefix +
    "-" +
    Date.now() +
    "-" +
    Math.random().toString(36).slice(2, 8)
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function parseOpportunityValue(value: string): number {
  return Number(value.replace(/\s/g, "").replace(",", "."));
}

function getCustomerById(
  customers: ReturnType<typeof useCustomers>["customers"],
  customerId: number
) {
  return customers.find((currentCustomer) => {
    return currentCustomer.id === customerId;
  });
}

function getCustomerDisplayName(
  customer: ReturnType<typeof useCustomers>["customers"][number]
) {
  return customer.tradeName || customer.legalName || customer.nome;
}

function isOptionValue<Value extends string>(
  options: Array<{ value: Value; label: string }>,
  value: Value
) {
  return options.some((option) => option.value === value);
}

function getOptionLabel<Value extends string>(
  options: Array<{ value: Value; label: string }>,
  value: Value
) {
  return options.find((option) => option.value === value)?.label || value;
}

function normalizeSearchText(value: string | number | null | undefined) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function getOpportunitySearchText(
  opportunity: CustomerOpportunity,
  customer: ReturnType<typeof useCustomers>["customers"][number] | undefined
) {
  return normalizeSearchText(
    [
      opportunity.title,
      customer ? getCustomerDisplayName(customer) : "Cliente não encontrado",
      customer?.legalName,
      customer?.tradeName,
      customer?.nome,
      opportunity.details,
      opportunity.funnel,
      getOptionLabel(customerOpportunityFunnelOptions, opportunity.funnel),
      opportunity.stage,
      getOptionLabel(customerOpportunityStageOptions, opportunity.stage),
      opportunity.status,
      getOptionLabel(customerOpportunityStatusOptions, opportunity.status),
      opportunity.label,
      getOptionLabel(customerOpportunityLabelOptions, opportunity.label),
    ].join(" ")
  );
}

function createEmptyKanbanFormValues(
  customerId = ""
): OpportunityKanbanFormValues {
  return {
    customerId,
    title: "",
    funnel: "vendas",
    stage: "prospeccao",
    value: "",
    status: "aberta",
    label: "morna",
    expectedCloseDate: "",
    details: "",
  };
}

function createKanbanFormValuesFromOpportunity(
  opportunity: CustomerOpportunity
): OpportunityKanbanFormValues {
  return {
    customerId: String(opportunity.customerId),
    title: opportunity.title,
    funnel: opportunity.funnel,
    stage: opportunity.stage,
    value: String(opportunity.value).replace(".", ","),
    status: opportunity.status,
    label: opportunity.label,
    expectedCloseDate: opportunity.expectedCloseDate || "",
    details: opportunity.details || "",
  };
}

function VendasPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clienteId = searchParams.get("clienteId");
  const oportunidadeId = searchParams.get("oportunidadeId");
  const hasCustomerParam = Boolean(clienteId);
  const numericCustomerId = clienteId ? Number(clienteId) : null;
  const hasValidCustomerParam =
    numericCustomerId !== null && !Number.isNaN(numericCustomerId);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] =
    useState<OpportunityKanbanDrawerMode>("create");
  const [selectedDrawerOpportunity, setSelectedDrawerOpportunity] =
    useState<CustomerOpportunity | null>(null);
  const [formValues, setFormValues] = useState<OpportunityKanbanFormValues>(
    createEmptyKanbanFormValues
  );
  const [formError, setFormError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<OpportunityKanbanFiltersValues>({
    customerId: "",
    funnel: "",
    status: "",
    label: "",
  });

  const {
    opportunities,
    opportunitiesLoading,
    opportunitiesError,
    createOpportunity,
    updateOpportunity,
    updateOpportunityStage,
    deleteOpportunity,
    isCreatingOpportunity,
    isUpdatingOpportunity,
    isUpdatingOpportunityStage,
    isDeletingOpportunity,
  } = useAllCustomerOpportunities();
  const {
    customers,
    loading: customersLoading,
    error: customersError,
  } = useCustomers();

  const normalizedSearchTerm = normalizeSearchText(searchTerm);
  const hasActiveFilters = Boolean(
    filters.customerId ||
      filters.funnel ||
      filters.status ||
      filters.label ||
      normalizedSearchTerm
  );

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      if (
        filters.customerId &&
        opportunity.customerId !== Number(filters.customerId)
      ) {
        return false;
      }

      if (filters.funnel && opportunity.funnel !== filters.funnel) {
        return false;
      }

      if (filters.status && opportunity.status !== filters.status) {
        return false;
      }

      if (filters.label && opportunity.label !== filters.label) {
        return false;
      }

      if (normalizedSearchTerm) {
        const customer = getCustomerById(customers, opportunity.customerId);
        const searchableText = getOpportunitySearchText(opportunity, customer);

        if (!searchableText.includes(normalizedSearchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [customers, filters, normalizedSearchTerm, opportunities]);

  const columns = useMemo(() => {
    return groupOpportunitiesByStage(filteredOpportunities);
  }, [filteredOpportunities]);

  const selectedOpportunity = useMemo(() => {
    if (!oportunidadeId) {
      return undefined;
    }

    return opportunities.find((opportunity) => {
      return opportunity.id === oportunidadeId;
    });
  }, [opportunities, oportunidadeId]);

  const sourceCustomer = useMemo(() => {
    if (!hasValidCustomerParam || numericCustomerId === null) {
      return undefined;
    }

    return getCustomerById(customers, numericCustomerId);
  }, [customers, hasValidCustomerParam, numericCustomerId]);

  const sourceCustomerName = sourceCustomer
    ? getCustomerDisplayName(sourceCustomer)
    : "";

  const totalValue = useMemo(() => {
    return filteredOpportunities.reduce((total, opportunity) => {
      return total + opportunity.value;
    }, 0);
  }, [filteredOpportunities]);

  const loading =
    (opportunitiesLoading && opportunities.length === 0) || customersLoading;
  const error = opportunitiesError || customersError;
  const canReturnToSourceCustomer =
    hasValidCustomerParam && numericCustomerId !== null && Boolean(sourceCustomer);
  const isSubmittingForm = isCreatingOpportunity || isUpdatingOpportunity;

  function handleReturnToSourceCustomer() {
    if (!canReturnToSourceCustomer || numericCustomerId === null) {
      return;
    }

    navigate("/clientes/" + numericCustomerId);
  }

  function getDefaultCustomerIdForCreate() {
    if (canReturnToSourceCustomer && numericCustomerId !== null) {
      return String(numericCustomerId);
    }

    return "";
  }

  function handleOpenCreateDrawer() {
    setDrawerMode("create");
    setSelectedDrawerOpportunity(null);
    setFormValues(createEmptyKanbanFormValues(getDefaultCustomerIdForCreate()));
    setFormError("");
    setDrawerOpen(true);
  }

  function handleOpenEditDrawer(opportunity: CustomerOpportunity) {
    setDrawerMode("edit");
    setSelectedDrawerOpportunity(opportunity);
    setFormValues(createKanbanFormValuesFromOpportunity(opportunity));
    setFormError("");
    setDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setDrawerOpen(false);
    setSelectedDrawerOpportunity(null);
    setFormValues(createEmptyKanbanFormValues());
    setFormError("");
  }

  function handleChangeCustomerId(customerId: string) {
    setFormValues((currentValues) => ({
      ...currentValues,
      customerId,
    }));
  }

  function handleChangeOpportunityForm<
    Key extends keyof CustomerOpportunityFormValues
  >(key: Key, value: CustomerOpportunityFormValues[Key]) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  function handleChangeFilter<Key extends keyof OpportunityKanbanFiltersValues>(
    key: Key,
    value: OpportunityKanbanFiltersValues[Key]
  ) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  function handleClearFilters() {
    setSearchTerm("");
    setFilters({
      customerId: "",
      funnel: "",
      status: "",
      label: "",
    });
  }

  function validateFormValues() {
    const parsedCustomerId = Number(formValues.customerId);
    const parsedValue = parseOpportunityValue(formValues.value);

    if (!formValues.customerId || Number.isNaN(parsedCustomerId)) {
      return "Selecione um cliente.";
    }

    if (!getCustomerById(customers, parsedCustomerId)) {
      return "Selecione um cliente válido.";
    }

    if (!formValues.title.trim()) {
      return "Informe o título da oportunidade.";
    }

    if (!formValues.value.trim() || Number.isNaN(parsedValue)) {
      return "Informe um valor válido para a oportunidade.";
    }

    if (parsedValue < 0) {
      return "O valor da oportunidade não pode ser negativo.";
    }

    if (!isOptionValue(customerOpportunityFunnelOptions, formValues.funnel)) {
      return "Selecione um funil válido.";
    }

    if (!isOptionValue(customerOpportunityStageOptions, formValues.stage)) {
      return "Selecione uma etapa válida.";
    }

    if (!isOptionValue(customerOpportunityStatusOptions, formValues.status)) {
      return "Selecione um status válido.";
    }

    if (!isOptionValue(customerOpportunityLabelOptions, formValues.label)) {
      return "Selecione uma etiqueta válida.";
    }

    return "";
  }

  async function handleSubmitDrawer() {
    const validationError = validateFormValues();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    const parsedCustomerId = Number(formValues.customerId);
    const parsedValue = parseOpportunityValue(formValues.value);
    const now = new Date().toISOString();
    const opportunityPayload = {
      customerId: parsedCustomerId,
      title: formValues.title.trim(),
      funnel: formValues.funnel,
      stage: formValues.stage,
      value: parsedValue,
      status: formValues.status,
      label: formValues.label,
      expectedCloseDate: formValues.expectedCloseDate || undefined,
      details: formValues.details.trim() || undefined,
    };

    try {
      if (drawerMode === "create") {
        await createOpportunity({
          id: createLocalId("opportunity"),
          ...opportunityPayload,
          createdAt: now,
          updatedAt: now,
          closedAt: undefined,
        });
      } else if (selectedDrawerOpportunity) {
        await updateOpportunity(selectedDrawerOpportunity.id, opportunityPayload);
      }

      handleCloseDrawer();
    } catch {
      setFormError("Não foi possível salvar a oportunidade.");
    }
  }

  async function handleDropOpportunityOnStage(
    opportunityId: string,
    targetStage: CustomerOpportunityStage
  ) {
    const opportunity = opportunities.find((currentOpportunity) => {
      return currentOpportunity.id === opportunityId;
    });

    if (!opportunity || opportunity.stage === targetStage) {
      return;
    }

    try {
      await updateOpportunityStage(opportunity.id, targetStage);
    } catch {
      window.alert("Não foi possível mover a oportunidade.");
    }
  }

  async function handleDeleteOpportunity(opportunity: CustomerOpportunity) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta oportunidade? Essa ação não poderá ser desfeita."
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteOpportunity(opportunity.id);
    } catch {
      window.alert("Não foi possível excluir a oportunidade.");
    }
  }

  function renderContent() {
    if (loading) {
      return (
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
          Carregando oportunidades...
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      );
    }

    if (opportunities.length === 0) {
      return (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-600">
          Nenhuma oportunidade cadastrada ainda.
        </div>
      );
    }

    return (
      <>
        {hasActiveFilters && filteredOpportunities.length === 0 ? (
          <div className="rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm font-semibold text-amber-700">
            Nenhuma oportunidade encontrada com os critérios atuais.
          </div>
        ) : null}

        <OpportunityKanbanBoard
          columns={columns}
          customers={customers}
          selectedOpportunityId={selectedOpportunity?.id}
          sourceCustomerId={canReturnToSourceCustomer ? numericCustomerId : null}
          isDeletingOpportunity={isDeletingOpportunity}
          isMovingOpportunity={isUpdatingOpportunityStage}
          onReturnToSourceCustomer={handleReturnToSourceCustomer}
          onEditOpportunity={handleOpenEditDrawer}
          onDeleteOpportunity={handleDeleteOpportunity}
          onDropOpportunityOnStage={handleDropOpportunityOnStage}
        />
      </>
    );
  }

  return (
    <div className="space-y-5">
      <PageTitle
        label="Fase 21"
        title="Funil de oportunidades"
        description="Acompanhe oportunidades por etapa do processo comercial"
      />

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase text-slate-950">
              Visão geral do funil
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredOpportunities.length} oportunidade(s) no funil, somando{" "}
              {formatCurrency(totalValue)}.
            </p>
            {hasActiveFilters ? (
              <p className="mt-1 text-xs font-semibold uppercase text-blue-700">
                Resultados com filtros aplicados.
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <button
              type="button"
              onClick={handleOpenCreateDrawer}
              className="rounded-lg border border-blue-600 !bg-blue-600 px-3 py-2 text-xs font-bold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Criar oportunidade
            </button>
            {hasValidCustomerParam && sourceCustomer ? (
              <>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                  Origem: {sourceCustomerName}
                </span>
                <button
                  type="button"
                  onClick={handleReturnToSourceCustomer}
                  className="rounded-lg border border-blue-600 !bg-blue-600 px-3 py-2 text-xs font-bold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  Voltar para {sourceCustomerName}
                </button>
              </>
            ) : null}
            {hasCustomerParam && !sourceCustomer && !loading ? (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                Cliente de origem não encontrado
              </span>
            ) : null}
            {selectedOpportunity ? (
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Oportunidade aberta a partir do Cliente 360.
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <OpportunityKanbanFilters
        values={filters}
        searchTerm={searchTerm}
        customers={customers}
        hasActiveFilters={hasActiveFilters}
        onChange={handleChangeFilter}
        onSearchTermChange={setSearchTerm}
        onClear={handleClearFilters}
      />

      {oportunidadeId && !loading && !selectedOpportunity ? (
        <div className="rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm font-semibold text-amber-700">
          A oportunidade informada na URL não foi encontrada no funil.
        </div>
      ) : null}

      {renderContent()}

      <OpportunityKanbanDrawer
        isOpen={drawerOpen}
        mode={drawerMode}
        values={formValues}
        customers={customers}
        formError={formError}
        isSubmitting={isSubmittingForm}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmitDrawer}
        onChangeCustomerId={handleChangeCustomerId}
        onChangeOpportunity={handleChangeOpportunityForm}
      />
    </div>
  );
}

export default VendasPage;
