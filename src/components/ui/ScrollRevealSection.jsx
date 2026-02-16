/**
 * ScrollRevealSection.jsx
 *
 * Scroll-triggered stagger container.
 * - Watches viewport via IntersectionObserver
 * - When visible, fires "visible" on itself AND propagates to all
 *   child <Reveal> components via variant inheritance
 * - Fires only once (observer disconnects after trigger)
 *
 * Usage:
 *   <ScrollRevealSection className={styles.intro}>
 *     <Reveal variant="fadeIn"><span>Eyebrow</span></Reveal>
 *     <Reveal variant="fadeUp"><h2>Heading</h2></Reveal>
 *     <Reveal variant="slideLeft"><p>Body text</p></Reveal>
 *   </ScrollRevealSection>
 */
import { motion } from 'framer-motion'
import { motion as motionPresets } from '../../theme/motion'
import useScrollReveal from '../../hooks/useScrollReveal'

export default function ScrollRevealSection({
  children,
  className,
  // Lower threshold = triggers earlier (good for tall sections)
  threshold = 0.08,
  as = 'section',
  ...props
}) {
  const { ref, isVisible } = useScrollReveal(threshold)
  const Tag = motion[as] ?? motion.section

  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={motionPresets.staggerContainer}
      {...props}
    >
      {children}
    </Tag>
  )
}
