const STORAGE_KEY = "crm-clientes";

export function getClientesFromStorage() {
  const clientesSalvos = localStorage.getItem(STORAGE_KEY);

  if (!clientesSalvos) {
    return null;
  }

  return JSON.parse(clientesSalvos);
}

export function saveClientesToStorage(clientes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
}