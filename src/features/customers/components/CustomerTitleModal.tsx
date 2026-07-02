import { useEffect, useState } from "react";

import type {
  CustomerTitle,
  CustomerTitleInput,
} from "../../customerTitles/types/customerTitle.types";

type CustomerTitleFormValues = {
  amount: string;
  dueDate: string;
  documentNumber: string;
  paymentDate: string;
  observation: string;
};

type CustomerTitleModalProps = {
  isOpen: boolean;
  customerId: number;
  title?: CustomerTitle | null;
  onClose: () => void;
  onSubmit: (input: CustomerTitleInput, addAnother: boolean) => void;
};

const emptyFormValues: CustomerTitleFormValues = {
  amount: "",
  dueDate: "",
  documentNumber: "",
  paymentDate: "",
  observation: "",
};

function formatAmountInput(value: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseAmount(value: string) {
  const normalizedValue = value
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  return Number(normalizedValue);
}

function createValuesFromTitle(title?: CustomerTitle | null) {
  if (!title) {
    return emptyFormValues;
  }

  return {
    amount: formatAmountInput(title.amount),
    dueDate: title.dueDate,
    documentNumber: title.documentNumber,
    paymentDate: title.paymentDate || "",
    observation: title.observation || "",
  };
}

export function CustomerTitleModal({
  isOpen,
  customerId,
  title,
  onClose,
  onSubmit,
}: CustomerTitleModalProps) {
  const [values, setValues] = useState<CustomerTitleFormValues>(
    createValuesFromTitle(title)
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValues(createValuesFromTitle(title));
      setError("");
    }
  }, [isOpen, title]);

  if (!isOpen) {
    return null;
  }

  function updateField<Key extends keyof CustomerTitleFormValues>(
    key: Key,
    value: CustomerTitleFormValues[Key]
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));
  }

  function submitForm(addAnother: boolean) {
    const amount = parseAmount(values.amount);

    if (!values.amount.trim() || Number.isNaN(amount) || amount <= 0) {
      setError("Informe um valor maior que zero.");
      return;
    }

    if (!values.dueDate) {
      setError("Informe a data de vencimento.");
      return;
    }

    if (!values.documentNumber.trim()) {
      setError("Informe o número do documento.");
      return;
    }

    onSubmit(
      {
        customerId,
        amount,
        dueDate: values.dueDate,
        documentNumber: values.documentNumber.trim(),
        paymentDate: values.paymentDate || undefined,
        observation: values.observation.trim() || undefined,
        orderId: title?.orderId,
        orderNumber: title?.orderNumber,
      },
      addAnother
    );

    if (addAnother) {
      setValues(emptyFormValues);
      setError("");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6">
      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-bold text-slate-950">
            Adicionar título
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 !bg-white text-lg font-bold !text-slate-500 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 p-5">
          {error ? (
            <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          <div>
            <label
              htmlFor="customer-title-amount"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Valor
            </label>
            <input
              id="customer-title-amount"
              type="text"
              inputMode="decimal"
              value={values.amount}
              onChange={(event) => updateField("amount", event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="0,00"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="customer-title-due-date"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Data de vencimento
              </label>
              <input
                id="customer-title-due-date"
                type="date"
                value={values.dueDate}
                onChange={(event) => updateField("dueDate", event.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="customer-title-payment-date"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Data de pagamento
              </label>
              <input
                id="customer-title-payment-date"
                type="date"
                value={values.paymentDate}
                onChange={(event) =>
                  updateField("paymentDate", event.target.value)
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="customer-title-document"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Número do documento
            </label>
            <input
              id="customer-title-document"
              type="text"
              value={values.documentNumber}
              onChange={(event) =>
                updateField("documentNumber", event.target.value)
              }
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="customer-title-observation"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Observação
            </label>
            <textarea
              id="customer-title-observation"
              value={values.observation}
              onChange={(event) =>
                updateField("observation", event.target.value)
              }
              className="min-h-24 w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 !bg-white px-4 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => submitForm(true)}
            className="rounded-lg border border-blue-200 !bg-blue-50 px-4 py-2 text-sm font-semibold !text-blue-700 !shadow-none transition hover:!bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            Salvar e adicionar outro
          </button>
          <button
            type="button"
            onClick={() => submitForm(false)}
            className="rounded-lg !bg-blue-600 px-4 py-2 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
