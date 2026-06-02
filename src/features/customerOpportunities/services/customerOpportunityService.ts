import type { CustomerOpportunity } from "../types/customerOpportunity.types";
import {
  atualizarOportunidadeFake,
  buscarOportunidadesPorClienteFake,
  criarOportunidadeFake,
  encerrarOportunidadeFake,
} from "./customerOpportunityFakeApi";

type CustomerOpportunityClosedStatus =
  | "ganha"
  | "perdida"
  | "pausada"
  | "cancelada";

export async function getCustomerOpportunities(
  customerId: number
): Promise<CustomerOpportunity[]> {
  return buscarOportunidadesPorClienteFake(customerId);
}

export async function createCustomerOpportunity(
  opportunity: CustomerOpportunity
): Promise<CustomerOpportunity[]> {
  return criarOportunidadeFake(opportunity);
}

export async function updateCustomerOpportunity(
  opportunity: CustomerOpportunity
): Promise<CustomerOpportunity[]> {
  return atualizarOportunidadeFake(opportunity);
}

export async function closeCustomerOpportunity(
  opportunityId: string,
  status: CustomerOpportunityClosedStatus
): Promise<CustomerOpportunity[]> {
  return encerrarOportunidadeFake(opportunityId, status);
}
