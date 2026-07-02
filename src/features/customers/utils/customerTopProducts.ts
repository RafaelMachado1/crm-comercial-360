import type { CustomerOrder } from "../../customerOrders/types/customerOrder.types";

export type CustomerTopProduct = {
  key: string;
  productId: string;
  sku: string;
  name: string;
  imageUrl?: string;
  quantity: number;
};

export function buildCustomerTopProducts(
  orders: CustomerOrder[]
): CustomerTopProduct[] {
  const productsByKey = new Map<string, CustomerTopProduct>();

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      const key = item.productId || item.sku;
      const currentProduct = productsByKey.get(key);

      if (!currentProduct) {
        productsByKey.set(key, {
          key,
          productId: item.productId,
          sku: item.sku,
          name: item.name,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
        });
        return;
      }

      productsByKey.set(key, {
        ...currentProduct,
        imageUrl: currentProduct.imageUrl || item.imageUrl,
        quantity: currentProduct.quantity + item.quantity,
      });
    });
  });

  return Array.from(productsByKey.values()).sort((firstProduct, secondProduct) => {
    return secondProduct.quantity - firstProduct.quantity;
  });
}
