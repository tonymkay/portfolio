/**
 * Motion / Animation Presets
 * Used with Framer Motion throughout the app
 *
 * PATTERN
 * ───────
 * Sections use ScrollRevealSection (stagger container)
 * Children use <Reveal> with a variant name (e.g. variant="fadeUp")
 * This gives each element its own timed entrance as you scroll.
 */

const EASE = [0.25, 0.1, 0.25, 1]
const EASE_OUT = [0, 0, 0.2, 1]

export const motion = {
  // ── Page-level transition (App.jsx / router) ──
  pageTransition: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.4, ease: EASE },
  },

  // ── Section-level container — staggered children ──
  // Use on ScrollRevealSection / any wrapper that holds Reveal children
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  },

  // ── Child variants — use via <Reveal variant="..."> ──

  // Default — gentle rise
  fadeUp: {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: EASE },
    },
  },

  // Subtle fade (no movement) — good for text blocks & labels
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.55, ease: EASE },
    },
  },

  // Slide in from the left
  slideLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: EASE_OUT },
    },
  },

  // Slide in from the right
  slideRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: EASE_OUT },
    },
  },

  // Scale up — good for cards, images, stat boxes
  scaleUp: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: EASE },
    },
  },

  // Eyebrow / tag pop-in — fast, subtle
  popIn: {
    hidden: { opacity: 0, scale: 0.85, y: 8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }, // spring-like
    },
  },

  // Easing constants (re-export for one-off use)
  ease: {
    smooth: EASE,
    out: EASE_OUT,
    in: [0.4, 0, 1, 1],
    inOut: [0.4, 0, 0.2, 1],
  },
}

export default motion
