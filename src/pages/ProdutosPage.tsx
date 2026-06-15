import { useMemo, useState } from "react";
import { toast } from "sonner";

import PageTitle from "../components/layout/PageTitle";

import { ProductCard } from "../features/products/components/ProductCard";
import { ProductEmptyState } from "../features/products/components/ProductEmptyState";
import { ProductFormDrawer } from "../features/products/components/ProductFormDrawer";
import { ProductSearchBar } from "../features/products/components/ProductSearchBar";
import { useProducts } from "../features/products/hooks/useProducts";
import type {
  ProductFormValues,
  ProfessionalProduct,
} from "../features/products/types/product.types";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function matchesSearchTerm(product: ProfessionalProduct, searchTerm: string) {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  if (!normalizedSearchTerm) {
    return true;
  }

  return (
    product.name.toLowerCase().includes(normalizedSearchTerm) ||
    product.sku.toLowerCase().includes(normalizedSearchTerm) ||
    (product.description?.toLowerCase().includes(normalizedSearchTerm) ?? false) ||
    (product.brand?.toLowerCase().includes(normalizedSearchTerm) ?? false)
  );
}

function ProdutosPage() {
  const {
    products,
    isLoading,
    isError,
    error,
    createProduct,
    updateProduct,
    isCreating,
    isUpdating,
  } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProfessionalProduct | null>(null);

  const isSubmitting = isCreating || isUpdating;

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        return matchesSearchTerm(product, searchTerm);
      })
      .sort((firstProduct, secondProduct) => {
        return firstProduct.name.localeCompare(secondProduct.name, "pt-BR", {
          sensitivity: "base",
        });
      });
  }, [products, searchTerm]);

  const productsSummary = useMemo(() => {
    const activeProducts = products.filter((product) => {
      return product.status === "active";
    }).length;
    const inactiveProducts = products.filter((product) => {
      return product.status === "inactive";
    }).length;
    const stockValue = products.reduce((total, product) => {
      return total + product.price * product.stock;
    }, 0);

    return {
      totalProducts: products.length,
      activeProducts,
      inactiveProducts,
      stockValue,
    };
  }, [products]);

  function handleOpenCreate() {
    setSelectedProduct(null);
    setIsDrawerOpen(true);
  }

  function handleOpenEdit(product: ProfessionalProduct) {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  }

  async function handleSubmitProduct(values: ProductFormValues) {
    if (selectedProduct) {
      try {
        await updateProduct({
          id: selectedProduct.id,
          ...values,
        });
        toast.success("Produto atualizado com sucesso.");
        handleCloseDrawer();
      } catch {
        toast.error("Não foi possível atualizar o produto.");
      }

      return;
    }

    try {
      await createProduct(values);
      toast.success("Produto cadastrado com sucesso.");
      handleCloseDrawer();
    } catch {
      toast.error("Não foi possível cadastrar o produto.");
    }
  }

  const hasProducts = products.length > 0;
  const hasSearchTerm = searchTerm.trim().length > 0;

  return (
    <>
      <PageTitle
        label="Fase 18"
        title="Produtos"
        description="Organize a base comercial de produtos para uso futuro em orçamentos e pedidos."
      />

      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={handleOpenCreate}
            className="h-11 w-full appearance-none rounded-lg border border-blue-600 !bg-blue-600 px-5 text-sm font-semibold !text-white !shadow-none transition hover:!bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:w-auto"
          >
            Novo produto
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Total de produtos
            </span>
            <strong className="mt-2 block text-2xl font-bold text-slate-950">
              {productsSummary.totalProducts}
            </strong>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Produtos ativos
            </span>
            <strong className="mt-2 block text-2xl font-bold text-emerald-700">
              {productsSummary.activeProducts}
            </strong>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Produtos inativos
            </span>
            <strong className="mt-2 block text-2xl font-bold text-slate-700">
              {productsSummary.inactiveProducts}
            </strong>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Valor em estoque
            </span>
            <strong className="mt-2 block text-2xl font-bold text-slate-950">
              {formatCurrency(productsSummary.stockValue)}
            </strong>
          </article>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-700">
            Carregando produtos...
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <h3 className="text-sm font-bold text-red-800">
              Não foi possível carregar os produtos
            </h3>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>
        ) : null}

        <ProductSearchBar value={searchTerm} onChange={setSearchTerm} />

        {!isLoading && !isError && filteredProducts.length === 0 ? (
          <ProductEmptyState
            title={
              hasProducts && hasSearchTerm
                ? "Nenhum produto encontrado para a busca atual"
                : "Nenhum produto cadastrado"
            }
            description={
              hasProducts && hasSearchTerm
                ? "Revise o termo digitado ou limpe a busca para visualizar todos os produtos."
                : "Cadastre produtos para montar uma base comercial pronta para orçamentos e pedidos."
            }
            actionLabel={!hasProducts ? "Cadastrar primeiro produto" : undefined}
            onAction={!hasProducts ? handleOpenCreate : undefined}
          />
        ) : null}

        {!isLoading && !isError && filteredProducts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleOpenEdit}
              />
            ))}
          </div>
        ) : null}
      </div>

      <ProductFormDrawer
        isOpen={isDrawerOpen}
        product={selectedProduct}
        onClose={handleCloseDrawer}
        onSubmit={handleSubmitProduct}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

export default ProdutosPage;
