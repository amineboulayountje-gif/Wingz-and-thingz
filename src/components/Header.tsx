import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  onNavigate: (id: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-base-border bg-base/90 backdrop-blur-lg"
          : "border-b border-transparent bg-base/40 backdrop-blur-sm"
      }`}
    >
      <div className="section-container">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-18">
          <button
            onClick={() => handleNav("top")}
            className="flex items-center transition-opacity hover:opacity-80"
          >
            <img
              src="/logo.png"
              alt="Wingz & Thingz"
              className="h-10 w-auto object-contain"
            />
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            <button
              onClick={() => handleNav("how-it-works")}
              className="btn-ghost text-sm"
            >
              {t.nav.howItWorks}
            </button>

            <button
              onClick={() => handleNav("menu")}
              className="btn-ghost text-sm"
            >
              {t.nav.menu}
            </button>

            <button
              onClick={() => handleNav("extras")}
              className="btn-ghost text-sm"
            >
              {t.nav.extras}
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher variant="desktop" />

            <button
              onClick={() => handleNav("order")}
              className="btn-primary hidden px-5 py-2.5 text-sm lg:inline-flex"
            >
              {t.nav.cta}
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-base-border bg-base-card text-cream-50 md:hidden"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-base-border bg-base/95 backdrop-blur-lg md:hidden">
          <div className="section-container flex flex-col gap-1 py-4">
            <button
              onClick={() => handleNav("how-it-works")}
              className="rounded-xl px-4 py-3 text-left text-cream-100 hover:bg-base-hover"
            >
              {t.nav.howItWorks}
            </button>

            <button
              onClick={() => handleNav("menu")}
              className="rounded-xl px-4 py-3 text-left text-cream-100 hover:bg-base-hover"
            >
              {t.nav.menu}
            </button>

            <button
              onClick={() => handleNav("extras")}
              className="rounded-xl px-4 py-3 text-left text-cream-100 hover:bg-base-hover"
            >
              {t.nav.extras}
            </button>

            <div className="flex items-center justify-between px-4 py-3">
              <LanguageSwitcher variant="mobile" />
            </div>

            <button
              onClick={() => handleNav("order")}
              className="btn-primary mt-2 w-full"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
