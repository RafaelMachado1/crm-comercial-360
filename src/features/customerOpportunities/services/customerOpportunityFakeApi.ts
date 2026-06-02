import { mockCustomerOpportunities } from "../data/customerOpportunityMockData";
import type { CustomerOpportunity } from "../types/customerOpportunity.types";
import {
  getStorageItem,
  setStorageItem,
} from "../../../utils/localStorage";

const CUSTOMER_OPPORTUNITIES_STORAGE_KEY = "crm-customer-opportunities";

type CustomerOpportunityClosedStatus =
  | "ganha"
  | "perdida"
  | "pausada"
  | "cancelada";

function esperar(ms = 300): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function buscarTodasOportunidades(): CustomerOpportunity[] {
  const oportunidadesSalvas = getStorageItem<CustomerOpportunity[] | null>(
    CUSTOMER_OPPORTUNITIES_STORAGE_KEY,
    null
  );

  if (oportunidadesSalvas) {
    return oportunidadesSalvas;
  }

  setStorageItem(CUSTOMER_OPPORTUNITIES_STORAGE_KEY, mockCustomerOpportunities);

  return mockCustomerOpportunities;
}

export async function buscarOportunidadesPorClienteFake(
  customerId: number
): Promise<CustomerOpportunity[]> {
  await esperar();

  return buscarTodasOportunidades().filter((opportunity) => {
    return opportunity.customerId === customerId;
  });
}

export async function criarOportunidadeFake(
  opportunity: CustomerOpportunity
): Promise<CustomerOpportunity[]> {
  await esperar();

  const oportunidadesAtualizadas = [
    ...buscarTodasOportunidades(),
    opportunity,
  ];

  setStorageItem(CUSTOMER_OPPORTUNITIES_STORAGE_KEY, oportunidadesAtualizadas);

  return oportunidadesAtualizadas;
}

export async function atualizarOportunidadeFake(
  opportunity: CustomerOpportunity
): Promise<CustomerOpportunity[]> {
  await esperar();

  const oportunidadesAtualizadas = buscarTodasOportunidades().map(
    (currentOpportunity) => {
      if (currentOpportunity.id === opportunity.id) {
        return opportunity;
      }

      return currentOpportunity;
    }
  );

  setStorageItem(CUSTOMER_OPPORTUNITIES_STORAGE_KEY, oportunidadesAtualizadas);

  return oportunidadesAtualizadas;
}

export async function encerrarOportunidadeFake(
  opportunityId: string,
  status: CustomerOpportunityClosedStatus
): Promise<CustomerOpportunity[]> {
  await esperar();

  const closedAt = new Date().toISOString();
  const oportunidadesAtualizadas = buscarTodasOportunidades().map(
    (opportunity) => {
      if (opportunity.id !== opportunityId) {
        return opportunity;
      }

      return {
        ...opportunity,
        status,
        closedAt,
        updatedAt: closedAt,
      };
    }
  );

  setStorageItem(CUSTOMER_OPPORTUNITIES_STORAGE_KEY, oportunidadesAtualizadas);

  return oportunidadesAtualizadas;
}
