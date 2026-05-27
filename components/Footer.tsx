"use client";

import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";

const WHATSAPP_NUMBER = "50766029004";
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { lang } = useLanguage();
  const t = content.footer[lang];
  const contactT = content.contact[lang];
  const navT = content.nav[lang];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const NAV_LINKS = [
    { label: navT.services, id: "services" },
    { label: navT.philosophy, id: "philosophy" },
    { label: navT.contact, id: "contact" },
  ];

  return (
    <footer className="bg-charcoal text-offwhite py-16 lg:py-20 px-6" role="contentinfo">
      <div className="max-w-7xl mx-auto">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-offwhite/10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <button
              onClick={() => scrollTo("journey")}
              className="font-serif text-2xl tracking-[0.25em] uppercase mb-4 text-offwhite hover:text-sage-light transition-colors duration-300 block"
              aria-label={lang === "es" ? "Volver al inicio" : "Back to top"}
            >
              AMBIENTAR
            </button>
            <p className="text-offwhite/50 font-sans text-sm leading-relaxed max-w-xs mb-2">
              {t.tagline}
            </p>
            <p className="text-offwhite/30 font-sans text-xs">
              {t.studio}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label text-offwhite/35 mb-5">
              {lang === "es" ? "Secciones" : "Sections"}
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-offwhite/55 hover:text-offwhite text-sm font-sans transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label text-offwhite/35 mb-5">
              {contactT.sectionLabel}
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  className="text-offwhite/55 hover:text-offwhite text-sm font-sans transition-colors"
                >
                  {contactT.phone}
                </a>
              </li>
              <li>
                <a
                  href="mailto:ambientar.pty@gmail.com"
                  className="text-offwhite/55 hover:text-offwhite text-sm font-sans transition-colors break-all"
                >
                  {contactT.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-offwhite/55 hover:text-[#25D366] text-sm font-sans transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/cecilia-raquel-tejada-del-rosario-6956363b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-offwhite/55 hover:text-offwhite text-sm font-sans transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <span className="text-offwhite/30 text-xs font-sans">
                  {t.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-offwhite/30 font-sans text-xs">
          <p>&copy; {CURRENT_YEAR} {t.copyright}</p>
          <p>
            {lang === "es"
              ? "Diseñado con propósito y sostenibilidad."
              : "Designed with purpose and sustainability."}
          </p>
        </div>
      </div>
    </footer>
  );
}
