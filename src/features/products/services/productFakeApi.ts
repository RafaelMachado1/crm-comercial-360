import {
  productMockData,
} from "../data/productMockData";
import {
  getStorageItem,
  setStorageItem,
} from "../../../utils/localStorage";
import type {
  CreateProductInput,
  ProfessionalProduct,
  UpdateProductInput,
} from "../types/product.types";

const PRODUCTS_STORAGE_KEY = "crm-products";

function wait(ms = 300): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function createStableId(): string {
  return `product-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeNumber(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, value);
}

function sanitizeProductInput(
  input: CreateProductInput | UpdateProductInput
): Omit<ProfessionalProduct, "id" | "createdAt" | "updatedAt"> {
  return {
    sku: input.sku.trim(),
    name: input.name.trim(),
    category: input.category,
    unit: input.unit,
    price: normalizeNumber(input.price),
    stock: normalizeNumber(input.stock),
    status: input.status,
    brand: input.brand?.trim() || undefined,
    imageUrl: input.imageUrl?.trim() || undefined,
    description: input.description.trim(),
  };
}

function getSeededProducts(): ProfessionalProduct[] {
  const storedProducts = getStorageItem<ProfessionalProduct[] | null>(
    PRODUCTS_STORAGE_KEY,
    null
  );

  if (storedProducts) {
    return storedProducts;
  }

  setStorageItem(PRODUCTS_STORAGE_KEY, productMockData);

  return productMockData;
}

function persistProducts(products: ProfessionalProduct[]): void {
  setStorageItem(PRODUCTS_STORAGE_KEY, products);
}

export async function getProductsFake(): Promise<ProfessionalProduct[]> {
  await wait();

  return getSeededProducts();
}

export async function getProductByIdFake(
  id: string
): Promise<ProfessionalProduct | null> {
  await wait();

  const products = getSeededProducts();

  return products.find((product) => product.id === id) ?? null;
}

export async function createProductFake(
  input: CreateProductInput
): Promise<ProfessionalProduct[]> {
  await wait();

  const now = new Date().toISOString();
  const newProduct: ProfessionalProduct = {
    id: createStableId(),
    ...sanitizeProductInput(input),
    createdAt: now,
    updatedAt: now,
  };

  const updatedProducts = [...getSeededProducts(), newProduct];

  persistProducts(updatedProducts);

  return updatedProducts;
}

export async function updateProductFake(
  input: UpdateProductInput
): Promise<ProfessionalProduct[]> {
  await wait();

  const currentProducts = getSeededProducts();
  const updatedAt = new Date().toISOString();
  const updatedProducts = currentProducts.map((product) => {
    if (product.id !== input.id) {
      return product;
    }

    return {
      ...product,
      ...sanitizeProductInput(input),
      createdAt: product.createdAt,
      updatedAt,
    };
  });

  persistProducts(updatedProducts);

  return updatedProducts;
}
