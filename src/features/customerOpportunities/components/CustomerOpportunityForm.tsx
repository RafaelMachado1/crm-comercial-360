import {
  customerOpportunityFunnelOptions,
  customerOpportunityLabelOptions,
  customerOpportunityStageOptions,
  customerOpportunityStatusOptions,
} from "../data/customerOpportunityOptions";
import type { CustomerOpportunityFormValues } from "../types/customerOpportunity.types";

export type CustomerOpportunityFormProps = {
  values: CustomerOpportunityFormValues;
  funnelOptions: typeof customerOpportunityFunnelOptions;
  stageOptions: typeof customerOpportunityStageOptions;
  statusOptions: typeof customerOpportunityStatusOptions;
  labelOptions: typeof customerOpportunityLabelOptions;
  onChange: <Key extends keyof CustomerOpportunityFormValues>(
    key: Key,
    value: CustomerOpportunityFormValues[Key]
  ) => void;
};

const fieldClassName =
  "mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export function CustomerOpportunityForm({
  values,
  funnelOptions,
  stageOptions,
  statusOptions,
  labelOptions,
  onChange,
}: CustomerOpportunityFormProps) {
  return (
    <div className="space-y-5">
      <label className="block text-sm font-semibold text-slate-700">
        Título da oportunidade
        <input
          type="text"
          value={values.title}
          onChange={(event) => onChange("title", event.target.value)}
          placeholder="Ex.: Proposta de fornecimento mensal"
          className={fieldClassName}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Funil
          <select
            value={values.funnel}
            onChange={(event) =>
              onChange(
                "funnel",
                event.target.value as CustomerOpportunityFormValues["funnel"]
              )
            }
            className={fieldClassName}
          >
            {funnelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Etapa
          <select
            value={values.stage}
            onChange={(event) =>
              onChange(
                "stage",
                event.target.value as CustomerOpportunityFormValues["stage"]
              )
            }
            className={fieldClassName}
          >
            {stageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Valor estimado
          <input
            type="text"
            inputMode="decimal"
            value={values.value}
            onChange={(event) => onChange("value", event.target.value)}
            placeholder="Ex.: 8500"
            className={fieldClassName}
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Status
          <select
            value={values.status}
            onChange={(event) =>
              onChange(
                "status",
                event.target.value as CustomerOpportunityFormValues["status"]
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

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Etiqueta
          <select
            value={values.label}
            onChange={(event) =>
              onChange(
                "label",
                event.target.value as CustomerOpportunityFormValues["label"]
              )
            }
            className={fieldClassName}
          >
            {labelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Previsão de fechamento
          <input
            type="date"
            value={values.expectedCloseDate}
            onChange={(event) =>
              onChange("expectedCloseDate", event.target.value)
            }
            className={fieldClassName}
          />
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-700">
        Detalhes
        <textarea
          value={values.details}
          onChange={(event) => onChange("details", event.target.value)}
          placeholder="Descreva o contexto da oportunidade, necessidade do cliente ou próximos passos."
          rows={5}
          className="mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </label>
    </div>
  );
}
