import { useEffect, useState } from "react";

import { clientes as clientesMock } from "../data/mockData";

import {
  atualizarClienteFake,
  buscarClientesFake,
  criarClienteFake,
  excluirClienteFake,
} from "../services/clientesFakeApi";

import type { Customer } from "../types/crm";

type UseCustomersReturn = {
  customers: Customer[];
  loading: boolean;
  error: string;
  loadCustomers: () => Promise<void>;
  createCustomer: (newCustomer: Customer) => Promise<Customer[]>;
  updateCustomer: (updatedCustomer: Customer) => Promise<Customer[]>;
  deleteCustomer: (customerId: number) => Promise<Customer[]>;
  clearError: () => void;
  simulateError: () => void;
};

function useCustomers(): UseCustomersReturn {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    setLoading(true);
    setError("");

    try {
      const data = await buscarClientesFake(clientesMock);
      setCustomers(data);
    } catch {
      setError("Erro ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  }

  async function createCustomer(newCustomer: Customer) {
    const updatedCustomers = await criarClienteFake(customers, newCustomer);
    setCustomers(updatedCustomers);

    return updatedCustomers;
  }

  async function updateCustomer(updatedCustomer: Customer) {
    const updatedCustomers = await atualizarClienteFake(customers, updatedCustomer);
    setCustomers(updatedCustomers);

    return updatedCustomers;
  }

  async function deleteCustomer(customerId: number) {
    const updatedCustomers = await excluirClienteFake(customers, customerId);
    setCustomers(updatedCustomers);

    return updatedCustomers;
  }

  function clearError() {
    setError("");
  }

  function simulateError() {
    setLoading(false);
    setError("Erro ao carregar clientes.");
  }

  return {
    customers,
    loading,
    error,
    loadCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    clearError,
    simulateError,
  };
}

export default useCustomers;