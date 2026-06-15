import { useEffect, useState, type FormEvent } from "react";

import {
  PRODUCT_CATEGORY_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
  PRODUCT_UNIT_OPTIONS,
} from "../data/productOptions";
import type { ProductFormValues } from "../types/product.types";

type ProductFormContentProps = {
  initialValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
};

type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>;

type ProductDraftValues = Omit<ProductFormValues, "price" | "stock"> & {
  price: string;
  stock: string;
};

const fieldClassName =
  "mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

const textareaClassName =
  "mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

const errorClassName = "mt-1 text-xs font-semibold text-red-600";

function createDefaultProductFormValues(
  initialValues?: Partial<ProductFormValues>
): ProductFormValues {
  return {
    sku: initialValues?.sku ?? "",
    name: initialValues?.name ?? "",
    category:
      initialValues?.category ?? PRODUCT_CATEGORY_OPTIONS[0]?.value ?? "cleaning",
    unit: initialValues?.unit ?? PRODUCT_UNIT_OPTIONS[0]?.value ?? "unit",
    price: initialValues?.price ?? 0,
    stock: initialValues?.stock ?? 0,
    status: initialValues?.status ?? PRODUCT_STATUS_OPTIONS[0]?.value ?? "active",
    brand: initialValues?.brand ?? "",
    imageUrl: initialValues?.imageUrl ?? "",
    description: initialValues?.description ?? "",
  };
}

function createDraftValues(values: ProductFormValues): ProductDraftValues {
  return {
    ...values,
    brand: values.brand ?? "",
    imageUrl: values.imageUrl ?? "",
    price: String(values.price),
    stock: String(values.stock),
  };
}

function parseDecimalValue(value: string): number {
  return Number(value.replace(",", "."));
}

function parseIntegerValue(value: string): number {
  const trimmedValue = value.trim();

  if (!/^\d+$/.test(trimmedValue)) {
    return Number.NaN;
  }

  return Number.parseInt(trimmedValue, 10);
}

function createProductFormValuesFromDraft(
  values: ProductDraftValues
): ProductFormValues {
  return {
    ...values,
    price: parseDecimalValue(values.price),
    stock: parseIntegerValue(values.stock),
  };
}

function validateProductForm(values: ProductFormValues): ProductFormErrors {
  const errors: ProductFormErrors = {};

  if (!values.sku.trim()) {
    errors.sku = "Código/SKU é obrigatório.";
  }

  if (!values.name.trim()) {
    errors.name = "Nome do produto é obrigatório.";
  }

  if (!values.category) {
    errors.category = "Categoria é obrigatória.";
  }

  if (!values.unit) {
    errors.unit = "Unidade é obrigatória.";
  }

  if (Number.isNaN(values.price) || values.price < 0) {
    errors.price = "Preço deve ser um número maior ou igual a zero.";
  }

  if (Number.isNaN(values.stock) || values.stock < 0) {
    errors.stock = "Estoque deve ser um número inteiro maior ou igual a zero.";
  }

  if (!values.status) {
    errors.status = "Status é obrigatório.";
  }

  return errors;
}

export function ProductFormContent({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Salvar produto",
}: ProductFormContentProps) {
  const [values, setValues] = useState<ProductDraftValues>(() =>
    createDraftValues(createDefaultProductFormValues(initialValues))
  );
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [imagePreviewHasError, setImagePreviewHasError] = useState(false);

  useEffect(() => {
    setValues(createDraftValues(createDefaultProductFormValues(initialValues)));
    setErrors({});
    setImagePreviewHasError(false);
  }, [initialValues]);

  function handleChange<Key extends keyof ProductDraftValues>(
    key: Key,
    value: ProductDraftValues[Key]
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [key]: "",
    }));

    if (key === "imageUrl") {
      setImagePreviewHasError(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextValues: ProductFormValues = {
      ...createProductFormValuesFromDraft(values),
      sku: values.sku.trim(),
      name: values.name.trim(),
      brand: values.brand?.trim() || undefined,
      imageUrl: values.imageUrl?.trim() || undefined,
      description: values.description.trim(),
    };
    const nextErrors = validateProductForm(nextValues);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit(nextValues);
  }

  const hasImagePreview = Boolean(values.imageUrl?.trim()) && !imagePreviewHasError;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Código/SKU
          <input
            type="text"
            value={values.sku}
            onChange={(event) => handleChange("sku", event.target.value)}
            placeholder="Ex.: SKU-CLN-001"
            disabled={isSubmitting}
            className={fieldClassName}
          />
          {errors.sku ? <p className={errorClassName}>{errors.sku}</p> : null}
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Nome do produto
          <input
            type="text"
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="Ex.: Detergente Neutro Profissional"
            disabled={isSubmitting}
            className={fieldClassName}
          />
          {errors.name ? <p className={errorClassName}>{errors.name}</p> : null}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Marca
          <input
            type="text"
            value={values.brand ?? ""}
            onChange={(event) => handleChange("brand", event.target.value)}
            placeholder="Ex.: CleanMax"
            disabled={isSubmitting}
            className={fieldClassName}
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          URL da imagem
          <input
            type="text"
            value={values.imageUrl ?? ""}
            onChange={(event) => handleChange("imageUrl", event.target.value)}
            placeholder="https://exemplo.com/produto.jpg"
            disabled={isSubmitting}
            className={fieldClassName}
          />
        </label>
      </div>

      {values.imageUrl?.trim() ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Prévia da imagem
          </span>

          {hasImagePreview ? (
            <img
              src={values.imageUrl}
              alt="Prévia do produto"
              className="mt-2 h-28 w-28 rounded-lg border border-slate-200 object-cover"
              onError={() => setImagePreviewHasError(true)}
            />
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              Não foi possível carregar a prévia desta URL.
            </p>
          )}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Categoria
          <select
            value={values.category}
            onChange={(event) =>
              handleChange(
                "category",
                event.target.value as ProductFormValues["category"]
              )
            }
            disabled={isSubmitting}
            className={fieldClassName}
          >
            {PRODUCT_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.category ? (
            <p className={errorClassName}>{errors.category}</p>
          ) : null}
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Unidade
          <select
            value={values.unit}
            onChange={(event) =>
              handleChange(
                "unit",
                event.target.value as ProductFormValues["unit"]
              )
            }
            disabled={isSubmitting}
            className={fieldClassName}
          >
            {PRODUCT_UNIT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.unit ? <p className={errorClassName}>{errors.unit}</p> : null}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm font-semibold text-slate-700">
          Preço
          <input
            type="text"
            inputMode="decimal"
            value={values.price}
            onChange={(event) => handleChange("price", event.target.value)}
            disabled={isSubmitting}
            className={fieldClassName}
          />
          {errors.price ? (
            <p className={errorClassName}>{errors.price}</p>
          ) : null}
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Estoque
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={values.stock}
            onChange={(event) => handleChange("stock", event.target.value)}
            disabled={isSubmitting}
            className={fieldClassName}
          />
          {errors.stock ? (
            <p className={errorClassName}>{errors.stock}</p>
          ) : null}
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Status
          <select
            value={values.status}
            onChange={(event) =>
              handleChange(
                "status",
                event.target.value as ProductFormValues["status"]
              )
            }
            disabled={isSubmitting}
            className={fieldClassName}
          >
            {PRODUCT_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status ? (
            <p className={errorClassName}>{errors.status}</p>
          ) : null}
        </label>
      </div>

      <label className="block text-sm font-semibold text-slate-700">
        Descrição
        <textarea
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          placeholder="Observações comerciais, aplicação ou diferenciais do produto"
          rows={5}
          disabled={isSubmitting}
          className={textareaClassName}
        />
      </label>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="h-11 appearance-none rounded-lg border border-slate-200 !bg-white px-5 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-5 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
