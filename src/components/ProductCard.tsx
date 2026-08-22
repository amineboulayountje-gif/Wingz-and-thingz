import { useI18n } from "@/context/I18nContext";
import { useOrder } from "@/context/OrderContext";
import { QuantitySelector } from "./QuantitySelector";
import { formatPrice } from "@/utils/order";
import { getProductDescription } from "@/utils/order";
import type { Product, Category } from "@/types";

interface ProductCardProps {
  product: Product;
  isPackageItem?: boolean;
}

export function ProductCard({ product, isPackageItem = false }: ProductCardProps) {
  const { locale, t } = useI18n();
  const { order, addItem, removeItem } = useOrder();

  const category = product.category as Category;
  const item = (order.items ?? []).find(
    (i) =>
      i.productId === product.id &&
      i.category === category &&
      (i.isPackageItem ?? false) === isPackageItem
  );
  const quantity = item?.quantity ?? 0;
  const isSelected = quantity > 0;

  const unitLabel = (() => {
    if (product.unitType === "per-wing") return t.common.perWing;
    if (product.unitType === "per-portion") return t.common.perPortion;
    if (product.unitType === "per-bottle") return t.common.perBottle;
    if (product.unitType === "per-cob") return t.common.perCob;
    return "";
  })();

  return (
    <div
      className={`card relative flex flex-col overflow-hidden transition-all duration-200 ${
        isSelected
          ? "border-primary-500/50 shadow-glow"
          : "card-hover"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={product.image}
          alt={t.product[product.nameKey.replace("product.", "") as keyof typeof t.product] as string ?? product.id}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {isSelected && (
          <div className="absolute right-3 top-3 flex h-7 min-w-[2rem] items-center justify-center rounded-full bg-primary-500 px-2 text-xs font-bold text-white shadow-glow animate-scale-in">
            {quantity}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h4 className="font-display text-base font-semibold text-cream-50">
            {t.product[product.nameKey.replace("product.", "") as keyof typeof t.product] as string}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-cream-400">
            {getProductDescription(product.nameKey, locale)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-cream-50">
              {formatPrice(product.price, locale)}
            </span>
            <span className="text-xs text-cream-500">{unitLabel}</span>
          </div>
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => addItem(product.id, category, isPackageItem)}
            onDecrease={() => removeItem(product.id, category, isPackageItem)}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
