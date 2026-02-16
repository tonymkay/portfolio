import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { getFeaturedProjects } from '../../data/projects'
import { motion as motionPresets } from '../../theme/motion'
import ProjectCard from '../../components/ui/ProjectCard'
import CtaBanner from '../../components/ui/CtaBanner'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import styles from './Home.module.css'

const { home, designer, images: pageImages } = siteContent
const featuredProjects = getFeaturedProjects()

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ══════════════════════════════════════
          HERO — animated on mount (not scroll)
          ══════════════════════════════════════ */}
      <motion.section
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <div
          className={styles.heroOverlay}
          style={pageImages.homeHero ? { backgroundImage: `url(${pageImages.homeHero})` } : {}}
        />
        <div className={`container ${styles.heroContent}`}>
          <Reveal variant="fadeUp" as="h1" className={styles.heroName}>
            {designer.fullName}
          </Reveal>
          <Reveal variant="fadeIn" as="p" className={styles.heroSubtitle}>
            {designer.title}
          </Reveal>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          INTRO — left col slides in, right col
          slides in from the other side
          ══════════════════════════════════════ */}
      <ScrollRevealSection className={styles.intro}>
        <div className={`container ${styles.introGrid}`}>

          <div className={styles.introLeft}>
            <Reveal variant="popIn" as="h2" className={styles.introGreeting}>
              Hello👋
            </Reveal>
            <Reveal variant="fadeUp" as="p" className={styles.introBio}>
              {designer.shortBio}
            </Reveal>
            <Reveal variant="fadeIn" as="p" className={styles.introBioDetail}>
              {home.hero.description}
            </Reveal>
            <Reveal variant="fadeUp">
              <Link to="/contact" className={styles.learnMoreBtn}>
                {home.hero.learnMoreLabel}
              </Link>
            </Reveal>
          </div>

          <Reveal variant="slideRight" className={styles.introRight}>
            <div className={styles.portraitWrapper}>
              {pageImages.homePortrait ? (
                <img
                  src={pageImages.homePortrait}
                  alt="Portrait of Antony Murimi"
                  className={styles.portraitImage}
                />
              ) : (
                <div className={styles.portraitPlaceholder} aria-hidden="true" />
              )}
            </div>
          </Reveal>

        </div>
      </ScrollRevealSection>

      {/* ══════════════════════════════════════
          PROJECTS — header fades in, cards
          stagger up one by one
          ══════════════════════════════════════ */}
      <ScrollRevealSection className={styles.projects}>
        <div className="container">

          <div className={styles.projectsHeader}>
            <Reveal variant="popIn" as="span" className={styles.eyebrow}>
              ● {home.projects.eyebrow}
            </Reveal>
            <Reveal variant="fadeUp" as="h2" className={styles.projectsHeading}>
              {home.projects.heading}
            </Reveal>
            <Reveal variant="fadeIn">
              <Link to={home.projects.viewMoreHref} className={styles.viewMore}>
                {home.projects.viewMoreLabel}
              </Link>
            </Reveal>
          </div>

          <div className={styles.projectsGrid}>
            {featuredProjects.slice(0, 6).map((project) => (
              <Reveal key={project.id} variant="scaleUp">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

        </div>
      </ScrollRevealSection>

      {/* ══════════════════════════════════════
          TESTIMONIALS — cards slide up
          ══════════════════════════════════════ */}
      <ScrollRevealSection className={styles.testimonials}>
        <div className="container">

          <div className={styles.testimonialsHeader}>
            <Reveal variant="popIn" as="span" className={styles.eyebrow}>
              ● {home.testimonials.eyebrow}
            </Reveal>
            <Reveal variant="fadeUp" as="h2" className={styles.testimonialsHeading}>
              {home.testimonials.heading}
            </Reveal>
            <Reveal variant="fadeIn">
              <Link to="/projects" className={styles.viewMore}>
                {home.testimonials.viewMoreLabel}
              </Link>
            </Reveal>
          </div>

          <div className={styles.testimonialGrid}>
            {home.testimonials.items.map((t, i) => (
              <Reveal key={i} variant="fadeUp" className={styles.testimonialCard}>
                <div className={styles.testimonialAuthorRow}>
                  <div className={styles.avatarCircle} />
                  <div>
                    <p className={styles.testimonialName}>{t.name}</p>
                    <p className={styles.testimonialRole}>{t.role}</p>
                  </div>
                </div>
                <p className={styles.testimonialQuote}>{t.quote}</p>
              </Reveal>
            ))}
          </div>

        </div>
      </ScrollRevealSection>

      {/* ══════════════════════════════════════
          CTA BANNER
          ══════════════════════════════════════ */}
      <CtaBanner
        heading={home.cta.heading}
        description={home.cta.description}
        ctaLabel={home.cta.ctaLabel}
        ctaHref={home.cta.ctaHref}
        image={pageImages.homeCta}
      />

    </div>
  )
}
