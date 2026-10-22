import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { posterProjects } from '../../data/posters'
import { motion as motionPresets } from '../../theme/motion'
import BigStatHeader from '../../components/ui/BigStatHeader'
import GlassHeader from '../../components/ui/GlassHeader'
import ClosingCta from '../../components/ui/ClosingCta'
import MasonryGrid from '../../components/ui/MasonryGrid'
import Reveal from '../../components/ui/Reveal'
// Same look as Logos & Identities, so the page borrows its stylesheet as-is.
import styles from '../Projects/Projects.module.css'

const { header } = siteContent.posters

// The dark theme comes from <WorkLayout>.
export default function Posters() {
  return (
    <div className={styles.page}>

      {/* ══ HEADER — compact title + rule row; pins to the top as liquid glass ══ */}
      <GlassHeader>
        <motion.header
          className={`container ${styles.header}`}
          data-nav-title={header.title}
          initial="hidden"
          animate="visible"
          variants={motionPresets.staggerContainer}
        >
          <Reveal variant="fadeUp">
            <BigStatHeader compact title={header.title} count={posterProjects.length} label={header.label} />
          </Reveal>
        </motion.header>
      </GlassHeader>

      {/* ══ POSTER GRID — staggered masonry, rounded tiles (same as Logos & Identities) ══ */}
      <div className={`container ${styles.list}`}>
        {/* linkable={false}: no detail pages, tiles are plain images (no names).
            pinterest: denser columns, wider gaps, softer corners. */}
        <MasonryGrid projects={posterProjects} basePath="/posters" linkable={false} pinterest batchSize={4} />

        {posterProjects.length === 0 && (
          <p className={styles.empty}>No posters yet.</p>
        )}
      </div>

      {/* ══ CTA — same closing banner as About / Home ══ */}
      <ClosingCta />

    </div>
  )
}
