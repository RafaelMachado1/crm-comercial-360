import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

import PageTitle from "../components/layout/PageTitle";
import { CustomerOrderItemsEditor } from "../features/customerOrders/components/CustomerOrderItemsEditor";
import {
  getCustomerOrderStatusLabel,
  getCustomerOrderTypeLabel,
} from "../features/customerOrders/data/customerOrderOptions";
import { useAllCustomerOrders } from "../features/customerOrders/hooks/useAllCustomerOrders";
import type {
  CustomerOrder,
  CustomerOrderItem,
  CustomerOrderStatus,
} from "../features/customerOrders/types/customerOrder.types";
import {
  calculateCustomerOrderItemsTotal,
  normalizeCustomerOrderItems,
} from "../features/customerOrders/utils/customerOrderItemCalculations";
import { useProducts } from "../features/products/hooks/useProducts";
import useCustomers from "../hooks/useCustomers";
import type { Customer } from "../types/crm";

const disabledActionLabels = [
  "Gerar pedido",
  "Visualizar",
  "Enviar por e-mail",
  "Enviar por WhatsApp",
  "Mais opções",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(dateValue?: string) {
  if (!dateValue) {
    return "Data não informada";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function getCustomerDisplayName(customer?: Customer) {
  if (!customer) {
    return "Cliente não encontrado";
  }

  return customer.tradeName || customer.legalName || customer.nome;
}

function getCustomerLocation(customer?: Customer) {
  if (!customer) {
    return "Cidade não informada";
  }

  const city = customer.mainAddress?.city || customer.cidade;
  const state = customer.mainAddress?.state;

  return [city, state].filter(Boolean).join(" / ") || "Cidade não informada";
}

function formatShortOrderId(orderId: string) {
  const numericPart = orderId.match(/\d+/)?.[0];

  return "#" + (numericPart || orderId.slice(-6).toUpperCase());
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

function getOrderTitle(order?: CustomerOrder) {
  if (!order) {
    return "Pedido";
  }

  return `${getCustomerOrderTypeLabel(order.type)} ${formatShortOrderId(order.id)}`;
}

function PedidoDetailPage() {
  const { pedidoId } = useParams<{ pedidoId: string }>();
  const {
    orders,
    isLoading,
    isError,
    error,
    updateOrder,
    isUpdating,
  } = useAllCustomerOrders();
  const { customers, loading: customersLoading } = useCustomers();
  const {
    products,
    isLoading: isLoadingProducts,
  } = useProducts();
  const [items, setItems] = useState<CustomerOrderItem[]>([]);

  const order = useMemo(() => {
    return orders.find((currentOrder) => currentOrder.id === pedidoId);
  }, [orders, pedidoId]);

  const customer = useMemo(() => {
    if (!order) {
      return undefined;
    }

    return customers.find((currentCustomer) => {
      return currentCustomer.id === order.customerId;
    });
  }, [customers, order]);

  const originalItems = useMemo(() => {
    return normalizeCustomerOrderItems(order?.items);
  }, [order]);

  useEffect(() => {
    setItems(originalItems);
  }, [originalItems]);

  const isPageLoading = isLoading || customersLoading;
  const canEditItems = order?.type === "orcamento";
  const hasItems = items.length > 0;
  const hasMissingItems = !hasItems;
  const totalValue = hasItems ? calculateCustomerOrderItemsTotal(items) : 0;
  const registeredValue = order?.totalValue ?? 0;
  const itemSectionTitle = canEditItems
    ? "Produtos do orçamento"
    : "Produtos do pedido";
  const itemSectionDescription = canEditItems
    ? "Adicione produtos reais e ajuste as quantidades antes de gerar o pedido."
    : "Pedido gerado em modo somente leitura. Os produtos não podem ser alterados.";

  async function handleSaveChanges() {
    if (!order) {
      toast.error("Não foi possível salvar o pedido.");
      return;
    }

    if (!canEditItems) {
      toast.error("Pedidos gerados não permitem alteração de produtos.");
      return;
    }

    if (items.length === 0) {
      toast.error("Adicione pelo menos um produto antes de salvar o orçamento.");
      return;
    }

    try {
      await updateOrder({
        ...order,
        items,
        totalValue,
        updatedAt: new Date().toISOString(),
      });
      toast.success("Pedido atualizado com sucesso.");
    } catch {
      toast.error("Não foi possível salvar as alterações do pedido.");
    }
  }

  return (
    <>
      <PageTitle
        label="Fase 19"
        title={getOrderTitle(order)}
        description="Gerencie cliente, itens, totais e informações comerciais do pedido."
      />

      <div className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Link
            to="/pedidos"
            className="inline-flex h-10 w-fit items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Voltar para pedidos
          </Link>

          {order ? (
            <span
              className={[
                "inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold",
                getStatusStyles(order.status),
              ].join(" ")}
            >
              {getCustomerOrderStatusLabel(order.status)}
            </span>
          ) : null}
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {disabledActionLabels.map((label) => (
              <button
                key={label}
                type="button"
                disabled
                className="h-10 appearance-none rounded-lg border border-slate-200 !bg-slate-50 px-3 text-sm font-semibold !text-slate-400 !shadow-none disabled:cursor-not-allowed"
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {isPageLoading ? (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando pedido...
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <h2 className="text-sm font-bold text-red-800">
              Não foi possível carregar o pedido
            </h2>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        ) : null}

        {!isPageLoading && !isError && !order ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <h2 className="text-sm font-bold text-slate-900">
              Pedido não encontrado.
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Volte para a listagem e selecione outro pedido ou orçamento.
            </p>
          </div>
        ) : null}

        {!isPageLoading && !isError && order ? (
          <>
            <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                      Cliente
                    </h2>
                    <h3 className="mt-3 text-xl font-bold text-slate-950">
                      {getCustomerDisplayName(customer)}
                    </h3>
                    {customer?.email ? (
                      <a
                        href={`mailto:${customer.email}`}
                        className="mt-2 block text-sm font-semibold text-blue-700 hover:underline"
                      >
                        {customer.email}
                      </a>
                    ) : null}
                    <p className="mt-2 text-sm text-slate-500">
                      {getCustomerLocation(customer)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/clientes/${order.customerId}`}
                      className="h-10 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      Ver cliente
                    </Link>
                    <button
                      type="button"
                      disabled
                      className="h-10 appearance-none rounded-lg border border-slate-200 !bg-slate-50 px-4 text-sm font-semibold !text-slate-400 !shadow-none disabled:cursor-not-allowed"
                    >
                      Trocar cliente
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                  Representada
                </h2>
                <h3 className="mt-3 text-lg font-bold text-slate-950">
                  Santorini Limpeza Profissional
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Representada vinculada ao pedido.
                </p>
              </section>
            </div>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                {!canEditItems ? (
                  <span className="inline-flex w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    Somente leitura
                  </span>
                ) : null}
              </div>

              {!canEditItems ? (
                <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  Este pedido já foi gerado. Os produtos ficam bloqueados para
                  alteração. Para mudar os itens, crie um novo orçamento ou
                  duplique o pedido em uma etapa futura.
                </div>
              ) : null}

              {hasMissingItems && canEditItems ? (
                <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  Este orçamento ainda não possui produtos. Adicione pelo
                  menos um produto para salvar.
                </div>
              ) : null}

              {hasMissingItems && !canEditItems ? (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  Este pedido está sem produtos. Pedidos gerados devem possuir
                  itens. Corrija a origem do registro ou crie um novo orçamento.
                </div>
              ) : null}

              <CustomerOrderItemsEditor
                items={items}
                products={products}
                onChange={setItems}
                isLoadingProducts={isLoadingProducts}
                disabled={isUpdating || !canEditItems}
                title={itemSectionTitle}
                description={itemSectionDescription}
              />
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                    Detalhes do pedido
                  </h2>
                  <dl className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold text-slate-400">Número</dt>
                      <dd className="mt-1 font-semibold text-slate-900">
                        {formatShortOrderId(order.id)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-400">Tipo</dt>
                      <dd className="mt-1 font-semibold text-slate-900">
                        {getCustomerOrderTypeLabel(order.type)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-400">Status</dt>
                      <dd className="mt-1 font-semibold text-slate-900">
                        {getCustomerOrderStatusLabel(order.status)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-400">Emissão</dt>
                      <dd className="mt-1 font-semibold text-slate-900">
                        {formatDate(order.issuedAt)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-400">Prazo/validade</dt>
                      <dd className="mt-1 font-semibold text-slate-900">
                        {formatDate(order.expectedCloseDate)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-400">Vendedor</dt>
                      <dd className="mt-1 font-semibold text-slate-900">Rafael</dd>
                    </div>
                  </dl>

                  {order.details ? (
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
                      {order.details}
                    </p>
                  ) : null}
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-right">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {hasMissingItems ? "Total dos itens" : "Valor total"}
                  </span>
                  <strong className="mt-2 block text-2xl font-bold text-slate-950">
                    {formatCurrency(totalValue)}
                  </strong>
                  {hasMissingItems && registeredValue > 0 ? (
                    <p className="mt-2 text-xs font-semibold text-amber-700">
                      Registro inconsistente: havia valor registrado de {formatCurrency(registeredValue)}, mas não há produtos vinculados.
                    </p>
                  ) : null}
                </div>
              </div>
            </section>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Link
                to="/pedidos"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                Voltar para pedidos
              </Link>
              {canEditItems ? (
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  disabled={isUpdating || hasMissingItems}
                  className="h-11 appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-5 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdating ? "Salvando..." : "Salvar alterações"}
                </button>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default PedidoDetailPage;
