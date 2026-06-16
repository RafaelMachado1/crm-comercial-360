import { getProductUnitLabel } from "../../products/data/productOptions";
import type { CustomerOrderItem } from "../types/customerOrder.types";

type CustomerOrderItemRowProps = {
  item: CustomerOrderItem;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  disabled?: boolean;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function CustomerOrderItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  disabled = false,
}: CustomerOrderItemRowProps) {
  const decreaseDisabled = disabled;

  function handleDecreaseClick() {
    if (disabled) {
      return;
    }

    onDecrease(item.id);
  }

  function handleIncreaseClick() {
    if (disabled) {
      return;
    }

    onIncrease(item.id);
  }

  function handleRemoveClick() {
    if (disabled) {
      return;
    }

    onRemove(item.id);
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-1 gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <span>Sem imagem</span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>

            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              <span>SKU {item.sku}</span>
              {item.brand ? <span>Fabricante: {item.brand}</span> : null}
            </div>

            <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-3">
              <span>Unidade: {getProductUnitLabel(item.unit)}</span>
              <span>Unitário: {formatCurrency(item.unitPrice)}</span>
              <span className="font-semibold text-slate-800">
                Subtotal: {formatCurrency(item.subtotal)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <button
            type="button"
            onClick={handleDecreaseClick}
            disabled={decreaseDisabled}
            aria-label={"Diminuir quantidade de " + item.name}
            className="h-9 w-9 appearance-none rounded-lg border border-slate-200 !bg-white text-lg font-bold leading-none !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            -
          </button>

          <span className="flex h-9 min-w-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={handleIncreaseClick}
            disabled={disabled}
            aria-label={"Aumentar quantidade de " + item.name}
            className="h-9 w-9 appearance-none rounded-lg border border-slate-200 !bg-white text-lg font-bold leading-none !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            +
          </button>

          <button
            type="button"
            onClick={handleRemoveClick}
            disabled={disabled}
            className="h-9 appearance-none rounded-lg border border-red-200 !bg-white px-3 text-sm font-semibold !text-red-700 !shadow-none transition hover:!bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Remover
          </button>
        </div>
      </div>
    </article>
  );
}
