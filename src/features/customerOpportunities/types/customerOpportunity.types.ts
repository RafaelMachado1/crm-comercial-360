export type CustomerOpportunityFunnel = "vendas" | "pos_venda" | "renovacao";

export type CustomerOpportunityStage =
  | "prospeccao"
  | "qualificacao"
  | "proposta"
  | "negociacao"
  | "fechamento";

export type CustomerOpportunityStatus =
  | "aberta"
  | "ganha"
  | "perdida"
  | "pausada"
  | "cancelada";

export type CustomerOpportunityLabel =
  | "quente"
  | "morna"
  | "fria"
  | "prioridade"
  | "recorrente";

export type CustomerOpportunity = {
  id: string;
  customerId: number;
  title: string;
  funnel: CustomerOpportunityFunnel;
  stage: CustomerOpportunityStage;
  value: number;
  status: CustomerOpportunityStatus;
  label: CustomerOpportunityLabel;
  expectedCloseDate?: string;
  details?: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
};

export type CustomerOpportunityFormValues = {
  title: string;
  funnel: CustomerOpportunityFunnel;
  stage: CustomerOpportunityStage;
  value: string;
  status: CustomerOpportunityStatus;
  label: CustomerOpportunityLabel;
  expectedCloseDate: string;
  details: string;
};
