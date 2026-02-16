/**
 * Reveal.jsx
 *
 * Animate-in wrapper for individual elements inside a ScrollRevealSection.
 * Inherits the parent's "visible"/"hidden" state via Framer Motion variant
 * propagation — no extra wiring needed.
 *
 * Props:
 *   variant   — one of the keys in motion.js: "fadeUp" | "fadeIn" |
 *               "slideLeft" | "slideRight" | "scaleUp" | "popIn"
 *               Defaults to "fadeUp"
 *   as        — HTML tag to render (default: "div")
 *   className — passed straight through
 *   style     — passed straight through
 *   children  — content to animate
 *
 * Usage:
 *   <Reveal variant="slideLeft" as="h2" className={styles.heading}>
 *     My Heading
 *   </Reveal>
 *
 *   <Reveal variant="scaleUp">
 *     <ProjectCard ... />
 *   </Reveal>
 */
import { motion } from 'framer-motion'
import { motion as motionPresets } from '../../theme/motion'

export default function Reveal({
  children,
  variant = 'fadeUp',
  as = 'div',
  className,
  style,
  ...props
}) {
  const Tag = motion[as] ?? motion.div
  const variants = motionPresets[variant] ?? motionPresets.fadeUp

  return (
    <Tag
      className={className}
      style={style}
      variants={variants}
      {...props}
    >
      {children}
    </Tag>
  )
}
