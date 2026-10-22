/**
 * uxProjects.js — UI/UX Design case studies (separate from projects.js,
 * which holds Logos & Identities and is left untouched).
 *
 * The detail page (UxProjectDetail.jsx) is image-only: header (title,
 * client, category, service, year, website link) followed by `panels` —
 * a stack of full-container-width images with zero gap, no text, no
 * rounded corners. See components/case-study/PanelStory.jsx.
 *
 * panels: [{ id, src, alt, background? }]
 *
 * "AERD Database System" and "Klima-Harvest Platform"
 * have their real panel flow (AERD: cover, problem, product, scope
 * of work, research, product, success story, thanks; Klima: cover,
 * problem, scope, product x3, success). The other projects don't have
 * their real panel screens yet, so each just repeats its own cover image
 * across all 8 panel slots as a placeholder — swap them out for real
 * screens one at a time whenever they're ready, no component changes
 * needed.
 */

// ── PataSkills LMS System — real panel flow ──
import lmsCover from '../assets/images/ux/pataskills-lms/cover.webp'
import lmsProblem from '../assets/images/ux/pataskills-lms/problem.webp'
import lmsScope from '../assets/images/ux/pataskills-lms/scope.webp'
import lmsResearch from '../assets/images/ux/pataskills-lms/research.webp'
import lmsProduct2 from '../assets/images/ux/pataskills-lms/product2.webp'
import lmsThanks from '../assets/images/ux/pataskills-lms/thanks.webp'

// ── PataSkills Learning App — real panel flow ──
import pataskillsAppRealCover from '../assets/images/ux/pataskills-app/cover.webp'
import pataskillsAppProblem from '../assets/images/ux/pataskills-app/problem.webp'
import pataskillsAppScope from '../assets/images/ux/pataskills-app/scope.webp'
import pataskillsAppSolution from '../assets/images/ux/pataskills-app/solution.webp'
import pataskillsAppScreenshot from '../assets/images/ux/pataskills-app/screenshot.webp'
import pataskillsAppScreenshot2 from '../assets/images/ux/pataskills-app/screenshot-2.webp'

// ── AERD Database System + Klima-Harvest Platform ──
// Folders hold cover.webp, image1.webp … image5.webp. Loaded with a glob so a
// missing file (e.g. aerd-database/image3.webp) is skipped instead of crashing
// the build, and shows up automatically once the file is added.
const uxGlob = import.meta.glob('../assets/images/ux/{aerd-database,klima-harvest}/*.webp', {
  eager: true,
  import: 'default',
})
const uxImg = (folder, name) => uxGlob[`../assets/images/ux/${folder}/${name}.webp`]

const IMAGE_SLOTS = ['cover', 'image1', 'image2', 'image3', 'image4', 'image5']

const buildPanels = (folder, title) =>
  [...IMAGE_SLOTS.map((slot) => ({ id: slot, src: uxImg(folder, slot), alt: `${title} — ${slot}` })),
    { id: 'thanks', src: lmsThanks, alt: `${title} — thanks` }]
    .filter((p) => p.src)

const aerdCover = uxImg('aerd-database', 'cover')
const klimaCover = uxImg('klima-harvest', 'cover')

// ── ESSA Website — real panel flow ──
import essaCover from '../assets/images/ux/essa/COVER.webp'
import essaProblem from '../assets/images/ux/essa/problem.webp'
import essaMockup1 from '../assets/images/ux/essa/01_mockup.webp'
import essaMockup2 from '../assets/images/ux/essa/02_mockup.webp'
import essaMockup3 from '../assets/images/ux/essa/03_mockup.webp'
import essaMockup4 from '../assets/images/ux/essa/04_mockup.webp'
import essaMockup5 from '../assets/images/ux/essa/05_mockup.webp'

// ── HERI Africa Website — real panel flow ──
import heriCover from '../assets/images/ux/heri-africa/cover.webp'
import heriProblem from '../assets/images/ux/heri-africa/problem.webp'
import heriMockup1 from '../assets/images/ux/heri-africa/01_mockup.webp'
import heriMockup2 from '../assets/images/ux/heri-africa/02_mockup.webp'
import heriMockup3 from '../assets/images/ux/heri-africa/03_mockup.webp'
import heriMockup4 from '../assets/images/ux/heri-africa/04_mockup.webp'
import heriMockup5 from '../assets/images/ux/heri-africa/05_mockup.webp'

// ── Real projects — cover images only, for now ──
import bomaCover from '../assets/images/ux/ux_boma-ngo-cover.webp'

export const uxPageContent = {
  eyebrow: 'Selected Projects',
  // Dark page header: big thin title, then a — 03 CASE STUDIES — rule row
  header: {
    title: 'UX/UI Projects',
    label: 'Case studies',
  },
  cta: {
    heading: 'Have a Product to Design?',
    description: 'From first sketch to shipped interface — let’s build something people enjoy using.',
    ctaLabel: 'Book A Call ↗',
    ctaHref: '/contact',
  },
}

/** Cover duplicated across all 8 panel slots — placeholder until real
 * per-step screens exist for this project. */
const placeholderPanels = (cover, title) => [
  { id: 'cover', src: cover, alt: `${title} — cover` },
  { id: 'problem', src: cover, alt: `${title} — problem` },
  { id: 'product-1', src: cover, alt: `${title} — product` },
  { id: 'scope', src: cover, alt: `${title} — scope of work` },
  { id: 'research', src: cover, alt: `${title} — UX research` },
  { id: 'product-2', src: cover, alt: `${title} — product` },
  { id: 'success', src: cover, alt: `${title} — success story` },
  { id: 'thanks', src: lmsThanks, alt: `${title} — thanks` },
]

export const uxProjects = [
  {
    id: 'ux-pataskills-lms',
    slug: 'pataskills-lms',
    title: 'PataSkills LMS System',
    subtitle: 'An admin and learning-management dashboard for the PataSkills platform.',
    client: 'PataProducts',
    category: 'SaaS',
    service: 'Product Design',
    year: '2026',
    website: 'https://lms.pataproducts.com',
    coverImage: lmsCover,
    panels: [
      { id: 'cover', src: lmsCover, alt: 'PataSkills LMS System — cover' },
      { id: 'problem', src: lmsProblem, alt: 'PataSkills LMS System — problem statement' },
      { id: 'scope', src: lmsScope, alt: 'PataSkills LMS System — scope of work' },
      { id: 'research', src: lmsResearch, alt: 'PataSkills LMS System — UX research' },
      { id: 'product-2', src: lmsProduct2, alt: 'PataSkills LMS System — product' },
      { id: 'thanks', src: lmsThanks, alt: 'PataSkills LMS System — thanks' },
    ],
    order: 1,
  },
  {
    id: 'ux-pataskills-app',
    slug: 'pataskills-app',
    title: 'PataSkills Learning App',
    subtitle: 'The learner-facing app for PataProducts, from onboarding to progress.',
    client: 'PataProducts',
    category: 'Mobile App',
    service: 'UX & UI Design',
    year: '2026',
    website: 'https://pataskills.com',
    coverImage: pataskillsAppRealCover,
    panels: [
      { id: 'cover', src: pataskillsAppRealCover, alt: 'PataSkills Learning App — cover' },
      { id: 'problem', src: pataskillsAppProblem, alt: 'PataSkills Learning App — problem statement' },
      { id: 'scope', src: pataskillsAppScope, alt: 'PataSkills Learning App — scope of work' },
      { id: 'solution', src: pataskillsAppSolution, alt: 'PataSkills Learning App — solution' },
      { id: 'screenshot', src: pataskillsAppScreenshot, alt: 'PataSkills Learning App — screenshot' },
      { id: 'screenshot-2', src: pataskillsAppScreenshot2, alt: 'PataSkills Learning App — screenshot' },
      { id: 'thanks', src: lmsThanks, alt: 'PataSkills Learning App — thanks' },
    ],
    order: 2,
  },
  {
    id: 'ux-aerd',
    slug: 'aerd-database',
    title: 'AERD Database System',
    subtitle: 'A research discovery platform for the African Education Research Database.',
    client: 'ESSA Org',
    category: 'Web Platform',
    service: 'UX & UI Design',
    year: '2026',
    website: 'https://aerd.africa',
    coverImage: aerdCover,
    panels: buildPanels('aerd-database', 'AERD Database System'),
    order: 3,
  },
  {
    id: 'ux-essa',
    slug: 'essa-website',
    title: 'ESSA Website',
    subtitle: 'A full site rebuild for ESSA Org, from requirements to development hand-off.',
    client: 'ESSA Org',
    category: 'Website',
    service: 'UI Design',
    year: '2025',
    website: 'https://essa-africa.org',
    coverImage: essaCover,
    panels: [
      { id: 'cover', src: essaCover, alt: 'ESSA Website — cover' },
      { id: 'problem', src: essaProblem, alt: 'ESSA Website — problem statement' },
      { id: 'mockup-1', src: essaMockup1, alt: 'ESSA Website — mockup' },
      { id: 'mockup-2', src: essaMockup2, alt: 'ESSA Website — mockup' },
      { id: 'mockup-3', src: essaMockup3, alt: 'ESSA Website — mockup' },
      { id: 'mockup-4', src: essaMockup4, alt: 'ESSA Website — mockup', videoId: 'DgSLvfyxH_s' },
      { id: 'mockup-5', src: essaMockup5, alt: 'ESSA Website — mockup' },
      { id: 'thanks', src: lmsThanks, alt: 'ESSA Website — thanks' },
    ],
    order: 4,
  },
  {
    id: 'ux-heri',
    slug: 'heri-africa',
    title: 'HERI Africa Website',
    subtitle: 'A profile-driven website built around HERI Africa’s different audiences.',
    client: 'HERI Africa',
    category: 'Website',
    service: 'UX & UI Design',
    year: '2025',
    website: 'https://heriafrica.org',
    coverImage: heriCover,
    panels: [
      { id: 'cover', src: heriCover, alt: 'HERI Africa Website — cover' },
      { id: 'problem', src: heriProblem, alt: 'HERI Africa Website — problem statement' },
      { id: 'mockup-5', src: heriMockup5, alt: 'HERI Africa Website — mockup' },
      { id: 'mockup-2', src: heriMockup2, alt: 'HERI Africa Website — mockup' },
      { id: 'mockup-3', src: heriMockup3, alt: 'HERI Africa Website — mockup' },
      { id: 'mockup-4', src: heriMockup4, alt: 'HERI Africa Website — mockup' },
      { id: 'mockup-1', src: heriMockup1, alt: 'HERI Africa Website — mockup' },
      { id: 'thanks', src: lmsThanks, alt: 'HERI Africa Website — thanks' },
    ],
    order: 5,
  },
  {
    id: 'ux-klima',
    slug: 'klima-harvest',
    title: 'Klima-Harvest Platform',
    subtitle: 'A carbon marketplace connecting project developers with buyers.',
    client: 'MediaPal Net',
    category: 'Web Platform',
    service: 'Product Design',
    year: '2025',
    website: 'https://www.figma.com/design/a1ASZjs8JGxItcfNWkEmCB/Klima-Harvest?node-id=3090-434&t=6pQckzKrvEVbSzXq-1',
    coverImage: klimaCover,
    panels: buildPanels('klima-harvest', 'Klima-Harvest Platform'),
    order: 6,
  },
  {
    id: 'ux-boma',
    slug: 'boma-ngo',
    title: 'BOMA NGO Website',
    subtitle: 'A revamped site and six new product pages for BOMA NGO.',
    client: 'BOMA NGO',
    category: 'Website',
    service: 'UX & UI Design',
    year: '2024',
    website: 'https://boma.ngo',
    coverImage: bomaCover,
    panels: placeholderPanels(bomaCover, 'BOMA NGO Website'),
    order: 7,
  },
]

export const getUxProjectBySlug = (slug) =>
  uxProjects.find((p) => p.slug === slug) ?? null

export const getAllUxProjects = () =>
  [...uxProjects].sort((a, b) => a.order - b.order)

export const getOtherUxProjects = (currentSlug, limit = 3) =>
  getAllUxProjects().filter((p) => p.slug !== currentSlug).slice(0, limit)

export default uxProjects
