import { useI18n } from "@/context/I18nContext";
import { MousePointerClick, SlidersHorizontal, PartyPopper } from "lucide-react";

export function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    { icon: MousePointerClick, title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
    { icon: SlidersHorizontal, title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
    { icon: PartyPopper, title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20">
      <div className="section-container">
        <h2 className="mb-10 text-center font-display text-2xl font-bold text-cream-50 sm:text-3xl">
          {t.howItWorks.title}
        </h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card card-hover relative flex flex-col items-center gap-3 p-6 text-center sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500/15 text-primary-400">
                  <Icon size={26} />
                </div>
                <h3 className="font-display text-lg font-semibold text-cream-50">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-cream-300">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
