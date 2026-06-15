import {
  getCustomerActivityResultLabel,
  getCustomerActivityTypeLabel,
  getInteractionChannelLabel,
} from "../../customerInteractions/data/customerInteractionOptions";
import type {
  CustomerActivity,
  CustomerTask,
} from "../../customerInteractions/types/customerInteraction.types";
import {
  getCustomerOpportunityFunnelLabel,
  getCustomerOpportunityLabelLabel,
  getCustomerOpportunityStageLabel,
  getCustomerOpportunityStatusLabel,
} from "../../customerOpportunities/data/customerOpportunityOptions";
import type { CustomerOpportunity } from "../../customerOpportunities/types/customerOpportunity.types";
import { getCustomerOrderStatusLabel } from "../../customerOrders/data/customerOrderOptions";
import type { CustomerOrder } from "../../customerOrders/types/customerOrder.types";
import type { CustomerHistoryEvent } from "../types/customerHistory.types";

function normalizeDateTime(dateTime: string): string {
  const date = new Date(dateTime);

  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function joinDescription(parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(" | ");
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getOpportunityDescription(opportunity: CustomerOpportunity): string {
  return joinDescription([
    `Valor: ${formatCurrency(opportunity.value)}`,
    `Funil: ${getCustomerOpportunityFunnelLabel(opportunity.funnel)}`,
    `Etapa: ${getCustomerOpportunityStageLabel(opportunity.stage)}`,
    `Status: ${getCustomerOpportunityStatusLabel(opportunity.status)}`,
    `Etiqueta: ${getCustomerOpportunityLabelLabel(opportunity.label)}`,
  ]);
}

function getOrderDateTime(order: CustomerOrder): string {
  if (order.status === "aprovado" && order.approvedAt) {
    return normalizeDateTime(order.approvedAt);
  }

  if (
    (order.status === "cancelado" || order.status === "recusado") &&
    order.canceledAt
  ) {
    return normalizeDateTime(order.canceledAt);
  }

  if (order.issuedAt) {
    return combineDateAndTime(order.issuedAt);
  }

  return normalizeDateTime(order.updatedAt || order.createdAt);
}

function getOrderTitle(order: CustomerOrder): string {
  const prefix = order.type === "orcamento" ? "Orçamento" : "Pedido";

  return `${prefix}: ${order.title}`;
}

function getOrderDescription(order: CustomerOrder): string {
  return joinDescription([
    `Status: ${getCustomerOrderStatusLabel(order.status)}`,
    `Valor: ${formatCurrency(order.totalValue)}`,
    order.details,
  ]);
}

export function combineDateAndTime(date: string, time?: string): string {
  return normalizeDateTime(`${date}T${time || "00:00"}`);
}

export function sortHistoryEventsByDateDesc(
  events: CustomerHistoryEvent[]
): CustomerHistoryEvent[] {
  return [...events].sort((firstEvent, secondEvent) => {
    return (
      new Date(secondEvent.dateTime).getTime() -
      new Date(firstEvent.dateTime).getTime()
    );
  });
}

export function buildActivityHistoryEvents(
  activities: CustomerActivity[]
): CustomerHistoryEvent[] {
  return activities.map((activity) => {
    return {
      id: `activity-${activity.id}`,
      customerId: activity.customerId,
      type: "activity_registered",
      source: "activity",
      title: `Atividade registrada: ${getCustomerActivityTypeLabel(
        activity.type
      )}`,
      description: joinDescription([
        `Canal: ${getInteractionChannelLabel(activity.channel)}`,
        `Resultado: ${getCustomerActivityResultLabel(activity.result)}`,
        activity.details,
      ]),
      dateTime: combineDateAndTime(activity.date, activity.time),
      relatedId: activity.id,
      metadata: {
        type: activity.type,
        channel: activity.channel,
        result: activity.result,
      },
    };
  });
}

export function buildCompletedTaskHistoryEvents(
  tasks: CustomerTask[]
): CustomerHistoryEvent[] {
  return tasks
    .filter((task) => task.status === "concluida")
    .map((task) => {
      return {
        id: `task-${task.id}`,
        customerId: task.customerId,
        type: "task_completed",
        source: "task",
        title: `Tarefa concluída: ${task.title}`,
        description: joinDescription([
          `Canal: ${getInteractionChannelLabel(task.channel)}`,
          task.details,
        ]),
        dateTime: task.completedAt
          ? normalizeDateTime(task.completedAt)
          : combineDateAndTime(task.dueDate, task.dueTime),
        relatedId: task.id,
        metadata: {
          status: task.status,
          channel: task.channel,
        },
      };
    });
}

export function buildOpportunityHistoryEvents(
  opportunities: CustomerOpportunity[]
): CustomerHistoryEvent[] {
  return opportunities.flatMap((opportunity) => {
    const events: CustomerHistoryEvent[] = [
      {
        id: `opportunity-created-${opportunity.id}`,
        customerId: opportunity.customerId,
        type: "opportunity_created",
        source: "opportunity",
        title: `Oportunidade criada: ${opportunity.title}`,
        description: getOpportunityDescription(opportunity),
        dateTime: normalizeDateTime(opportunity.createdAt),
        relatedId: opportunity.id,
        metadata: {
          value: opportunity.value,
          funnel: opportunity.funnel,
          stage: opportunity.stage,
          status: opportunity.status,
          label: opportunity.label,
        },
      },
    ];

    if (opportunity.updatedAt !== opportunity.createdAt) {
      events.push({
        id: `opportunity-updated-${opportunity.id}`,
        customerId: opportunity.customerId,
        type: "opportunity_updated",
        source: "opportunity",
        title: `Oportunidade atualizada: ${opportunity.title}`,
        description: getOpportunityDescription(opportunity),
        dateTime: normalizeDateTime(opportunity.updatedAt),
        relatedId: opportunity.id,
        metadata: {
          value: opportunity.value,
          funnel: opportunity.funnel,
          stage: opportunity.stage,
          status: opportunity.status,
          label: opportunity.label,
        },
      });
    }

    if (opportunity.closedAt) {
      events.push({
        id: `opportunity-closed-${opportunity.id}`,
        customerId: opportunity.customerId,
        type: "opportunity_closed",
        source: "opportunity",
        title: `Oportunidade encerrada: ${opportunity.title}`,
        description: getOpportunityDescription(opportunity),
        dateTime: normalizeDateTime(opportunity.closedAt),
        relatedId: opportunity.id,
        metadata: {
          value: opportunity.value,
          funnel: opportunity.funnel,
          stage: opportunity.stage,
          status: opportunity.status,
          label: opportunity.label,
        },
      });
    }

    return events;
  });
}

export function buildCustomerOrderHistoryEvents(
  orders: CustomerOrder[]
): CustomerHistoryEvent[] {
  return orders.map((order) => {
    return {
      id: "order-" + order.id,
      customerId: order.customerId,
      type: "order_registered",
      source: "order",
      title: getOrderTitle(order),
      description: getOrderDescription(order),
      dateTime: getOrderDateTime(order),
      relatedId: order.id,
      metadata: {
        type: order.type,
        status: order.status,
        totalValue: order.totalValue,
      },
    };
  });
}

type BuildCustomerHistoryEventsParams = {
  tasks: CustomerTask[];
  activities: CustomerActivity[];
  opportunities: CustomerOpportunity[];
  orders?: CustomerOrder[];
};

export function buildCustomerHistoryEvents({
  tasks,
  activities,
  opportunities,
  orders = [],
}: BuildCustomerHistoryEventsParams): CustomerHistoryEvent[] {
  return sortHistoryEventsByDateDesc([
    ...buildActivityHistoryEvents(activities),
    ...buildCompletedTaskHistoryEvents(tasks),
    ...buildOpportunityHistoryEvents(opportunities),
    ...buildCustomerOrderHistoryEvents(orders),
  ]);
}
