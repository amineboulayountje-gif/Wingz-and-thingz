import { useI18n } from "@/context/I18nContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { siteConfig } from "@/data/products";
import { MapPin, MessageCircle, Instagram, Mail } from "lucide-react";

export function Footer() {
  const { t } = useI18n();

  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}`;

  return (
    <footer className="border-t border-base-border bg-base-surface">
      <div className="section-container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 font-display text-lg font-bold text-cream-50">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-sm font-bold text-white">
                W
              </span>
              {siteConfig.brand}
            </div>
            <p className="text-sm text-cream-400">{t.footer.tagline}</p>
            <div className="flex items-center gap-1.5 text-sm text-cream-400">
              <MapPin size={14} className="text-primary-400" />
              {t.footer.location}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-display text-sm font-semibold text-cream-50">
              {t.footer.contact}
            </h4>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-cream-400 hover:text-primary-400"
            >
              <MessageCircle size={14} />
              {t.footer.whatsapp}
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-cream-400 hover:text-primary-400"
            >
              <Instagram size={14} />
              {t.footer.instagram}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-sm text-cream-400 hover:text-primary-400"
            >
              <Mail size={14} />
              {siteConfig.email}
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-display text-sm font-semibold text-cream-50">
              {t.footer.privacy}
            </h4>
            <button className="text-left text-sm text-cream-400 hover:text-primary-400">
              {t.footer.privacy}
            </button>
            <button className="text-left text-sm text-cream-400 hover:text-primary-400">
              {t.footer.terms}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-semibold text-cream-50">
              {t.aria.language}
            </h4>
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>

        <div className="mt-8 border-t border-base-border pt-6 text-center text-xs text-cream-500">
          © {new Date().getFullYear()} {siteConfig.brand}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
