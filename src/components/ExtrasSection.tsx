import { useI18n } from "@/context/I18nContext";
import { useOrder } from "@/context/OrderContext";
import { QuantitySelector } from "./QuantitySelector";
import { formatPrice } from "@/utils/order";
import { extrasConfig, getProductsByCategory } from "@/data/products";
import { Plus, Cookie, GlassWater, Drumstick } from "lucide-react";

export function ExtrasSection() {
  const { t, locale } = useI18n();
  const { order, addExtra, removeExtra } = useOrder();

  const wingProducts = getProductsByCategory("wings");

  const extras = [
    {
      id: "extra-side",
      icon: Cookie,
      name: t.extras.side,
      price: extrasConfig.extraSidePrice,
      type: "side" as const,
    },
    {
      id: "extra-drink",
      icon: GlassWater,
      name: t.extras.drink,
      price: extrasConfig.extraDrinkPrice,
      type: "drink" as const,
    },
  ];

  return (
    <section id="extras" className="py-12 sm:py-16 lg:py-20">
      <div className="section-container">
        <div className="mb-8 flex flex-col gap-1 text-center">
          <h2 className="font-display text-2xl font-bold text-cream-50 sm:text-3xl">
            {t.extras.title}
          </h2>
          <p className="text-sm text-cream-400">{t.extras.subtitle}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {extras.map((extra) => {
            const Icon = extra.icon;
            const item = (order.items ?? []).find(
              (i) => i.id === `extra-${extra.id}` && i.category === "extra"
            );
            const quantity = item?.quantity ?? 0;

            return (
              <div
                key={extra.id}
                className={`card card-hover flex flex-col gap-4 p-5 ${
                  quantity > 0 ? "border-primary-500/50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-base font-semibold text-cream-50">
                      {extra.name}
                    </h4>
                    <span className="text-sm text-cream-400">
                      {formatPrice(extra.price, locale)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cream-400">{quantity > 0 ? `${quantity}×` : ""}</span>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => addExtra(extra.type)}
                    onDecrease={() => removeExtra(`extra-${extra.id}`)}
                    size="sm"
                  />
                </div>
              </div>
            );
          })}

          <div className="card card-hover col-span-1 flex flex-col gap-4 p-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/15 text-primary-400">
                <Drumstick size={22} />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-base font-semibold text-cream-50">
                  {t.extras.wings}
                </h4>
                <span className="text-sm text-cream-400">
                  {formatPrice(extrasConfig.extraWingPrice, locale)} {t.common.perWing}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {wingProducts.map((wp) => {
                const extraId = `extra-${wp.id}`;
                const item = (order.items ?? []).find(
                  (i) => i.id === extraId && i.category === "extra"
                );
                const quantity = item?.quantity ?? 0;
                return (
                  <div
                    key={wp.id}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors ${
                      quantity > 0
                        ? "border-primary-500/40 bg-primary-500/10"
                        : "border-base-border bg-base-surface"
                    }`}
                  >
                    <span className="text-sm font-medium text-cream-200">
                      {t.product[wp.nameKey.replace("product.", "") as keyof typeof t.product] as string}
                    </span>
                    <QuantitySelector
                      quantity={quantity}
                      onIncrease={() => addExtra("wings", wp.id)}
                      onDecrease={() => removeExtra(extraId)}
                      size="sm"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
