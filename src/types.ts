export type Category = "wings" | "side" | "drink" | "extra";
export type OrderMode = "custom" | "package";
export type Locale = "nl" | "en" | "fr";

export interface Product {
  id: string;
  nameKey: string;
  category: "wings" | "side" | "drink";
  price: number;
  image: string;
  descriptionKey: string;
  available: boolean;
  unitType: "per-wing" | "per-portion" | "per-bottle" | "per-cob";
  gramsPerPortion?: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  category: Category;
  nameKey: string;
  quantity: number;
  unitPrice: number;
  unitType: string;
  isPackageItem?: boolean;
}

export interface Order {
  mode: OrderMode | null;
  guests: number | null;
  items: OrderItem[];
}
