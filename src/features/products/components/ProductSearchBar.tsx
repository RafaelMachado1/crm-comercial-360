type ProductSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function ProductSearchBar({
  value,
  onChange,
  placeholder = "Buscar por nome, código ou SKU...",
}: ProductSearchBarProps) {
  const hasValue = value.trim().length > 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <label
            htmlFor="product-search"
            className="text-sm font-semibold text-slate-900"
          >
            Buscar produtos
          </label>

          <p className="mt-1 text-xs text-slate-500">
            Pesquise por nome, código ou SKU para localizar produtos mais rápido.
          </p>
        </div>

        {hasValue ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="h-9 w-fit appearance-none rounded-lg border border-slate-200 !bg-white px-3 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Limpar
          </button>
        ) : null}
      </div>

      <div className="mt-4">
        <input
          id="product-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}
