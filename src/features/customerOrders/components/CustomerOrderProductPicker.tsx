import { useMemo, useState } from "react";

import type { ProfessionalProduct } from "../../products/types/product.types";
import type { CustomerOrderItem } from "../types/customerOrder.types";

type CustomerOrderProductPickerProps = {
  products: ProfessionalProduct[];
  items: CustomerOrderItem[];
  onIncreaseProduct: (product: ProfessionalProduct) => void;
  onDecreaseProduct: (productId: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function normalizeSearchValue(value: string) {
  return value.trim().toLocaleLowerCase("pt-BR");
}

function productMatchesSearch(
  product: ProfessionalProduct,
  searchTerm: string
) {
  if (!searchTerm) {
    return true;
  }

  const searchableValues = [
    product.name,
    product.sku,
    product.brand,
    product.description,
  ];

  return searchableValues.some((value) => {
    return value?.toLocaleLowerCase("pt-BR").includes(searchTerm);
  });
}

export function CustomerOrderProductPicker({
  products,
  items,
  onIncreaseProduct,
  onDecreaseProduct,
  isLoading = false,
  disabled = false,
}: CustomerOrderProductPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const normalizedSearchTerm = normalizeSearchValue(searchTerm);

  const quantityByProductId = useMemo(() => {
    return items.reduce<Record<string, number>>((quantities, item) => {
      quantities[item.productId] = item.quantity;
      return quantities;
    }, {});
  }, [items]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => productMatchesSearch(product, normalizedSearchTerm))
      .sort((firstProduct, secondProduct) =>
        firstProduct.name.localeCompare(secondProduct.name, "pt-BR", {
          sensitivity: "base",
        })
      );
  }, [products, normalizedSearchTerm]);

  const hasSearch = normalizedSearchTerm.length > 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <label
        htmlFor="customer-order-product-search"
        className="text-sm font-semibold text-slate-900"
      >
        Selecionar produto
      </label>

      <input
        id="customer-order-product-search"
        type="search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Buscar produto por nome, SKU ou fabricante..."
        disabled={disabled || isLoading}
        className="mt-3 h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
      />

      <div className="mt-4">
        {isLoading ? (
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-3 text-sm font-semibold text-blue-700">
            Carregando produtos...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
            Nenhum produto cadastrado para adicionar.
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
            Nenhum produto encontrado para a busca atual.
          </div>
        ) : (
          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {filteredProducts.map((product) => {
              const currentQuantity = quantityByProductId[product.id] ?? 0;
              const decreaseDisabled = disabled || currentQuantity === 0;

              return (
                <article
                  key={product.id}
                  className="rounded-lg border border-slate-200 bg-white p-3"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900">
                        {product.name}
                      </h4>

                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                        <span>SKU {product.sku}</span>
                        {product.brand ? (
                          <span>Fabricante: {product.brand}</span>
                        ) : null}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                        <span>{formatCurrency(product.price)}</span>
                        <span>Estoque: {product.stock}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onDecreaseProduct(product.id)}
                        disabled={decreaseDisabled}
                        aria-label={"Diminuir quantidade de " + product.name}
                        className="h-9 w-9 appearance-none rounded-lg border border-slate-200 !bg-white text-lg font-bold leading-none !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        -
                      </button>

                      <span className="flex h-9 min-w-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900">
                        {currentQuantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => onIncreaseProduct(product)}
                        disabled={disabled}
                        aria-label={"Aumentar quantidade de " + product.name}
                        className="h-9 w-9 appearance-none rounded-lg border border-blue-600 !bg-blue-600 text-lg font-bold leading-none !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {hasSearch ? (
        <button
          type="button"
          onClick={() => setSearchTerm("")}
          disabled={disabled || isLoading}
          className="mt-3 appearance-none rounded-lg border border-slate-200 !bg-white px-3 py-2 text-sm font-semibold !text-slate-700 !shadow-none transition hover:!bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Limpar busca
        </button>
      ) : null}
    </div>
  );
}
