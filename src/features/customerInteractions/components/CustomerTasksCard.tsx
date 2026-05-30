import {
  getCustomerTaskStatusLabel,
  getInteractionChannelLabel,
} from "../data/customerInteractionOptions";
import type { CustomerTask } from "../types/customerInteraction.types";

type CustomerTasksCardProps = {
  tasks: CustomerTask[];
  loading?: boolean;
  onCreateTask: () => void;
  onEditTask: (task: CustomerTask) => void;
  onCompleteTask: (taskId: string) => void;
};

export function CustomerTasksCard({
  tasks,
  loading = false,
  onCreateTask,
  onEditTask,
  onCompleteTask,
}: CustomerTasksCardProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Tarefas agendadas
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Ações futuras vinculadas a este cliente.
            </p>
          </div>

          <button
            type="button"
            onClick={onCreateTask}
            className="h-10 w-fit appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-4 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Criar tarefa
          </button>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando tarefas...
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <h3 className="text-sm font-semibold text-slate-900">
              Nenhuma tarefa agendada.
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              As próximas ações comerciais deste cliente aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <article
                key={task.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {task.dueDate} às {task.dueTime}
                    </p>

                    {task.details && (
                      <p className="mt-2 text-sm text-slate-500">
                        {task.details}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      {getInteractionChannelLabel(task.channel)}
                    </span>

                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      {getCustomerTaskStatusLabel(task.status)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                  <button
                    type="button"
                    onClick={() => onEditTask(task)}
                    className="appearance-none rounded-lg border border-slate-200 !bg-white px-3 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  >
                    Editar
                  </button>

                  {task.status !== "concluida" && (
                    <button
                      type="button"
                      onClick={() => onCompleteTask(task.id)}
                      className="appearance-none rounded-lg border border-green-200 !bg-white px-3 py-2 text-sm font-semibold !text-green-700 !shadow-none transition hover:!bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-100"
                    >
                      Marcar como realizada
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
