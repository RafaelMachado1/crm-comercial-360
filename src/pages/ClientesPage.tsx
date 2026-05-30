import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import PageTitle from "../components/layout/PageTitle";

import { CustomerFormContent } from "../features/customers/components/CustomerFormContent";
import type { CustomerFormContentValues } from "../features/customers/components/CustomerFormContent";
import { CustomerFormDrawer } from "../features/customers/components/CustomerFormDrawer";
import type { CustomerFormMode } from "../features/customers/components/CustomerFormDrawer";
import { CustomerList } from "../features/customers/components/CustomerList";
import { CustomerPortfolioSidebar } from "../features/customers/components/CustomerPortfolioSidebar";
import { CustomerSearchBar } from "../features/customers/components/CustomerSearchBar";
import {
  brazilianStateOptions,
  customerNetworkOptions,
  customerSegmentOptions,
  customerStatusOptions,
} from "../features/customers/data/customerOptions";
import type {
  CustomerContact,
  ProfessionalCustomer,
} from "../features/customers/types/customer.types";
import {
  adaptCustomersToProfessionalCustomers,
  createCustomerPayloadFromFormValues,
  filterProfessionalCustomers,
  getInitialCustomerListFilters,
  updateCustomerPayloadFromFormValues,
} from "../features/customers/utils/customerAdapters";
import { calculateCustomerPortfolioSummary } from "../features/customers/utils/customerUtils";
import useCustomers from "../hooks/useCustomers";
import type { Customer } from "../types/crm";

function createLocalId(prefix: string) {
  return (
    prefix +
    "-" +
    Date.now() +
    "-" +
    Math.random().toString(36).slice(2, 8)
  );
}

function createEmptyCustomerFormValues(): CustomerFormContentValues {
  return {
    mainData: {
      personType: "legal",
      document: "",
      legalName: "",
      tradeName: "",
      phone: "",
      email: "",
      stateRegistration: "",
      suframa: "",
      segment: "",
      network: "",
      status: "prospect",
      additionalInfo: "",
    },
    mainAddress: {
      zipCode: "",
      street: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
    },
    contacts: [],
  };
}

function createCustomerFormValuesFromProfessionalCustomer(
  customer: ProfessionalCustomer
): CustomerFormContentValues {
  return {
    mainData: {
      personType: customer.personType,
      document: customer.document,
      legalName: customer.legalName,
      tradeName: customer.tradeName || "",
      phone: customer.phone || "",
      email: customer.email || "",
      stateRegistration: customer.stateRegistration || "",
      suframa: customer.suframa || "",
      segment: customer.segment,
      network: customer.network || "",
      status: customer.status,
      additionalInfo: customer.additionalInfo || "",
    },
    mainAddress: {
      zipCode: customer.mainAddress.zipCode,
      street: customer.mainAddress.street,
      number: customer.mainAddress.number,
      complement: customer.mainAddress.complement || "",
      district: customer.mainAddress.district,
      city: customer.mainAddress.city,
      state: customer.mainAddress.state,
    },
    contacts: customer.contacts.map((contact) => ({ ...contact })),
  };
}

function ClientesPage() {
  const navigate = useNavigate();

  const {
    customers,
    loading,
    error,
    loadCustomers,
    createCustomer,
    updateCustomer,
    clearError,
  } = useCustomers();

  const [professionalFilters, setProfessionalFilters] = useState(
    getInitialCustomerListFilters
  );

  const [isCustomerDrawerOpen, setIsCustomerDrawerOpen] = useState(false);
  const [customerDrawerMode, setCustomerDrawerMode] =
    useState<CustomerFormMode>("create");
  const [selectedProfessionalCustomer, setSelectedProfessionalCustomer] =
    useState<ProfessionalCustomer | null>(null);
  const [customerFormValues, setCustomerFormValues] = useState(
    createEmptyCustomerFormValues
  );

  const isSubmittingCustomerForm = loading;

  const professionalCustomers = useMemo(() => {
    return adaptCustomersToProfessionalCustomers(customers);
  }, [customers]);

  const filteredProfessionalCustomers = useMemo(() => {
    return filterProfessionalCustomers(
      professionalCustomers,
      professionalFilters
    );
  }, [professionalCustomers, professionalFilters]);

  const portfolioSummary = useMemo(() => {
    return calculateCustomerPortfolioSummary(professionalCustomers);
  }, [professionalCustomers]);

  function handleCreateCustomer() {
    setSelectedProfessionalCustomer(null);
    setCustomerDrawerMode("create");
    setCustomerFormValues(createEmptyCustomerFormValues());
    setIsCustomerDrawerOpen(true);
  }

  function handleEditCustomer(customer: ProfessionalCustomer) {
    setSelectedProfessionalCustomer(customer);
    setCustomerDrawerMode("edit");
    setCustomerFormValues(createCustomerFormValuesFromProfessionalCustomer(customer));
    setIsCustomerDrawerOpen(true);
  }

  function handleSelectCustomer(customer: ProfessionalCustomer) {
    navigate(`/clientes/${customer.id}`);
  }

  function handleCloseDrawer() {
    setIsCustomerDrawerOpen(false);
    setSelectedProfessionalCustomer(null);
    setCustomerFormValues(createEmptyCustomerFormValues());
  }

  async function handleSubmitCustomerForm() {
    if (customerDrawerMode === "create") {
      try {
        const payload = createCustomerPayloadFromFormValues(customerFormValues);
        const newCustomer: Customer = {
          id: Date.now(),
          ...payload,
        };

        await createCustomer(newCustomer);
        toast.success("Cliente cadastrado com sucesso.");
        handleCloseDrawer();
      } catch {
        toast.error("Não foi possível cadastrar o cliente.");
      }

      return;
    }

    if (!selectedProfessionalCustomer) {
      toast.error("Não foi possível atualizar o cliente.");
      return;
    }

    const currentCustomer = customers.find((customer) => {
      return customer.id === Number(selectedProfessionalCustomer.id);
    });

    if (!currentCustomer) {
      toast.error("Não foi possível atualizar o cliente.");
      return;
    }

    try {
      const updatedCustomer = updateCustomerPayloadFromFormValues(
        currentCustomer,
        customerFormValues
      );

      await updateCustomer(updatedCustomer);
      toast.success("Cliente atualizado com sucesso.");
      handleCloseDrawer();
    } catch {
      toast.error("Não foi possível atualizar o cliente.");
    }
  }

  async function handleSubmitAndCreateAnother() {
    try {
      const payload = createCustomerPayloadFromFormValues(customerFormValues);
      const newCustomer: Customer = {
        id: Date.now(),
        ...payload,
      };

      await createCustomer(newCustomer);
      toast.success("Cliente cadastrado. Você já pode cadastrar outro.");
      setSelectedProfessionalCustomer(null);
      setCustomerDrawerMode("create");
      setCustomerFormValues(createEmptyCustomerFormValues());
      setIsCustomerDrawerOpen(true);
    } catch {
      toast.error("Não foi possível cadastrar o cliente.");
    }
  }

  function handleChangeMainData<
    Key extends keyof CustomerFormContentValues["mainData"]
  >(key: Key, value: CustomerFormContentValues["mainData"][Key]) {
    setCustomerFormValues((currentValues) => ({
      ...currentValues,
      mainData: {
        ...currentValues.mainData,
        [key]: value,
      },
    }));
  }

  function handleChangeAddress<
    Key extends keyof CustomerFormContentValues["mainAddress"]
  >(key: Key, value: CustomerFormContentValues["mainAddress"][Key]) {
    setCustomerFormValues((currentValues) => ({
      ...currentValues,
      mainAddress: {
        ...currentValues.mainAddress,
        [key]: value,
      },
    }));
  }

  function handleChangeContact<Key extends keyof CustomerContact>(
    contactId: string,
    key: Key,
    value: CustomerContact[Key]
  ) {
    setCustomerFormValues((currentValues) => ({
      ...currentValues,
      contacts: currentValues.contacts.map((contact) => {
        if (contact.id !== contactId) {
          return contact;
        }

        return {
          ...contact,
          [key]: value,
        };
      }),
    }));
  }

  function handleAddContact() {
    setCustomerFormValues((currentValues) => ({
      ...currentValues,
      contacts: [
        ...currentValues.contacts,
        {
          id: createLocalId("contact"),
          name: "",
          role: "",
          phone: "",
          email: "",
        },
      ],
    }));
  }

  function handleRemoveContact(contactId: string) {
    setCustomerFormValues((currentValues) => ({
      ...currentValues,
      contacts: currentValues.contacts.filter((contact) => {
        return contact.id !== contactId;
      }),
    }));
  }

  function handleClearProfessionalFilters() {
    setProfessionalFilters(getInitialCustomerListFilters());
  }

  function handlePortfolioDetails() {
    toast.info("O detalhamento da carteira ficará para uma evolução futura.");
  }

  async function handleRetryLoadCustomers() {
    clearError();
    await loadCustomers();
  }

  const drawerTitle =
    customerDrawerMode === "create"
      ? "Cadastrar cliente"
      : "Alterar " + (selectedProfessionalCustomer?.tradeName || "cliente");

  const drawerDescription =
    customerDrawerMode === "create"
      ? "Preencha os dados profissionais do novo cliente."
      : "Revise os dados profissionais antes da integração com a fake API.";

  return (
    <>
      <PageTitle
        label="Fase 12"
        title="Clientes"
        description="Gerencie a carteira com busca profissional, filtros e visão consolidada dos clientes."
      />

      <div className="space-y-5">
        {loading && (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando clientes da carteira...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-sm font-bold text-red-800">
                  Não foi possível carregar os clientes
                </h3>

                <p className="mt-1 text-sm text-red-600">{error}</p>
              </div>

              <button
                type="button"
                onClick={handleRetryLoadCustomers}
                className="h-10 w-full appearance-none rounded-lg border border-red-200 !bg-white px-4 text-sm font-semibold !text-red-700 !shadow-none transition hover:!bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100 md:w-auto"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        <CustomerSearchBar
          filters={professionalFilters}
          statusOptions={customerStatusOptions}
          segmentOptions={customerSegmentOptions}
          stateOptions={brazilianStateOptions}
          onFiltersChange={setProfessionalFilters}
          onClearFilters={handleClearProfessionalFilters}
          onCreateCustomer={handleCreateCustomer}
        />

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
          <CustomerList
            customers={filteredProfessionalCustomers}
            onEdit={handleEditCustomer}
            onSelect={handleSelectCustomer}
          />

          <CustomerPortfolioSidebar
            summary={portfolioSummary}
            monthLabel="Carteira"
            onDetailsClick={handlePortfolioDetails}
          />
        </div>
      </div>

      <CustomerFormDrawer
        isOpen={isCustomerDrawerOpen}
        mode={customerDrawerMode}
        title={drawerTitle}
        description={drawerDescription}
        isSubmitting={isSubmittingCustomerForm}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmitCustomerForm}
        onSubmitAndCreateAnother={
          customerDrawerMode === "create" ? handleSubmitAndCreateAnother : undefined
        }
      >
        <CustomerFormContent
          values={customerFormValues}
          segmentOptions={customerSegmentOptions}
          networkOptions={customerNetworkOptions}
          stateOptions={brazilianStateOptions}
          statusOptions={customerStatusOptions}
          onChangeMainData={handleChangeMainData}
          onChangeAddress={handleChangeAddress}
          onChangeContact={handleChangeContact}
          onAddContact={handleAddContact}
          onRemoveContact={handleRemoveContact}
        />
      </CustomerFormDrawer>
    </>
  );
}

export default ClientesPage;
