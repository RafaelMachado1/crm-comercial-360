import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import PageTitle from "../components/layout/PageTitle";
import { CustomerOrderItemsEditor } from "../features/customerOrders/components/CustomerOrderItemsEditor";
import {
  customerOrderStatusOptions,
  customerOrderTypeOptions,
} from "../features/customerOrders/data/customerOrderOptions";
import { useAllCustomerOrders } from "../features/customerOrders/hooks/useAllCustomerOrders";
import type {
  CustomerOrder,
  CustomerOrderItem,
  CustomerOrderStatus,
  CustomerOrderType,
} from "../features/customerOrders/types/customerOrder.types";
import {
  calculateCustomerOrderItemsTotal,
  normalizeCustomerOrderItems,
} from "../features/customerOrders/utils/customerOrderItemCalculations";
import { useProducts } from "../features/products/hooks/useProducts";
import useCustomers from "../hooks/useCustomers";
import type { Customer } from "../types/crm";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

function createOrderId() {
  return (
    "pedido-" +
    Date.now() +
    "-" +
    Math.random().toString(36).slice(2, 8)
  );
}

function getInitialStatus(type: CustomerOrderType): CustomerOrderStatus {
  return type === "orcamento" ? "rascunho" : "aprovado";
}

function getCustomerDisplayName(customer: Customer) {
  return customer.tradeName || customer.legalName || customer.nome;
}

function getCustomerLocation(customer: Customer) {
  const city = customer.mainAddress?.city || customer.cidade;
  const state = customer.mainAddress?.state;

  return [city, state].filter(Boolean).join(" / ") || "Cidade não informada";
}

function NewPedidoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCustomerId = searchParams.get("clienteId") ?? "";
  const { customers, loading: customersLoading, error: customersError } =
    useCustomers();
  const {
    products,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
  } = useProducts();
  const { createOrder, isCreating } = useAllCustomerOrders();

  const [customerId, setCustomerId] = useState(initialCustomerId);
  const [type, setType] = useState<CustomerOrderType>("orcamento");
  const [status, setStatus] = useState<CustomerOrderStatus>("rascunho");
  const [title, setTitle] = useState("");
  const [issuedAt, setIssuedAt] = useState(formatDateInputValue(new Date()));
  const [expectedCloseDate, setExpectedCloseDate] = useState("");
  const [details, setDetails] = useState("");
  const [items, setItems] = useState<CustomerOrderItem[]>([]);
  const [formError, setFormError] = useState("");

  const sortedCustomers = useMemo(() => {
    return [...customers].sort((firstCustomer, secondCustomer) => {
      return getCustomerDisplayName(firstCustomer).localeCompare(
        getCustomerDisplayName(secondCustomer),
        "pt-BR"
      );
    });
  }, [customers]);

  const selectedCustomer = useMemo(() => {
    const numericCustomerId = Number(customerId);

    if (!Number.isFinite(numericCustomerId)) {
      return undefined;
    }

    return customers.find((customer) => customer.id === numericCustomerId);
  }, [customerId, customers]);

  const normalizedItems = useMemo(() => {
    return normalizeCustomerOrderItems(items);
  }, [items]);

  const totalValue = useMemo(() => {
    return calculateCustomerOrderItemsTotal(normalizedItems);
  }, [normalizedItems]);

  function handleChangeType(nextType: CustomerOrderType) {
    setType(nextType);
    setStatus(getInitialStatus(nextType));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const numericCustomerId = Number(customerId);
    const trimmedTitle = title.trim();

    if (!selectedCustomer || !Number.isFinite(numericCustomerId)) {
      setFormError("Selecione um cliente antes de salvar.");
      return;
    }

    if (!type) {
      setFormError("Selecione o tipo do registro.");
      return;
    }

    if (!trimmedTitle) {
      setFormError("Informe o título do pedido ou orçamento.");
      return;
    }

    if (normalizedItems.length === 0) {
      setFormError("Adicione pelo menos um produto antes de salvar.");
      return;
    }

    const now = new Date().toISOString();
    const newOrder: CustomerOrder = {
      id: createOrderId(),
      customerId: numericCustomerId,
      title: trimmedTitle,
      type,
      status,
      totalValue,
      items: normalizedItems,
      issuedAt: issuedAt || undefined,
      expectedCloseDate: expectedCloseDate || undefined,
      details: details.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    };

    try {
      setFormError("");
      const createdOrder = await createOrder(newOrder);
      toast.success("Pedido/orçamento criado com sucesso.");
      navigate(`/pedidos/${createdOrder.id}`);
    } catch {
      setFormError("Não foi possível salvar o pedido/orçamento.");
      toast.error("Não foi possível salvar o pedido/orçamento.");
    }
  }

  return (
    <>
      <PageTitle
        label="Fase 19"
        title="Novo pedido/orçamento"
        description="Crie um pedido ou orçamento vinculado a um cliente."
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/pedidos"
            className="inline-flex h-10 w-fit items-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Voltar para pedidos
          </Link>
        </div>

        {formError ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {formError}
          </div>
        ) : null}

        {customersError ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {customersError}
          </div>
        ) : null}

        {isProductsError ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {productsError}
          </div>
        ) : null}

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <label
                htmlFor="customerId"
                className="text-sm font-semibold text-slate-700"
              >
                Cliente
              </label>
              <select
                id="customerId"
                value={customerId}
                onChange={(event) => setCustomerId(event.target.value)}
                disabled={customersLoading}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="">Selecione um cliente</option>
                {sortedCustomers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {getCustomerDisplayName(customer)}
                  </option>
                ))}
              </select>
              {selectedCustomer ? (
                <p className="mt-2 text-sm text-slate-500">
                  Cliente selecionado: {getCustomerDisplayName(selectedCustomer)}
                  {" - "}
                  {getCustomerLocation(selectedCustomer)}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="type"
                className="text-sm font-semibold text-slate-700"
              >
                Tipo
              </label>
              <select
                id="type"
                value={type}
                onChange={(event) => {
                  handleChangeType(event.target.value as CustomerOrderType);
                }}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                {customerOrderTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="text-sm font-semibold text-slate-700"
              >
                Status inicial
              </label>
              <select
                id="status"
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value as CustomerOrderStatus);
                }}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                {customerOrderStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="title"
                className="text-sm font-semibold text-slate-700"
              >
                Título/nome do pedido ou orçamento
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex.: Reposição mensal de produtos de limpeza"
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="issuedAt"
                className="text-sm font-semibold text-slate-700"
              >
                Emissão
              </label>
              <input
                id="issuedAt"
                type="date"
                value={issuedAt}
                onChange={(event) => setIssuedAt(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="expectedCloseDate"
                className="text-sm font-semibold text-slate-700"
              >
                Prazo/validade
              </label>
              <input
                id="expectedCloseDate"
                type="date"
                value={expectedCloseDate}
                onChange={(event) => setExpectedCloseDate(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="lg:col-span-2">
              <label
                htmlFor="details"
                className="text-sm font-semibold text-slate-700"
              >
                Observações/detalhes
              </label>
              <textarea
                id="details"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                rows={4}
                placeholder="Condições comerciais, observações do cliente ou detalhes da negociação."
                className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <CustomerOrderItemsEditor
            items={items}
            products={products}
            onChange={(nextItems) => {
              setItems(nextItems);
              if (nextItems.length > 0 && formError) {
                setFormError("");
              }
            }}
            isLoadingProducts={isLoadingProducts}
            disabled={isCreating}
            title="Produtos"
            description="Adicione produtos reais com os controles de quantidade antes de salvar."
          />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                Total automático
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                O valor final é calculado pela soma dos itens adicionados.
              </p>
            </div>
            <strong className="text-2xl font-bold text-slate-950">
              {formatCurrency(totalValue)}
            </strong>
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Link
            to="/pedidos"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isCreating}
            className="h-11 appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-5 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreating ? "Salvando..." : "Salvar pedido/orçamento"}
          </button>
        </div>
      </form>
    </>
  );
}

export default NewPedidoPage;
