import { mockCustomerOrders } from "../data/customerOrderMockData";
import type {
  CustomerOrder,
  CustomerOrderStatus,
} from "../types/customerOrder.types";
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

function buscarTodosPedidos(): CustomerOrder[] {
  const pedidosSalvos = getStorageItem<CustomerOrder[] | null>(
    CUSTOMER_ORDERS_STORAGE_KEY,
    null
  );

  if (pedidosSalvos) {
    return pedidosSalvos;
  }

  setStorageItem(CUSTOMER_ORDERS_STORAGE_KEY, mockCustomerOrders);

  return mockCustomerOrders;
}

export async function buscarPedidosPorClienteFake(
  customerId: number
): Promise<CustomerOrder[]> {
  await esperar();

  return buscarTodosPedidos().filter((order) => {
    return order.customerId === customerId;
  });
}

export async function criarPedidoFake(
  order: CustomerOrder
): Promise<CustomerOrder[]> {
  await esperar();

  const pedidosAtualizados = [...buscarTodosPedidos(), order];

  setStorageItem(CUSTOMER_ORDERS_STORAGE_KEY, pedidosAtualizados);

  return pedidosAtualizados;
}

export async function atualizarPedidoFake(
  order: CustomerOrder
): Promise<CustomerOrder[]> {
  await esperar();

  const pedidosAtualizados = buscarTodosPedidos().map((currentOrder) => {
    if (currentOrder.id === order.id) {
      return order;
    }

    return currentOrder;
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
