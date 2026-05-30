import type { ProfessionalCustomer } from "../types/customer.types";
import {
  formatCustomerDocument,
  getCustomerDisplayName,
  getCustomerStatusLabel,
} from "../utils/customerUtils";

type CustomerListItemProps = {
  customer: ProfessionalCustomer;
  onEdit: (customer: ProfessionalCustomer) => void;
  onSelect?: (customer: ProfessionalCustomer) => void;
};

export function CustomerListItem({
  customer,
  onSelect,
}: CustomerListItemProps) {
  const displayName = getCustomerDisplayName(customer);
  const formattedDocument = formatCustomerDocument(customer.document);
  const statusLabel = getCustomerStatusLabel(customer.status);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-950">
            {displayName}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {customer.legalName}
            {formattedDocument ? ` • ${formattedDocument}` : ""}
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <span className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
            {statusLabel}
          </span>

          <button
            type="button"
            onClick={() => onSelect?.(customer)}
            className="w-fit appearance-none rounded-lg border border-slate-200 !bg-white px-4 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Ver detalhes
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600 md:grid-cols-3">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">
            E-mail
          </span>
          <span>{customer.email || "Não informado"}</span>
        </div>

        <div>
          <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">
            Localização
          </span>
          <span>
            {customer.mainAddress.city}/{customer.mainAddress.state}
          </span>
        </div>

        <div>
          <span className="block text-xs font-bold uppercase tracking-wide text-slate-400">
            Segmento
          </span>
          <span>{customer.segment}</span>
        </div>
      </div>
    </article>
  );
}
