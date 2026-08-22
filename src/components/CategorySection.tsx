import { useI18n } from "@/context/I18nContext";
import { ProductCard } from "./ProductCard";
import { getProductsByCategory } from "@/data/products";
import type { Category } from "@/types";

interface CategorySectionProps {
  category: "wings" | "side" | "drink";
  isPackageItem?: boolean;
}

export function CategorySection({ category, isPackageItem = false }: CategorySectionProps) {
  const { t } = useI18n();
  const products = getProductsByCategory(category);

  const titleKey: Record<string, string> = {
    wings: t.categories.wings,
    side: t.categories.sides,
    drink: t.categories.drinks,
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-xl font-bold text-cream-50 sm:text-2xl">
        {titleKey[category]}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isPackageItem={isPackageItem}
          />
        ))}
      </div>
    </div>
  );
}
