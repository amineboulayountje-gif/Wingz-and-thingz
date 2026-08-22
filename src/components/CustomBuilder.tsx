import { useI18n } from "@/context/I18nContext";
import { CategorySection } from "./CategorySection";

export function CustomBuilder() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-bold text-cream-50 sm:text-3xl">
          {t.customBuilder.title}
        </h2>
        <p className="text-sm text-cream-400">{t.customBuilder.subtitle}</p>
      </div>
      <CategorySection category="wings" />
      <CategorySection category="side" />
      <CategorySection category="drink" />
    </div>
  );
}
