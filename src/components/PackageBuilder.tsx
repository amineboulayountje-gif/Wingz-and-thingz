import { useState } from "react";
import { useI18n } from "@/context/I18nContext";
import { useOrder } from "@/context/OrderContext";
import { Minus, Plus, Pencil, ArrowLeft } from "lucide-react";
import { siteConfig, packageConfig, getProduct } from "@/data/products";
import { formatPrice, formatGrams, getItemName } from "@/utils/order";
import { CategorySection } from "./CategorySection";

export function PackageBuilder() {
  const { t, locale } = useI18n();
  const { order, setGuests, generatePackage } = useOrder();
  const [editing, setEditing] = useState(false);

  const guests = order.guests ?? siteConfig.defaultGuests;
  const hasPackage = order.mode === "package" && (order.items ?? []).some((i) => i.isPackageItem);

  const handleGuestsChange = (value: number) => {
    const clamped = Math.max(siteConfig.minGuests, Math.min(siteConfig.maxGuests, value));
    setGuests(clamped);
  };

  const handleGenerate = () => {
    generatePackage(guests);
    setEditing(false);
  };

  if (!hasPackage) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-2xl font-bold text-cream-50 sm:text-3xl">
            {t.packageBuilder.title}
          </h2>
        </div>

        <div className="card p-6 sm:p-8">
          <p className="mb-6 text-center font-display text-lg font-semibold text-cream-50 sm:text-xl">
            {t.packageBuilder.guestsQuestion}
          </p>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleGuestsChange(guests - 1)}
                disabled={guests <= siteConfig.minGuests}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-base-border bg-base-card text-cream-100 transition-all hover:border-primary-500/50 hover:text-primary-400 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={t.aria.decreaseQuantity}
              >
                <Minus size={24} />
              </button>
              <div className="flex min-w-[6rem] flex-col items-center">
                <span className="font-display text-5xl font-bold tabular-nums text-cream-50">
                  {guests}
                </span>
                <span className="text-sm text-cream-400">
                  {t.packageBuilder.guestsSuffix}
                </span>
              </div>
              <button
                onClick={() => handleGuestsChange(guests + 1)}
                disabled={guests >= siteConfig.maxGuests}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-primary-500 bg-primary-500 text-white shadow-glow transition-all hover:bg-primary-400 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={t.aria.increaseQuantity}
              >
                <Plus size={24} />
              </button>
            </div>

            <button onClick={handleGenerate} className="btn-primary w-full sm:w-auto">
              {t.packageBuilder.generate}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-display text-2xl font-bold text-cream-50 sm:text-3xl">
              {t.packageBuilder.yourTable}
            </h2>
            <p className="text-sm text-cream-400">
              {t.packageBuilder.forGuests.replace("{count}", String(order.guests))}
            </p>
          </div>
          <button
            onClick={() => setEditing(false)}
            className="btn-secondary px-4 py-2 text-sm"
          >
            <ArrowLeft size={16} />
            {t.packageBuilder.back}
          </button>
        </div>
        <CategorySection category="wings" isPackageItem />
        <CategorySection category="side" isPackageItem />
        <CategorySection category="drink" />
      </div>
    );
  }

  return <PackageSummary onAdjust={() => setEditing(true)} />;
}

function PackageSummary({ onAdjust }: { onAdjust: () => void }) {
  const { t, locale } = useI18n();
  const { order } = useOrder();

  const items = order.items ?? [];
  const wings = items.filter((i) => i.category === "wings" && i.isPackageItem);
  const sides = items.filter((i) => i.category === "side" && i.isPackageItem);
  const drinks = items.filter((i) => i.category === "drink");
  const extras = items.filter((i) => i.category === "extra");

  const totalWings = wings.reduce((s, w) => s + w.quantity, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-2xl font-bold text-cream-50 sm:text-3xl">
            {t.packageBuilder.yourTable}
          </h2>
          <p className="text-sm text-cream-400">
            {t.packageBuilder.forGuests.replace("{count}", String(order.guests))}
          </p>
        </div>
        <button onClick={onAdjust} className="btn-secondary px-4 py-2 text-sm">
          <Pencil size={16} />
          {t.packageBuilder.adjust}
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="border-b border-base-border bg-base-elevated/50 px-5 py-3">
          <span className="text-sm font-semibold text-cream-200">
            {t.packageBuilder.wingsTotal.replace("{count}", String(totalWings))}
          </span>
        </div>
        <div className="flex flex-col">
          {wings.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between border-b border-base-border/50 px-5 py-3"
            >
              <span className="text-cream-100">{getItemName(w, locale)}</span>
              <span className="font-display font-bold tabular-nums text-cream-50">
                {w.quantity}
              </span>
            </div>
          ))}
          {sides.map((s) => {
            const product = getProduct(s.productId);
            const totalGrams = product?.gramsPerPortion ? product.gramsPerPortion * s.quantity : 0;
            return (
              <div
                key={s.id}
                className="flex items-center justify-between border-b border-base-border/50 px-5 py-3"
              >
                <span className="text-cream-100">{getItemName(s, locale)}</span>
                <span className="font-display font-bold tabular-nums text-cream-50">
                  {totalGrams > 0 ? formatGrams(totalGrams, locale) : `${s.quantity}×`}
                </span>
              </div>
            );
          })}
          {drinks.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between border-b border-base-border/50 px-5 py-3"
            >
              <span className="text-cream-100">{getItemName(d, locale)}</span>
              <span className="font-display font-bold tabular-nums text-cream-50">
                {d.quantity}×
              </span>
            </div>
          ))}
          {extras.map((e) => (
            <div
              key={e.id}
              className="flex items-center justify-between px-5 py-3"
            >
              <span className="text-cream-100">{getItemName(e, locale)}</span>
              <span className="font-display font-bold tabular-nums text-cream-50">
                {e.quantity}×
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
