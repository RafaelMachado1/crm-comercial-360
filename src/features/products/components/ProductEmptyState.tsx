type ProductEmptyStateProps = {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function ProductEmptyState({
  title = "Nenhum produto encontrado",
  description = "Cadastre produtos para montar uma base comercial pronta para orçamentos e pedidos.",
  actionLabel,
  onAction,
}: ProductEmptyStateProps) {
  const showAction = Boolean(actionLabel && onAction);

  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>

      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
        {description}
      </p>

      {showAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-4 py-2 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
