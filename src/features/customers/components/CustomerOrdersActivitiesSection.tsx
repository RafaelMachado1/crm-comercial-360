import { useMemo, useState } from "react";

import {
  getCustomerActivityResultLabel,
  getCustomerActivityTypeLabel,
  getInteractionChannelLabel,
} from "../../customerInteractions/data/customerInteractionOptions";
import type { CustomerActivity } from "../../customerInteractions/types/customerInteraction.types";
import {
  getCustomerOrderStatusLabel,
  getCustomerOrderTypeLabel,
} from "../../customerOrders/data/customerOrderOptions";
import type { CustomerOrder } from "../../customerOrders/types/customerOrder.types";

type CustomerOrdersActivitiesSectionProps = {
  orders: CustomerOrder[];
  activities: CustomerActivity[];
  loading?: boolean;
  onCreateOrder: () => void;
  onCreateActivity: () => void;
  onOpenOrder: (order: CustomerOrder) => void;
  onEditActivity: (activity: CustomerActivity) => void;
};

type TimelineItem =
  | {
      kind: "order";
      id: string;
      timestamp: number;
      order: CustomerOrder;
    }
  | {
      kind: "activity";
      id: string;
      timestamp: number;
      activity: CustomerActivity;
    };

const INITIAL_VISIBLE_ITEMS = 5;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatDate(value: string) {
  const date = new Date(value + "T00:00:00");

  if (Number.isNaN(date.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getOrderTimestamp(order: CustomerOrder) {
  const rawDate =
    order.approvedAt || order.issuedAt || order.updatedAt || order.createdAt;
  const date = new Date(rawDate);

  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function getActivityTimestamp(activity: CustomerActivity) {
  const date = new Date(`${activity.date}T${activity.time || "00:00"}`);

  if (!Number.isNaN(date.getTime())) {
    return date.getTime();
  }

  const createdAt = new Date(activity.createdAt);

  return Number.isNaN(createdAt.getTime()) ? 0 : createdAt.getTime();
}

function getOrderShortId(order: CustomerOrder) {
  return order.id.replace(/^order-/, "#");
}

export function CustomerOrdersActivitiesSection({
  orders,
  activities,
  loading = false,
  onCreateOrder,
  onCreateActivity,
  onOpenOrder,
  onEditActivity,
}: CustomerOrdersActivitiesSectionProps) {
  const [showAllItems, setShowAllItems] = useState(false);
  const items = useMemo<TimelineItem[]>(() => {
    return [
      ...orders.map((order) => ({
        kind: "order" as const,
        id: "order-" + order.id,
        timestamp: getOrderTimestamp(order),
        order,
      })),
      ...activities.map((activity) => ({
        kind: "activity" as const,
        id: "activity-" + activity.id,
        timestamp: getActivityTimestamp(activity),
        activity,
      })),
    ].sort((firstItem, secondItem) => {
      return secondItem.timestamp - firstItem.timestamp;
    });
  }, [activities, orders]);
  const visibleItems = showAllItems
    ? items
    : items.slice(0, INITIAL_VISIBLE_ITEMS);
  const canToggleItems = items.length > INITIAL_VISIBLE_ITEMS;

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase text-slate-950">
              Pedidos e atividades
            </h2>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCreateOrder}
              className="h-10 rounded-lg border border-slate-200 !bg-white px-4 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Criar pedido
            </button>
            <button
              type="button"
              onClick={onCreateActivity}
              className="h-10 rounded-lg border border-blue-600 !bg-blue-600 px-4 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Registrar atividade
            </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando pedidos e atividades...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-600">
              Nenhum pedido ou atividade registrado para este cliente.
            </p>
          </div>
        ) : (
          <div>
            <div
              className={[
                "space-y-3",
                canToggleItems
                  ? showAllItems
                    ? "h-[620px] overflow-y-auto pr-1"
                    : "h-[620px] overflow-hidden"
                  : "",
              ].join(" ")}
            >
              {visibleItems.map((item) => {
              if (item.kind === "order") {
                const { order } = item;
                const typeLabel = getCustomerOrderTypeLabel(order.type);
                const statusLabel = getCustomerOrderStatusLabel(order.status);

                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => onOpenOrder(order)}
                    className="block w-full rounded-lg border border-slate-200 !bg-slate-50 p-4 text-left !shadow-none transition hover:border-blue-200 hover:!bg-blue-50/40 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex min-w-0 gap-3">
                        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-sm font-bold text-blue-700">
                          P
                        </span>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-950">
                            {typeLabel} {getOrderShortId(order)}
                          </h3>
                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            {order.title}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            {order.issuedAt
                              ? formatDate(order.issuedAt)
                              : formatDateTime(order.createdAt)}
                          </p>
                          <p className="mt-2 text-sm text-slate-600">
                            Vendedor: Não informado
                          </p>
                          {order.expectedCloseDate ? (
                            <p className="mt-1 text-sm text-slate-500">
                              Prazo: {formatDate(order.expectedCloseDate)}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                          {formatCurrency(order.totalValue)}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                          {statusLabel}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              }

              const { activity } = item;

              return (
                <article
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 gap-3">
                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-700">
                        A
                      </span>

                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-slate-950">
                          {getCustomerActivityTypeLabel(activity.type)}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {formatDateTime(
                            `${activity.date}T${activity.time || "00:00"}`
                          )}
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                          Usuário responsável: Não informado
                        </p>
                        {activity.details ? (
                          <p className="mt-2 text-sm text-slate-500">
                            {activity.details}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {getInteractionChannelLabel(activity.channel)}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {getCustomerActivityResultLabel(activity.result)}
                      </span>
                      <button
                        type="button"
                        onClick={() => onEditActivity(activity)}
                        className="rounded-lg border border-slate-200 !bg-white px-3 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                </article>
              );
              })}
            </div>

            {canToggleItems ? (
              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllItems((isExpanded) => !isExpanded)}
                  className="rounded-lg border border-slate-200 !bg-white px-4 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  {showAllItems ? "Ver menos" : "Ver mais"}
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
