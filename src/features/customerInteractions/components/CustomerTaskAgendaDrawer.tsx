import { interactionChannelOptions } from "../data/customerInteractionOptions";
import type { InteractionChannel } from "../types/customerInteraction.types";

export type CustomerTaskAgendaDrawerMode = "create" | "edit";

export type CustomerTaskAgendaValues = {
  dueDate: string;
  dueTime: string;
  channel: InteractionChannel;
  details: string;
  completed: boolean;
};

type CustomerTaskAgendaDrawerProps = {
  isOpen: boolean;
  mode: CustomerTaskAgendaDrawerMode;
  values: CustomerTaskAgendaValues;
  isSubmitting?: boolean;
  canDelete?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onDelete?: () => void;
  onChange: <Key extends keyof CustomerTaskAgendaValues>(
    key: Key,
    value: CustomerTaskAgendaValues[Key]
  ) => void;
};

const fieldClassName =
  "mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const taskContactChannelOptions = interactionChannelOptions.filter((option) => {
  return option.value !== "reuniao";
});

export function CustomerTaskAgendaDrawer({
  isOpen,
  mode,
  values,
  isSubmitting = false,
  canDelete = false,
  onClose,
  onSubmit,
  onDelete,
  onChange,
}: CustomerTaskAgendaDrawerProps) {
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
              <h2 className="text-2xl font-bold text-slate-950">
                {isCreateMode ? "Criar tarefa" : "Editar tarefa"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {isCreateMode
                  ? "Agende uma próxima ação para este cliente."
                  : "Atualize a tarefa agendada."}
              </p>
            </div>

            <button
              type="button"
              aria-label="Fechar"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 !bg-white text-lg font-bold !text-slate-600 !shadow-none transition hover:!bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              ×
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Data
                <input
                  type="date"
                  value={values.dueDate}
                  onChange={(event) => onChange("dueDate", event.target.value)}
                  className={fieldClassName}
                />
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Hora
                <input
                  type="time"
                  value={values.dueTime}
                  onChange={(event) => onChange("dueTime", event.target.value)}
                  className={fieldClassName}
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              Meio de contato
              <select
                value={values.channel}
                onChange={(event) =>
                  onChange("channel", event.target.value as InteractionChannel)
                }
                className={fieldClassName}
              >
                {taskContactChannelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Detalhes
              <textarea
                value={values.details}
                onChange={(event) => onChange("details", event.target.value)}
                rows={5}
                className="mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            {!isCreateMode ? (
              <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={values.completed}
                  onChange={(event) => onChange("completed", event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Marcar como realizado
              </label>
            ) : null}
          </div>
        </div>

        <footer className="border-t border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {!isCreateMode && canDelete ? (
              <button
                type="button"
                onClick={onDelete}
                disabled={isSubmitting}
                className="h-11 rounded-lg border border-red-200 !bg-white px-5 text-sm font-semibold !text-red-700 !shadow-none transition hover:!bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Excluir
              </button>
            ) : (
              <span />
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="h-11 rounded-lg border border-slate-200 !bg-white px-5 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="h-11 rounded-lg border border-blue-600 !bg-blue-600 px-5 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </footer>
      </aside>
    </div>
  );
}
