import { useState } from "react";

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
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          {/* Main headline */}
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-cream-50 sm:text-5xl lg:text-6xl">
            Jij regelt het feestje. Wij regelen de tafel.
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl text-base leading-relaxed text-cream-300 sm:text-lg">
            Meer tijd voor je gasten — wij zorgen voor een tafel vol lekkers.
          </p>
        </div>

        {/* Perfect voor */}
        <div className="mx-auto mt-16 max-w-4xl sm:mt-20">
          <div className="mb-6 text-center">
            <h2 className="font-display text-2xl font-bold text-cream-50 sm:text-3xl">
              Perfect voor
            </h2>
          </div>

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
