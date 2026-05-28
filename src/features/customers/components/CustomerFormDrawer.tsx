import type { ReactNode } from "react";

export type CustomerFormMode = "create" | "edit";

type CustomerFormDrawerProps = {
  isOpen: boolean;
  mode: CustomerFormMode;
  title?: string;
  description?: string;
  children?: ReactNode;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSubmitAndCreateAnother?: () => void;
};

export function CustomerFormDrawer({
  isOpen,
  mode,
  title,
  description,
  children,
  isSubmitting = false,
  onClose,
  onSubmit,
  onSubmitAndCreateAnother,
}: CustomerFormDrawerProps) {
  if (!isOpen) {
    return null;
  }

  const drawerTitle =
    title || (mode === "create" ? "Cadastrar cliente" : "Alterar cliente");

  const drawerDescription =
    description ||
    (mode === "create"
      ? "Preencha os dados principais para cadastrar um novo cliente."
      : "Atualize os dados cadastrais do cliente selecionado.");

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40">
      <button
        type="button"
        aria-label="Fechar formulário"
        className="absolute inset-0 cursor-default appearance-none !bg-transparent !shadow-none focus:outline-none"
        onClick={onClose}
      />

      <aside className="relative flex h-full w-full max-w-3xl flex-col bg-white shadow-2xl">
        <header className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                {mode === "create" ? "Novo cliente" : "Edição de cliente"}
              </span>

              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                {drawerTitle}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {drawerDescription}
              </p>
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
          {children ? (
            children
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <h3 className="text-base font-semibold text-slate-900">
                Formulário em construção
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                As seções de dados principais, endereço e contatos serão
                adicionadas nos próximos blocos da Fase 12.
              </p>
            </div>
          )}
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

            {mode === "create" && onSubmitAndCreateAnother ? (
              <button
                type="button"
                onClick={onSubmitAndCreateAnother}
                disabled={isSubmitting}
                className="h-11 appearance-none rounded-lg border border-blue-200 !bg-white px-5 text-sm font-semibold !text-blue-700 !shadow-none transition hover:!bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Salvar e cadastrar outro
              </button>
            ) : null}

            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="h-11 appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-5 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
}
