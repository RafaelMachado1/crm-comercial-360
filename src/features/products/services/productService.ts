import type {
  CreateProductInput,
  ProfessionalProduct,
  UpdateProductInput,
} from "../types/product.types";
import {
  createProductFake,
  getProductByIdFake,
  getProductsFake,
  updateProductFake,
} from "./productFakeApi";

export const productService = {
  getProducts(): Promise<ProfessionalProduct[]> {
    return getProductsFake();
  },

  getProductById(id: string): Promise<ProfessionalProduct | null> {
    return getProductByIdFake(id);
  },

  createProduct(input: CreateProductInput): Promise<ProfessionalProduct[]> {
    return createProductFake(input);
  },

  updateProduct(input: UpdateProductInput): Promise<ProfessionalProduct[]> {
    return updateProductFake(input);
  },
};
