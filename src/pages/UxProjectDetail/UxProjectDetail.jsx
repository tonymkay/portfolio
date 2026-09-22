import { useParams, Navigate } from 'react-router-dom'
import { siteContent } from '../../data/siteContent'
import { getUxProjectBySlug, getOtherUxProjects } from '../../data/uxProjects'
import usePageTheme from '../../hooks/usePageTheme'
import ClosingCta from '../../components/ui/ClosingCta'
import Reveal from '../../components/ui/Reveal'
import CaseStudyPage, { Story } from '../../components/case-study/CaseStudyPage'
import CaseStudyHeader from '../../components/case-study/CaseStudyHeader'
import TextSection from '../../components/case-study/TextSection'
import FullImage from '../../components/case-study/FullImage'
import ImagePair from '../../components/case-study/ImagePair'
import ProcessSteps from '../../components/case-study/ProcessSteps'
import Quote from '../../components/case-study/Quote'
import OtherProjects from '../../components/case-study/OtherProjects'
// Only the bullet / dash lists (UI/UX-only blocks) have their own file.
import styles from './UxProjectDetail.module.css'

const { process: processContent } = siteContent

/** One block of the case-study story (see uxProjects.js for the block types). */
function Block({ block, title }) {
  switch (block.type) {
    case 'text':
      return (
        <TextSection heading={block.heading} paragraphs={block.paragraphs}>
          {block.bullets && (
            <Reveal variant="fadeUp" as="ul" className={styles.bullets}>
              {block.bullets.map((b) => <li key={b}>{b}</li>)}
            </Reveal>
          )}
          {block.dashes && (
            <Reveal variant="fadeUp" as="ul" className={styles.dashes}>
              {block.dashes.map((d) => <li key={d}>{d}</li>)}
            </Reveal>
          )}
        </TextSection>
      )

    case 'image':
      return <FullImage src={block.src} alt={`${title} screen`} />

    case 'pair':
      return <ImagePair sources={block.images} title={title} />

    case 'quote':
      return (
        <TextSection>
          <Quote text={block.text} />
        </TextSection>
      )

    default:
      return null
  }
}

export default function UxProjectDetail() {
  usePageTheme('dark')

  const { slug } = useParams()
  const project = getUxProjectBySlug(slug)

  if (!project) return <Navigate to="/ui-ux" replace />

  const others = getOtherUxProjects(slug)
  // Steps come from the Process page content; a project may override them
  // by adding its own `processSteps: [{ number, title, description }]`.
  const steps = project.processSteps ?? processContent.steps.items

  // Same rhythm as the project page: story → Process band → images + results.
  // The Process band goes in before the first image pair.
  const pairAt = project.sections.findIndex((b) => b.type === 'pair')
  const splitAt = pairAt === -1 ? project.sections.length : pairAt
  const before = project.sections.slice(0, splitAt)
  const after = project.sections.slice(splitAt)

  return (
    <CaseStudyPage>
      <CaseStudyHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'UI/UX', to: '/ui-ux' },
          { label: project.title },
        ]}
        title={project.title}
        subtitle={project.subtitle}
        meta={[
          { label: 'Category', value: project.category },
          { label: 'Service', value: project.service },
          { label: 'Year', value: project.year },
        ]}
        website={project.website}
        heroImage={project.heroImage}
      />

      {before.length > 0 && (
        <Story>
          {before.map((block, i) => (
            <Block key={i} block={block} title={project.title} />
          ))}
        </Story>
      )}

      <ProcessSteps intro={project.processNote} steps={steps} />

      {after.length > 0 && (
        <Story after>
          {after.map((block, i) => (
            <Block key={i} block={block} title={project.title} />
          ))}
        </Story>
      )}

      <OtherProjects projects={others} basePath="/ui-ux" />
      <ClosingCta />
    </CaseStudyPage>
  )
}
