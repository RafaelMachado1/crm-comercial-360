export type CustomerInvoice = {
  id: string;
  customerId: number;
  number: string;
  issuedAt: string;
  value: number;
  orderId?: string;
  orderNumber?: string;
  xmlUrl?: string;
  pdfUrl?: string;
};
