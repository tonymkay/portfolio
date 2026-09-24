import { useParams, Navigate } from 'react-router-dom'
import { getUxProjectBySlug, getOtherUxProjects } from '../../data/uxProjects'
import usePageTheme from '../../hooks/usePageTheme'
import ClosingCta from '../../components/ui/ClosingCta'
import CaseStudyPage from '../../components/case-study/CaseStudyPage'
import CaseStudyHeader from '../../components/case-study/CaseStudyHeader'
import PanelStory from '../../components/case-study/PanelStory'
import OtherProjects from '../../components/case-study/OtherProjects'

/**
 * UX case-study page: title/client/meta/link up top (CaseStudyHeader),
 * then the whole story as a stacked image panel (PanelStory) — no text
 * sections, no process band. "Other Projects" + the closing CTA stay,
 * same as every other page on the site.
 */
export default function UxProjectDetail() {
  usePageTheme('dark')

  const { slug } = useParams()
  const project = getUxProjectBySlug(slug)

  if (!project) return <Navigate to="/ui-ux" replace />

  const others = getOtherUxProjects(slug)

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
          { label: 'Client', value: project.client },
          { label: 'Category', value: project.category },
          { label: 'Service', value: project.service },
        ]}
        website={project.website}
      />

      <PanelStory panels={project.panels} />

      <OtherProjects projects={others} basePath="/ui-ux" />
      <ClosingCta />
    </CaseStudyPage>
  )
}
