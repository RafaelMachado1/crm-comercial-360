import {
  mockCustomerActivities,
  mockCustomerTasks,
} from "../data/customerInteractionMockData";
import type {
  CustomerActivity,
  CustomerTask,
} from "../types/customerInteraction.types";
import {
  getStorageItem,
  setStorageItem,
} from "../../../utils/localStorage";

const CUSTOMER_TASKS_STORAGE_KEY = "crm-customer-tasks";
const CUSTOMER_ACTIVITIES_STORAGE_KEY = "crm-customer-activities";

function esperar(ms = 300): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function buscarTodasTarefas(): CustomerTask[] {
  const tarefasSalvas = getStorageItem<CustomerTask[] | null>(
    CUSTOMER_TASKS_STORAGE_KEY,
    null
  );

  if (tarefasSalvas) {
    return tarefasSalvas;
  }

  setStorageItem(CUSTOMER_TASKS_STORAGE_KEY, mockCustomerTasks);

  return mockCustomerTasks;
}

function buscarTodasAtividades(): CustomerActivity[] {
  const atividadesSalvas = getStorageItem<CustomerActivity[] | null>(
    CUSTOMER_ACTIVITIES_STORAGE_KEY,
    null
  );

  if (atividadesSalvas) {
    return atividadesSalvas;
  }

  setStorageItem(CUSTOMER_ACTIVITIES_STORAGE_KEY, mockCustomerActivities);

  return mockCustomerActivities;
}

export async function buscarTarefasPorClienteFake(
  customerId: number
): Promise<CustomerTask[]> {
  await esperar();

  return buscarTodasTarefas().filter((task) => {
    return task.customerId === customerId;
  });
}

export async function criarTarefaFake(
  task: CustomerTask
): Promise<CustomerTask[]> {
  await esperar();

  const tarefasAtualizadas = [...buscarTodasTarefas(), task];

  setStorageItem(CUSTOMER_TASKS_STORAGE_KEY, tarefasAtualizadas);

  return tarefasAtualizadas;
}

export async function atualizarTarefaFake(
  task: CustomerTask
): Promise<CustomerTask[]> {
  await esperar();

  const tarefasAtualizadas = buscarTodasTarefas().map((currentTask) => {
    if (currentTask.id === task.id) {
      return task;
    }

    return currentTask;
  });

  setStorageItem(CUSTOMER_TASKS_STORAGE_KEY, tarefasAtualizadas);

  return tarefasAtualizadas;
}

export async function concluirTarefaFake(
  taskId: string
): Promise<CustomerTask[]> {
  await esperar();

  const completedAt = new Date().toISOString();
  const tarefasAtualizadas = buscarTodasTarefas().map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      status: "concluida" as const,
      completedAt,
      updatedAt: completedAt,
    };
  });

  setStorageItem(CUSTOMER_TASKS_STORAGE_KEY, tarefasAtualizadas);

  return tarefasAtualizadas;
}

export async function buscarAtividadesPorClienteFake(
  customerId: number
): Promise<CustomerActivity[]> {
  await esperar();

  return buscarTodasAtividades().filter((activity) => {
    return activity.customerId === customerId;
  });
}

export async function registrarAtividadeFake(
  activity: CustomerActivity
): Promise<CustomerActivity[]> {
  await esperar();

  const atividadesAtualizadas = [...buscarTodasAtividades(), activity];

  setStorageItem(CUSTOMER_ACTIVITIES_STORAGE_KEY, atividadesAtualizadas);

  return atividadesAtualizadas;
}

export async function atualizarAtividadeFake(
  activity: CustomerActivity
): Promise<CustomerActivity[]> {
  await esperar();

  const atividadesAtualizadas = buscarTodasAtividades().map(
    (currentActivity) => {
      if (currentActivity.id === activity.id) {
        return activity;
      }

      return currentActivity;
    }
  );

  setStorageItem(CUSTOMER_ACTIVITIES_STORAGE_KEY, atividadesAtualizadas);

  return atividadesAtualizadas;
}
