interface ProblemSolutionProps {
  onStart: () => void;
}

export function ProblemSolution({ onStart }: ProblemSolutionProps) {
  return (
    <section className="py-4 sm:py-6">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-semibold leading-snug text-cream-50 sm:text-3xl lg:text-4xl">
            Een feestje organiseren is leuk. Voor iedereen eten regelen iets minder.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-cream-300 sm:text-lg">
            Hoeveel heb je nodig? Wat lust iedereen? En wie staat er de hele avond in de keuken?
          </p>

          <p className="mt-3 text-base leading-relaxed text-cream-200 sm:text-lg">
            Wij maken het simpel. Kies een pakket of bouw je eigen tafel. Wij zorgen voor het eten, jij voor de sfeer.
          </p>

          <button onClick={onStart} className="btn-primary mt-5">
            Stel mijn tafel samen
          </button>
        </div>
      </div>
    </section>
  );
}
