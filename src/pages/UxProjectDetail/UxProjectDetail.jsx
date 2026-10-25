import { useParams, Navigate } from 'react-router-dom'
import { getUxProjectBySlug, getOtherUxProjects } from '../../data/uxProjects'
import ClosingCta from '../../components/ui/ClosingCta'
import CaseStudyPage from '../../components/case-study/CaseStudyPage'
import CaseStudyHeader from '../../components/case-study/CaseStudyHeader'
import PanelStory from '../../components/case-study/PanelStory'
import ProjectSheet from '../../components/case-study/ProjectSheet'
import OtherProjects from '../../components/case-study/OtherProjects'

/**
 * UX case-study "overview": opens as a full page (see ProjectSheet) that
 * grows out of the clicked tile — title up top (CaseStudyHeader, with just the
 * scroll-progress line above it), then the whole story as a stacked image
 * panel (PanelStory). "Other Projects" + the closing CTA stay at the end; the
 * action bar (close / website / Figma / contact) is pinned at the bottom.
 *
 * Rendered as a child route of /ui-ux, so the listing stays mounted behind.
 * The dark theme comes from <WorkLayout>.
 */
export default function UxProjectDetail() {
  const { slug } = useParams()
  const project = getUxProjectBySlug(slug)

  if (!project) return <Navigate to="/ui-ux" replace />

  const others = getOtherUxProjects(slug)

  return (
    <ProjectSheet website={project.website} prototype={project.prototype} closeTo="/ui-ux">
      <CaseStudyPage>
        <CaseStudyHeader
          title={project.title}
          subtitle={project.subtitle}
          meta={[
            { label: 'Client', value: project.client },
            { label: 'Category', value: project.category },
            { label: 'Service', value: project.service },
          ]}
        />

        <PanelStory panels={project.panels} />

        <OtherProjects projects={others} basePath="/ui-ux" />
        <ClosingCta />
      </CaseStudyPage>
    </ProjectSheet>
  )
}
