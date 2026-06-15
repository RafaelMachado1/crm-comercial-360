import {
  getCustomerOrderStatusLabel,
  getCustomerOrderTypeLabel,
} from "../data/customerOrderOptions";
import type { CustomerOrder } from "../types/customerOrder.types";

type CustomerOrdersCardProps = {
  orders: CustomerOrder[];
  loading?: boolean;
  onCreateOrder: () => void;
  onEditOrder: (order: CustomerOrder) => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(date?: string) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("pt-BR").format(parsedDate);
}

export function CustomerOrdersCard({
  orders,
  loading = false,
  onCreateOrder,
  onEditOrder,
}: CustomerOrdersCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Pedidos e orçamentos
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Registros comerciais vinculados a este cliente.
            </p>
          </div>

          <button
            type="button"
            onClick={onCreateOrder}
            className="h-10 w-fit appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-4 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Criar pedido/orçamento
          </button>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando pedidos e orçamentos...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <h3 className="text-sm font-semibold text-slate-900">
              Nenhum pedido ou orçamento registrado.
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Os registros comerciais deste cliente aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <article
                key={order.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {order.title}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {formatCurrency(order.totalValue)}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {getCustomerOrderTypeLabel(order.type)}
                      </span>

                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {getCustomerOrderStatusLabel(order.status)}
                      </span>
                    </div>

                    {order.expectedCloseDate && (
                      <p className="mt-3 text-sm text-slate-600">
                        Fechamento previsto: {formatDate(order.expectedCloseDate)}
                      </p>
                    )}

                    {order.issuedAt && (
                      <p className="mt-2 text-sm text-slate-600">
                        Emissão: {formatDate(order.issuedAt)}
                      </p>
                    )}

                    {order.details && (
                      <p className="mt-2 text-sm text-slate-500">
                        {order.details}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onEditOrder(order)}
                      className="appearance-none rounded-lg border border-slate-200 !bg-white px-3 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
