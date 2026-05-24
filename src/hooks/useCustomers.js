import { useEffect, useState } from "react";

import { clientes as clientesMock } from "../data/mockData";

import {
  atualizarClienteFake,
  buscarClientesFake,
  criarClienteFake,
  excluirClienteFake,
} from "../services/clientesFakeApi";

function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  async function createCustomer(newCustomer) {
    const updatedCustomers = await criarClienteFake(customers, newCustomer);
    setCustomers(updatedCustomers);

    return updatedCustomers;
  }

  async function updateCustomer(updatedCustomer) {
    const updatedCustomers = await atualizarClienteFake(customers, updatedCustomer);
    setCustomers(updatedCustomers);

    return updatedCustomers;
  }

  async function deleteCustomer(customerId) {
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