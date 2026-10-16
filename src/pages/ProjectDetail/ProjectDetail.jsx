import { useParams, Navigate } from 'react-router-dom'
import { getProjectBySlug, getOtherProjects } from '../../data/projects'
import { getLogoBySlug, getOtherLogos } from '../../data/logos'
import usePageTheme from '../../hooks/usePageTheme'
import ClosingCta from '../../components/ui/ClosingCta'
import CaseStudyPage from '../../components/case-study/CaseStudyPage'
import CaseStudyHeader from '../../components/case-study/CaseStudyHeader'
import PanelStory from '../../components/case-study/PanelStory'
import OtherProjects from '../../components/case-study/OtherProjects'
import thanksImage from '../../assets/images/ux/pataskills-lms/thanks.webp'

/**
 * Logos & Identities case-study page — same layout as the UI/UX pages:
 * sticky breadcrumbs, title, divider, then the whole story as a stack of
 * full-width image panels ending on the "Thank you" panel. No text sections.
 *
 * Projects come from the logo grid (data/logos.js); the older entries in
 * data/projects.js (used on Home) still resolve too.
 */
export default function ProjectDetail() {
  usePageTheme('dark')

  const { slug } = useParams()
  const logo = getLogoBySlug(slug)
  const project = logo ?? getProjectBySlug(slug)

  if (!project) return <Navigate to="/projects" replace />

  const { title, externalUrl } = project
  const others = logo ? getOtherLogos(slug) : getOtherProjects(slug)

  const images = project.images?.length ? project.images : [project.coverImage]
  const panels = [
    ...images.map((src, i) => ({
      id: `image-${i + 1}`,
      src,
      alt: `${title} — ${i + 1}`,
    })),
    { id: 'thanks', src: thanksImage, alt: `${title} — thanks` },
  ]

  return (
    <CaseStudyPage>
      <CaseStudyHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: title },
        ]}
        title={title}
        website={externalUrl}
      />

      <PanelStory panels={panels} />

      <OtherProjects projects={others} basePath="/projects" />
      <ClosingCta />
    </CaseStudyPage>
  )
}
