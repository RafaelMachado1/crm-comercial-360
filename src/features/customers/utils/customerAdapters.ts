import type { Customer } from "../../../types/crm";
import type { CustomerFormContentValues } from "../components/CustomerFormContent";
import type {
  CustomerListFilters,
  CustomerStatus,
  ProfessionalCustomer,
} from "../types/customer.types";

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function mapLegacyStatus(status: Customer["status"]): CustomerStatus {
  if (status === "ativo") {
    return "ativo";
  }

  if (status === "inativo") {
    return "inativo_recente";
  }

  if (status === "pendente") {
    return "pendente";
  }

  return "prospect";
}

function mapProfessionalStatusToLegacyStatus(
  status: CustomerStatus
): Customer["status"] {
  if (status === "ativo") {
    return "ativo";
  }

  if (status === "inativo_recente" || status === "inativo_antigo") {
    return "inativo";
  }

  return "pendente";
}

export function adaptCustomerToProfessionalCustomer(
  customer: Customer
): ProfessionalCustomer {
  return {
    id: String(customer.id),
    personType: customer.personType || "legal",
    document: customer.document || "",
    legalName: customer.legalName || customer.nome,
    tradeName: customer.tradeName || customer.nome,
    phone: customer.phone || "",
    email: customer.email || "",
    stateRegistration: customer.stateRegistration || "",
    suframa: customer.suframa || "",
    segment: customer.segmento,
    network: customer.network || "",
    status: customer.professionalStatus || mapLegacyStatus(customer.status),
    additionalInfo: customer.additionalInfo || "",
    mainAddress: customer.mainAddress || {
      id: String(customer.id) + "-main-address",
      zipCode: "",
      street: "",
      number: "",
      complement: "",
      district: "",
      city: customer.cidade,
      state: "RJ",
      isPrimary: true,
    },
    additionalAddresses: customer.additionalAddresses || [],
    contacts: customer.contacts || [],
    totalPurchased: customer.totalComprado,
    createdAt: customer.dataCadastro,
    lastInteraction: customer.ultimaInteracao,
  };
}

export function adaptCustomersToProfessionalCustomers(
  customers: Customer[]
): ProfessionalCustomer[] {
  return customers.map(adaptCustomerToProfessionalCustomer);
}

export function filterProfessionalCustomers(
  customers: ProfessionalCustomer[],
  filters: CustomerListFilters
): ProfessionalCustomer[] {
  const searchTerm = normalizeText(filters.searchTerm);
  const city = normalizeText(filters.city);
  const state = filters.state.trim();
  const segment = filters.segment.trim();
  const status = filters.status.trim();

  return customers.filter((customer) => {
    const searchableContent = normalizeText(
      [
        customer.legalName,
        customer.tradeName || "",
        customer.document,
        customer.email || "",
        customer.mainAddress.city,
        customer.mainAddress.state,
        customer.segment,
      ].join(" ")
    );

    const matchesSearch =
      searchTerm.length === 0 || searchableContent.includes(searchTerm);

    const matchesCity =
      city.length === 0 ||
      normalizeText(customer.mainAddress.city).includes(city);

    const matchesState =
      state.length === 0 || customer.mainAddress.state === state;

    const matchesSegment =
      segment.length === 0 || customer.segment === segment;

    const matchesStatus =
      status.length === 0 || customer.status === status;

    return (
      matchesSearch &&
      matchesCity &&
      matchesState &&
      matchesSegment &&
      matchesStatus
    );
  });
}

export function getInitialCustomerListFilters(): CustomerListFilters {
  return {
    searchTerm: "",
    city: "",
    state: "",
    segment: "",
    status: "",
  };
}

export function createCustomerPayloadFromFormValues(
  values: CustomerFormContentValues
): Omit<Customer, "id"> {
  const now = new Date().toISOString();

  return {
    nome: values.mainData.tradeName || values.mainData.legalName,
    cidade: values.mainAddress.city,
    segmento: values.mainData.segment,
    status: mapProfessionalStatusToLegacyStatus(values.mainData.status),
    totalComprado: 0,
    dataCadastro: now,
    ultimaInteracao: now,
    personType: values.mainData.personType,
    document: values.mainData.document,
    legalName: values.mainData.legalName,
    tradeName: values.mainData.tradeName,
    phone: values.mainData.phone,
    email: values.mainData.email,
    stateRegistration: values.mainData.stateRegistration,
    suframa: values.mainData.suframa,
    network: values.mainData.network,
    professionalStatus: values.mainData.status,
    additionalInfo: values.mainData.additionalInfo,
    mainAddress: {
      id: "main-address",
      zipCode: values.mainAddress.zipCode,
      street: values.mainAddress.street,
      number: values.mainAddress.number,
      complement: values.mainAddress.complement,
      district: values.mainAddress.district,
      city: values.mainAddress.city,
      state: values.mainAddress.state,
      isPrimary: true,
    },
    additionalAddresses: [],
    contacts: values.contacts,
  };
}

export function updateCustomerPayloadFromFormValues(
  currentCustomer: Customer,
  values: CustomerFormContentValues
): Customer {
  return {
    id: currentCustomer.id,
    nome: values.mainData.tradeName || values.mainData.legalName,
    cidade: values.mainAddress.city,
    segmento: values.mainData.segment,
    status: mapProfessionalStatusToLegacyStatus(values.mainData.status),
    totalComprado: currentCustomer.totalComprado,
    dataCadastro: currentCustomer.dataCadastro,
    ultimaInteracao: new Date().toISOString(),
    personType: values.mainData.personType,
    document: values.mainData.document,
    legalName: values.mainData.legalName,
    tradeName: values.mainData.tradeName,
    phone: values.mainData.phone,
    email: values.mainData.email,
    stateRegistration: values.mainData.stateRegistration,
    suframa: values.mainData.suframa,
    network: values.mainData.network,
    professionalStatus: values.mainData.status,
    additionalInfo: values.mainData.additionalInfo,
    mainAddress: {
      id:
        currentCustomer.mainAddress?.id ||
        String(currentCustomer.id) + "-main-address",
      zipCode: values.mainAddress.zipCode,
      street: values.mainAddress.street,
      number: values.mainAddress.number,
      complement: values.mainAddress.complement,
      district: values.mainAddress.district,
      city: values.mainAddress.city,
      state: values.mainAddress.state,
      isPrimary: true,
    },
    additionalAddresses: currentCustomer.additionalAddresses || [],
    contacts: values.contacts,
  };
}
