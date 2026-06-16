import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PageTitle from "../components/layout/PageTitle";
import {
  getCustomerOrderStatusLabel,
  getCustomerOrderTypeLabel,
} from "../features/customerOrders/data/customerOrderOptions";
import { useAllCustomerOrders } from "../features/customerOrders/hooks/useAllCustomerOrders";
import type {
  CustomerOrder,
  CustomerOrderStatus,
  CustomerOrderType,
} from "../features/customerOrders/types/customerOrder.types";
import useCustomers from "../hooks/useCustomers";
import type { Customer } from "../types/crm";

type OrdersQuickFilter = "all" | "quotes" | "orders" | "open" | "completed";

type OrdersGroup = {
  label: string;
  orders: CustomerOrder[];
};

const quickFilters: Array<{ value: OrdersQuickFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "quotes", label: "Orçamentos" },
  { value: "orders", label: "Pedidos" },
  { value: "open", label: "Abertos" },
  { value: "completed", label: "Concluídos" },
];

const openStatuses: CustomerOrderStatus[] = [
  "rascunho",
  "enviado",
  "em_analise",
];

const completedStatuses: CustomerOrderStatus[] = [
  "aprovado",
  "recusado",
  "cancelado",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatShortOrderId(orderId: string) {
  const numericPart = orderId.match(/\d+/)?.[0];

  return "#" + (numericPart || orderId.slice(-6).toUpperCase());
}

function getCustomerDisplayName(customer?: Customer) {
  if (!customer) {
    return "Cliente não encontrado";
  }

  return customer.tradeName || customer.legalName || customer.nome;
}

function getOrderTitleFallback(order: CustomerOrder) {
  const typeLabel = getCustomerOrderTypeLabel(order.type);
  const title = order.title.trim();

  return title ? `${typeLabel}: ${title}` : `${typeLabel} sem título`;
}

function getOrderDate(order: CustomerOrder) {
  return order.issuedAt || order.createdAt;
}

function normalizeDateKey(dateValue: string) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toISOString().slice(0, 10);
}

function getDateGroupLabel(dateKey: string) {
  const date = new Date(dateKey + "T00:00:00");

  if (Number.isNaN(date.getTime())) {
    return dateKey.toUpperCase();
  }

  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  if (dateKey === todayKey) {
    return "HOJE";
  }

  if (dateKey === yesterdayKey) {
    return "ONTEM";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();
}

function formatOrderDate(dateValue?: string) {
  if (!dateValue) {
    return "Data não informada";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function getStatusStyles(status: CustomerOrderStatus) {
  if (status === "aprovado") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "cancelado" || status === "recusado") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (status === "em_analise" || status === "enviado") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-600";
}

function matchesTypeFilter(orderType: CustomerOrderType, filter: OrdersQuickFilter) {
  if (filter === "quotes") {
    return orderType === "orcamento";
  }

  if (filter === "orders") {
    return orderType === "pedido";
  }

  return true;
}

function matchesStatusFilter(
  orderStatus: CustomerOrderStatus,
  filter: OrdersQuickFilter
) {
  if (filter === "open") {
    return openStatuses.includes(orderStatus);
  }

  if (filter === "completed") {
    return completedStatuses.includes(orderStatus);
  }

  return true;
}

function matchesSearchTerm(
  order: CustomerOrder,
  customerName: string,
  searchTerm: string
) {
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase("pt-BR");

  if (!normalizedSearchTerm) {
    return true;
  }

  const searchableValues = [
    order.id,
    formatShortOrderId(order.id),
    order.title,
    customerName,
    getCustomerOrderTypeLabel(order.type),
    getCustomerOrderStatusLabel(order.status),
    order.details,
    ...(order.items ?? []).map((item) => item.name),
  ];

  return searchableValues.some((value) => {
    return value?.toLocaleLowerCase("pt-BR").includes(normalizedSearchTerm);
  });
}

function groupOrdersByDate(orders: CustomerOrder[]): OrdersGroup[] {
  const groups = orders.reduce<Record<string, CustomerOrder[]>>((acc, order) => {
    const dateKey = normalizeDateKey(getOrderDate(order));
    const currentOrders = acc[dateKey] ?? [];

    return {
      ...acc,
      [dateKey]: [...currentOrders, order],
    };
  }, {});

  return Object.entries(groups)
    .sort(([firstDate], [secondDate]) => secondDate.localeCompare(firstDate))
    .map(([dateKey, groupedOrders]) => ({
      label: getDateGroupLabel(dateKey),
      orders: groupedOrders.sort((firstOrder, secondOrder) => {
        return (
          new Date(getOrderDate(secondOrder)).getTime() -
          new Date(getOrderDate(firstOrder)).getTime()
        );
      }),
    }));
}

function PedidosPage() {
  const { orders, isLoading, isError, error } = useAllCustomerOrders();
  const { customers, loading: customersLoading } = useCustomers();
  const [activeFilter, setActiveFilter] = useState<OrdersQuickFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const customersById = useMemo(() => {
    return customers.reduce<Record<number, Customer>>((acc, customer) => {
      return {
        ...acc,
        [customer.id]: customer,
      };
    }, {});
  }, [customers]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customerName = getCustomerDisplayName(customersById[order.customerId]);

      return (
        matchesTypeFilter(order.type, activeFilter) &&
        matchesStatusFilter(order.status, activeFilter) &&
        matchesSearchTerm(order, customerName, searchTerm)
      );
    });
  }, [activeFilter, customersById, orders, searchTerm]);

  const groupedOrders = useMemo(() => {
    return groupOrdersByDate(filteredOrders);
  }, [filteredOrders]);

  const isPageLoading = isLoading || customersLoading;

  return (
    <>
      <PageTitle
        label="Fase 19"
        title="Pedidos"
        description="Gerencie pedidos e orçamentos vinculados aos clientes."
      />

      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Link
            to="/pedidos/novo"
            className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:w-auto"
          >
            Criar pedido/orçamento
          </Link>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {quickFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={[
                    "h-9 appearance-none rounded-lg border px-3 text-sm font-semibold !shadow-none transition focus:outline-none focus:ring-2",
                    activeFilter === filter.value
                      ? "border-blue-600 !bg-blue-600 !text-white focus:ring-blue-200"
                      : "border-slate-200 !bg-white !text-slate-700 hover:!bg-slate-100 focus:ring-slate-200",
                  ].join(" ")}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="w-full lg:max-w-md">
              <label htmlFor="orders-search" className="sr-only">
                Buscar pedidos
              </label>
              <input
                id="orders-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por pedido, cliente ou produto..."
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </section>

        {isPageLoading ? (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando pedidos e orçamentos...
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <h3 className="text-sm font-bold text-red-800">
              Não foi possível carregar pedidos e orçamentos
            </h3>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        ) : null}

        {!isPageLoading && !isError && groupedOrders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <h2 className="text-sm font-bold text-slate-900">
              Nenhum pedido encontrado.
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Quando houver pedidos ou orçamentos, eles aparecerão aqui agrupados por data.
            </p>
          </div>
        ) : null}

        {!isPageLoading && !isError
          ? groupedOrders.map((group) => (
              <section
                key={group.label}
                className="rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="border-b border-slate-200 px-5 py-4">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                    {group.label}
                  </h2>
                </div>

                <div className="space-y-3 p-5">
                  {group.orders.map((order) => {
                    const customerName = getCustomerDisplayName(
                      customersById[order.customerId]
                    );
                    const hasItems = (order.items ?? []).length > 0;
                    const hasMissingItems = !hasItems;

                    return (
                      <article
                        key={order.id}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between lg:justify-start">
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <Link
                                  to={`/pedidos/${order.id}`}
                                  className="text-sm font-bold text-blue-700 underline-offset-4 transition hover:text-blue-800 hover:underline"
                                >
                                  {formatShortOrderId(order.id)}
                                </Link>
                                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                  emitido por Rafael
                                </span>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                                  {getCustomerOrderTypeLabel(order.type)}
                                </span>
                                <span
                                  className={[
                                    "rounded-full border px-3 py-1 text-xs font-semibold",
                                    getStatusStyles(order.status),
                                  ].join(" ")}
                                >
                                  {getCustomerOrderStatusLabel(order.status)}
                                </span>
                              </div>
                            </div>

                            <h3 className="mt-4 text-base font-bold text-slate-950">
                              {customerName}
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-700">
                              {getOrderTitleFallback(order)}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                              <span>Emissão: {formatOrderDate(order.issuedAt)}</span>
                              {order.expectedCloseDate ? (
                                <span>
                                  Prazo: {formatOrderDate(order.expectedCloseDate)}
                                </span>
                              ) : null}
                              {hasMissingItems ? (
                                <span className="font-semibold text-amber-700">
                                  Este registro não possui produtos.
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="flex flex-col items-start gap-2 lg:items-end lg:text-right">
                            {hasMissingItems ? (
                              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                Pendente de itens
                              </span>
                            ) : null}
                            <strong className="text-base font-bold text-slate-950">
                              {formatCurrency(order.totalValue)}
                            </strong>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))
          : null}
      </div>
    </>
  );
}

export default PedidosPage;
