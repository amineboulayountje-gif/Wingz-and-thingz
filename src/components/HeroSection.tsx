import { useI18n } from "@/context/I18nContext";
import { UtensilsCrossed, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
  onHowItWorks: () => void;
}

export function HeroSection({ onStart, onHowItWorks }: HeroSectionProps) {
  const { t } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden pt-16 lg:pt-18">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-base via-base to-base-surface" />
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-600/20 blur-[120px]" />
        <div className="absolute -left-40 top-40 h-[400px] w-[400px] rounded-full bg-gold-500/10 blur-[100px]" />
      </div>

      <div className="section-container py-16 sm:py-20 lg:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-base-border bg-base-card/60 px-4 py-2 text-sm font-medium text-cream-200 backdrop-blur">
            <UtensilsCrossed size={14} className="text-primary-400" />
            {t.footer.location} · {t.footer.tagline}
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-cream-50 sm:text-5xl lg:text-6xl">
            {t.hero.headline}
            <br />
            <span className="text-gradient">{t.hero.headlineAccent}</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-cream-300 sm:text-lg">
            {t.hero.subtext}
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button onClick={onStart} className="btn-primary w-full sm:w-auto">
              {t.hero.ctaPrimary}
            </button>
            <button
              onClick={onHowItWorks}
              className="btn-secondary w-full sm:w-auto"
            >
              <ArrowDown size={18} />
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
