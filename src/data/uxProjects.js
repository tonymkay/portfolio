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
import testThanks from '../assets/images/ux/test-project/thanks.webp'

// ── AERD Database System — real panel flow ──
import aerdCover from '../assets/images/ux/aerd-database/cover.webp'
import aerdProblem from '../assets/images/ux/aerd-database/problem.webp'
import aerdProduct1 from '../assets/images/ux/aerd-database/product1.webp'
import aerdScope from '../assets/images/ux/aerd-database/scope.webp'
import aerdResearch from '../assets/images/ux/aerd-database/research.webp'
import aerdProduct2 from '../assets/images/ux/aerd-database/product2.webp'
import aerdSuccess from '../assets/images/ux/aerd-database/success.webp'
import aerdThanks from '../assets/images/ux/aerd-database/thanks.webp'

// ── Klima-Harvest Platform — real panel flow ──
import klimaCover from '../assets/images/ux/klima-harvest/cover.webp'
import klimaProblem from '../assets/images/ux/klima-harvest/problem.webp'
import klimaProduct11 from '../assets/images/ux/klima-harvest/product11.webp'
import klimaProduct2 from '../assets/images/ux/klima-harvest/product2.webp'
import klimaProduct22 from '../assets/images/ux/klima-harvest/product22.webp'
import klimaScope from '../assets/images/ux/klima-harvest/scope.webp'
import klimaSuccess from '../assets/images/ux/klima-harvest/success.webp'

// ── Real projects — cover images only, for now ──
import pataskillsLmsCover from '../assets/images/ux/ux_pataskills-lms-cover.webp'
import pataskillsAppCover from '../assets/images/ux/ux_pataskills-app-cover.webp'
import essaCover from '../assets/images/ux/ux_essa-website-cover.webp'
import heriCover from '../assets/images/ux/ux_heri-africa-cover.webp'
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
  { id: 'thanks', src: cover, alt: `${title} — thanks` },
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
      { id: 'thanks', src: testThanks, alt: 'Genova AI — thanks' },
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
    coverImage: pataskillsLmsCover,
    panels: placeholderPanels(pataskillsLmsCover, 'PataSkills LMS System'),
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
    coverImage: pataskillsAppCover,
    panels: placeholderPanels(pataskillsAppCover, 'PataSkills Learning App'),
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
      { id: 'thanks', src: aerdThanks, alt: 'AERD Database System — thanks' },
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
    panels: placeholderPanels(essaCover, 'ESSA Website'),
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
    panels: placeholderPanels(heriCover, 'HERI Africa Website'),
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
