import type {
  CustomerOpportunityFunnel,
  CustomerOpportunityLabel,
  CustomerOpportunityStage,
  CustomerOpportunityStatus,
} from "../types/customerOpportunity.types";

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

export const customerOpportunityFunnelOptions: Array<
  Option<CustomerOpportunityFunnel>
> = [
  { value: "vendas", label: "Vendas" },
  { value: "pos_venda", label: "Pós-venda" },
  { value: "renovacao", label: "Renovação" },
];

export const customerOpportunityStageOptions: Array<
  Option<CustomerOpportunityStage>
> = [
  { value: "prospeccao", label: "Prospecção" },
  { value: "qualificacao", label: "Qualificação" },
  { value: "proposta", label: "Proposta" },
  { value: "negociacao", label: "Negociação" },
  { value: "fechamento", label: "Fechamento" },
];

export const customerOpportunityStatusOptions: Array<
  Option<CustomerOpportunityStatus>
> = [
  { value: "aberta", label: "Aberta" },
  { value: "ganha", label: "Ganha" },
  { value: "perdida", label: "Perdida" },
  { value: "pausada", label: "Pausada" },
  { value: "cancelada", label: "Cancelada" },
];

export const customerOpportunityLabelOptions: Array<
  Option<CustomerOpportunityLabel>
> = [
  { value: "quente", label: "Quente" },
  { value: "morna", label: "Morna" },
  { value: "fria", label: "Fria" },
  { value: "prioridade", label: "Prioridade" },
  { value: "recorrente", label: "Recorrente" },
];

export function getCustomerOpportunityFunnelLabel(
  value: CustomerOpportunityFunnel
): string {
  return getOptionLabel(customerOpportunityFunnelOptions, value);
}

export function getCustomerOpportunityStageLabel(
  value: CustomerOpportunityStage
): string {
  return getOptionLabel(customerOpportunityStageOptions, value);
}

export function getCustomerOpportunityStatusLabel(
  value: CustomerOpportunityStatus
): string {
  return getOptionLabel(customerOpportunityStatusOptions, value);
}

export function getCustomerOpportunityLabelLabel(
  value: CustomerOpportunityLabel
): string {
  return getOptionLabel(customerOpportunityLabelOptions, value);
}
