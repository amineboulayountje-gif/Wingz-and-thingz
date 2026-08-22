import { useI18n } from "@/context/I18nContext";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const { t } = useI18n();

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="section-container">
        <h2 className="mb-10 max-w-2xl text-center mx-auto font-display text-2xl font-bold text-cream-50 sm:text-3xl">
          {t.testimonials.title}
        </h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {t.testimonials.items.map((item, idx) => (
            <div key={idx} className="card card-hover flex flex-col gap-4 p-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-gold-400 text-gold-400" />
                ))}
              </div>
              <Quote size={24} className="text-primary-500/30" />
              <p className="flex-1 text-sm leading-relaxed text-cream-200">
                {item.text}
              </p>
              <div className="flex items-center gap-3 border-t border-base-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/15 font-display font-bold text-primary-400">
                  {item.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-sm font-semibold text-cream-50">
                    {item.name}
                  </span>
                  <span className="text-xs text-cream-400">{item.occasion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
