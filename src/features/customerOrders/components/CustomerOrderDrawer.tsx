import type { CustomerOrderFormValues } from "../types/customerOrder.types";
import { CustomerOrderForm } from "./CustomerOrderForm";

type CustomerOrderDrawerProps = {
  open: boolean;
  mode: "create" | "edit";
  initialValues: CustomerOrderFormValues;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: CustomerOrderFormValues) => void;
};

export function CustomerOrderDrawer({
  open,
  mode,
  initialValues,
  loading = false,
  onClose,
  onSubmit,
}: CustomerOrderDrawerProps) {
  if (!open) {
    return null;
  }

  const isCreateMode = mode === "create";
  const title = isCreateMode
    ? "Criar pedido/orçamento"
    : "Editar pedido/orçamento";
  const submitLabel = isCreateMode ? "Criar registro" : "Salvar alterações";

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40">
      <button
        type="button"
        aria-label="Fechar formulário de pedido ou orçamento"
        className="absolute inset-0 cursor-default appearance-none !bg-transparent !shadow-none focus:outline-none"
        onClick={onClose}
      />

      <aside className="relative flex h-full w-full max-w-3xl flex-col bg-white shadow-2xl">
        <header className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                {isCreateMode ? "Novo registro" : "Edição de registro"}
              </span>

              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                {title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Registre um orçamento ou pedido vinculado a este cliente.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="appearance-none rounded-lg border border-slate-200 !bg-white px-3 py-2 text-sm font-semibold !text-slate-600 !shadow-none transition hover:!bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Fechar
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <CustomerOrderForm
            initialValues={initialValues}
            submitLabel={submitLabel}
            loading={loading}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </aside>
    </div>
  );
}
