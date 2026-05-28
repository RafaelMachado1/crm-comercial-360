import type { CustomerStatus } from "../types/customer.types";

export const customerStatusOptions: Array<{
  value: CustomerStatus;
  label: string;
}> = [
  {
    value: "ativo",
    label: "Ativo",
  },
  {
    value: "inativo_recente",
    label: "Inativo recente",
  },
  {
    value: "inativo_antigo",
    label: "Inativo antigo",
  },
  {
    value: "prospect",
    label: "Prospect",
  },
  {
    value: "pendente",
    label: "Pendente",
  },
];

export const customerSegmentOptions = [
  "Cervejaria",
  "Restaurante",
  "Laticínio",
  "Hotelaria",
  "Hospitalar",
  "Indústria",
  "Distribuidor",
  "Outros",
];

export const customerNetworkOptions = [
  "Sem rede",
  "Rede própria",
  "Franquia",
  "Grupo empresarial",
  "Rede regional",
];

export const brazilianStateOptions = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];
