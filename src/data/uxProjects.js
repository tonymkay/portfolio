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
 * "Test Project", "AERD Database System" and "Klima-Harvest Platform"
 * have their real panel flow (Test/AERD: cover, problem, product, scope
 * of work, research, product, success story, thanks; Klima: cover,
 * problem, scope, product x3, success). The other projects don't have
 * their real panel screens yet, so each just repeats its own cover image
 * across all 8 panel slots as a placeholder — swap them out for real
 * screens one at a time whenever they're ready, no component changes
 * needed.
 */

// ── Test Project (Genova AI) — real panel flow ──
import testCover from '../assets/images/ux/test-project/cover.webp'
import testProblem from '../assets/images/ux/test-project/problem.webp'
import testProduct1 from '../assets/images/ux/test-project/product1.webp'
import testScope from '../assets/images/ux/test-project/scope.webp'
import testResearch from '../assets/images/ux/test-project/research.webp'
import testProduct2 from '../assets/images/ux/test-project/product2.webp'
import testSuccess from '../assets/images/ux/test-project/successstories.webp'

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

// ── AERD Database System — real panel flow ──
import aerdCover from '../assets/images/ux/aerd-database/cover.webp'
import aerdProblem from '../assets/images/ux/aerd-database/problem.webp'
import aerdProduct1 from '../assets/images/ux/aerd-database/product1.webp'
import aerdScope from '../assets/images/ux/aerd-database/scope.webp'
import aerdResearch from '../assets/images/ux/aerd-database/research.webp'
import aerdProduct2 from '../assets/images/ux/aerd-database/product2.webp'
import aerdSuccess from '../assets/images/ux/aerd-database/success.webp'

// ── Klima-Harvest Platform — real panel flow ──
import klimaCover from '../assets/images/ux/klima-harvest/cover.webp'
import klimaProblem from '../assets/images/ux/klima-harvest/problem.webp'
import klimaProduct11 from '../assets/images/ux/klima-harvest/product11.webp'
import klimaProduct2 from '../assets/images/ux/klima-harvest/product2.webp'
import klimaProduct22 from '../assets/images/ux/klima-harvest/product22.webp'
import klimaScope from '../assets/images/ux/klima-harvest/scope.webp'
import klimaSuccess from '../assets/images/ux/klima-harvest/success.webp'

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
    title: 'Designed',
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
    id: 'ux-test-project',
    slug: 'test-project',
    title: 'Test Project',
    subtitle: 'Get found faster, through AI search — a real-time asset and OPEX visibility SaaS.',
    client: 'Genova AI',
    category: 'SaaS',
    service: 'Product Design',
    year: '2026',
    website: null,
    coverImage: testCover,
    panels: [
      { id: 'cover', src: testCover, alt: 'Genova AI — cover' },
      { id: 'problem', src: testProblem, alt: 'Genova AI — problem statement' },
      { id: 'product-1', src: testProduct1, alt: 'Genova AI — product' },
      { id: 'scope', src: testScope, alt: 'Genova AI — scope of work' },
      { id: 'research', src: testResearch, alt: 'Genova AI — UX research' },
      { id: 'product-2', src: testProduct2, alt: 'Genova AI — product' },
      { id: 'success', src: testSuccess, alt: 'Genova AI — success story' },
      { id: 'thanks', src: lmsThanks, alt: 'Genova AI — thanks' },
    ],
    order: 0,
  },
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
    panels: [
      { id: 'cover', src: aerdCover, alt: 'AERD Database System — cover' },
      { id: 'problem', src: aerdProblem, alt: 'AERD Database System — problem statement' },
      { id: 'product-1', src: aerdProduct1, alt: 'AERD Database System — product' },
      { id: 'scope', src: aerdScope, alt: 'AERD Database System — scope of work' },
      { id: 'research', src: aerdResearch, alt: 'AERD Database System — UX research' },
      { id: 'product-2', src: aerdProduct2, alt: 'AERD Database System — product' },
      { id: 'success', src: aerdSuccess, alt: 'AERD Database System — success story' },
      { id: 'thanks', src: lmsThanks, alt: 'AERD Database System — thanks' },
    ],
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
    panels: [
      { id: 'cover', src: klimaCover, alt: 'Klima-Harvest Platform — cover' },
      { id: 'problem', src: klimaProblem, alt: 'Klima-Harvest Platform — problem statement' },
      { id: 'scope', src: klimaScope, alt: 'Klima-Harvest Platform — scope of work' },
      { id: 'product-1', src: klimaProduct11, alt: 'Klima-Harvest Platform — product' },
      { id: 'product-2', src: klimaProduct2, alt: 'Klima-Harvest Platform — product' },
      { id: 'product-3', src: klimaProduct22, alt: 'Klima-Harvest Platform — product' },
      { id: 'success', src: klimaSuccess, alt: 'Klima-Harvest Platform — success story' },
    ],
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
