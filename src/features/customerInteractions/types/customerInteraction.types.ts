export type InteractionChannel =
  | "telefone"
  | "whatsapp"
  | "email"
  | "visita"
  | "reuniao"
  | "outro";

export type CustomerTaskStatus =
  | "pendente"
  | "concluida"
  | "atrasada"
  | "cancelada";

export type CustomerActivityType =
  | "ligacao"
  | "whatsapp"
  | "email"
  | "visita"
  | "reuniao"
  | "proposta"
  | "pedido"
  | "observacao";

export type CustomerActivityResult =
  | "positivo"
  | "neutro"
  | "negativo"
  | "sem_retorno"
  | "reagendar"
  | "concluido";

export type CustomerTask = {
  id: string;
  customerId: number;
  title: string;
  dueDate: string;
  dueTime: string;
  channel: InteractionChannel;
  details?: string;
  status: CustomerTaskStatus;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
};

export type CustomerActivity = {
  id: string;
  customerId: number;
  type: CustomerActivityType;
  date: string;
  time: string;
  channel: InteractionChannel;
  result: CustomerActivityResult;
  details?: string;
  createdAt: string;
};

export type CustomerTaskFormValues = {
  title: string;
  dueDate: string;
  dueTime: string;
  channel: InteractionChannel;
  details: string;
  status: CustomerTaskStatus;
};

export type CustomerActivityFormValues = {
  type: CustomerActivityType;
  date: string;
  time: string;
  channel: InteractionChannel;
  result: CustomerActivityResult;
  details: string;
};
