import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { siteContent } from '../../data/siteContent'
import { getAllProjects } from '../../data/projects'
import { motion as motionPresets } from '../../theme/motion'
import Tag from '../../components/ui/Tag'
import CtaBanner from '../../components/ui/CtaBanner'
import ScrollRevealSection from '../../components/ui/ScrollRevealSection'
import Reveal from '../../components/ui/Reveal'
import styles from './About.module.css'

const { home, designer, images: pageImages } = siteContent
const allProjects = getAllProjects()
const carouselProjects = [...allProjects, ...allProjects]

export default function About() {
  return (
    <div className={styles.page}>

      {/* ══ HERO ══ */}
      <motion.section
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={motionPresets.staggerContainer}
      >
        <div
          className={styles.heroOverlay}
          style={pageImages.aboutWorkspace ? { backgroundImage: `url(${pageImages.aboutWorkspace})` } : {}}
        />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroLeft}>
            <Reveal variant="fadeIn" as="p" className={styles.heroGreeting}>Hello There 👋 I'm</Reveal>
            <Reveal variant="fadeUp" as="h1" className={styles.heroName}>Murimi</Reveal>
          </div>
          <div className={styles.heroRight}>
            <Reveal variant="slideRight" as="p" className={styles.heroDesc}>
              Hello, I'm Antony Murimi, a passionate Identity and UX/UI Designer with over 4+
              years of experience in crafting brilliant and impactful designs. I've been involved
              in various projects with a focus on user-centered design. Let's collaborate to bring
              your ideas to life!
            </Reveal>
            <Reveal variant="fadeUp">
              <Link to="/contact" className={styles.heroCta}>Let's talk ↗</Link>
            </Reveal>
          </div>
        </div>
      </motion.section>

      {/* ══ IN MY OWN WORDS ══ */}
      <ScrollRevealSection className={styles.about}>
        <div className={`container ${styles.aboutGrid}`}>
          <Reveal variant="slideLeft" className={styles.aboutCol1}>
            <span className={styles.eyebrow}>● About Me</span>
            <h2 className={styles.aboutHeading}>In My Own Words</h2>
            <p className={styles.aboutBody}>{designer.longBio}</p>
          </Reveal>
          <Reveal variant="scaleUp" className={styles.aboutCol2}>
            <div className={styles.statBox}>
              <span className={styles.statIcon}>⚙</span>
              <span className={styles.statNumber}>{designer.yearsExperience}</span>
              <span className={styles.statLabel}>{designer.experienceLabel}</span>
            </div>
            <div className={styles.smallPortraitWrapper}>
              {pageImages.aboutPortrait ? (
                <img src={pageImages.aboutPortrait} alt="Portrait of Antony Murimi" className={styles.smallPortraitImage} />
              ) : (
                <div className={styles.smallPortraitPlaceholder} aria-hidden="true" />
              )}
            </div>
          </Reveal>
          <Reveal variant="slideRight" className={styles.aboutCol3}>
            {home.about.journey.map((item, i) => (
              <div key={i} className={styles.journeyItem}>
                <span className={styles.journeyDot}>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                    <circle cx="10" cy="10" r="9" />
                  </svg>
                </span>
                <p className={styles.journeyText}>{item.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </ScrollRevealSection>

      {/* ══ EXPERIENCE — hover-expandable rows ══ */}
      <ScrollRevealSection className={styles.experience}>
        <div className={`container ${styles.expGrid}`}>

          <Reveal variant="slideLeft" className={styles.expLeft}>
            <span className={styles.eyebrow}>● Experiences</span>
            <h2 className={styles.expHeading}>{home.experience.heading}</h2>
            <p className={styles.expDesc}>{home.experience.description}</p>
            <Link to="/contact" className={styles.expCta}>{home.experience.ctaLabel}</Link>
          </Reveal>

          <div className={styles.expRight}>
            {home.experience.roles.map((role, i) => (
              <Reveal key={i} variant="fadeUp" className={styles.roleRow}>
                {/* Always-visible summary line */}
                <div className={styles.roleSummary}>
                  <span className={styles.roleYear}>{role.year}</span>
                  <span className={styles.roleCompanyInline}>{role.company}</span>
                  <span className={styles.roleDescInline}>{role.description}</span>
                </div>
                {/* Expanded details — revealed on hover via CSS */}
                <div className={styles.roleDetails}>
                  <div className={styles.roleLeftInfo}>
                    <span className={styles.roleYear}>{role.year}</span>
                    <div>
                      <p className={styles.roleCompany}>{role.company}</p>
                      <p className={styles.rolePeriod}>· {role.period}</p>
                    </div>
                  </div>
                  <div className={styles.roleRightInfo}>
                    <p className={styles.roleDesc}>{role.description}</p>
                    <div className={styles.roleTags}>
                      {role.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </ScrollRevealSection>

      {/* ══ JOURNEY IN THREE STEPS — hover to reveal description ══ */}
      <ScrollRevealSection className={styles.journey}>
        <div className={`container ${styles.journeyGrid}`}>

          <Reveal variant="slideLeft" className={styles.journeyLeft}>
            <span className={styles.eyebrow}>● My Journey</span>
            <h2 className={styles.journeyHeading}>{home.journey.heading}</h2>
          </Reveal>

          <div className={styles.journeySteps}>
            {home.journey.steps.map((step, i) => (
              <Reveal key={step.number} variant="fadeUp" className={styles.step}>
                <div className={styles.stepIndicator}>
                  <div className={styles.stepCircle}>{step.number}</div>
                  {i < home.journey.steps.length - 1 && (
                    <div className={styles.stepConnector} aria-hidden="true" />
                  )}
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  {/* Description hidden by default, revealed on hover */}
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </ScrollRevealSection>

      {/* ══ CAROUSEL ══ */}
      <ScrollRevealSection className={styles.carouselSection} threshold={0.05} aria-label="Featured projects">
        <div className={styles.carouselViewport}>
          <div className={styles.carouselTrack}>
            {carouselProjects.map((project, i) => (
              <Link
                key={`${project.id}-${i}`}
                to={`/projects/${project.slug}`}
                className={styles.carouselCard}
                aria-label={`View ${project.title}`}
                tabIndex={i >= allProjects.length ? -1 : 0}
              >
                <div className={styles.carouselImage}>
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={project.title} loading="lazy" />
                  ) : (
                    <div className={styles.carouselPlaceholder} />
                  )}
                  <div className={styles.carouselOverlay}>
                    <span className={styles.carouselArrow}>↗</span>
                  </div>
                </div>
                <p className={styles.carouselTitle}>{project.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

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
