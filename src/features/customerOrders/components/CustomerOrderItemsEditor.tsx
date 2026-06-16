import type { ProfessionalProduct } from "../../products/types/product.types";
import type { CustomerOrderItem } from "../types/customerOrder.types";
import {
  calculateCustomerOrderItemSubtotal,
  calculateCustomerOrderItemsTotal,
  createCustomerOrderItemFromProduct,
  normalizeCustomerOrderItems,
} from "../utils/customerOrderItemCalculations";
import { CustomerOrderItemRow } from "./CustomerOrderItemRow";
import { CustomerOrderProductPicker } from "./CustomerOrderProductPicker";

type CustomerOrderItemsEditorProps = {
  items: CustomerOrderItem[];
  products: ProfessionalProduct[];
  onChange: (items: CustomerOrderItem[]) => void;
  isLoadingProducts?: boolean;
  disabled?: boolean;
  title?: string;
  description?: string;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function updateItemQuantity(
  item: CustomerOrderItem,
  quantity: number
): CustomerOrderItem {
  const subtotal = calculateCustomerOrderItemSubtotal(
    item.unitPrice,
    quantity
  );

  return {
    ...item,
    quantity,
    subtotal,
  };
}

export function CustomerOrderItemsEditor({
  items,
  products,
  onChange,
  isLoadingProducts = false,
  disabled = false,
  title = "Itens do pedido/orçamento",
  description = "Adicione produtos reais e ajuste as quantidades do registro comercial.",
}: CustomerOrderItemsEditorProps) {
  const normalizedItems = normalizeCustomerOrderItems(items);
  const total = calculateCustomerOrderItemsTotal(normalizedItems);

  function handleIncreaseProduct(product: ProfessionalProduct) {
    if (disabled) {
      return;
    }

    const existingItem = normalizedItems.find((item) => {
      return item.productId === product.id;
    });

    if (existingItem) {
      onChange(
        normalizedItems.map((item) => {
          if (item.id !== existingItem.id) {
            return item;
          }

          return updateItemQuantity(item, item.quantity + 1);
        })
      );
      return;
    }

    onChange([
      ...normalizedItems,
      createCustomerOrderItemFromProduct(product, 1),
    ]);
  }

  function handleDecreaseProduct(productId: string) {
    if (disabled) {
      return;
    }

    const existingItem = normalizedItems.find((item) => {
      return item.productId === productId;
    });

    if (!existingItem) {
      return;
    }

    if (existingItem.quantity <= 1) {
      onChange(
        normalizedItems.filter((item) => {
          return item.productId !== productId;
        })
      );
      return;
    }

    onChange(
      normalizedItems.map((item) => {
        if (item.id !== existingItem.id) {
          return item;
        }

        return updateItemQuantity(item, item.quantity - 1);
      })
    );
  }

  function handleIncrease(itemId: string) {
    if (disabled) {
      return;
    }

    onChange(
      normalizedItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        return updateItemQuantity(item, item.quantity + 1);
      })
    );
  }

  function handleDecrease(itemId: string) {
    if (disabled) {
      return;
    }

    const existingItem = normalizedItems.find((item) => {
      return item.id === itemId;
    });

    if (!existingItem) {
      return;
    }

    if (existingItem.quantity <= 1) {
      onChange(
        normalizedItems.filter((item) => {
          return item.id !== itemId;
        })
      );
      return;
    }

    onChange(
      normalizedItems.map((item) => {
        if (item.id !== itemId) {
          return item;
        }

        return updateItemQuantity(item, item.quantity - 1);
      })
    );
  }

  function handleRemove(itemId: string) {
    if (disabled) {
      return;
    }

    onChange(
      normalizedItems.filter((item) => {
        return item.id !== itemId;
      })
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>

      <CustomerOrderProductPicker
        products={products}
        items={normalizedItems}
        onIncreaseProduct={handleIncreaseProduct}
        onDecreaseProduct={handleDecreaseProduct}
        isLoading={isLoadingProducts}
        disabled={disabled}
      />

      {normalizedItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500">
          Nenhum produto adicionado ainda.
        </div>
      ) : (
        <div className="space-y-3">
          {normalizedItems.map((item) => (
            <CustomerOrderItemRow
              key={item.id}
              item={item}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
              disabled={disabled}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-slate-50 p-4 text-right">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Total dos itens
        </span>
        <strong className="text-xl font-bold text-slate-950">
          {formatCurrency(total)}
        </strong>
      </div>
    </section>
  );
}
