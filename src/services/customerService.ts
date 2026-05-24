import { clientes as clientesMock } from "../data/mockData";

import {
  atualizarClienteFake,
  buscarClientesFake,
  criarClienteFake,
  excluirClienteFake,
} from "./clientesFakeApi";

import type { Customer } from "../types/crm";

export async function getCustomers(): Promise<Customer[]> {
  return buscarClientesFake(clientesMock);
}

export async function createCustomer(customer: Customer): Promise<Customer[]> {
  const currentCustomers = await getCustomers();

  return criarClienteFake(currentCustomers, customer);
}

export async function updateCustomer(customer: Customer): Promise<Customer[]> {
  const currentCustomers = await getCustomers();

  return atualizarClienteFake(currentCustomers, customer);
}

export async function deleteCustomer(customerId: number): Promise<Customer[]> {
  const currentCustomers = await getCustomers();

  return excluirClienteFake(currentCustomers, customerId);
}
