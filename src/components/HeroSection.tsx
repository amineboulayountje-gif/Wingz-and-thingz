interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const occasions = [
    "Verjaardagen",
    "Familiefeesten",
    "Housewarmings",
    "Babyshowers",
    "Tuinfeesten",
    "Girls' nights",
    "Friends gatherings",
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-16 lg:pt-18">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-base via-base to-base-surface" />

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-600/20 blur-[120px]" />

        <div className="absolute -left-40 top-40 h-[400px] w-[400px] rounded-full bg-gold-500/10 blur-[100px]" />
      </div>

      {/* Hero content */}
      <div className="section-container py-16 sm:py-20 lg:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Main headline */}
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-cream-50">
              Jij regelt het feestje.
            </span>

            <span
              className="block"
              style={{ color: "rgb(249, 115, 22)" }}
            >
              Wij regelen de tafel.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-300 sm:text-lg">
            Meer tijd voor je gasten — wij zorgen voor een tafel vol lekkers.
          </p>
        </div>

        {/* Occasions */}
        <div className="mx-auto mt-8 max-w-4xl sm:mt-10">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {occasions.map((occasion) => (
              <div
                key={occasion}
                className="rounded-full border border-base-border bg-base-card/60 px-4 py-2.5 text-sm font-medium text-cream-200 backdrop-blur-sm sm:px-5 sm:py-3"
              >
                {occasion}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
