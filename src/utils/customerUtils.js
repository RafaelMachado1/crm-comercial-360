export function getActiveCustomers(customers) {
  return customers.filter((customer) => customer.status === "ativo");
}

export function filterCustomers(customers, filters) {
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

export function createCustomerPayload(formCustomer) {
  return {
    id: Date.now(),
    nome: formCustomer.nome,
    cidade: formCustomer.cidade,
    segmento: formCustomer.segmento,
    status: formCustomer.status,
    totalComprado: 0,
  };
}

export function validateCustomerForm(formCustomer) {
  if (!formCustomer.nome || !formCustomer.cidade || !formCustomer.segmento) {
    return "Preencha nome, cidade e segmento.";
  }

  return "";
}