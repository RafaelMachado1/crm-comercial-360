import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  changeCustomerOrderStatus,
  createCustomerOrder,
  getCustomerOrders,
  updateCustomerOrder,
} from "../services/customerOrderService";
import type {
  CustomerOrder,
  CustomerOrderStatus,
} from "../types/customerOrder.types";

function getCustomerOrdersQueryKey(customerId: number) {
  return ["customerOrders", customerId];
}

function filterOrdersByCustomerId(
  orders: CustomerOrder[],
  customerId: number
) {
  return orders.filter((order) => {
    return order.customerId === customerId;
  });
}

export function useCustomerOrders(customerId: number) {
  const queryClient = useQueryClient();
  const ordersQueryKey = getCustomerOrdersQueryKey(customerId);

  const ordersQuery = useQuery({
    queryKey: ordersQueryKey,
    queryFn: () => getCustomerOrders(customerId),
  });

  const createOrderMutation = useMutation({
    mutationFn: createCustomerOrder,
    onSuccess: (updatedOrders) => {
      queryClient.setQueryData(
        ordersQueryKey,
        filterOrdersByCustomerId(updatedOrders, customerId)
      );
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: updateCustomerOrder,
    onSuccess: (updatedOrders) => {
      queryClient.setQueryData(
        ordersQueryKey,
        filterOrdersByCustomerId(updatedOrders, customerId)
      );
    },
  });

  const changeOrderStatusMutation = useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: CustomerOrderStatus;
    }) => changeCustomerOrderStatus(orderId, status),
    onSuccess: (updatedOrders) => {
      queryClient.setQueryData(
        ordersQueryKey,
        filterOrdersByCustomerId(updatedOrders, customerId)
      );
    },
  });

  async function createOrder(
    order: CustomerOrder
  ): Promise<CustomerOrder[]> {
    const updatedOrders = await createOrderMutation.mutateAsync(order);

    return filterOrdersByCustomerId(updatedOrders, customerId);
  }

  async function updateOrder(
    order: CustomerOrder
  ): Promise<CustomerOrder[]> {
    const updatedOrders = await updateOrderMutation.mutateAsync(order);

    return filterOrdersByCustomerId(updatedOrders, customerId);
  }

  async function changeOrderStatus(
    orderId: string,
    status: CustomerOrderStatus
  ): Promise<CustomerOrder[]> {
    const updatedOrders = await changeOrderStatusMutation.mutateAsync({
      orderId,
      status,
    });

    return filterOrdersByCustomerId(updatedOrders, customerId);
  }

  const ordersLoading = ordersQuery.isLoading || ordersQuery.isFetching;

  const ordersError = ordersQuery.error
    ? "Erro ao carregar pedidos e orçamentos do cliente."
    : "";

  const loading =
    ordersLoading ||
    createOrderMutation.isPending ||
    updateOrderMutation.isPending ||
    changeOrderStatusMutation.isPending;

  return {
    orders: ordersQuery.data ?? [],
    ordersLoading,
    loading,
    ordersError,
    error: ordersError,
    createOrder,
    updateOrder,
    changeOrderStatus,
    isCreatingOrder: createOrderMutation.isPending,
    isUpdatingOrder: updateOrderMutation.isPending,
    isChangingOrderStatus: changeOrderStatusMutation.isPending,
  };
}
