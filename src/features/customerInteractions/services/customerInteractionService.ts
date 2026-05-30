import type {
  CustomerActivity,
  CustomerTask,
} from "../types/customerInteraction.types";
import {
  atualizarAtividadeFake,
  atualizarTarefaFake,
  buscarAtividadesPorClienteFake,
  buscarTarefasPorClienteFake,
  concluirTarefaFake,
  criarTarefaFake,
  registrarAtividadeFake,
} from "./customerInteractionFakeApi";

export async function getCustomerTasks(
  customerId: number
): Promise<CustomerTask[]> {
  return buscarTarefasPorClienteFake(customerId);
}

export async function createCustomerTask(
  task: CustomerTask
): Promise<CustomerTask[]> {
  return criarTarefaFake(task);
}

export async function updateCustomerTask(
  task: CustomerTask
): Promise<CustomerTask[]> {
  return atualizarTarefaFake(task);
}

export async function completeCustomerTask(
  taskId: string
): Promise<CustomerTask[]> {
  return concluirTarefaFake(taskId);
}

export async function getCustomerActivities(
  customerId: number
): Promise<CustomerActivity[]> {
  return buscarAtividadesPorClienteFake(customerId);
}

export async function createCustomerActivity(
  activity: CustomerActivity
): Promise<CustomerActivity[]> {
  return registrarAtividadeFake(activity);
}

export async function updateCustomerActivity(
  activity: CustomerActivity
): Promise<CustomerActivity[]> {
  return atualizarAtividadeFake(activity);
}
