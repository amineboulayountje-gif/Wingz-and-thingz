import { useI18n } from "@/context/I18nContext";

interface ProblemSolutionProps {
  onStart: () => void;
}

export function ProblemSolution({ onStart }: ProblemSolutionProps) {
  const { t } = useI18n();

  return (
    <section className="py-12 sm:py-16">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-semibold leading-snug text-cream-50 sm:text-3xl lg:text-4xl">
            {t.problem.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream-300 sm:text-lg">
            {t.problem.sub1}
          </p>
          <p className="mt-4 text-base leading-relaxed text-cream-200 sm:text-lg">
            {t.problem.sub2}
          </p>
          <button onClick={onStart} className="btn-primary mt-7">
            {t.problem.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
