import {
  customerTaskStatusOptions,
  interactionChannelOptions,
} from "../data/customerInteractionOptions";
import type { CustomerTaskFormValues } from "../types/customerInteraction.types";
import {
  CustomerTaskForm,
  type CustomerTaskFormProps,
} from "./CustomerTaskForm";

export type CustomerTaskDrawerMode = "create" | "edit";

type CustomerTaskDrawerProps = {
  isOpen: boolean;
  mode: CustomerTaskDrawerMode;
  values: CustomerTaskFormValues;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onChange: CustomerTaskFormProps["onChange"];
};

export function CustomerTaskDrawer({
  isOpen,
  mode,
  values,
  isSubmitting = false,
  onClose,
  onSubmit,
  onChange,
}: CustomerTaskDrawerProps) {
  if (!isOpen) {
    return null;
  }

  const isCreateMode = mode === "create";

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40">
      <button
        type="button"
        aria-label="Fechar formulário de tarefa"
        className="absolute inset-0 cursor-default appearance-none !bg-transparent !shadow-none focus:outline-none"
        onClick={onClose}
      />

      <aside className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
        <header className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                {isCreateMode ? "Nova tarefa" : "Edição de tarefa"}
              </span>

              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                {isCreateMode ? "Criar tarefa" : "Editar tarefa"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {isCreateMode
                  ? "Agende uma próxima ação comercial para este cliente."
                  : "Atualize os dados da tarefa agendada."}
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
          <CustomerTaskForm
            values={values}
            channelOptions={interactionChannelOptions}
            statusOptions={customerTaskStatusOptions}
            onChange={onChange}
          />
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
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
}
