import { useParams, Navigate } from 'react-router-dom'
import { getProjectBySlug, getOtherProjects } from '../../data/projects'
import { siteContent } from '../../data/siteContent'
import usePageTheme from '../../hooks/usePageTheme'
import ClosingCta from '../../components/ui/ClosingCta'
import CaseStudyPage, { Story } from '../../components/case-study/CaseStudyPage'
import CaseStudyHeader from '../../components/case-study/CaseStudyHeader'
import TextSection from '../../components/case-study/TextSection'
import FullImage from '../../components/case-study/FullImage'
import ImagePair from '../../components/case-study/ImagePair'
import ProcessSteps from '../../components/case-study/ProcessSteps'
import Quote from '../../components/case-study/Quote'
import OtherProjects from '../../components/case-study/OtherProjects'

const { process: processContent } = siteContent

/**
 * Testimonials are stored as '"Quote text." — Name, Role'.
 * Split them so the quote and its attribution can be styled separately.
 */
function splitQuote(raw = '') {
  const value = raw.trim()
  const cut = value.lastIndexOf(' — ')
  const body = cut === -1 ? value : value.slice(0, cut)
  return {
    text: body.replace(/^["“]|["”]$/g, '').trim(),
    by: cut === -1 ? '' : value.slice(cut + 3).trim(),
  }
}

export default function ProjectDetail() {
  usePageTheme('dark')

  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <Navigate to="/projects" replace />

  const { title, summary, brief, applications, testimonial, externalUrl } = project
  const images = project.images ?? []
  const heroImage = project.heroImage || project.coverImage || images[0]
  const others = getOtherProjects(slug)
  // Steps come from the Process page content; a project may override them
  // by adding its own `processSteps: [{ number, title, description }]`.
  const steps = project.processSteps ?? processContent.steps.items

  const quote = splitQuote(testimonial)
  const quoteBy =
    quote.by || [project.testimonialAuthor, project.testimonialRole].filter(Boolean).join(', ')
  // Some entries reuse the same quote for both fields — don't show it twice.
  const resultsBody = applications && applications !== testimonial ? applications : ''
  const hasResults = Boolean(resultsBody || quote.text)

  return (
    <CaseStudyPage>
      <CaseStudyHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: title },
        ]}
        title={title}
        subtitle={summary}
        meta={[
          { label: 'Category', value: project.category },
          { label: 'Client', value: project.client },
          { label: 'Year', value: project.year },
        ]}
        website={externalUrl}
        heroImage={heroImage}
      />

      <Story>
        {brief && <TextSection heading="Overview" body={brief} />}
        <FullImage src={images[1]} alt={`${title} application`} />
      </Story>

      <ProcessSteps steps={steps} />

      <Story after>
        <ImagePair sources={[images[2], images[3]]} title={title} />
        {hasResults && (
          <TextSection heading="The Results" body={resultsBody}>
            <Quote text={quote.text} by={quoteBy} />
          </TextSection>
        )}
      </Story>

      <OtherProjects projects={others} basePath="/projects" />
      <ClosingCta />
    </CaseStudyPage>
  )
}
