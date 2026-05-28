import type { CustomerListFilters } from "../types/customer.types";

type CustomerSearchBarProps = {
  filters: CustomerListFilters;
  statusOptions: Array<{
    value: string;
    label: string;
  }>;
  segmentOptions: string[];
  stateOptions: string[];
  onFiltersChange: (filters: CustomerListFilters) => void;
  onClearFilters: () => void;
  onCreateCustomer: () => void;
};

export function CustomerSearchBar({
  filters,
  statusOptions,
  segmentOptions,
  stateOptions,
  onFiltersChange,
  onClearFilters,
  onCreateCustomer,
}: CustomerSearchBarProps) {
  function updateFilter<Key extends keyof CustomerListFilters>(
    key: Key,
    value: CustomerListFilters[Key]
  ) {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-col gap-3 md:flex-row md:items-end">
            <div className="flex-1">
              <label
                htmlFor="customer-search"
                className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Buscar cliente
              </label>

              <input
                id="customer-search"
                type="search"
                value={filters.searchTerm}
                onChange={(event) =>
                  updateFilter("searchTerm", event.target.value)
                }
                placeholder="Pesquise por nome, razão social, CNPJ ou CPF"
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="button"
              onClick={onCreateCustomer}
              className="h-11 w-full appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-4 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 md:w-auto"
            >
              + Cadastrar cliente
            </button>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label
                htmlFor="customer-city"
                className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Cidade
              </label>

              <input
                id="customer-city"
                type="text"
                value={filters.city}
                onChange={(event) => updateFilter("city", event.target.value)}
                placeholder="Filtrar por cidade"
                className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="customer-state"
                className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Estado
              </label>

              <select
                id="customer-state"
                value={filters.state}
                onChange={(event) => updateFilter("state", event.target.value)}
                className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Todos</option>

                {stateOptions.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="customer-segment"
                className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Segmento
              </label>

              <select
                id="customer-segment"
                value={filters.segment}
                onChange={(event) =>
                  updateFilter("segment", event.target.value)
                }
                className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Todos</option>

                {segmentOptions.map((segment) => (
                  <option key={segment} value={segment}>
                    {segment}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="customer-status"
                className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500"
              >
                Status
              </label>

              <select
                id="customer-status"
                value={filters.status}
                onChange={(event) =>
                  updateFilter("status", event.target.value)
                }
                className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Todos</option>

                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClearFilters}
          className="h-10 w-full appearance-none rounded-lg border border-slate-200 !bg-white px-4 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 xl:w-auto"
        >
          Limpar filtros
        </button>
      </div>
    </section>
  );
}
