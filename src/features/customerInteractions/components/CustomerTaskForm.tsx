import {
  customerTaskStatusOptions,
  interactionChannelOptions,
} from "../data/customerInteractionOptions";
import type { CustomerTaskFormValues } from "../types/customerInteraction.types";

export type CustomerTaskFormProps = {
  values: CustomerTaskFormValues;
  channelOptions: typeof interactionChannelOptions;
  statusOptions: typeof customerTaskStatusOptions;
  onChange: <Key extends keyof CustomerTaskFormValues>(
    key: Key,
    value: CustomerTaskFormValues[Key]
  ) => void;
};

const fieldClassName =
  "mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export function CustomerTaskForm({
  values,
  channelOptions,
  statusOptions,
  onChange,
}: CustomerTaskFormProps) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-semibold text-slate-700">
          Título da tarefa
          <input
            type="text"
            value={values.title}
            onChange={(event) => onChange("title", event.target.value)}
            className={fieldClassName}
          />
        </label>
      </div>

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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Meio de contato
          <select
            value={values.channel}
            onChange={(event) =>
              onChange(
                "channel",
                event.target.value as CustomerTaskFormValues["channel"]
              )
            }
            className={fieldClassName}
          >
            {channelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold text-slate-700">
          Status
          <select
            value={values.status}
            onChange={(event) =>
              onChange(
                "status",
                event.target.value as CustomerTaskFormValues["status"]
              )
            }
            className={fieldClassName}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-700">
        Detalhes
        <textarea
          value={values.details}
          onChange={(event) => onChange("details", event.target.value)}
          rows={5}
          className="mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </label>
    </div>
  );
}
