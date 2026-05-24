import type { Customer } from "../types/crm";

import {
  getStorageItem,
  setStorageItem,
} from "../utils/localStorage";

const STORAGE_KEY = "crm-clientes";

function esperar(ms = 600): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function buscarClientesFake(
  clientesIniciais: Customer[]
): Promise<Customer[]> {
  await esperar();

  const clientesSalvos = getStorageItem<Customer[] | null>(STORAGE_KEY, null);

  if (clientesSalvos) {
    return clientesSalvos;
  }

  setStorageItem(STORAGE_KEY, clientesIniciais);

  return clientesIniciais;
}

export async function criarClienteFake(
  clientesAtuais: Customer[],
  novoCliente: Customer
): Promise<Customer[]> {
  await esperar();

  const clientesAtualizados = [...clientesAtuais, novoCliente];

  setStorageItem(STORAGE_KEY, clientesAtualizados);

  return clientesAtualizados;
}

export async function atualizarClienteFake(
  clientesAtuais: Customer[],
  clienteAtualizado: Customer
): Promise<Customer[]> {
  await esperar();

  const clientesAtualizados = clientesAtuais.map((cliente) => {
    if (cliente.id === clienteAtualizado.id) {
      return clienteAtualizado;
    }

    return cliente;
  });

  setStorageItem(STORAGE_KEY, clientesAtualizados);

  return clientesAtualizados;
}

export async function excluirClienteFake(
  clientesAtuais: Customer[],
  clienteId: number
): Promise<Customer[]> {
  await esperar();

  const clientesAtualizados = clientesAtuais.filter((cliente) => {
    return cliente.id !== clienteId;
  });

  setStorageItem(STORAGE_KEY, clientesAtualizados);

  return clientesAtualizados;
}