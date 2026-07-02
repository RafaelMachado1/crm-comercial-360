import { useState } from "react";

import type { CustomerInvoice } from "../../customerInvoices/types/customerInvoice.types";

type CustomerInvoicesSectionProps = {
  invoices: CustomerInvoice[];
  loading?: boolean;
  onOpenOrder: (orderId: string) => void;
};

const INITIAL_VISIBLE_INVOICES = 3;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(value: string) {
  const date = new Date(value + "T00:00:00");

  if (Number.isNaN(date.getTime())) {
    return "Data não informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function InvoiceActionLink({
  href,
  label,
}: {
  href?: string;
  label: string;
}) {
  if (!href) {
    return (
      <span className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-400">
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 no-underline transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
    >
      {label}
    </a>
  );
}

export function CustomerInvoicesSection({
  invoices,
  loading = false,
  onOpenOrder,
}: CustomerInvoicesSectionProps) {
  const [showAllInvoices, setShowAllInvoices] = useState(false);
  const visibleInvoices = showAllInvoices
    ? invoices
    : invoices.slice(0, INITIAL_VISIBLE_INVOICES);
  const canToggleInvoices = invoices.length > INITIAL_VISIBLE_INVOICES;

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-bold uppercase text-slate-950">
          Notas fiscais
        </h2>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando notas fiscais...
          </div>
        ) : invoices.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-600">
              Nenhuma nota fiscal registrada para este cliente.
            </p>
          </div>
        ) : (
          <div>
            <div
              className={[
                "space-y-3",
                canToggleInvoices
                  ? showAllInvoices
                    ? "h-[480px] overflow-y-auto pr-1"
                    : "h-[480px] overflow-hidden"
                  : "",
              ].join(" ")}
            >
              {visibleInvoices.map((invoice) => (
              <article
                key={invoice.id}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex min-w-0 gap-3">
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-700">
                      NF
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-slate-950">
                        {invoice.number}
                      </h3>

                      <div className="mt-3 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                        <div>
                          <span className="block text-xs font-bold uppercase text-slate-400">
                            Emissão
                          </span>
                          <span className="font-semibold text-slate-700">
                            {formatDate(invoice.issuedAt)}
                          </span>
                        </div>

                        <div>
                          <span className="block text-xs font-bold uppercase text-slate-400">
                            Valor
                          </span>
                          <span className="font-semibold text-slate-700">
                            {formatCurrency(invoice.value)}
                          </span>
                        </div>

                        <div>
                          <span className="block text-xs font-bold uppercase text-slate-400">
                            Pedido
                          </span>
                          {invoice.orderId ? (
                            <button
                              type="button"
                              onClick={() => onOpenOrder(invoice.orderId)}
                              className="!bg-transparent !p-0 text-sm font-semibold !text-blue-700 !shadow-none hover:underline focus:outline-none focus:ring-2 focus:ring-blue-100"
                            >
                              #{invoice.orderNumber || invoice.orderId}
                            </button>
                          ) : (
                            <span className="font-semibold text-slate-500">
                              Pedido não vinculado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    <InvoiceActionLink href={invoice.xmlUrl} label="XML" />
                    <InvoiceActionLink href={invoice.pdfUrl} label="PDF" />
                  </div>
                </div>
              </article>
              ))}
            </div>

            {canToggleInvoices ? (
              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllInvoices((isExpanded) => !isExpanded)}
                  className="rounded-lg border border-slate-200 !bg-white px-4 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                >
                  {showAllInvoices ? "Ver menos" : "Ver mais"}
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
