import type { Variants } from "framer-motion";

/** Shared Framer Motion variants — all respect reduced-motion when
 *  consumers pass `custom={{ reducedMotion: true }}` or simply disable
 *  the y offset externally. Components should call `useReducedMotion()`
 *  and conditionally swap these out. */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeUpStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Returns reduced-motion-safe variants — removes y/scale transforms.
 *  The cast is intentional: we strip motion-only properties at runtime
 *  and the remaining object is always valid CSS/framer target values. */
export function safeVariants(variants: Variants, reduced: boolean): Variants {
  if (!reduced) return variants;
  const safe: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(variants)) {
    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      const { y: _y, scale: _scale, x: _x, ...rest } = val as Record<string, unknown>;
      void _y; void _scale; void _x;
      safe[key] = rest;
    } else {
      safe[key] = val;
    }
  }
  return safe as Variants;
}
