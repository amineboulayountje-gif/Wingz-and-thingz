import type { Locale, Order, OrderItem } from "@/types";
import { translations } from "@/data/translations";
import { siteConfig, getProduct } from "@/data/products";

export function formatPrice(amount: number, locale: Locale): string {
  const localeMap: Record<Locale, string> = {
    nl: "nl-BE",
    en: "en-IE",
    fr: "fr-FR",
  };

  return new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatGrams(grams: number, locale: Locale): string {
  if (grams >= 1000) {
    const kg = grams / 1000;
    const formatted = new Intl.NumberFormat(locale === "nl" ? "nl-BE" : locale, {
      minimumFractionDigits: kg % 1 === 0 ? 0 : 1,
      maximumFractionDigits: 1,
    }).format(kg);
    return `${formatted}${translations[locale].common.kg}`;
  }
  return `${grams}${translations[locale].common.grams}`;
}

export function getItemName(item: OrderItem, locale: Locale): string {
  const t = translations[locale];
  const key = item.nameKey as keyof typeof t.product;
  return (t.product[key] as string) ?? item.productId;
}

export function getProductDescription(nameKey: string, locale: Locale): string {
  const t = translations[locale];
  const key = nameKey.replace("product.", "") + "Desc";
  const fullKey = `product.${key}` as keyof typeof t.product;
  return (t.product[fullKey] as string) ?? "";
}

export function calculateTotal(order: Order): number {
  return (order.items ?? []).reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
}

export function getItemCount(order: Order): number {
  return (order.items ?? []).reduce((sum, item) => sum + item.quantity, 0);
}

export function generateWhatsAppMessage(order: Order, locale: Locale): string {
  const t = translations[locale];
  const items = order.items ?? [];

  const wings = items.filter((i) => i.category === "wings");
  const sides = items.filter((i) => i.category === "side");
  const drinks = items.filter((i) => i.category === "drink");
  const extras = items.filter((i) => i.category === "extra");

  const lines: string[] = [];
  lines.push(t.whatsapp.greeting);
  lines.push(t.whatsapp.intro);
  lines.push("");
  lines.push(`${t.whatsapp.orderMethod}: ${order.mode === "package" ? t.whatsapp.methodPackage : t.whatsapp.methodCustom}`);

  if (order.guests) {
    lines.push(`${t.whatsapp.guests}: ${order.guests}`);
  }

  lines.push("");

  if (wings.length > 0) {
    lines.push(`${t.whatsapp.wings}:`);
    wings.forEach((w) => {
      lines.push(`  ${w.quantity} × ${getItemName(w, locale)}`);
    });
  }

  if (sides.length > 0) {
    lines.push(`${t.whatsapp.sides}:`);
    sides.forEach((s) => {
      const product = getProduct(s.productId);
      if (product?.gramsPerPortion && s.isPackageItem) {
        const totalGrams = product.gramsPerPortion * s.quantity;
        lines.push(`  ${formatGrams(totalGrams, locale)} ${getItemName(s, locale)}`);
      } else {
        lines.push(`  ${s.quantity} × ${getItemName(s, locale)}`);
      }
    });
  }

  if (drinks.length > 0) {
    lines.push(`${t.whatsapp.drinks}:`);
    drinks.forEach((d) => {
      lines.push(`  ${d.quantity} × ${getItemName(d, locale)}`);
    });
  }

  if (extras.length > 0) {
    lines.push(`${t.whatsapp.extras}:`);
    extras.forEach((e) => {
      lines.push(`  ${e.quantity} × ${getItemName(e, locale)}`);
    });
  }

  lines.push("");
  const total = calculateTotal(order);
  lines.push(`${t.whatsapp.total}: ${formatPrice(total, locale)}`);

  return lines.join("\n");
}

export function buildWhatsAppUrl(order: Order, locale: Locale): string {
  const message = generateWhatsAppMessage(order, locale);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
