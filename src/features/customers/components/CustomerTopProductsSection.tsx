import type { CustomerTopProduct } from "../utils/customerTopProducts";

type CustomerTopProductsSectionProps = {
  products: CustomerTopProduct[];
  loading?: boolean;
};

const MAX_VISIBLE_PRODUCTS = 8;

function formatQuantity(quantity: number) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
  }).format(quantity);
}

function ProductImage({ product }: { product: CustomerTopProduct }) {
  if (!product.imageUrl) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white text-sm font-bold text-slate-400">
        Sem imagem
      </div>
    );
  }

  return (
    <img
      src={product.imageUrl}
      alt={product.name}
      className="aspect-square w-full rounded-lg border border-slate-200 bg-white object-cover"
      loading="lazy"
    />
  );
}

export function CustomerTopProductsSection({
  products,
  loading = false,
}: CustomerTopProductsSectionProps) {
  const visibleProducts = products.slice(0, MAX_VISIBLE_PRODUCTS);

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-bold uppercase text-slate-950">
            Produtos mais comprados
          </h2>
          <span className="text-sm font-semibold text-slate-500">
            Últimos 6 meses
          </span>
        </div>
      </div>

      <div className="p-5">
        {loading ? (
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando produtos mais comprados...
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-600">
              Ainda não há produtos comprados suficientes para gerar este ranking.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <article
                key={product.key}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-sm font-bold text-blue-700">
                    {index + 1}
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-950">
                      {product.name}
                    </h3>
                    <p className="mt-1 truncate text-xs font-semibold uppercase text-slate-500">
                      {product.sku}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <ProductImage product={product} />
                </div>

                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Qtd. comprada {formatQuantity(product.quantity)}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
