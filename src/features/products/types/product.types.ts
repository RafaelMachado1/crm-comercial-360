export type ProductCategory =
  | "cleaning"
  | "disinfection"
  | "paper"
  | "equipment"
  | "food_service"
  | "hospital"
  | "other";

export type ProductUnit =
  | "unit"
  | "box"
  | "package"
  | "liter"
  | "milliliter"
  | "kilogram"
  | "gram"
  | "gallon"
  | "bombona";

export type ProductStatus = "active" | "inactive";

export type ProfessionalProduct = {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  unit: ProductUnit;
  price: number;
  stock: number;
  status: ProductStatus;
  brand?: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductFormValues = {
  sku: string;
  name: string;
  category: ProductCategory;
  unit: ProductUnit;
  price: number;
  stock: number;
  status: ProductStatus;
  brand?: string;
  imageUrl?: string;
  description: string;
};

export type CreateProductInput = ProductFormValues;

export type UpdateProductInput = {
  id: string;
} & ProductFormValues;

export type ProductFilters = {
  searchTerm?: string;
  category?: ProductCategory | "all";
  status?: ProductStatus | "all";
};
