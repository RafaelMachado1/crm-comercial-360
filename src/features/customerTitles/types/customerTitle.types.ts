export type CustomerTitleStatus = "a_receber" | "recebido";

export type CustomerTitle = {
  id: string;
  customerId: number;
  amount: number;
  dueDate: string;
  documentNumber: string;
  paymentDate?: string;
  observation?: string;
  orderId?: string;
  orderNumber?: string;
  status: CustomerTitleStatus;
  createdAt: string;
  updatedAt: string;
};

export type CustomerTitleInput = {
  customerId: number;
  amount: number;
  dueDate: string;
  documentNumber: string;
  paymentDate?: string;
  observation?: string;
  orderId?: string;
  orderNumber?: string;
};
