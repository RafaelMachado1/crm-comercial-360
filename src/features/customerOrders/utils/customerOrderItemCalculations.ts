import type { ProfessionalProduct } from "../../products/types/product.types";
import type { CustomerOrderItem } from "../types/customerOrder.types";

function normalizeNonNegativeNumber(value: number): number {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, value);
}

function normalizeQuantity(value: number): number {
  const normalizedValue = Math.floor(normalizeNonNegativeNumber(value));

  return normalizedValue >= 1 ? normalizedValue : 1;
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export function calculateCustomerOrderItemSubtotal(
  unitPrice: number,
  quantity: number
): number {
  const normalizedUnitPrice = normalizeNonNegativeNumber(unitPrice);
  const normalizedQuantity = normalizeQuantity(quantity);

  return roundCurrency(normalizedUnitPrice * normalizedQuantity);
}

export function calculateCustomerOrderItemsTotal(
  items: CustomerOrderItem[]
): number {
  if (!items.length) {
    return 0;
  }

  return roundCurrency(
    items.reduce((total, item) => {
      return total + calculateCustomerOrderItemSubtotal(item.unitPrice, item.quantity);
    }, 0)
  );
}

export function normalizeCustomerOrderItems(
  items?: CustomerOrderItem[] | null
): CustomerOrderItem[] {
  if (!items?.length) {
    return [];
  }

  return items.map((item) => {
    const unitPrice = normalizeNonNegativeNumber(item.unitPrice);
    const quantity = normalizeQuantity(item.quantity);
    const subtotal = calculateCustomerOrderItemSubtotal(unitPrice, quantity);

    return {
      ...item,
      unitPrice,
      quantity,
      subtotal,
    };
  });
}

export function createCustomerOrderItemFromProduct(
  product: ProfessionalProduct,
  quantity = 1
): CustomerOrderItem {
  const normalizedQuantity = normalizeQuantity(quantity);
  const unitPrice = normalizeNonNegativeNumber(product.price);
  const subtotal = calculateCustomerOrderItemSubtotal(unitPrice, normalizedQuantity);

  return {
    id:
      'item-' +
      product.id +
      '-' +
      Date.now() +
      '-' +
      Math.random().toString(36).slice(2, 8),
    productId: product.id,
    sku: product.sku,
    name: product.name,
    brand: product.brand,
    unit: product.unit,
    unitPrice,
    quantity: normalizedQuantity,
    subtotal,
    imageUrl: product.imageUrl,
  };
}
