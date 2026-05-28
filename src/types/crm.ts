export type CustomerStatus = "ativo" | "pendente" | "inativo";

export type CustomerPersonType = "legal" | "individual";

export type CustomerProfessionalStatus =
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

export type Customer = {
  id: number;
  nome: string;
  cidade: string;
  segmento: string;
  status: CustomerStatus;
  totalComprado: number;
  dataCadastro: string;
  ultimaInteracao: string;
  personType?: CustomerPersonType;
  document?: string;
  legalName?: string;
  tradeName?: string;
  phone?: string;
  email?: string;
  stateRegistration?: string;
  suframa?: string;
  network?: string;
  professionalStatus?: CustomerProfessionalStatus;
  additionalInfo?: string;
  mainAddress?: CustomerAddress;
  additionalAddresses?: CustomerAddress[];
  contacts?: CustomerContact[];
};

export type CustomerFormData = {
  nome: string;
  cidade: string;
  segmento: string;
  status: CustomerStatus;
};

export type Product = {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
};

export type User = {
  nome: string;
  email: string;
};

export type OpportunityStatus = "aberta" | "ganha" | "perdida";

export type Opportunity = {
  id: number;
  customerId: number;
  titulo: string;
  status: OpportunityStatus;
  valorEstimado: number;
};

export type ActivityType = "ligacao" | "visita" | "reuniao" | "email";

export type Activity = {
  id: number;
  customerId: number;
  tipo: ActivityType;
  descricao: string;
  data: string;
  concluida: boolean;
};

export type SaleStatus = "aberta" | "fechada" | "cancelada";

export type Sale = {
  id: number;
  customerId: number;
  valor: number;
  data: string;
  status: SaleStatus;
};
