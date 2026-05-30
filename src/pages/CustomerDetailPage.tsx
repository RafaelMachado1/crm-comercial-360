import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import PageTitle from "../components/layout/PageTitle";
import { CustomerDetailAddressCard } from "../features/customers/components/CustomerDetailAddressCard";
import { CustomerDetailContactsCard } from "../features/customers/components/CustomerDetailContactsCard";
import { CustomerDetailHeader } from "../features/customers/components/CustomerDetailHeader";
import { CustomerDetailMainDataCard } from "../features/customers/components/CustomerDetailMainDataCard";
import { CustomerDetailPlaceholderSection } from "../features/customers/components/CustomerDetailPlaceholderSection";
import { CustomerFormContent } from "../features/customers/components/CustomerFormContent";
import type { CustomerFormContentValues } from "../features/customers/components/CustomerFormContent";
import { CustomerFormDrawer } from "../features/customers/components/CustomerFormDrawer";
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
  adaptCustomerToProfessionalCustomer,
  updateCustomerPayloadFromFormValues,
} from "../features/customers/utils/customerAdapters";
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

type CustomerDetailStateCardProps = {
  message: string;
};

function CustomerDetailStateCard({ message }: CustomerDetailStateCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700 shadow-sm">
      {message}
    </div>
  );
}

function CustomerDetailPage() {
  const navigate = useNavigate();
  const { clienteId } = useParams<{ clienteId: string }>();
  const { customers, loading, error, updateCustomer } = useCustomers();
  const [isCustomerDrawerOpen, setIsCustomerDrawerOpen] = useState(false);
  const [customerFormValues, setCustomerFormValues] = useState(
    createEmptyCustomerFormValues
  );

  const numericCustomerId = Number(clienteId);
  const isInvalidCustomerId =
    !clienteId || Number.isNaN(numericCustomerId);

  const customer = useMemo(() => {
    if (isInvalidCustomerId) {
      return undefined;
    }

    return customers.find((currentCustomer) => {
      return currentCustomer.id === numericCustomerId;
    });
  }, [customers, isInvalidCustomerId, numericCustomerId]);

  const professionalCustomer = useMemo(() => {
    if (!customer) {
      return undefined;
    }

    return adaptCustomerToProfessionalCustomer(customer);
  }, [customer]);

  function handleBack() {
    navigate("/clientes");
  }

  function handleEdit() {
    if (!professionalCustomer) {
      return;
    }

    setCustomerFormValues(
      createCustomerFormValuesFromProfessionalCustomer(professionalCustomer)
    );
    setIsCustomerDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsCustomerDrawerOpen(false);
    setCustomerFormValues(createEmptyCustomerFormValues());
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

  async function handleSubmitCustomerForm() {
    if (!customer) {
      toast.error("Não foi possível atualizar o cliente.");
      return;
    }

    try {
      const updatedCustomer = updateCustomerPayloadFromFormValues(
        customer,
        customerFormValues
      );

      await updateCustomer(updatedCustomer);
      toast.success("Cliente atualizado com sucesso.");
      handleCloseDrawer();
    } catch {
      toast.error("Não foi possível atualizar o cliente.");
    }
  }

  function renderContent() {
    if (isInvalidCustomerId) {
      return <CustomerDetailStateCard message="Cliente inválido." />;
    }

    if (loading) {
      return (
        <CustomerDetailStateCard message="Carregando dados do cliente..." />
      );
    }

    if (error) {
      return (
        <CustomerDetailStateCard message="Não foi possível carregar os dados do cliente." />
      );
    }

    if (!professionalCustomer) {
      return <CustomerDetailStateCard message="Cliente não encontrado." />;
    }

    return (
      <div className="space-y-5">
        <CustomerDetailHeader
          customer={professionalCustomer}
          onBack={handleBack}
          onEdit={handleEdit}
        />

        <div className="grid gap-5 xl:grid-cols-2">
          <CustomerDetailMainDataCard customer={professionalCustomer} />
          <CustomerDetailAddressCard customer={professionalCustomer} />
        </div>

        <CustomerDetailContactsCard customer={professionalCustomer} />

        <div className="grid gap-5 xl:grid-cols-2">
          <CustomerDetailPlaceholderSection
            title="Tarefas agendadas"
            description="A agenda comercial deste cliente será exibida aqui."
          />

          <CustomerDetailPlaceholderSection
            title="Oportunidades abertas"
            description="As oportunidades comerciais em andamento serão exibidas aqui."
          />

          <CustomerDetailPlaceholderSection
            title="Pedidos e atividades"
            description="Os pedidos e registros de relacionamento serão exibidos aqui."
          />

          <CustomerDetailPlaceholderSection
            title="Histórico comercial"
            description="O histórico consolidado do cliente será exibido aqui."
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTitle
        label="Fase 13"
        title="Detalhe do cliente"
        description="Consulte os dados profissionais e acompanhe a evolução comercial do cliente."
      />

      {renderContent()}

      <CustomerFormDrawer
        isOpen={isCustomerDrawerOpen}
        mode="edit"
        title={
          "Alterar " +
          (professionalCustomer?.tradeName ||
            professionalCustomer?.legalName ||
            "cliente")
        }
        description="Atualize os dados profissionais deste cliente."
        isSubmitting={loading}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmitCustomerForm}
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

export default CustomerDetailPage;
