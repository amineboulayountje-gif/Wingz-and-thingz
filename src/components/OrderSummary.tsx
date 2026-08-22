import { useI18n } from "@/context/I18nContext";
import { useOrder } from "@/context/OrderContext";
import { formatPrice, getItemName, calculateTotal } from "@/utils/order";
import { getProduct } from "@/data/products";
import { formatGrams } from "@/utils/order";
import { Trash2, MessageCircle } from "lucide-react";
import type { OrderItem } from "@/types";

interface OrderSummaryProps {
  onCheckout: () => void;
  variant?: "desktop" | "sheet";
}

export function OrderSummary({ onCheckout, variant = "desktop" }: OrderSummaryProps) {
  const { t, locale } = useI18n();
  const { order, resetOrder, removeItem, removeExtra, setItemQuantity } = useOrder();

  const items = order.items ?? [];
  const total = calculateTotal(order);

  const wings = items.filter((i) => i.category === "wings");
  const sides = items.filter((i) => i.category === "side");
  const drinks = items.filter((i) => i.category === "drink");
  const extras = items.filter((i) => i.category === "extra");

  const isEmpty = items.length === 0;

  const renderGroup = (
    label: string,
    groupItems: OrderItem[]
  ) => {
    if (groupItems.length === 0) return null;
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-cream-500">
          {label}
        </span>
        {groupItems.map((item) => {
          const product = getProduct(item.productId);
          const totalGrams =
            product?.gramsPerPortion && item.isPackageItem
              ? product.gramsPerPortion * item.quantity
              : 0;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-2 text-sm"
            >
              <div className="flex flex-1 items-center gap-2">
                <span className="font-medium text-cream-100">
                  {getItemName(item, locale)}
                </span>
                <span className="text-cream-500">
                  {totalGrams > 0
                    ? formatGrams(totalGrams, locale)
                    : `${item.quantity}×`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold tabular-nums text-cream-50">
                  {formatPrice(item.unitPrice * item.quantity, locale)}
                </span>
                {variant === "sheet" && (
                  <button
                    onClick={() => {
                      if (item.category === "extra") {
                        removeExtra(item.id);
                      } else {
                        setItemQuantity(
                          item.productId,
                          item.category,
                          0,
                          item.isPackageItem
                        );
                      }
                    }}
                    className="text-cream-500 hover:text-error"
                    aria-label={t.summary.remove}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (isEmpty) {
    return (
      <div className="card flex flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-cream-400">{t.summary.empty}</p>
      </div>
    );
  }

  return (
    <div className="card flex flex-col gap-5 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-cream-50">
          {t.summary.title}
        </h3>
        {order.guests && (
          <span className="rounded-full bg-base-elevated px-3 py-1 text-xs font-semibold text-cream-200">
            {t.summary.guests.replace("{count}", String(order.guests))}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {renderGroup(t.categories.wings, wings)}
        {renderGroup(t.categories.sides, sides)}
        {renderGroup(t.categories.drinks, drinks)}
        {renderGroup(t.categories.extras, extras)}
      </div>

      <div className="border-t border-base-border pt-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-base font-semibold text-cream-200">
            {t.summary.total}
          </span>
          <span className="font-display text-2xl font-bold text-cream-50">
            {formatPrice(total, locale)}
          </span>
        </div>
      </div>

      <button onClick={onCheckout} className="btn-primary w-full">
        <MessageCircle size={18} />
        {t.summary.checkout}
      </button>

      {variant === "sheet" && (
        <button
          onClick={resetOrder}
          className="btn-ghost w-full text-sm text-cream-500 hover:text-error"
        >
          {t.summary.remove} — {t.confirmation.newOrder}
        </button>
      )}
    </div>
  );
}
