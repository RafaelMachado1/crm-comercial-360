import type {
  CustomerOpportunity,
  CustomerOpportunityStage,
  CustomerOpportunityUpdatePayload,
} from "../types/customerOpportunity.types";
import {
  atualizarDadosOportunidadeFake,
  atualizarEtapaOportunidadeFake,
  atualizarOportunidadeFake,
  buscarOportunidadesPorClienteFake,
  criarOportunidadeFake,
  encerrarOportunidadeFake,
  excluirOportunidadeFake,
  listarTodasOportunidadesFake,
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

export async function getAllCustomerOpportunities(): Promise<
  CustomerOpportunity[]
> {
  return listarTodasOportunidadesFake();
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

export async function updateCustomerOpportunityData(
  opportunityId: string,
  payload: CustomerOpportunityUpdatePayload
): Promise<CustomerOpportunity[]> {
  return atualizarDadosOportunidadeFake(opportunityId, payload);
}

export async function updateCustomerOpportunityStage(
  opportunityId: string,
  stage: CustomerOpportunityStage
): Promise<CustomerOpportunity[]> {
  return atualizarEtapaOportunidadeFake(opportunityId, stage);
}

export async function deleteCustomerOpportunity(
  opportunityId: string
): Promise<CustomerOpportunity[]> {
  return excluirOportunidadeFake(opportunityId);
}

export async function closeCustomerOpportunity(
  opportunityId: string,
  status: CustomerOpportunityClosedStatus
): Promise<CustomerOpportunity[]> {
  return encerrarOportunidadeFake(opportunityId, status);
}
