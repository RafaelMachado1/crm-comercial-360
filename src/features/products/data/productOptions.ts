import type {
  ProductCategory,
  ProductStatus,
  ProductUnit,
} from "../types/product.types";

type ProductOption<T extends string> = {
  value: T;
  label: string;
};

export const PRODUCT_CATEGORY_OPTIONS: Array<
  ProductOption<ProductCategory>
> = [
  { value: "cleaning", label: "Limpeza geral" },
  { value: "disinfection", label: "Desinfecção" },
  { value: "paper", label: "Papéis e descartáveis" },
  { value: "equipment", label: "Equipamentos" },
  { value: "food_service", label: "Food service" },
  { value: "hospital", label: "Hospitalar" },
  { value: "other", label: "Outros" },
];

export const PRODUCT_UNIT_OPTIONS: Array<ProductOption<ProductUnit>> = [
  { value: "unit", label: "Unidade" },
  { value: "box", label: "Caixa" },
  { value: "package", label: "Pacote" },
  { value: "liter", label: "Litro" },
  { value: "milliliter", label: "Mililitro" },
  { value: "kilogram", label: "Quilograma" },
  { value: "gram", label: "Grama" },
  { value: "gallon", label: "Galão" },
  { value: "bombona", label: "Bombona" },
];

export const PRODUCT_STATUS_OPTIONS: Array<ProductOption<ProductStatus>> = [
  { value: "active", label: "Ativo" },
  { value: "inactive", label: "Inativo" },
];

export function getProductCategoryLabel(category: ProductCategory): string {
  return (
    PRODUCT_CATEGORY_OPTIONS.find((option) => option.value === category)?.label ??
    category
  );
}

export function getProductUnitLabel(unit: ProductUnit): string {
  return (
    PRODUCT_UNIT_OPTIONS.find((option) => option.value === unit)?.label ?? unit
  );
}

export function getProductStatusLabel(status: ProductStatus): string {
  return (
    PRODUCT_STATUS_OPTIONS.find((option) => option.value === status)?.label ??
    status
  );
}
