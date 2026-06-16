import { mockCustomerOrders } from "../data/customerOrderMockData";
import type {
  CustomerOrder,
  CustomerOrderStatus,
} from "../types/customerOrder.types";
import {
  calculateCustomerOrderItemsTotal,
  normalizeCustomerOrderItems,
} from "../utils/customerOrderItemCalculations";
import {
  getStorageItem,
  setStorageItem,
} from "../../../utils/localStorage";

const CUSTOMER_ORDERS_STORAGE_KEY = "crm-customer-orders";

function esperar(ms = 300): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function normalizeCustomerOrder(order: CustomerOrder): CustomerOrder {
  const items = normalizeCustomerOrderItems(order.items);
  const hasItems = items.length > 0;

  return {
    ...order,
    items,
    totalValue: hasItems ? calculateCustomerOrderItemsTotal(items) : order.totalValue,
  };
}

function normalizeCustomerOrders(orders: CustomerOrder[]): CustomerOrder[] {
  return orders.map((order) => normalizeCustomerOrder(order));
}

function buscarTodosPedidos(): CustomerOrder[] {
  const pedidosSalvos = getStorageItem<CustomerOrder[] | null>(
    CUSTOMER_ORDERS_STORAGE_KEY,
    null
  );

  if (pedidosSalvos) {
    const normalizedOrders = normalizeCustomerOrders(pedidosSalvos);
    setStorageItem(CUSTOMER_ORDERS_STORAGE_KEY, normalizedOrders);
    return normalizedOrders;
  }

  const normalizedMockOrders = normalizeCustomerOrders(mockCustomerOrders);
  setStorageItem(CUSTOMER_ORDERS_STORAGE_KEY, normalizedMockOrders);

  return normalizedMockOrders;
}

export async function buscarTodosPedidosFake(): Promise<CustomerOrder[]> {
  await esperar();

  return buscarTodosPedidos();
}

export async function buscarPedidosPorClienteFake(
  customerId: number
): Promise<CustomerOrder[]> {
  await esperar();

  return buscarTodosPedidos().filter((order) => {
    return order.customerId === customerId;
  });
}

export async function buscarPedidoPorIdFake(
  orderId: string
): Promise<CustomerOrder | null> {
  await esperar();

  return buscarTodosPedidos().find((order) => order.id === orderId) ?? null;
}

export async function criarPedidoFake(
  order: CustomerOrder
): Promise<CustomerOrder[]> {
  await esperar();

  const normalizedOrder = normalizeCustomerOrder(order);
  const pedidosAtualizados = [...buscarTodosPedidos(), normalizedOrder];

  setStorageItem(CUSTOMER_ORDERS_STORAGE_KEY, pedidosAtualizados);

  return pedidosAtualizados;
}

export async function atualizarPedidoFake(
  order: CustomerOrder
): Promise<CustomerOrder[]> {
  await esperar();

  const currentOrders = buscarTodosPedidos();
  const currentOrder = currentOrders.find((item) => item.id === order.id);
  const normalizedOrder = normalizeCustomerOrder(order);
  const shouldRecalculateTotal = normalizedOrder.items.length > 0;

  const pedidosAtualizados = currentOrders.map((currentItem) => {
    if (currentItem.id !== order.id) {
      return currentItem;
    }

    return {
      ...normalizedOrder,
      createdAt: currentOrder?.createdAt ?? normalizedOrder.createdAt,
      updatedAt: normalizedOrder.updatedAt,
      totalValue: shouldRecalculateTotal
        ? calculateCustomerOrderItemsTotal(normalizedOrder.items)
        : normalizedOrder.totalValue,
    };
  });

  setStorageItem(CUSTOMER_ORDERS_STORAGE_KEY, pedidosAtualizados);

  return pedidosAtualizados;
}

export async function alterarStatusPedidoFake(
  orderId: string,
  status: CustomerOrderStatus
): Promise<CustomerOrder[]> {
  await esperar();

  const updatedAt = new Date().toISOString();
  const pedidosAtualizados = buscarTodosPedidos().map((order) => {
    if (order.id !== orderId) {
      return order;
    }

    return {
      ...order,
      status,
      approvedAt:
        status === "aprovado" ? order.approvedAt || updatedAt : order.approvedAt,
      canceledAt:
        status === "cancelado" || status === "recusado"
          ? order.canceledAt || updatedAt
          : order.canceledAt,
      updatedAt,
    };
  });

  setStorageItem(CUSTOMER_ORDERS_STORAGE_KEY, pedidosAtualizados);

  return pedidosAtualizados;
}
