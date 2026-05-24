import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCustomer as createCustomerService,
  deleteCustomer as deleteCustomerService,
  getCustomers,
  updateCustomer as updateCustomerService,
} from "../services/customerService.ts";

import type { Customer } from "../types/crm";

const CUSTOMERS_QUERY_KEY = ["customers"];

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
  const queryClient = useQueryClient();
  const [manualError, setManualError] = useState<string>("");

  const customersQuery = useQuery({
    queryKey: CUSTOMERS_QUERY_KEY,
    queryFn: getCustomers,
  });

  const createCustomerMutation = useMutation({
    mutationFn: createCustomerService,
    onSuccess: (updatedCustomers) => {
      queryClient.setQueryData(CUSTOMERS_QUERY_KEY, updatedCustomers);
    },
  });

  const updateCustomerMutation = useMutation({
    mutationFn: updateCustomerService,
    onSuccess: (updatedCustomers) => {
      queryClient.setQueryData(CUSTOMERS_QUERY_KEY, updatedCustomers);
    },
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: deleteCustomerService,
    onSuccess: (updatedCustomers) => {
      queryClient.setQueryData(CUSTOMERS_QUERY_KEY, updatedCustomers);
    },
  });

  async function loadCustomers() {
    setManualError("");
    await customersQuery.refetch();
  }

  async function createCustomer(newCustomer: Customer): Promise<Customer[]> {
    setManualError("");

    const updatedCustomers = await createCustomerMutation.mutateAsync(newCustomer);

    return updatedCustomers;
  }

  async function updateCustomer(updatedCustomer: Customer): Promise<Customer[]> {
    setManualError("");

    const updatedCustomers =
      await updateCustomerMutation.mutateAsync(updatedCustomer);

    return updatedCustomers;
  }

  async function deleteCustomer(customerId: number): Promise<Customer[]> {
    setManualError("");

    const updatedCustomers = await deleteCustomerMutation.mutateAsync(customerId);

    return updatedCustomers;
  }

  function clearError() {
    setManualError("");
  }

  function simulateError() {
    setManualError("Erro ao carregar clientes.");
  }

  const queryError = customersQuery.error
    ? "Erro ao carregar clientes."
    : "";

  const error = manualError || queryError;

  const loading =
    customersQuery.isLoading ||
    customersQuery.isFetching ||
    createCustomerMutation.isPending ||
    updateCustomerMutation.isPending ||
    deleteCustomerMutation.isPending;

  return {
    customers: customersQuery.data ?? [],
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