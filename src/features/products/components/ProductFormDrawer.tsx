import type {
  ProductFormValues,
  ProfessionalProduct,
} from "../types/product.types";
import { ProductFormContent } from "./ProductFormContent";

type ProductFormDrawerProps = {
  isOpen: boolean;
  product?: ProfessionalProduct | null;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
  isSubmitting?: boolean;
};

function createInitialValuesFromProduct(
  product: ProfessionalProduct
): ProductFormValues {
  return {
    sku: product.sku,
    name: product.name,
    category: product.category,
    unit: product.unit,
    price: product.price,
    stock: product.stock,
    status: product.status,
    brand: product.brand ?? "",
    imageUrl: product.imageUrl ?? "",
    description: product.description ?? "",
  };
}

export function ProductFormDrawer({
  isOpen,
  product,
  onClose,
  onSubmit,
  isSubmitting = false,
}: ProductFormDrawerProps) {
  if (!isOpen) {
    return null;
  }

  const isEditMode = Boolean(product);
  const title = isEditMode ? "Editar produto" : "Novo produto";
  const subtitle = isEditMode
    ? "Atualize as informações comerciais deste produto."
    : "Cadastre um produto para usar futuramente em orçamentos e pedidos.";
  const submitLabel = isEditMode ? "Salvar alterações" : "Cadastrar produto";
  const initialValues = product
    ? createInitialValuesFromProduct(product)
    : undefined;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40">
      <button
        type="button"
        aria-label="Fechar formulário de produto"
        className="absolute inset-0 cursor-default appearance-none !bg-transparent !shadow-none focus:outline-none"
        onClick={onClose}
      />

      <aside className="relative flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
        <header className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                {isEditMode ? "Edição de produto" : "Cadastro de produto"}
              </span>

              <h2 className="mt-1 text-2xl font-bold text-slate-950">
                {title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="appearance-none rounded-lg border border-slate-200 !bg-white px-3 py-2 text-sm font-semibold !text-slate-600 !shadow-none transition hover:!bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Fechar
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <ProductFormContent
            initialValues={initialValues}
            onSubmit={onSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
            submitLabel={submitLabel}
          />
        </div>
      </aside>
    </div>
  );
}
