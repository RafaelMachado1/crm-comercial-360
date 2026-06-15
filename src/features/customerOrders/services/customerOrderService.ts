import type {
  CustomerOrder,
  CustomerOrderStatus,
} from "../types/customerOrder.types";
import {
  alterarStatusPedidoFake,
  atualizarPedidoFake,
  buscarPedidosPorClienteFake,
  criarPedidoFake,
} from "./customerOrderFakeApi";

export async function getCustomerOrders(
  customerId: number
): Promise<CustomerOrder[]> {
  return buscarPedidosPorClienteFake(customerId);
}

export async function createCustomerOrder(
  order: CustomerOrder
): Promise<CustomerOrder[]> {
  return criarPedidoFake(order);
}

export async function updateCustomerOrder(
  order: CustomerOrder
): Promise<CustomerOrder[]> {
  return atualizarPedidoFake(order);
}

export async function changeCustomerOrderStatus(
  orderId: string,
  status: CustomerOrderStatus
): Promise<CustomerOrder[]> {
  return alterarStatusPedidoFake(orderId, status);
}
