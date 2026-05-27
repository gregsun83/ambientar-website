"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";

// Architectural line icons (consistent 1.5px stroke, minimal)
const SERVICE_ICONS = [
  // Drafting compass — Diseño Arquitectónico
  <svg
    key="diseno"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3a9 9 0 100 18A9 9 0 0012 3z" />
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
  // House with arrow — Remodelaciones
  <svg
    key="remodelaciones"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 12l9-9 9 9" />
    <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
  </svg>,
  // Eye with check — Supervisión
  <svg
    key="supervision"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // Grid — Modular
  <svg
    key="modular"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>,
  // Chart / analysis — Análisis
  <svg
    key="analisis"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>,
];

export function Services() {
  const { lang } = useLanguage();
  const t = content.services[lang];
  const reduced = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section id="services" className="bg-offwhite py-24 lg:py-36 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div {...fadeUp()} className="mb-16 lg:mb-20">
          <p className="section-label text-sage mb-4">{t.sectionLabel}</p>
          <h2
            className="font-serif text-charcoal font-light leading-tight max-w-lg whitespace-pre-line"
            style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)" }}
          >
            {t.heading}
          </h2>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.items.map((service, i) => (
            <motion.article
              key={service.key}
              {...fadeUp(0.08 + i * 0.07)}
              className="group relative bg-white border border-parchment rounded-xl p-7 lg:p-8 hover:border-sage/40 hover:shadow-md transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Subtle sage tint on hover */}
              <div className="absolute inset-0 bg-sage/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

              {/* Top: icon + thin line accent */}
              <div className="flex items-start justify-between mb-7">
                <div className="w-10 h-10 rounded-lg bg-parchment group-hover:bg-sage/10 flex items-center justify-center text-sage transition-colors duration-300">
                  {SERVICE_ICONS[i]}
                </div>
                {/* Architectural index mark */}
                <span
                  aria-hidden="true"
                  className="font-serif text-parchment text-2xl font-light select-none leading-none mt-0.5"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-serif text-charcoal font-medium leading-snug mb-3"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-charcoal/55 font-sans text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Bottom accent line */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-7 right-7 h-[1.5px] bg-sage/60 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
