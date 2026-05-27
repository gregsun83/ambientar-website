"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";

export function Philosophy() {
  const { lang } = useLanguage();
  const t = content.philosophy[lang];
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["-6%", "6%"]
  );

  const anim = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-28 lg:py-44 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1C2419 0%, #243024 55%, #1A1E1A 100%)",
      }}
    >
      {/* Parallax architectural grid */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="philosophy-grid"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M80 0H0V80"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
              <circle cx="0" cy="0" r="1.5" fill="white" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#philosophy-grid)" />
        </svg>
      </motion.div>

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(90,110,70,0.10) 0%, transparent 70%)",
        }}
      />

      {/* AMBIENTAR watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <span
          className="font-serif text-white/[0.03] font-bold tracking-[0.5em] uppercase select-none whitespace-nowrap"
          style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
        >
          AMBIENTAR
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section label + heading ── */}
        <div className="text-center mb-20 lg:mb-28">
          <motion.p
            {...anim()}
            className="section-label text-sage/70 mb-6"
          >
            {t.sectionLabel}
          </motion.p>

          <motion.h2
            {...anim(0.1)}
            className="font-serif text-offwhite font-light leading-tight whitespace-pre-line"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
          >
            {t.heading}
          </motion.h2>

          {/* Decorative rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-4 mt-10 origin-center"
            aria-hidden="true"
          >
            <span className="h-px w-16 bg-sage/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <span className="h-px w-16 bg-sage/40" />
          </motion.div>
        </div>

        {/* ── Manifesto quote ── */}
        <motion.p
          {...anim(0.2)}
          className="text-offwhite/70 font-sans leading-loose text-center max-w-3xl mx-auto mb-20 lg:mb-28"
          style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)" }}
        >
          {t.manifesto}
        </motion.p>

        {/* ── Three pillars ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-offwhite/10 rounded-2xl overflow-hidden mb-20 lg:mb-28">
          {t.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              {...anim(0.1 + i * 0.1)}
              className="bg-forest-dark/60 backdrop-blur-sm px-8 py-10 lg:px-10 lg:py-12 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3" aria-hidden="true">
                <span className="h-px w-8 bg-sage/60" />
                <span
                  className="font-sans text-sage/70 tracking-[0.25em] uppercase"
                  style={{ fontSize: "0.6rem" }}
                >
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-serif text-offwhite font-medium leading-snug"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
              >
                {pillar.label}
              </h3>
              <p className="text-offwhite/55 font-sans text-sm leading-relaxed">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Mission / Vision row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20 lg:mb-28">
          {[
            { label: t.missionLabel, text: t.mission },
            { label: t.visionLabel, text: t.vision },
          ].map(({ label, text }, i) => (
            <motion.div key={label} {...anim(0.2 + i * 0.1)}>
              <p className="section-label text-sage/60 mb-4">{label}</p>
              <p
                className="font-serif text-offwhite/80 font-light leading-relaxed"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}
              >
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Quote ── */}
        <motion.blockquote {...anim(0.3)} className="text-center">
          <p
            className="font-serif text-sage-light italic font-light"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
