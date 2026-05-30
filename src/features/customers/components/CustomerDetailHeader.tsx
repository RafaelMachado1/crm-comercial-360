import type { ProfessionalCustomer } from "../types/customer.types";
import {
  formatCustomerDocument,
  getCustomerDisplayName,
  getCustomerStatusLabel,
} from "../utils/customerUtils";

type CustomerDetailHeaderProps = {
  customer: ProfessionalCustomer;
  onBack: () => void;
  onEdit?: () => void;
};

export function CustomerDetailHeader({
  customer,
  onBack,
  onEdit,
}: CustomerDetailHeaderProps) {
  const displayName = getCustomerDisplayName(customer);
  const formattedDocument = formatCustomerDocument(customer.document);
  const statusLabel = getCustomerStatusLabel(customer.status);

  return (
    <header className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="appearance-none !bg-transparent !p-0 text-sm font-semibold !text-blue-700 !shadow-none transition hover:!text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            Voltar
          </button>

          <h1 className="mt-4 text-2xl font-bold text-slate-950">
            {displayName}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {customer.legalName}
            {formattedDocument ? ` • ${formattedDocument}` : ""}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              {statusLabel}
            </span>

            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {customer.segment || "Segmento não informado"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          disabled={!onEdit}
          className="w-fit appearance-none rounded-lg border border-slate-200 !bg-white px-4 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Alterar
        </button>
      </div>
    </header>
  );
}
