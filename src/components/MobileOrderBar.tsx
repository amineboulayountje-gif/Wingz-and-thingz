import { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { useOrder } from "@/context/OrderContext";
import { calculateTotal, formatPrice, buildWhatsAppUrl } from "@/utils/order";
import { OrderSummary } from "./OrderSummary";
import { ShoppingBag, X, MessageCircle } from "lucide-react";

interface MobileOrderBarProps {
  onCheckout: () => void;
}

export function MobileOrderBar({ onCheckout }: MobileOrderBarProps) {
  const { t, locale } = useI18n();
  const { order, itemCount } = useOrder();
  const [sheetOpen, setSheetOpen] = useState(false);

  const items = order.items ?? [];
  const total = calculateTotal(order);

  if (items.length === 0) return null;

  const handleCheckout = () => {
    setSheetOpen(false);
    onCheckout();
  };

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 safe-bottom lg:hidden">
        <div className="border-t border-base-border bg-base/95 backdrop-blur-lg">
          <div className="section-container py-3">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setSheetOpen(true)}
                className="flex flex-1 items-center gap-3"
                aria-label={t.aria.openOrder}
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white">
                  <ShoppingBag size={20} />
                  {itemCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gold-400 px-1 text-[10px] font-bold text-base animate-scale-in">
                      {itemCount}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-cream-400">{t.summary.title}</span>
                  <span className="font-display text-lg font-bold text-cream-50">
                    {formatPrice(total, locale)}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setSheetOpen(true)}
                className="rounded-full border border-base-border bg-base-card px-4 py-2.5 text-sm font-semibold text-cream-100"
              >
                {t.summary.viewOrder}
              </button>
            </div>
          </div>
        </div>
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-base/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSheetOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-base-border bg-base-surface animate-slide-up safe-bottom">
            <div className="sticky top-0 flex items-center justify-between border-b border-base-border bg-base-surface/95 px-5 py-4 backdrop-blur">
              <h3 className="font-display text-lg font-bold text-cream-50">
                {t.summary.title}
              </h3>
              <button
                onClick={() => setSheetOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-base-card text-cream-300 hover:text-cream-50"
                aria-label={t.aria.closeOrder}
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <OrderSummary onCheckout={handleCheckout} variant="sheet" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
