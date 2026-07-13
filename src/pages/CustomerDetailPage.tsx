import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { CustomerActivityDrawer } from "../features/customerInteractions/components/CustomerActivityDrawer";
import { CustomerTaskAgendaDrawer } from "../features/customerInteractions/components/CustomerTaskAgendaDrawer";
import type { CustomerTaskAgendaValues } from "../features/customerInteractions/components/CustomerTaskAgendaDrawer";
import { CustomerTasksPanel } from "../features/customerInteractions/components/CustomerTasksPanel";
import { getInteractionChannelLabel } from "../features/customerInteractions/data/customerInteractionOptions";
import { useCustomerInteractions } from "../features/customerInteractions/hooks/useCustomerInteractions";
import type {
  CustomerActivity,
  CustomerActivityFormValues,
  CustomerActivityResult,
  CustomerActivityType,
  CustomerTask,
  InteractionChannel,
} from "../features/customerInteractions/types/customerInteraction.types";
import { useCustomerInvoices } from "../features/customerInvoices/hooks/useCustomerInvoices";
import { useAllCustomerOrders } from "../features/customerOrders/hooks/useAllCustomerOrders";
import { useCustomerOrders } from "../features/customerOrders/hooks/useCustomerOrders";
import type { CustomerOrder } from "../features/customerOrders/types/customerOrder.types";
import { CustomerOpportunityDrawer } from "../features/customerOpportunities/components/CustomerOpportunityDrawer";
import { CustomerOpportunitiesSection } from "../features/customerOpportunities/components/CustomerOpportunitiesSection";
import { useCustomerOpportunities } from "../features/customerOpportunities/hooks/useCustomerOpportunities";
import type {
  CustomerOpportunity,
  CustomerOpportunityFormValues,
} from "../features/customerOpportunities/types/customerOpportunity.types";
import { Customer360Header } from "../features/customers/components/Customer360Header";
import { CustomerInvoicesSection } from "../features/customers/components/CustomerInvoicesSection";
import { CustomerOrdersActivitiesSection } from "../features/customers/components/CustomerOrdersActivitiesSection";
import { CustomerSummarySidebar } from "../features/customers/components/CustomerSummarySidebar";
import { CustomerTopProductsSection } from "../features/customers/components/CustomerTopProductsSection";
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
import { buildCustomerSummaryMetrics } from "../features/customers/utils/customerSummaryMetrics";
import { buildCustomerTopProducts } from "../features/customers/utils/customerTopProducts";
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

function createEmptyTaskAgendaValues(): CustomerTaskAgendaValues {
  return {
    dueDate: "",
    dueTime: "",
    channel: "telefone",
    details: "",
    completed: false,
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

function createTaskAgendaValuesFromTask(
  task: CustomerTask
): CustomerTaskAgendaValues {
  return {
    dueDate: task.dueDate,
    dueTime: task.dueTime,
    channel: task.channel,
    details: task.details || "",
    completed: task.status === "concluida",
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

function parseOpportunityValue(value: string): number {
  return Number(value.replace(/\s/g, "").replace(",", "."));
}

function formatDateInputValue(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatTimeInputValue(date: Date): string {
  return date.toTimeString().slice(0, 5);
}

function mapTaskChannelToActivityType(
  channel: InteractionChannel
): CustomerActivityType {
  if (channel === "telefone") {
    return "ligacao";
  }

  if (channel === "skype") {
    return "reuniao";
  }

  if (channel === "outro") {
    return "observacao";
  }

  return channel;
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
  const [isFullProfileOpen, setIsFullProfileOpen] = useState(false);
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
    createEmptyTaskAgendaValues
  );
  const [opportunityDrawerOpen, setOpportunityDrawerOpen] = useState(false);
  const [opportunityFormValues, setOpportunityFormValues] = useState(
    createEmptyOpportunityFormValues
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
  const numericCustomerId = Number(clienteId);
  const isInvalidCustomerId = !clienteId || Number.isNaN(numericCustomerId);
  const {
    tasks,
    activities,
    tasksLoading,
    activitiesLoading,
    createTask,
    updateTask,
    completeTask,
    deleteTask,
    createActivity,
    updateActivity,
    deleteActivity,
    isCreatingTask,
    isUpdatingTask,
    isCompletingTask,
    isDeletingTask,
    isCreatingActivity,
    isUpdatingActivity,
    isDeletingActivity,
  } = useCustomerInteractions(numericCustomerId);

  const {
    opportunities,
    opportunitiesLoading,
    createOpportunity,
    deleteOpportunity,
    isCreatingOpportunity,
    isDeletingOpportunity,
  } = useCustomerOpportunities(numericCustomerId);

  const {
    orders,
    ordersLoading,
  } = useCustomerOrders(numericCustomerId);

  const {
    orders: allOrders,
    isLoading: allOrdersLoading,
  } = useAllCustomerOrders();

  const {
    invoices,
    invoicesLoading,
  } = useCustomerInvoices(numericCustomerId);

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

  const openOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      return opportunity.status === "aberta";
    });
  }, [opportunities]);

  const topProducts = useMemo(() => {
    return buildCustomerTopProducts(orders);
  }, [orders]);

  const summaryMetrics = useMemo(() => {
    return buildCustomerSummaryMetrics({
      customerId: numericCustomerId,
      customerOrders: orders,
      allOrders,
    });
  }, [allOrders, numericCustomerId, orders]);

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
    setTaskFormValues(createEmptyTaskAgendaValues());
    setTaskDrawerOpen(true);
  }

  function handleEditTask(task: CustomerTask) {
    setSelectedTask(task);
    setTaskDrawerMode("edit");
    setTaskFormValues(createTaskAgendaValuesFromTask(task));
    setTaskDrawerOpen(true);
  }

  function handleCloseTaskDrawer() {
    setTaskDrawerOpen(false);
    setSelectedTask(null);
    setTaskFormValues(createEmptyTaskAgendaValues());
  }

  function handleChangeTaskForm<Key extends keyof CustomerTaskAgendaValues>(
    key: Key,
    value: CustomerTaskAgendaValues[Key]
  ) {
    setTaskFormValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  async function handleSubmitTask() {
    if (!taskFormValues.dueDate) {
      toast.error("Informe a data da tarefa.");
      return;
    }

    if (!taskFormValues.dueTime) {
      toast.error("Informe a hora da tarefa.");
      return;
    }

    try {
      const updatedAt = new Date().toISOString();
      const taskTitle = getInteractionChannelLabel(taskFormValues.channel);

      if (taskDrawerMode === "create") {
        const newTask: CustomerTask = {
          id: createLocalId("task"),
          customerId: numericCustomerId,
          title: taskTitle,
          dueDate: taskFormValues.dueDate,
          dueTime: taskFormValues.dueTime,
          channel: taskFormValues.channel,
          details: taskFormValues.details.trim() || undefined,
          status: "pendente",
          createdAt: updatedAt,
          updatedAt,
        };

        await createTask(newTask);
        toast.success("Tarefa criada com sucesso.");
        handleCloseTaskDrawer();
        return;
      }

      if (!selectedTask) {
        toast.error("Não foi possível salvar a tarefa.");
        return;
      }

      const updatedTask: CustomerTask = {
        ...selectedTask,
        title: taskTitle,
        dueDate: taskFormValues.dueDate,
        dueTime: taskFormValues.dueTime,
        channel: taskFormValues.channel,
        details: taskFormValues.details.trim() || undefined,
        status: taskFormValues.completed ? "concluida" : "pendente",
        completedAt: taskFormValues.completed
          ? selectedTask.completedAt || updatedAt
          : undefined,
        updatedAt,
      };

      await updateTask(updatedTask);
      toast.success("Tarefa atualizada com sucesso.");
      handleCloseTaskDrawer();
    } catch {
      toast.error("Não foi possível salvar a tarefa.");
    }
  }

  async function handleDeleteTask() {
    if (!selectedTask) {
      toast.error("Não foi possível excluir a tarefa.");
      return;
    }

    try {
      await deleteTask(selectedTask.id);
      toast.success("Tarefa excluída com sucesso.");
      handleCloseTaskDrawer();
    } catch {
      toast.error("Não foi possível excluir a tarefa.");
    }
  }

  async function handleCompleteTask(
    task: CustomerTask,
    result: CustomerActivityResult,
    details: string
  ) {
    try {
      const now = new Date();
      const activityDetails = [
        "Tarefa concluída: " + getInteractionChannelLabel(task.channel),
        details.trim() || task.details,
      ]
        .filter(Boolean)
        .join("\n");
      const newActivity: CustomerActivity = {
        id: createLocalId("activity"),
        customerId: numericCustomerId,
        type: mapTaskChannelToActivityType(task.channel),
        date: formatDateInputValue(now),
        time: formatTimeInputValue(now),
        channel: task.channel,
        result,
        details: activityDetails || undefined,
        createdAt: now.toISOString(),
      };

      await createActivity(newActivity);
      await completeTask(task.id);
      toast.success("Tarefa concluída com sucesso.");
    } catch {
      toast.error("Não foi possível concluir a tarefa.");
    }
  }

  function handleCreateOpportunity() {
    setOpportunityFormValues(createEmptyOpportunityFormValues());
    setOpportunityDrawerOpen(true);
  }

  function handleCloseOpportunityDrawer() {
    setOpportunityDrawerOpen(false);
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
      const newOpportunity: CustomerOpportunity = {
        id: createLocalId("opportunity"),
        customerId: numericCustomerId,
        title: opportunityFormValues.title.trim(),
        funnel: opportunityFormValues.funnel,
        stage: opportunityFormValues.stage,
        value: parsedValue,
        status: opportunityFormValues.status,
        label: opportunityFormValues.label,
        expectedCloseDate:
          opportunityFormValues.expectedCloseDate || undefined,
        details: opportunityFormValues.details.trim() || undefined,
        createdAt: updatedAt,
        updatedAt,
        closedAt: undefined,
      };

      await createOpportunity(newOpportunity);
      toast.success("Oportunidade criada com sucesso.");
      handleCloseOpportunityDrawer();
    } catch {
      toast.error("Não foi possível criar a oportunidade.");
    }
  }

  async function handleDeleteOpportunity(opportunity: CustomerOpportunity) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta oportunidade? Essa ação também removerá a oportunidade do funil."
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteOpportunity(opportunity.id);
      toast.success("Oportunidade excluída com sucesso.");
    } catch {
      toast.error("Não foi possível excluir a oportunidade.");
    }
  }

  function handleOpenOpportunity(opportunity: CustomerOpportunity) {
    navigate(
      "/vendas?clienteId=" +
        numericCustomerId +
        "&oportunidadeId=" +
        opportunity.id
    );
  }

  function handleCreateOrder() {
    navigate("/pedidos/novo?clienteId=" + numericCustomerId);
  }

  function handleOpenOrder(order: CustomerOrder) {
    navigate("/pedidos/" + order.id);
  }

  function handleOpenInvoiceOrder(orderId: string) {
    navigate("/pedidos/" + orderId);
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
          type: activityFormValues.type,
          date: activityFormValues.date,
          time: activityFormValues.time,
          channel: activityFormValues.channel,
          result: activityFormValues.result,
          details: activityFormValues.details.trim() || undefined,
          createdAt: new Date().toISOString(),
        };

        await createActivity(newActivity);
        toast.success("Atividade registrada com sucesso.");
        handleCloseActivityDrawer();
        return;
      }

      if (!selectedActivity) {
        toast.error("Não foi possível salvar a atividade.");
        return;
      }

      const updatedActivity: CustomerActivity = {
        ...selectedActivity,
        type: activityFormValues.type,
        date: activityFormValues.date,
        time: activityFormValues.time,
        channel: activityFormValues.channel,
        result: activityFormValues.result,
        details: activityFormValues.details.trim() || undefined,
      };

      await updateActivity(updatedActivity);
      toast.success("Atividade atualizada com sucesso.");
      handleCloseActivityDrawer();
    } catch {
      toast.error("Não foi possível salvar a atividade.");
    }
  }

  async function handleDeleteActivity() {
    if (!selectedActivity) {
      toast.error("Não foi possível excluir a atividade.");
      return;
    }

    try {
      await deleteActivity(selectedActivity.id);
      toast.success("Atividade excluída com sucesso.");
      handleCloseActivityDrawer();
    } catch {
      toast.error("Não foi possível excluir a atividade.");
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
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="space-y-5">
            <Customer360Header
              customer={professionalCustomer}
              onBack={handleBack}
              onEditCustomer={handleEdit}
              isFullProfileOpen={isFullProfileOpen}
              onToggleFullProfile={() =>
                setIsFullProfileOpen((isOpen) => !isOpen)
              }
            />

            <CustomerTasksPanel
              tasks={tasks}
              loading={tasksLoading}
              isCompleting={isCompletingTask || isCreatingActivity}
              onCreateTask={handleCreateTask}
              onEditTask={handleEditTask}
              onCompleteTask={handleCompleteTask}
            />

            <CustomerOpportunitiesSection
              opportunities={openOpportunities}
              loading={opportunitiesLoading}
              isDeletingOpportunity={isDeletingOpportunity}
              onCreateOpportunity={handleCreateOpportunity}
              onOpenOpportunity={handleOpenOpportunity}
              onDeleteOpportunity={handleDeleteOpportunity}
            />

            <CustomerOrdersActivitiesSection
              orders={orders}
              activities={activities}
              loading={ordersLoading || activitiesLoading}
              onCreateOrder={handleCreateOrder}
              onCreateActivity={handleCreateActivity}
              onOpenOrder={handleOpenOrder}
              onEditActivity={handleEditActivity}
            />
          </div>

          <CustomerSummarySidebar
            metrics={summaryMetrics}
            customer={professionalCustomer}
            customerId={numericCustomerId}
            loading={ordersLoading || allOrdersLoading}
            onOpenOrder={handleOpenInvoiceOrder}
          />
        </div>

        <CustomerInvoicesSection
          invoices={invoices}
          loading={invoicesLoading}
          onOpenOrder={handleOpenInvoiceOrder}
        />

        <CustomerTopProductsSection
          products={topProducts}
          loading={ordersLoading}
        />
      </div>
    );
  }

  return (
    <>
      {renderContent()}

      <CustomerTaskAgendaDrawer
        isOpen={taskDrawerOpen}
        mode={taskDrawerMode}
        values={taskFormValues}
        isSubmitting={isCreatingTask || isUpdatingTask || isDeletingTask}
        canDelete={taskDrawerMode === "edit"}
        onClose={handleCloseTaskDrawer}
        onSubmit={handleSubmitTask}
        onDelete={handleDeleteTask}
        onChange={handleChangeTaskForm}
      />

      <CustomerOpportunityDrawer
        isOpen={opportunityDrawerOpen}
        mode="create"
        values={opportunityFormValues}
        isSubmitting={isCreatingOpportunity}
        onClose={handleCloseOpportunityDrawer}
        onSubmit={handleSubmitOpportunity}
        onChange={handleChangeOpportunityForm}
      />

      <CustomerActivityDrawer
        isOpen={activityDrawerOpen}
        mode={activityDrawerMode}
        values={activityFormValues}
        isSubmitting={
          isCreatingActivity || isUpdatingActivity || isDeletingActivity
        }
        canDelete={activityDrawerMode === "edit"}
        onClose={handleCloseActivityDrawer}
        onSubmit={handleSubmitActivity}
        onDelete={handleDeleteActivity}
        onChange={handleChangeActivityForm}
      />

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
