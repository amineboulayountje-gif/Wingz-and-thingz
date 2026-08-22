import { useI18n } from "@/context/I18nContext";
import { locales } from "@/data/translations";
import type { Locale } from "@/types";

export function LanguageSwitcher({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const { locale, setLocale, t } = useI18n();

  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-1" role="group" aria-label={t.aria.selectLanguage}>
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => setLocale(l as Locale)}
            aria-pressed={locale === l}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold uppercase transition-colors ${
              locale === l
                ? "bg-primary-500 text-white"
                : "text-cream-300 hover:bg-base-hover hover:text-cream-50"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-base-border bg-base-card p-0.5"
      role="group"
      aria-label={t.aria.selectLanguage}
    >
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l as Locale)}
          aria-pressed={locale === l}
          className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase transition-all ${
            locale === l
              ? "bg-primary-500 text-white shadow-glow"
              : "text-cream-400 hover:text-cream-50"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
