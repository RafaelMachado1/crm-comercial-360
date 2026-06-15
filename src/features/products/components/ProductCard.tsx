import {
  getProductCategoryLabel,
  getProductStatusLabel,
  getProductUnitLabel,
} from "../data/productOptions";
import type { ProfessionalProduct } from "../types/product.types";

type ProductCardProps = {
  product: ProfessionalProduct;
  onEdit?: (product: ProfessionalProduct) => void;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getStatusStyles(status: ProfessionalProduct["status"]) {
  if (status === "active") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-600";
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-4 md:flex-row md:items-start">
          <div className="flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-400 md:w-24">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <span>Sem imagem</span>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {product.name}
                </h3>

                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <span>SKU {product.sku}</span>
                  {product.brand ? <span>Fabricante: {product.brand}</span> : null}
                </div>
              </div>

              <span
                className={[
                  "inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold",
                  getStatusStyles(product.status),
                ].join(" ")}
              >
                {getProductStatusLabel(product.status)}
              </span>
            </div>

            <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Categoria
                </span>
                <span className="mt-1 block font-medium text-slate-700">
                  {getProductCategoryLabel(product.category)}
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Unidade
                </span>
                <span className="mt-1 block font-medium text-slate-700">
                  {getProductUnitLabel(product.unit)}
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Preço
                </span>
                <span className="mt-1 block font-medium text-slate-700">
                  {formatCurrency(product.price)}
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Estoque
                </span>
                <span className="mt-1 block font-medium text-slate-700">
                  {product.stock}
                </span>
              </div>
            </div>

            {product.description ? (
              <p className="max-w-4xl text-sm leading-6 text-slate-500">
                {product.description}
              </p>
            ) : null}
          </div>
        </div>

        {onEdit ? (
          <div className="flex shrink-0 justify-end lg:pt-1">
            <button
              type="button"
              onClick={() => onEdit(product)}
              className="appearance-none rounded-lg border border-slate-200 !bg-white px-3 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              Editar
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
