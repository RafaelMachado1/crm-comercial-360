import type {
  CustomerPortfolioSummary,
  CustomerStatus,
  ProfessionalCustomer,
} from "../types/customer.types";

export function formatCustomerDocument(document: string): string {
  const onlyNumbers = document.replace(/\D/g, "");

  if (onlyNumbers.length === 11) {
    return onlyNumbers.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
  }

  if (onlyNumbers.length === 14) {
    return onlyNumbers.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }

  return document;
}

export function getCustomerDisplayName(customer: ProfessionalCustomer): string {
  return customer.tradeName || customer.legalName;
}

export function getCustomerStatusLabel(status: CustomerStatus): string {
  const labels: Record<CustomerStatus, string> = {
    ativo: "Ativo",
    inativo_recente: "Inativo recente",
    inativo_antigo: "Inativo antigo",
    prospect: "Prospect",
    pendente: "Pendente",
  };

  return labels[status];
}

export function calculateCustomerPortfolioSummary(
  customers: ProfessionalCustomer[]
): CustomerPortfolioSummary {
  return customers.reduce<CustomerPortfolioSummary>(
    (summary, customer) => {
      summary.totalCustomers += 1;

      if (customer.status === "ativo") {
        summary.activeCustomers += 1;
      }

      if (customer.status === "inativo_recente") {
        summary.recentInactiveCustomers += 1;
      }

      if (customer.status === "inativo_antigo") {
        summary.oldInactiveCustomers += 1;
      }

      if (customer.status === "prospect") {
        summary.prospects += 1;
      }

      return summary;
    },
    {
      totalCustomers: 0,
      activeCustomers: 0,
      recentInactiveCustomers: 0,
      oldInactiveCustomers: 0,
      prospects: 0,
    }
  );
}
