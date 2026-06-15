import type {
  CustomerOrderStatus,
  CustomerOrderType,
} from "../types/customerOrder.types";

type Option<Value extends string> = {
  value: Value;
  label: string;
};

function getOptionLabel<Value extends string>(
  options: Array<Option<Value>>,
  value: Value
): string {
  return options.find((option) => option.value === value)?.label || value;
}

export const customerOrderTypeOptions: Array<Option<CustomerOrderType>> = [
  { value: "orcamento", label: "Orçamento" },
  { value: "pedido", label: "Pedido" },
];

export const customerOrderStatusOptions: Array<Option<CustomerOrderStatus>> = [
  { value: "rascunho", label: "Rascunho" },
  { value: "enviado", label: "Enviado" },
  { value: "em_analise", label: "Em análise" },
  { value: "aprovado", label: "Aprovado" },
  { value: "recusado", label: "Recusado" },
  { value: "cancelado", label: "Cancelado" },
];

export function getCustomerOrderTypeLabel(
  value: CustomerOrderType
): string {
  return getOptionLabel(customerOrderTypeOptions, value);
}

export function getCustomerOrderStatusLabel(
  value: CustomerOrderStatus
): string {
  return getOptionLabel(customerOrderStatusOptions, value);
}
