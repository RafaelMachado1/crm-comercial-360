import { useMemo } from "react";

import { mockCustomerInvoices } from "../data/customerInvoiceMockData";

export function useCustomerInvoices(customerId: number) {
  const invoices = useMemo(() => {
    return mockCustomerInvoices
      .filter((invoice) => invoice.customerId === customerId)
      .sort((firstInvoice, secondInvoice) => {
        return (
          new Date(secondInvoice.issuedAt).getTime() -
          new Date(firstInvoice.issuedAt).getTime()
        );
      });
  }, [customerId]);

  return {
    invoices,
    invoicesLoading: false,
  };
}
