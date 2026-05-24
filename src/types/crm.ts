export type CustomerStatus = "ativo" | "pendente" | "inativo";

export type Customer = {
  id: number;
  nome: string;
  cidade: string;
  segmento: string;
  status: CustomerStatus;
  totalComprado: number;
  dataCadastro: string;
  ultimaInteracao: string;
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