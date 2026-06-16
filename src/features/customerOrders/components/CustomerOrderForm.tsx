import { useEffect, useState } from "react";

import {
  customerOrderStatusOptions,
  customerOrderTypeOptions,
} from "../data/customerOrderOptions";
import { useProducts } from "../../products/hooks/useProducts";
import type { CustomerOrderFormValues } from "../types/customerOrder.types";
import { calculateCustomerOrderItemsTotal } from "../utils/customerOrderItemCalculations";
import { CustomerOrderItemsEditor } from "./CustomerOrderItemsEditor";

type CustomerOrderFormProps = {
  initialValues: CustomerOrderFormValues;
  submitLabel: string;
  loading?: boolean;
  onSubmit: (values: CustomerOrderFormValues) => void;
  onCancel: () => void;
};

const fieldClassName =
  "mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

const textareaClassName =
  "mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

export function CustomerOrderForm({
  initialValues,
  submitLabel,
  loading = false,
  onSubmit,
  onCancel,
}: CustomerOrderFormProps) {
  const [values, setValues] =
    useState<CustomerOrderFormValues>(initialValues);
  const {
    products,
    isLoading: isLoadingProducts,
  } = useProducts();

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const items = values.items ?? [];
  const hasItems = items.length > 0;
  const automaticTotal = calculateCustomerOrderItemsTotal(items);

  function handleChange<Key extends keyof CustomerOrderFormValues>(
    key: Key,
    value: CustomerOrderFormValues[Key]
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      ...values,
      totalValue: hasItems ? String(automaticTotal) : values.totalValue,
      items,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block text-sm font-semibold text-slate-700">
        Título
        <input
          type="text"
          value={values.title}
          onChange={(event) => handleChange("title", event.target.value)}
          placeholder="Ex.: Orçamento de fornecimento mensal"
          disabled={loading}
          className={fieldClassName}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Tipo
          <select
            value={values.type}
            onChange={(event) =>
              handleChange(
                "type",
                event.target.value as CustomerOrderFormValues["type"]
              )
            }
            disabled={loading}
            className={fieldClassName}
          >
            {customerOrderTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Status
          <select
            value={values.status}
            onChange={(event) =>
              handleChange(
                "status",
                event.target.value as CustomerOrderFormValues["status"]
              )
            }
            disabled={loading}
            className={fieldClassName}
          >
            {customerOrderStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-700">
        Valor total
        <input
          type="text"
          inputMode="decimal"
          value={hasItems ? String(automaticTotal) : values.totalValue}
          onChange={(event) => handleChange("totalValue", event.target.value)}
          placeholder="Ex.: 3250.00"
          disabled={loading || hasItems}
          className={fieldClassName}
        />
        {hasItems ? (
          <span className="mt-1 block text-xs font-medium text-slate-500">
            Total calculado automaticamente pelos itens adicionados.
          </span>
        ) : null}
      </label>

      <CustomerOrderItemsEditor
        items={items}
        products={products}
        onChange={(updatedItems) => handleChange("items", updatedItems)}
        isLoadingProducts={isLoadingProducts}
        disabled={loading}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Previsão de fechamento
          <input
            type="date"
            value={values.expectedCloseDate}
            onChange={(event) =>
              handleChange("expectedCloseDate", event.target.value)
            }
            disabled={loading}
            className={fieldClassName}
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Data de emissão
          <input
            type="date"
            value={values.issuedAt}
            onChange={(event) => handleChange("issuedAt", event.target.value)}
            disabled={loading}
            className={fieldClassName}
          />
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-700">
        Detalhes
        <textarea
          value={values.details}
          onChange={(event) => handleChange("details", event.target.value)}
          placeholder="Observações sobre o pedido ou orçamento"
          rows={5}
          disabled={loading}
          className={textareaClassName}
        />
      </label>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="h-11 appearance-none rounded-lg border border-slate-200 !bg-white px-5 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="h-11 appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-5 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
