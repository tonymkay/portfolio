import { Fragment } from 'react'
import ProjectCard from './ProjectCard'
import ScrollRevealSection from './ScrollRevealSection'
import Reveal from './Reveal'
import styles from './ProjectGrid.module.css'

/**
 * ProjectGrid — the one grid of ProjectCards used on Home, the Projects and
 * UI/UX lists, and "Other Projects" on both detail pages.
 *
 * Props:
 *   projects   — array of project objects (needs id, slug + card fields)
 *   basePath   — route prefix, card links to `${basePath}/${slug}`
 *   ratio      — card image ratio (default "4 / 3")
 *   variant    — "list" (1 column, 2 from 1024px) or
 *                "compact" (1 column, 2 from 768px, tighter gap)
 *   scrollEach — reveal every card when it scrolls into view on its own
 *                (long lists); otherwise cards reveal with the parent section
 */
export default function ProjectGrid({
  projects,
  basePath,
  ratio = '4 / 3',
  variant = 'list',
  scrollEach = false,
}) {
  return (
    <div className={`${styles.grid} ${styles[variant]}`}>
      {projects.map((project) => {
        const card = (
          <Reveal variant="fadeUp">
            <ProjectCard project={project} to={`${basePath}/${project.slug}`} ratio={ratio} />
          </Reveal>
        )
        return scrollEach ? (
          <ScrollRevealSection key={project.id} as="div">{card}</ScrollRevealSection>
        ) : (
          <Fragment key={project.id}>{card}</Fragment>
        )
      })}
    </div>
  )
}
