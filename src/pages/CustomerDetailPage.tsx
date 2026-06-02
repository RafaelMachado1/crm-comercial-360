import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import PageTitle from "../components/layout/PageTitle";
import { CustomerCommercialHistoryCard } from "../features/customerHistory/components/CustomerCommercialHistoryCard";
import { buildCustomerHistoryEvents } from "../features/customerHistory/utils/customerHistoryBuilders";
import { CustomerActivityDrawer } from "../features/customerInteractions/components/CustomerActivityDrawer";
import { CustomerActivitiesCard } from "../features/customerInteractions/components/CustomerActivitiesCard";
import { CustomerTaskDrawer } from "../features/customerInteractions/components/CustomerTaskDrawer";
import { CustomerTasksCard } from "../features/customerInteractions/components/CustomerTasksCard";
import { useCustomerInteractions } from "../features/customerInteractions/hooks/useCustomerInteractions";
import type {
  CustomerActivity,
  CustomerActivityFormValues,
  CustomerTask,
  CustomerTaskFormValues,
} from "../features/customerInteractions/types/customerInteraction.types";
import { CustomerOpportunitiesCard } from "../features/customerOpportunities/components/CustomerOpportunitiesCard";
import { CustomerOpportunityDrawer } from "../features/customerOpportunities/components/CustomerOpportunityDrawer";
import { useCustomerOpportunities } from "../features/customerOpportunities/hooks/useCustomerOpportunities";
import type {
  CustomerOpportunity,
  CustomerOpportunityFormValues,
} from "../features/customerOpportunities/types/customerOpportunity.types";
import { CustomerDetailAddressCard } from "../features/customers/components/CustomerDetailAddressCard";
import { CustomerDetailContactsCard } from "../features/customers/components/CustomerDetailContactsCard";
import { CustomerDetailHeader } from "../features/customers/components/CustomerDetailHeader";
import { CustomerDetailMainDataCard } from "../features/customers/components/CustomerDetailMainDataCard";
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

function createEmptyTaskFormValues(): CustomerTaskFormValues {
  return {
    title: "",
    dueDate: "",
    dueTime: "",
    channel: "telefone",
    details: "",
    status: "pendente",
  };
}

function createEmptyActivityFormValues(): CustomerActivityFormValues {
  return {
    type: "ligacao",
    date: "",
    time: "",
    channel: "telefone",
    result: "positivo",
    details: "",
  };
}

function createEmptyOpportunityFormValues(): CustomerOpportunityFormValues {
  return {
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

function createActivityFormValuesFromActivity(
  activity: CustomerActivity
): CustomerActivityFormValues {
  return {
    type: activity.type,
    date: activity.date,
    time: activity.time,
    channel: activity.channel,
    result: activity.result,
    details: activity.details || "",
  };
}

function createTaskFormValuesFromTask(
  task: CustomerTask
): CustomerTaskFormValues {
  return {
    title: task.title,
    dueDate: task.dueDate,
    dueTime: task.dueTime,
    channel: task.channel,
    details: task.details || "",
    status: task.status,
  };
}

function createOpportunityFormValuesFromOpportunity(
  opportunity: CustomerOpportunity
): CustomerOpportunityFormValues {
  return {
    title: opportunity.title,
    funnel: opportunity.funnel,
    stage: opportunity.stage,
    value: String(opportunity.value),
    status: opportunity.status,
    label: opportunity.label,
    expectedCloseDate: opportunity.expectedCloseDate || "",
    details: opportunity.details || "",
  };
}

function parseOpportunityValue(value: string): number {
  return Number(value.replace(/\s/g, "").replace(",", "."));
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
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false);
  const [taskDrawerMode, setTaskDrawerMode] = useState<"create" | "edit">(
    "create"
  );
  const [selectedTask, setSelectedTask] = useState<CustomerTask | null>(null);
  const [taskFormValues, setTaskFormValues] = useState(
    createEmptyTaskFormValues
  );
  const [activityDrawerOpen, setActivityDrawerOpen] = useState(false);
  const [activityDrawerMode, setActivityDrawerMode] = useState<
    "create" | "edit"
  >("create");
  const [selectedActivity, setSelectedActivity] =
    useState<CustomerActivity | null>(null);
  const [activityFormValues, setActivityFormValues] = useState(
    createEmptyActivityFormValues
  );
  const [opportunityDrawerOpen, setOpportunityDrawerOpen] = useState(false);
  const [opportunityDrawerMode, setOpportunityDrawerMode] = useState<
    "create" | "edit"
  >("create");
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<CustomerOpportunity | null>(null);
  const [opportunityFormValues, setOpportunityFormValues] = useState(
    createEmptyOpportunityFormValues
  );

  const numericCustomerId = Number(clienteId);
  const isInvalidCustomerId =
    !clienteId || Number.isNaN(numericCustomerId);
  const {
    tasks,
    activities,
    tasksLoading,
    activitiesLoading,
    createTask,
    updateTask,
    completeTask,
    createActivity,
    updateActivity,
    isCreatingTask,
    isUpdatingTask,
    isCreatingActivity,
    isUpdatingActivity,
  } = useCustomerInteractions(numericCustomerId);
  const {
    opportunities,
    opportunitiesLoading,
    createOpportunity,
    updateOpportunity,
    isCreatingOpportunity,
    isUpdatingOpportunity,
  } = useCustomerOpportunities(numericCustomerId);

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

  const commercialHistoryEvents = useMemo(() => {
    return buildCustomerHistoryEvents({
      tasks,
      activities,
      opportunities,
    });
  }, [tasks, activities, opportunities]);

  const commercialHistoryLoading =
    tasksLoading || activitiesLoading || opportunitiesLoading;

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

  function handleCreateTask() {
    setSelectedTask(null);
    setTaskDrawerMode("create");
    setTaskFormValues(createEmptyTaskFormValues());
    setTaskDrawerOpen(true);
  }

  function handleEditTask(task: CustomerTask) {
    setSelectedTask(task);
    setTaskDrawerMode("edit");
    setTaskFormValues(createTaskFormValuesFromTask(task));
    setTaskDrawerOpen(true);
  }

  function handleCloseTaskDrawer() {
    setTaskDrawerOpen(false);
    setSelectedTask(null);
    setTaskFormValues(createEmptyTaskFormValues());
  }

  function handleChangeTaskForm<Key extends keyof CustomerTaskFormValues>(
    key: Key,
    value: CustomerTaskFormValues[Key]
  ) {
    setTaskFormValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  async function handleSubmitTask() {
    if (!taskFormValues.title.trim()) {
      toast.error("Informe o título da tarefa.");
      return;
    }

    try {
      const updatedAt = new Date().toISOString();

      if (taskDrawerMode === "create") {
        const newTask: CustomerTask = {
          id: createLocalId("task"),
          customerId: numericCustomerId,
          ...taskFormValues,
          createdAt: updatedAt,
          updatedAt,
        };

        await createTask(newTask);
        toast.success("Tarefa criada com sucesso.");
      } else {
        if (!selectedTask) {
          toast.error("Não foi possível salvar a tarefa.");
          return;
        }

        const updatedTask: CustomerTask = {
          ...selectedTask,
          ...taskFormValues,
          updatedAt,
        };

        await updateTask(updatedTask);
        toast.success("Tarefa atualizada com sucesso.");
      }

      handleCloseTaskDrawer();
    } catch {
      toast.error("Não foi possível salvar a tarefa.");
    }
  }

  async function handleCompleteTask(taskId: string) {
    try {
      await completeTask(taskId);
      toast.success("Tarefa marcada como realizada.");
    } catch {
      toast.error("Não foi possível concluir a tarefa.");
    }
  }

  function handleCreateActivity() {
    setSelectedActivity(null);
    setActivityDrawerMode("create");
    setActivityFormValues(createEmptyActivityFormValues());
    setActivityDrawerOpen(true);
  }

  function handleEditActivity(activity: CustomerActivity) {
    setSelectedActivity(activity);
    setActivityDrawerMode("edit");
    setActivityFormValues(createActivityFormValuesFromActivity(activity));
    setActivityDrawerOpen(true);
  }

  function handleCloseActivityDrawer() {
    setActivityDrawerOpen(false);
    setSelectedActivity(null);
    setActivityFormValues(createEmptyActivityFormValues());
  }

  function handleChangeActivityForm<
    Key extends keyof CustomerActivityFormValues
  >(key: Key, value: CustomerActivityFormValues[Key]) {
    setActivityFormValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  async function handleSubmitActivity() {
    if (!activityFormValues.date) {
      toast.error("Informe a data da atividade.");
      return;
    }

    if (!activityFormValues.time) {
      toast.error("Informe a hora da atividade.");
      return;
    }

    try {
      if (activityDrawerMode === "create") {
        const newActivity: CustomerActivity = {
          id: createLocalId("activity"),
          customerId: numericCustomerId,
          ...activityFormValues,
          createdAt: new Date().toISOString(),
        };

        await createActivity(newActivity);
        toast.success("Atividade registrada com sucesso.");
      } else {
        if (!selectedActivity) {
          toast.error("Não foi possível salvar a atividade.");
          return;
        }

        const updatedActivity: CustomerActivity = {
          ...selectedActivity,
          ...activityFormValues,
        };

        await updateActivity(updatedActivity);
        toast.success("Atividade atualizada com sucesso.");
      }

      handleCloseActivityDrawer();
    } catch {
      toast.error("Não foi possível salvar a atividade.");
    }
  }

  function handleCreateOpportunity() {
    setSelectedOpportunity(null);
    setOpportunityDrawerMode("create");
    setOpportunityFormValues(createEmptyOpportunityFormValues());
    setOpportunityDrawerOpen(true);
  }

  function handleEditOpportunity(opportunity: CustomerOpportunity) {
    setSelectedOpportunity(opportunity);
    setOpportunityDrawerMode("edit");
    setOpportunityFormValues(
      createOpportunityFormValuesFromOpportunity(opportunity)
    );
    setOpportunityDrawerOpen(true);
  }

  function handleCloseOpportunityDrawer() {
    setOpportunityDrawerOpen(false);
    setSelectedOpportunity(null);
    setOpportunityFormValues(createEmptyOpportunityFormValues());
  }

  function handleChangeOpportunityForm<
    Key extends keyof CustomerOpportunityFormValues
  >(key: Key, value: CustomerOpportunityFormValues[Key]) {
    setOpportunityFormValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  async function handleSubmitOpportunity() {
    if (!opportunityFormValues.title.trim()) {
      toast.error("Informe o título da oportunidade.");
      return;
    }

    const parsedValue = parseOpportunityValue(opportunityFormValues.value);

    if (!opportunityFormValues.value.trim() || Number.isNaN(parsedValue)) {
      toast.error("Informe um valor válido para a oportunidade.");
      return;
    }

    try {
      const updatedAt = new Date().toISOString();

      if (opportunityDrawerMode === "create") {
        const newOpportunity: CustomerOpportunity = {
          id: createLocalId("opportunity"),
          customerId: numericCustomerId,
          title: opportunityFormValues.title,
          funnel: opportunityFormValues.funnel,
          stage: opportunityFormValues.stage,
          value: parsedValue,
          status: opportunityFormValues.status,
          label: opportunityFormValues.label,
          expectedCloseDate:
            opportunityFormValues.expectedCloseDate || undefined,
          details: opportunityFormValues.details || undefined,
          createdAt: updatedAt,
          updatedAt,
          closedAt: undefined,
        };

        await createOpportunity(newOpportunity);
        toast.success("Oportunidade criada com sucesso.");
      } else {
        if (!selectedOpportunity) {
          toast.error("Não foi possível salvar a oportunidade.");
          return;
        }

        const updatedOpportunity: CustomerOpportunity = {
          ...selectedOpportunity,
          title: opportunityFormValues.title,
          funnel: opportunityFormValues.funnel,
          stage: opportunityFormValues.stage,
          value: parsedValue,
          status: opportunityFormValues.status,
          label: opportunityFormValues.label,
          expectedCloseDate:
            opportunityFormValues.expectedCloseDate || undefined,
          details: opportunityFormValues.details || undefined,
          updatedAt,
        };

        await updateOpportunity(updatedOpportunity);
        toast.success("Oportunidade atualizada com sucesso.");
      }

      handleCloseOpportunityDrawer();
    } catch {
      toast.error("Não foi possível salvar a oportunidade.");
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
          <CustomerTasksCard
            tasks={tasks}
            loading={tasksLoading}
            onCreateTask={handleCreateTask}
            onEditTask={handleEditTask}
            onCompleteTask={handleCompleteTask}
          />

          <CustomerOpportunitiesCard
            opportunities={opportunities}
            loading={opportunitiesLoading}
            onCreateOpportunity={handleCreateOpportunity}
            onEditOpportunity={handleEditOpportunity}
          />

          <CustomerActivitiesCard
            activities={activities}
            loading={activitiesLoading}
            onCreateActivity={handleCreateActivity}
            onEditActivity={handleEditActivity}
          />

          <CustomerCommercialHistoryCard
            events={commercialHistoryEvents}
            loading={commercialHistoryLoading}
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

      <CustomerTaskDrawer
        isOpen={taskDrawerOpen}
        mode={taskDrawerMode}
        values={taskFormValues}
        isSubmitting={isCreatingTask || isUpdatingTask}
        onClose={handleCloseTaskDrawer}
        onSubmit={handleSubmitTask}
        onChange={handleChangeTaskForm}
      />

      <CustomerActivityDrawer
        isOpen={activityDrawerOpen}
        mode={activityDrawerMode}
        values={activityFormValues}
        isSubmitting={isCreatingActivity || isUpdatingActivity}
        onClose={handleCloseActivityDrawer}
        onSubmit={handleSubmitActivity}
        onChange={handleChangeActivityForm}
      />

      <CustomerOpportunityDrawer
        isOpen={opportunityDrawerOpen}
        mode={opportunityDrawerMode}
        values={opportunityFormValues}
        isSubmitting={isCreatingOpportunity || isUpdatingOpportunity}
        onClose={handleCloseOpportunityDrawer}
        onSubmit={handleSubmitOpportunity}
        onChange={handleChangeOpportunityForm}
      />
    </>
  );
}

export default CustomerDetailPage;
