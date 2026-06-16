import type { ProductUnit } from "../../products/types/product.types";

export type CustomerOrderType = "orcamento" | "pedido";

export type CustomerOrderStatus =
  | "rascunho"
  | "enviado"
  | "em_analise"
  | "aprovado"
  | "recusado"
  | "cancelado";

export type CustomerOrderItem = {
  id: string;
  productId: string;
  sku: string;
  name: string;
  brand?: string;
  unit: ProductUnit;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  imageUrl?: string;
};

export type CustomerOrder = {
  id: string;
  customerId: number;
  title: string;
  type: CustomerOrderType;
  status: CustomerOrderStatus;
  totalValue: number;
  items?: CustomerOrderItem[];
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
  items?: CustomerOrderItem[];
  expectedCloseDate: string;
  issuedAt: string;
  details: string;
};
