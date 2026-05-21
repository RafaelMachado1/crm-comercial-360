import {
  getClientesFromStorage,
  saveClientesToStorage,
} from "../utils/localStorage";

function simularDelay(resultado, tempo = 800) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(resultado);
    }, tempo);
  });
}

export async function buscarClientesFake(clientesIniciais) {
  const clientesSalvos = getClientesFromStorage();

  if (clientesSalvos) {
    return simularDelay(clientesSalvos);
  }

  saveClientesToStorage(clientesIniciais);

  return simularDelay(clientesIniciais);
}

export async function criarClienteFake(clientes, novoCliente) {
  const clientesAtualizados = [...clientes, novoCliente];

  saveClientesToStorage(clientesAtualizados);

  return simularDelay(clientesAtualizados);
}

export async function atualizarClienteFake(clientes, clienteAtualizado) {
  const clientesAtualizados = clientes.map((cliente) => {
    if (cliente.id === clienteAtualizado.id) {
      return clienteAtualizado;
    }

    return cliente;
  });

  saveClientesToStorage(clientesAtualizados);

  return simularDelay(clientesAtualizados);
}

export async function excluirClienteFake(clientes, clienteId) {
  const clientesAtualizados = clientes.filter((cliente) => {
    return cliente.id !== clienteId;
  });

  saveClientesToStorage(clientesAtualizados);

  return simularDelay(clientesAtualizados);
}