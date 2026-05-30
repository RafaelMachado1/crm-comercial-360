import type {
  CustomerActivityResult,
  CustomerActivityType,
  CustomerTaskStatus,
  InteractionChannel,
} from "../types/customerInteraction.types";

export const interactionChannelOptions: Array<{
  value: InteractionChannel;
  label: string;
}> = [
  { value: "telefone", label: "Telefone" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-mail" },
  { value: "visita", label: "Visita" },
  { value: "reuniao", label: "Reunião" },
  { value: "outro", label: "Outro" },
];

export const customerTaskStatusOptions: Array<{
  value: CustomerTaskStatus;
  label: string;
}> = [
  { value: "pendente", label: "Pendente" },
  { value: "concluida", label: "Concluída" },
  { value: "atrasada", label: "Atrasada" },
  { value: "cancelada", label: "Cancelada" },
];

export const customerActivityTypeOptions: Array<{
  value: CustomerActivityType;
  label: string;
}> = [
  { value: "ligacao", label: "Ligação" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-mail" },
  { value: "visita", label: "Visita" },
  { value: "reuniao", label: "Reunião" },
  { value: "proposta", label: "Proposta" },
  { value: "pedido", label: "Pedido" },
  { value: "observacao", label: "Observação" },
];

export const customerActivityResultOptions: Array<{
  value: CustomerActivityResult;
  label: string;
}> = [
  { value: "positivo", label: "Positivo" },
  { value: "neutro", label: "Neutro" },
  { value: "negativo", label: "Negativo" },
  { value: "sem_retorno", label: "Sem retorno" },
  { value: "reagendar", label: "Reagendar" },
  { value: "concluido", label: "Concluído" },
];

function getOptionLabel<Value extends string>(
  options: Array<{ value: Value; label: string }>,
  value: Value
): string {
  return options.find((option) => option.value === value)?.label || value;
}

export function getInteractionChannelLabel(
  channel: InteractionChannel
): string {
  return getOptionLabel(interactionChannelOptions, channel);
}

export function getCustomerTaskStatusLabel(
  status: CustomerTaskStatus
): string {
  return getOptionLabel(customerTaskStatusOptions, status);
}

export function getCustomerActivityTypeLabel(
  type: CustomerActivityType
): string {
  return getOptionLabel(customerActivityTypeOptions, type);
}

export function getCustomerActivityResultLabel(
  result: CustomerActivityResult
): string {
  return getOptionLabel(customerActivityResultOptions, result);
}
