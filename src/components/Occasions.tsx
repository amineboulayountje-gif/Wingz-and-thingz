import { useI18n } from "@/context/I18nContext";
import { Cake, Users, Home, Baby, Trees, Sparkles, PartyPopper } from "lucide-react";

export function Occasions() {
  const { t } = useI18n();

  const icons = [Cake, Users, Home, Baby, Trees, Sparkles, PartyPopper];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="section-container">
        <div className="mb-8 flex flex-col gap-1 text-center">
          <h2 className="font-display text-2xl font-bold text-cream-50 sm:text-3xl">
            {t.occasions.title}
          </h2>
          <p className="text-sm text-cream-400">{t.occasions.subtitle}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {t.occasions.items.map((occasion, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="card flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3"
              >
                <Icon size={16} className="text-primary-400" />
                <span className="text-sm font-medium text-cream-200">
                  {occasion}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
