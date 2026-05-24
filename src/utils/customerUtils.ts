import type { Customer, CustomerFormData } from "../types/crm";

type CustomerFilters = {
  searchTerm: string;
  selectedStatus: string;
  selectedSegment: string;
};

export function getActiveCustomers(customers: Customer[]): Customer[] {
  return customers.filter((customer) => customer.status === "ativo");
}

export function filterCustomers(
  customers: Customer[],
  filters: CustomerFilters
): Customer[] {
  const { searchTerm, selectedStatus, selectedSegment } = filters;

  return customers.filter((customer) => {
    const matchesSearch = customer.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "todos" || customer.status === selectedStatus;

    const matchesSegment =
      selectedSegment === "todos" || customer.segmento === selectedSegment;

    return matchesSearch && matchesStatus && matchesSegment;
  });
}

export function createCustomerPayload(formCustomer: CustomerFormData): Customer {
  return {
    id: Date.now(),
    nome: formCustomer.nome,
    cidade: formCustomer.cidade,
    segmento: formCustomer.segmento,
    status: formCustomer.status,
    totalComprado: 0,
  };
}

export function validateCustomerForm(formCustomer: CustomerFormData): string {
  if (!formCustomer.nome || !formCustomer.cidade || !formCustomer.segmento) {
    return "Preencha nome, cidade e segmento.";
  }

  return "";
}