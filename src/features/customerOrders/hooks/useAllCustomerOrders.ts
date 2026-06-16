import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCustomerOrder,
  getAllCustomerOrders,
  updateCustomerOrder,
} from "../services/customerOrderService";
import type { CustomerOrder } from "../types/customerOrder.types";

const ALL_CUSTOMER_ORDERS_QUERY_KEY = ["customerOrders"];

export function useAllCustomerOrders() {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ALL_CUSTOMER_ORDERS_QUERY_KEY,
    queryFn: getAllCustomerOrders,
  });

  const updateOrderMutation = useMutation({
    mutationFn: updateCustomerOrder,
    onSuccess: (updatedOrders) => {
      queryClient.setQueryData(ALL_CUSTOMER_ORDERS_QUERY_KEY, updatedOrders);
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createCustomerOrder,
    onSuccess: (updatedOrders) => {
      queryClient.setQueryData(ALL_CUSTOMER_ORDERS_QUERY_KEY, updatedOrders);
    },
  });

  async function createOrder(order: CustomerOrder): Promise<CustomerOrder> {
    const updatedOrders = await createOrderMutation.mutateAsync(order);
    const createdOrder = updatedOrders.find((currentOrder) => {
      return currentOrder.id === order.id;
    });

    return createdOrder ?? order;
  }

  async function updateOrder(order: CustomerOrder): Promise<CustomerOrder[]> {
    return updateOrderMutation.mutateAsync(order);
  }

  const isLoading = ordersQuery.isLoading || ordersQuery.isFetching;
  const isError = Boolean(ordersQuery.error);
  const error = ordersQuery.error
    ? "Erro ao carregar pedidos e orçamentos."
    : "";

  return {
    orders: ordersQuery.data ?? [],
    isLoading,
    isError,
    error,
    refetch: ordersQuery.refetch,
    queryKey: ALL_CUSTOMER_ORDERS_QUERY_KEY,
    createOrder,
    isCreating: createOrderMutation.isPending,
    updateOrder,
    isUpdating: updateOrderMutation.isPending,
  };
}
