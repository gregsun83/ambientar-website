"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";

// Architectural line icons — consistent 1.5px stroke, minimal
const SERVICE_ICONS = [
  // Drafting compass — Diseño Arquitectónico
  <svg
    key="diseno"
    className="w-5 h-5"
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
  // House with roof — Remodelaciones
  <svg
    key="remodelaciones"
    className="w-5 h-5"
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
  // Eye — Supervisión
  <svg
    key="supervision"
    className="w-5 h-5"
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
    className="w-5 h-5"
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
  // Waveform / analysis — Análisis
  <svg
    key="analisis"
    className="w-5 h-5"
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
  const { lang }  = useLanguage();
  const t         = content.services[lang];
  const reduced   = useReducedMotion();

  const fadeIn = (delay = 0) => ({
    initial:     { opacity: 0, y: reduced ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: "-60px" } as const,
    transition:  {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section id="services" className="bg-offwhite py-28 lg:py-40 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div {...fadeIn()} className="mb-20 lg:mb-28 max-w-2xl">
          <p className="section-label text-sage mb-4">{t.sectionLabel}</p>
          <h2
            className="font-serif text-charcoal font-light leading-tight whitespace-pre-line"
            style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)" }}
          >
            {t.heading}
          </h2>
        </motion.div>

        {/* ── Service list — editorial numbered layout ── */}
        <div className="divide-y divide-warmGray/25">
          {t.items.map((service, i) => (
            <motion.div
              key={service.key}
              {...fadeIn(0.06 + i * 0.07)}
              className="group grid grid-cols-[3rem_1fr] lg:grid-cols-[4rem_1fr_2.2fr] gap-x-6 lg:gap-x-12 py-10 lg:py-12 items-start"
            >
              {/* Index number */}
              <div className="pt-0.5">
                <span
                  aria-hidden="true"
                  className="font-serif text-warmGray font-light leading-none select-none"
                  style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Icon + title (left panel on desktop) */}
              <div className="lg:border-r lg:border-warmGray/20 lg:pr-10 pb-3 lg:pb-0">
                <div
                  className="inline-flex items-center justify-center text-olive mb-5
                             w-10 h-10 rounded-xl border border-warmGray/30
                             group-hover:border-sage/50 group-hover:bg-sage/5
                             transition-all duration-300"
                >
                  {SERVICE_ICONS[i]}
                </div>
                <h3
                  className="font-serif text-charcoal font-medium leading-snug"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}
                >
                  {service.title}
                </h3>
              </div>

              {/* Description (right panel on desktop; stacked on mobile below) */}
              <p className="col-span-2 lg:col-span-1 text-charcoal/55 font-sans text-sm leading-relaxed lg:pt-1 lg:pl-2">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Closing accent line ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-0 h-px bg-gradient-to-r from-sage/40 via-warmGray/20 to-transparent origin-left"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
