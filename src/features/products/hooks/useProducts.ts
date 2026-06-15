import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { productService } from "../services/productService";
import type {
  CreateProductInput,
  ProfessionalProduct,
  UpdateProductInput,
} from "../types/product.types";

const PRODUCTS_QUERY_KEY = ["products"];

function replaceProductsCache(products: ProfessionalProduct[]) {
  return products;
}

export function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: () => productService.getProducts(),
  });

  const createProductMutation = useMutation({
    mutationFn: (input: CreateProductInput) => productService.createProduct(input),
    onSuccess: (updatedProducts) => {
      queryClient.setQueryData(PRODUCTS_QUERY_KEY, replaceProductsCache(updatedProducts));
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (input: UpdateProductInput) => productService.updateProduct(input),
    onSuccess: (updatedProducts) => {
      queryClient.setQueryData(PRODUCTS_QUERY_KEY, replaceProductsCache(updatedProducts));
    },
  });

  async function createProduct(
    input: CreateProductInput
  ): Promise<ProfessionalProduct[]> {
    const updatedProducts = await createProductMutation.mutateAsync(input);

    return updatedProducts;
  }

  async function updateProduct(
    input: UpdateProductInput
  ): Promise<ProfessionalProduct[]> {
    const updatedProducts = await updateProductMutation.mutateAsync(input);

    return updatedProducts;
  }

  const isLoading = productsQuery.isLoading || productsQuery.isFetching;
  const isError = Boolean(productsQuery.error);
  const error = productsQuery.error ? "Erro ao carregar produtos." : "";

  return {
    products: productsQuery.data ?? [],
    isLoading,
    isError,
    error,
    refetch: productsQuery.refetch,
    queryKey: PRODUCTS_QUERY_KEY,
    createProduct,
    updateProduct,
    isCreating: createProductMutation.isPending,
    isUpdating: updateProductMutation.isPending,
  };
}
