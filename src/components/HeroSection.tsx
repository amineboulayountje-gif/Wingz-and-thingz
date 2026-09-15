import { useCallback } from "react";

interface HeroSectionProps {
  onStart?: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  const scrollToOrder = useCallback(() => {
    if (onStart) {
      onStart();
      return;
    }

    const element = document.getElementById("order");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [onStart]);

  const foodImages = [
    {
      src: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=900&q=80",
      alt: "Chicken wings",
    },
    {
      src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=80",
      alt: "Food table",
    },
    {
      src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=900&q=80",
      alt: "Food and drinks",
    },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16 lg:pt-18"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-base via-base to-base-surface" />

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-600/20 blur-[120px]" />

        <div className="absolute -left-40 top-40 h-[400px] w-[400px] rounded-full bg-gold-500/10 blur-[100px]" />
      </div>

      {/* Hero content */}
      <div className="section-container py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
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

          {/* Food image strip */}
          <div className="hero-food-strip">
            {foodImages.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
              />
            ))}
          </div>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream-300 sm:text-lg">
            Meer tijd voor je gasten — wij zorgen voor een tafel vol lekkers.
          </p>

          {/* Primary CTA */}
          <div className="mt-7 sm:mt-8">
            <button
              type="button"
              onClick={scrollToOrder}
              className="btn-primary w-full sm:w-auto"
            >
              Stel je tafel samen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
