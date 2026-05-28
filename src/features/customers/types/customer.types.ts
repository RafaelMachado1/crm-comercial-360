export type CustomerPersonType = "legal" | "individual";

export type CustomerStatus =
  | "ativo"
  | "inativo_recente"
  | "inativo_antigo"
  | "prospect"
  | "pendente";

export type CustomerAddress = {
  id: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  isPrimary: boolean;
};

export type CustomerContact = {
  id: string;
  name: string;
  role?: string;
  phone?: string;
  email?: string;
};

export type ProfessionalCustomer = {
  id: string;
  personType: CustomerPersonType;
  document: string;
  legalName: string;
  tradeName?: string;
  phone?: string;
  email?: string;
  stateRegistration?: string;
  suframa?: string;
  segment: string;
  network?: string;
  status: CustomerStatus;
  additionalInfo?: string;
  mainAddress: CustomerAddress;
  additionalAddresses: CustomerAddress[];
  contacts: CustomerContact[];
  totalPurchased: number;
  createdAt: string;
  lastInteraction?: string;
};

export type CustomerPortfolioSummary = {
  totalCustomers: number;
  activeCustomers: number;
  recentInactiveCustomers: number;
  oldInactiveCustomers: number;
  prospects: number;
};

export type CustomerListFilters = {
  searchTerm: string;
  city: string;
  state: string;
  segment: string;
  status: string;
};
