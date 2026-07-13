import type { Customer } from "../../../types/crm";
import {
  customerOpportunityFunnelOptions,
  customerOpportunityLabelOptions,
  customerOpportunityStatusOptions,
} from "../data/customerOpportunityOptions";
import type {
  CustomerOpportunityFunnel,
  CustomerOpportunityLabel,
  CustomerOpportunityStatus,
} from "../types/customerOpportunity.types";

export type OpportunityKanbanFiltersValues = {
  customerId: string;
  funnel: string;
  status: string;
  label: string;
};

type OpportunityKanbanFiltersProps = {
  values: OpportunityKanbanFiltersValues;
  searchTerm: string;
  customers: Customer[];
  hasActiveFilters: boolean;
  onChange: <Key extends keyof OpportunityKanbanFiltersValues>(
    key: Key,
    value: OpportunityKanbanFiltersValues[Key]
  ) => void;
  onSearchTermChange: (searchTerm: string) => void;
  onClear: () => void;
};

const fieldClassName =
  "mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function getCustomerLabel(customer: Customer) {
  return customer.tradeName || customer.legalName || customer.nome;
}

export function OpportunityKanbanFilters({
  values,
  searchTerm,
  customers,
  hasActiveFilters,
  onChange,
  onSearchTermChange,
  onClear,
}: OpportunityKanbanFiltersProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="grid flex-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="block text-xs font-bold uppercase text-slate-500 md:col-span-2 xl:col-span-4">
            Buscar oportunidade
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              placeholder="Buscar por oportunidade, cliente, status ou etiqueta..."
              className={fieldClassName}
            />
          </label>

          <label className="block text-xs font-bold uppercase text-slate-500">
            Cliente
            <select
              value={values.customerId}
              onChange={(event) => onChange("customerId", event.target.value)}
              className={fieldClassName}
            >
              <option value="">Todos os clientes</option>
              {customers.map((customer) => (
                <option key={customer.id} value={String(customer.id)}>
                  {getCustomerLabel(customer)}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-bold uppercase text-slate-500">
            Funil
            <select
              value={values.funnel}
              onChange={(event) =>
                onChange(
                  "funnel",
                  event.target.value as CustomerOpportunityFunnel | ""
                )
              }
              className={fieldClassName}
            >
              <option value="">Todos os funis</option>
              {customerOpportunityFunnelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-bold uppercase text-slate-500">
            Status
            <select
              value={values.status}
              onChange={(event) =>
                onChange(
                  "status",
                  event.target.value as CustomerOpportunityStatus | ""
                )
              }
              className={fieldClassName}
            >
              <option value="">Todos os status</option>
              {customerOpportunityStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs font-bold uppercase text-slate-500">
            Etiqueta
            <select
              value={values.label}
              onChange={(event) =>
                onChange(
                  "label",
                  event.target.value as CustomerOpportunityLabel | ""
                )
              }
              className={fieldClassName}
            >
              <option value="">Todas as etiquetas</option>
              {customerOpportunityLabelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className="h-10 rounded-lg border border-slate-200 !bg-white px-4 text-sm font-bold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Limpar filtros
        </button>
      </div>

      {hasActiveFilters ? (
        <p className="mt-3 text-xs font-semibold uppercase text-blue-700">
          Resultados com filtros aplicados
        </p>
      ) : null}
    </section>
  );
}
