import {
  customerActivityResultOptions,
  customerActivityTypeOptions,
  interactionChannelOptions,
} from "../data/customerInteractionOptions";
import type { CustomerActivityFormValues } from "../types/customerInteraction.types";

export type CustomerActivityFormProps = {
  values: CustomerActivityFormValues;
  activityTypeOptions: typeof customerActivityTypeOptions;
  channelOptions: typeof interactionChannelOptions;
  resultOptions: typeof customerActivityResultOptions;
  onChange: <Key extends keyof CustomerActivityFormValues>(
    key: Key,
    value: CustomerActivityFormValues[Key]
  ) => void;
};

const fieldClassName =
  "mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export function CustomerActivityForm({
  values,
  activityTypeOptions,
  channelOptions,
  resultOptions,
  onChange,
}: CustomerActivityFormProps) {
  return (
    <div className="space-y-5">
      <label className="block text-sm font-semibold text-slate-700">
        Tipo de atividade
        <select
          value={values.type}
          onChange={(event) =>
            onChange(
              "type",
              event.target.value as CustomerActivityFormValues["type"]
            )
          }
          className={fieldClassName}
        >
          {activityTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Data
          <input
            type="date"
            value={values.date}
            onChange={(event) => onChange("date", event.target.value)}
            className={fieldClassName}
          />
        </label>

        <label className="text-sm font-semibold text-slate-700">
          Hora
          <input
            type="time"
            value={values.time}
            onChange={(event) => onChange("time", event.target.value)}
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
                event.target.value as CustomerActivityFormValues["channel"]
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
          Resultado
          <select
            value={values.result}
            onChange={(event) =>
              onChange(
                "result",
                event.target.value as CustomerActivityFormValues["result"]
              )
            }
            className={fieldClassName}
          >
            {resultOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-700">
        Detalhes da atividade
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
