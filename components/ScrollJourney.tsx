"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";

// ─── Frame assets ────────────────────────────────────────────────────────────
// 24 JPEG frames (every 3rd of 70 original GIF frames)
const FRAME_COUNT = 24;
const DESKTOP_FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/assets/scroll-sequence/f${String(i).padStart(2, "0")}.jpg`
);
// Mobile: use every 3rd desktop frame = 8 frames (indices 0,3,6,9,12,15,18,21)
const MOBILE_FRAMES = DESKTOP_FRAMES.filter((_, i) => i % 3 === 0);
const POSTER = "/assets/scroll-sequence/poster.jpg";
const WHATSAPP_URL = "https://wa.me/50766029004";

// ─── Icons ───────────────────────────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg
      className="w-5 h-5 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Chapter overlay ──────────────────────────────────────────────────────────
interface ChapterProps {
  eyebrow: string;
  text: string;
  opacity: MotionValue<number>;
  isLast?: boolean;
  whatsappLabel: string;
  consultLabel: string;
}

function Chapter({ eyebrow, text, opacity, isLast, whatsappLabel, consultLabel }: ChapterProps) {
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Eyebrow */}
      <p
        className="font-sans text-sage-light/90 tracking-[0.35em] uppercase mb-5"
        style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)" }}
      >
        {eyebrow}
      </p>

      {/* Thin rule */}
      <div className="h-px w-12 bg-sage/50 mb-7" aria-hidden="true" />

      {/* Headline */}
      <h2
        className="font-serif text-offwhite font-light text-center leading-tight max-w-2xl"
        style={{ fontSize: "clamp(1.7rem, 4.5vw, 4rem)" }}
      >
        {text}
      </h2>

      {/* Last chapter CTAs */}
      {isLast && (
        <div className="mt-10 flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-medium text-sm tracking-wide px-7 py-4 rounded-full transition-colors duration-300 shadow-lg min-h-[44px]"
            aria-label={`${whatsappLabel} — abre WhatsApp`}
          >
            <WhatsAppIcon />
            {whatsappLabel}
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center border border-offwhite/40 hover:border-offwhite/80 text-offwhite/80 hover:text-offwhite font-sans text-sm tracking-wide px-7 py-4 rounded-full transition-all duration-300 min-h-[44px]"
          >
            {consultLabel}
          </a>
        </div>
      )}
    </motion.div>
  );
}

// ─── Scroll indicator ─────────────────────────────────────────────────────────
function ScrollIndicator({
  opacity,
  label,
}: {
  opacity: MotionValue<number>;
  label: string;
}) {
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none select-none"
      aria-hidden="true"
    >
      <p className="font-sans text-offwhite/50 text-xs tracking-[0.2em] uppercase">
        {label}
      </p>
      <div className="w-px h-10 bg-gradient-to-b from-offwhite/30 to-transparent animate-scroll-bounce" />
    </motion.div>
  );
}

// ─── Progress dots ────────────────────────────────────────────────────────────
function ProgressDots({
  total,
  scrollProgress,
}: {
  total: number;
  scrollProgress: MotionValue<number>;
}) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollProgress, "change", (v) => {
    setActive(Math.min(Math.floor(v * total), total - 1));
  });
  return (
    <div
      className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10"
      aria-hidden="true"
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === active ? 6 : 4,
            height: i === active ? 6 : 4,
            background:
              i === active
                ? "rgba(163,181,153,0.9)"
                : "rgba(245,243,238,0.3)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function ScrollJourney() {
  const { lang } = useLanguage();
  const t = content.scrollJourney[lang];
  const reduced = useReducedMotion();

  // ── Mobile detection ──
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const frames = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
  const isMobileRef = useRef(isMobile);
  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  // ── Preload frames ──
  useEffect(() => {
    if (reduced) return;
    frames.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [frames, reduced]);

  // ── Scroll setup ──
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ── Double-buffer image swap (no React state, pure DOM) ──
  const imgARef = useRef<HTMLImageElement>(null);
  const imgBRef = useRef<HTMLImageElement>(null);
  const bufRef = useRef<{ active: "A" | "B"; lastFrame: number }>({
    active: "A",
    lastFrame: 0,
  });
  const rafRef = useRef<number | undefined>();
  const pendingRef = useRef(0);

  const swapFrame = useCallback(() => {
    rafRef.current = undefined;
    const p = pendingRef.current;
    const localFrames = isMobileRef.current ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const total = localFrames.length;
    const idx = Math.min(Math.max(Math.floor(p * total), 0), total - 1);

    if (idx === bufRef.current.lastFrame) return;
    bufRef.current.lastFrame = idx;

    const imgA = imgARef.current;
    const imgB = imgBRef.current;
    if (!imgA || !imgB) return;

    if (bufRef.current.active === "A") {
      imgB.src = localFrames[idx];
      imgB.style.opacity = "1";
      imgA.style.opacity = "0";
      bufRef.current.active = "B";
    } else {
      imgA.src = localFrames[idx];
      imgA.style.opacity = "1";
      imgB.style.opacity = "0";
      bufRef.current.active = "A";
    }
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reduced) return;
    pendingRef.current = progress;
    if (rafRef.current !== undefined) return;
    rafRef.current = requestAnimationFrame(swapFrame);
  });

  // Cleanup rAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Chapter opacities (all at top level — hooks rule compliant) ──
  const ch0 = useTransform(scrollYProgress, [0, 0.14, 0.17], [1, 1, 0]);
  const ch1 = useTransform(scrollYProgress, [0.17, 0.20, 0.31, 0.34], [0, 1, 1, 0]);
  const ch2 = useTransform(scrollYProgress, [0.34, 0.37, 0.48, 0.51], [0, 1, 1, 0]);
  const ch3 = useTransform(scrollYProgress, [0.51, 0.54, 0.65, 0.68], [0, 1, 1, 0]);
  const ch4 = useTransform(scrollYProgress, [0.68, 0.71, 0.82, 0.85], [0, 1, 1, 0]);
  const ch5 = useTransform(scrollYProgress, [0.85, 0.88, 0.97, 1.00], [0, 1, 1, 1]);
  const chapterOpacities = [ch0, ch1, ch2, ch3, ch4, ch5];

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const sectionFadeOut = useTransform(scrollYProgress, [0.90, 1.00], [0, 1]);

  // Overlay gradient that darkens bottom as section ends
  const overlayOpacity = useTransform(scrollYProgress, [0.0, 0.5, 1.0], [0.45, 0.3, 0.55]);

  // ── Scroll container height ──
  const scrollH = isMobile ? "350vh" : "520vh";

  return (
    <section
      ref={containerRef}
      id="journey"
      style={{ height: scrollH }}
      className="relative"
      aria-label={
        lang === "es" ? "Viaje arquitectónico AMBIENTAR" : "AMBIENTAR architectural journey"
      }
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden">

        {/* ── Background frame images ── */}
        {/* eslint-disable @next/next/no-img-element */}
        {/* Poster (SSR-safe fallback, always visible) */}
        <img
          src={POSTER}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Frame A — rAF-driven src swap; next/image cannot handle this pattern */}
        <img
          ref={imgARef}
          src={frames[0]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 1, transition: "opacity 0.3s ease" }}
        />

        {/* Frame B */}
        <img
          ref={imgBRef}
          src={frames[1] ?? frames[0]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0, transition: "opacity 0.3s ease" }}
        />
        {/* eslint-enable @next/next/no-img-element */}

        {/* Cinematic overlay gradient */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/60 via-forest-dark/20 to-forest-dark/70" />
        </motion.div>

        {/* Grain texture overlay for cinematic feel */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* ── Accessible text (screen readers) ── */}
        <div className="sr-only">
          {t.chapters.map((chapter, i) => (
            <p key={i}>{chapter.text}</p>
          ))}
        </div>

        {/* ── Chapter texts (visual, aria-hidden) ── */}
        {t.chapters.map((chapter, i) => (
          <Chapter
            key={i}
            eyebrow={chapter.eyebrow}
            text={chapter.text}
            opacity={chapterOpacities[i]}
            isLast={i === t.chapters.length - 1}
            whatsappLabel={t.whatsapp}
            consultLabel={t.consult}
          />
        ))}

        {/* ── Scroll indicator (fades out) ── */}
        <ScrollIndicator
          opacity={scrollHintOpacity}
          label={t.scrollHint}
        />

        {/* ── Progress dots (desktop) ── */}
        <div className="hidden md:block">
          <ProgressDots total={t.chapters.length} scrollProgress={scrollYProgress} />
        </div>

        {/* ── Section exit fade ── */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: sectionFadeOut }}
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20"
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent to-offwhite" />
        </motion.div>
      </div>
    </section>
  );
}
