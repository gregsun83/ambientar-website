"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";

const NAV_ITEMS = [
  { key: "services"   as const, id: "services" },
  { key: "philosophy" as const, id: "philosophy" },
  { key: "contact"    as const, id: "contact" },
];

export function Header() {
  const { lang, toggleLang } = useLanguage();
  const t = content.nav[lang];
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLabels: Record<string, string> = {
    services:   t.services,
    philosophy: t.philosophy,
    contact:    t.contact,
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "bg-charcoal/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">

        {/* ── Wordmark — Balgin (Comfortaa fallback until font file is added) ── */}
        <button
          onClick={() => scrollTo("journey")}
          className="font-balgin text-[1.05rem] tracking-[0.3em] text-offwhite uppercase hover:text-sage transition-colors duration-300"
          aria-label={lang === "es" ? "AMBIENTAR — volver al inicio" : "AMBIENTAR — back to top"}
        >
          AMBIENTAR
        </button>

        {/* Desktop nav */}
        <nav
          aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}
          className="hidden lg:block"
        >
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="text-offwhite/70 hover:text-offwhite text-xs tracking-[0.18em] uppercase font-sans transition-colors duration-200 cursor-pointer min-h-[44px] flex items-center"
                >
                  {navLabels[item.key]}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            className="text-offwhite/70 hover:text-offwhite text-xs tracking-[0.15em] uppercase border border-offwhite/25 hover:border-sage/60 hover:text-sage px-3 py-1.5 rounded-full transition-all duration-200 font-sans min-h-[44px] flex items-center"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollTo("contact")}
            className="hidden lg:inline-flex items-center bg-sage hover:bg-olive text-white text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full transition-colors duration-200 font-sans font-medium min-h-[44px]"
          >
            {t.cta}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? lang === "es" ? "Cerrar menú" : "Close menu"
                : lang === "es" ? "Abrir menú" : "Open menu"
            }
            aria-expanded={menuOpen}
            className="lg:hidden text-offwhite p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-charcoal/98 border-t border-offwhite/10"
          >
            <nav aria-label={lang === "es" ? "Navegación móvil" : "Mobile navigation"}>
              <ul className="px-6 py-6 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="w-full text-left text-offwhite/80 hover:text-offwhite font-serif text-2xl py-4 border-b border-offwhite/10 hover:border-sage/30 transition-all"
                    >
                      {navLabels[item.key]}
                    </button>
                  </li>
                ))}
                <li className="pt-6">
                  <a
                    href="https://wa.me/50766029004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs tracking-[0.15em] uppercase py-4 rounded-full transition-colors font-sans font-medium min-h-[44px]"
                  >
                    WhatsApp
                  </a>
                </li>
                <li className="pt-2">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="w-full bg-sage hover:bg-olive text-white text-xs tracking-[0.15em] uppercase py-4 rounded-full transition-colors font-sans font-medium min-h-[44px]"
                  >
                    {t.cta}
                  </button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
