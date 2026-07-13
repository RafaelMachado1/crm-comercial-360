import type { Customer } from "../../../types/crm";
import {
  customerOpportunityFunnelOptions,
  customerOpportunityLabelOptions,
  customerOpportunityStageOptions,
  customerOpportunityStatusOptions,
} from "../data/customerOpportunityOptions";
import type { CustomerOpportunityFormValues } from "../types/customerOpportunity.types";
import { CustomerOpportunityForm } from "./CustomerOpportunityForm";
import type { CustomerOpportunityFormProps } from "./CustomerOpportunityForm";

export type OpportunityKanbanDrawerMode = "create" | "edit";

export type OpportunityKanbanFormValues = CustomerOpportunityFormValues & {
  customerId: string;
};

type OpportunityKanbanDrawerProps = {
  isOpen: boolean;
  mode: OpportunityKanbanDrawerMode;
  values: OpportunityKanbanFormValues;
  customers: Customer[];
  formError?: string;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChangeCustomerId: (customerId: string) => void;
  onChangeOpportunity: CustomerOpportunityFormProps["onChange"];
};

const fieldClassName =
  "mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function getCustomerLabel(customer: Customer) {
  return customer.tradeName || customer.legalName || customer.nome;
}

export function OpportunityKanbanDrawer({
  isOpen,
  mode,
  values,
  customers,
  formError = "",
  isSubmitting = false,
  onClose,
  onSubmit,
  onChangeCustomerId,
  onChangeOpportunity,
}: OpportunityKanbanDrawerProps) {
  if (!isOpen) {
    return null;
  }

  const isCreateMode = mode === "create";

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40">
      <button
        type="button"
        aria-label="Fechar formulário de oportunidade"
        className="absolute inset-0 cursor-default appearance-none !bg-transparent !shadow-none focus:outline-none"
        onClick={onClose}
      />

      <aside className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
        <header className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                {isCreateMode ? "Nova oportunidade" : "Edição de oportunidade"}
              </span>

              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                {isCreateMode ? "Criar oportunidade" : "Editar oportunidade"}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="appearance-none rounded-lg border border-slate-200 !bg-white px-3 py-2 text-sm font-semibold !text-slate-600 !shadow-none transition hover:!bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Fechar
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            {formError ? (
              <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-700">
                {formError}
              </div>
            ) : null}

            <label className="block text-sm font-semibold text-slate-700">
              Cliente
              <select
                value={values.customerId}
                onChange={(event) => onChangeCustomerId(event.target.value)}
                className={fieldClassName}
              >
                <option value="">Selecione um cliente</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={String(customer.id)}>
                    {getCustomerLabel(customer)}
                  </option>
                ))}
              </select>
            </label>

            <CustomerOpportunityForm
              values={values}
              funnelOptions={customerOpportunityFunnelOptions}
              stageOptions={customerOpportunityStageOptions}
              statusOptions={customerOpportunityStatusOptions}
              labelOptions={customerOpportunityLabelOptions}
              onChange={onChangeOpportunity}
            />
          </div>
        </div>

        <footer className="border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-11 appearance-none rounded-lg border border-slate-200 !bg-white px-5 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="h-11 appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-5 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Salvando..."
                : isCreateMode
                  ? "Criar oportunidade"
                  : "Salvar alterações"}
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
}
