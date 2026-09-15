import { useEffect, useRef, useState } from "react";

const occasionsTop = [
  "Verjaardagen",
  "Housewarmings",
  "Tuinfeesten",
];

const occasionsBottom = [
  "Familiefeesten",
  "Babyshowers",
  "Girls' nights",
];

const foodImages = [
  {
    src: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=1200&q=85",
    alt: "Knapperige chicken wings",
  },
  {
    src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=85",
    alt: "Tafel vol lekker eten",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=85",
    alt: "Gezellige tafel met eten",
  },
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=85",
    alt: "Food spread om te delen",
  },
];

function OccasionChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((occasion) => (
        <span
          key={occasion}
          className="rounded-full border border-base-border bg-base-card/70 px-4 py-2 text-sm font-medium text-cream-200 backdrop-blur-sm"
        >
          {occasion}
        </span>
      ))}
    </div>
  );
}

export function InspirationSection() {
  const [activeImage, setActiveImage] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % foodImages.length);
    }, 4500);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goToImage = (index: number) => {
    setActiveImage(index);

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % foodImages.length);
    }, 4500);
  };

  return (
    <section
      id="inspiration"
      className="overflow-hidden border-t border-base-border bg-base-surface py-16 sm:py-20 lg:py-28"
    >
      <div className="section-container">
        <div className="mx-auto max-w-5xl">
          {/* Intro */}
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-400">
              Wingz & Thingz · Antwerpen
            </p>

            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-cream-50 sm:text-4xl lg:text-5xl">
              Voor elk feestje in Antwerpen,
              <span className="block text-primary-400">
                een tafel vol lekkers.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-300 sm:text-lg">
              Een verjaardag thuis. Een avond met vrienden. Of gewoon een reden
              om iedereen rond één tafel te verzamelen.
            </p>
          </div>

          {/* First occasion break */}
          <div className="mt-8">
            <OccasionChips items={occasionsTop} />
          </div>

          {/* Main copy */}
          <div className="mt-8 max-w-3xl">
            <p className="text-base leading-relaxed text-cream-300 sm:text-lg">
              Met Wingz & Thingz hoef je niet te kiezen tussen genieten van je
              gasten en de hele avond in de keuken staan. Wij zorgen voor
              knapperige wings, lekkere sides en een tafel die klaarstaat om
              gedeeld te worden.
            </p>
          </div>

          {/* Second occasion break */}
          <div className="mt-8">
            <OccasionChips items={occasionsBottom} />
          </div>

          {/* Closing copy */}
          <div className="mt-8 max-w-3xl">
            <p className="text-base leading-relaxed text-cream-300 sm:text-lg">
              Of het nu klein en gezellig is of net iets uitgebreider: jij
              bepaalt wat er op tafel komt. Wij doen de rest.
            </p>

            <p className="mt-8 max-w-xl font-display text-2xl font-bold leading-tight text-cream-50 sm:text-3xl">
              Jij regelt het feestje.
              <span className="block text-primary-400">
                Wij regelen de tafel.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Closing food carousel */}
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <div className="relative h-[220px] w-full overflow-hidden sm:h-[280px] lg:h-[340px]">
          {foodImages.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                index === activeImage
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }`}
            />
          ))}

          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Counter */}
          <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-medium tracking-wider text-white backdrop-blur-md">
            {String(activeImage + 1).padStart(2, "0")} /{" "}
            {String(foodImages.length).padStart(2, "0")}
          </div>

          {/* Carousel controls */}
          <div className="absolute bottom-5 right-5 flex items-center gap-2">
            {foodImages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Bekijk foto ${index + 1}`}
                onClick={() => goToImage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeImage
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
