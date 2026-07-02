import { useState } from "react";

import {
  customerActivityResultOptions,
  getInteractionChannelLabel,
} from "../data/customerInteractionOptions";
import type {
  CustomerActivityResult,
  CustomerTask,
} from "../types/customerInteraction.types";

type CustomerTasksPanelProps = {
  tasks: CustomerTask[];
  loading?: boolean;
  isCompleting?: boolean;
  onCreateTask: () => void;
  onEditTask: (task: CustomerTask) => void;
  onCompleteTask: (
    task: CustomerTask,
    result: CustomerActivityResult,
    details: string
  ) => Promise<void>;
};

type TaskStatusView = {
  label: string;
  className: string;
};

const resultOptions = customerActivityResultOptions.filter((option) => {
  return option.value !== "concluido";
});

function getTaskDate(task: CustomerTask) {
  return new Date(`${task.dueDate}T${task.dueTime || "00:00"}`);
}

function formatTaskDate(task: CustomerTask) {
  const date = getTaskDate(task);

  if (Number.isNaN(date.getTime())) {
    return `${task.dueDate} às ${task.dueTime}`;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getTaskStatusView(task: CustomerTask): TaskStatusView {
  if (task.status === "concluida") {
    return {
      label: "Concluída",
      className: "border-green-200 bg-green-50 text-green-700",
    };
  }

  if (task.status === "cancelada") {
    return {
      label: "Cancelada",
      className: "border-slate-200 bg-slate-100 text-slate-500",
    };
  }

  const taskDate = getTaskDate(task);

  if (Number.isNaN(taskDate.getTime())) {
    return {
      label: "Pendente",
      className: "border-blue-100 bg-blue-50 text-blue-700",
    };
  }

  const today = new Date();
  const todayStart = new Date(getDateKey(today) + "T00:00:00");
  const taskStart = new Date(getDateKey(taskDate) + "T00:00:00");
  const diffInDays = Math.round(
    (taskStart.getTime() - todayStart.getTime()) / 86400000
  );

  if (diffInDays < 0 || task.status === "atrasada") {
    return {
      label: "Em atraso",
      className: "border-red-100 bg-red-50 text-red-700",
    };
  }

  if (diffInDays === 0) {
    return {
      label: "Ocorre hoje",
      className: "border-amber-100 bg-amber-50 text-amber-700",
    };
  }

  return {
    label: `Ocorre em ${diffInDays} dia(s)`,
    className: "border-blue-100 bg-blue-50 text-blue-700",
  };
}

export function CustomerTasksPanel({
  tasks,
  loading = false,
  isCompleting = false,
  onCreateTask,
  onEditTask,
  onCompleteTask,
}: CustomerTasksPanelProps) {
  const [completionTaskId, setCompletionTaskId] = useState<string | null>(null);
  const [completionResult, setCompletionResult] =
    useState<CustomerActivityResult>("positivo");
  const [completionDetails, setCompletionDetails] = useState("");

  function handleOpenCompletion(taskId: string) {
    setCompletionTaskId(taskId);
    setCompletionResult("positivo");
    setCompletionDetails("");
  }

  function handleCancelCompletion() {
    setCompletionTaskId(null);
    setCompletionResult("positivo");
    setCompletionDetails("");
  }

  async function handleSubmitCompletion(task: CustomerTask) {
    await onCompleteTask(task, completionResult, completionDetails);
    handleCancelCompletion();
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase text-slate-950">
              Tarefas
            </h2>
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
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando tarefas...
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-600">
              Crie uma tarefa na agenda para lembrar de contatar este cliente.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => {
              const isCompleted = task.status === "concluida";
              const isCompletionOpen = completionTaskId === task.id;
              const statusView = getTaskStatusView(task);

              return (
                <article
                  key={task.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 gap-3">
                      <button
                        type="button"
                        disabled={isCompleted}
                        onClick={() => handleOpenCompletion(task.id)}
                        aria-label="Marcar tarefa como concluída"
                        className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-slate-300 !bg-white !p-0 !shadow-none transition hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-100 disabled:border-green-500 disabled:!bg-green-500"
                      >
                        {isCompleted ? (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        ) : null}
                      </button>

                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-slate-950">
                          {getInteractionChannelLabel(task.channel)}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {formatTaskDate(task)}
                        </p>
                        {task.details ? (
                          <p className="mt-2 text-sm text-slate-500">
                            {task.details}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                      <span
                        className={[
                          "rounded-full border px-3 py-1 text-xs font-semibold",
                          statusView.className,
                        ].join(" ")}
                      >
                        {statusView.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => onEditTask(task)}
                        className="rounded-lg border border-slate-200 !bg-white px-3 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
                      >
                        Editar
                      </button>
                    </div>
                  </div>

                  {isCompletionOpen ? (
                    <div className="mt-4 rounded-lg border border-blue-100 bg-white p-4">
                      <h4 className="text-sm font-bold text-slate-950">
                        Descreva como foi a atividade
                      </h4>

                      <div className="mt-4 grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
                        <label className="text-sm font-semibold text-slate-700">
                          Resultado da atividade
                          <select
                            value={completionResult}
                            onChange={(event) => {
                              setCompletionResult(
                                event.target.value as CustomerActivityResult
                              );
                            }}
                            className="mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          >
                            {resultOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="text-sm font-semibold text-slate-700">
                          Detalhes da atividade
                          <textarea
                            value={completionDetails}
                            onChange={(event) => setCompletionDetails(event.target.value)}
                            rows={3}
                            className="mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </label>
                      </div>

                      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                        <button
                          type="button"
                          onClick={handleCancelCompletion}
                          disabled={isCompleting}
                          className="h-10 rounded-lg border border-slate-200 !bg-white px-4 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSubmitCompletion(task)}
                          disabled={isCompleting}
                          className="h-10 rounded-lg border border-blue-600 !bg-blue-600 px-4 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isCompleting ? "Salvando..." : "Salvar"}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
