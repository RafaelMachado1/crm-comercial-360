export type CustomerOrderType = "orcamento" | "pedido";

export type CustomerOrderStatus =
  | "rascunho"
  | "enviado"
  | "em_analise"
  | "aprovado"
  | "recusado"
  | "cancelado";

export type CustomerOrder = {
  id: string;
  customerId: number;
  title: string;
  type: CustomerOrderType;
  status: CustomerOrderStatus;
  totalValue: number;
  expectedCloseDate?: string;
  issuedAt?: string;
  approvedAt?: string;
  canceledAt?: string;
  details?: string;
  createdAt: string;
  updatedAt: string;
};

export type CustomerOrderFormValues = {
  title: string;
  type: CustomerOrderType;
  status: CustomerOrderStatus;
  totalValue: string;
  expectedCloseDate: string;
  issuedAt: string;
  details: string;
};
