/**
 * uxProjects.js — UI/UX Design case studies (separate from projects.js,
 * which holds Logos & Identities and is left untouched).
 *
 * The detail page renders `sections` top-to-bottom. Block types:
 *   { type: 'text',  heading?, paragraphs?: [], bullets?: [], dashes?: [] }
 *   { type: 'image', src }
 *   { type: 'pair',  images: [src, src] }
 *   { type: 'quote', text }
 *
 * PLACEHOLDER: titles, copy and images below are stand-ins built from
 * existing assets. Replace the image imports and text per project when the
 * real UI/UX screens are ready — no component changes needed.
 * `website` is optional; when set, the meta grid shows a "See live" link.
 */

import emitaCover from '../assets/images/projects/projects_emita-cover.jpg'
import emitaImage1 from '../assets/images/projects/emita/emita_image1.webp'
import emitaImage2 from '../assets/images/projects/emita/emita_image2.webp'
import emitaImage3 from '../assets/images/projects/emita/emita_image3.webp'
import emitaImage4 from '../assets/images/projects/emita/emita_image4.webp'

import gewalCover from '../assets/images/projects/projects_gewal-cover.jpg'
import gewalImage1 from '../assets/images/projects/gewal/gewal_image1.webp'
import gewalImage2 from '../assets/images/projects/gewal/gewal_image2.webp'
import gewalImage3 from '../assets/images/projects/gewal/gewal_image3.webp'
import gewalImage4 from '../assets/images/projects/gewal/gewal_image4.webp'

import lpcCover from '../assets/images/projects/projects_lpc-cover.jpg'
import lpcImage1 from '../assets/images/projects/lpc/lpc_image1.webp'
import lpcImage2 from '../assets/images/projects/lpc/lpc_image2.webp'
import lpcImage3 from '../assets/images/projects/lpc/lpc_image3.webp'
import lpcImage4 from '../assets/images/projects/lpc/lpc_image4.webp'

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

// Builds the story from four images + short copy. Swap per project once
// real content exists.
const story = (imgs, c) => [
  { type: 'text', heading: 'Overview', paragraphs: c.overview, bullets: c.overviewBullets },
  { type: 'image', src: imgs[1] },
  { type: 'pair', images: [imgs[2], imgs[3]] },
  { type: 'text', heading: 'Results', paragraphs: [c.results], bullets: c.resultsBullets },
  { type: 'quote', text: c.quote },
  { type: 'text', paragraphs: [c.closing] },
]

export const uxProjects = [
  {
    id: 'ux-metering',
    slug: 'smart-metering-dashboard',
    title: 'Smart Metering Dashboard',
    subtitle: 'A utility dashboard that turns raw meter data into decisions.',
    category: 'SaaS',
    service: 'Product Design',
    year: '2025',
    website: null,
    coverImage: emitaCover,
    heroImage: emitaImage1,
    sections: story([emitaImage1, emitaImage2, emitaImage3, emitaImage4], {
      overview: [
        'Operators were switching between spreadsheets and a dated portal to track consumption, spot leaks and raise work orders. The redesign brings live usage, alerts and field actions into one calm, scannable workspace.',
        'The work covered research, information architecture, a component library and the full set of dashboard screens.',
      ],
      overviewBullets: ['Network-wide summary', 'Zone investigation view', 'Meter-level actions', 'Alert-first hierarchy'],
      results:
        'Usability tests showed operators locating the source of an alert in a fraction of the previous time, with far fewer hand-offs between teams.',
      resultsBullets: ['Faster alert triage', 'Fewer escalations', 'One shared component system', 'Ready for developer hand-off'],
      quote: 'For the first time I open the dashboard and immediately know where to go.',
      closing:
        'A restrained colour system and consistent components keep dense data readable, and the three levels of detail scale as the network grows.',
    }),
    processNote:
      'Operator research shaped the information architecture first, then the component system, then the screens — each stage tested before the next began.',
    order: 1,
  },
  {
    id: 'ux-logistics',
    slug: 'logistics-tracking-app',
    title: 'Logistics Tracking App',
    subtitle: 'A driver and dispatcher app that keeps every delivery visible.',
    category: 'Mobile App',
    service: 'UX & UI Design',
    year: '2025',
    website: null,
    coverImage: gewalCover,
    heroImage: gewalImage1,
    sections: story([gewalImage1, gewalImage2, gewalImage3, gewalImage4], {
      overview: [
        'Dispatchers relied on phone calls to chase status updates. The app gives drivers a one-thumb flow for each stop and gives dispatchers a live view of the whole fleet.',
        'Drivers use it one-handed and in motion, so tap targets, contrast and glanceability were tested in real vehicles.',
      ],
      overviewBullets: ['One primary action per stop', 'Automatic status updates', 'Two-tap proof of delivery', 'Live fleet view'],
      results:
        'Dispatch call volume dropped sharply and proof-of-delivery completion became consistent across the fleet.',
      resultsBullets: ['Fewer status calls', 'Consistent proof of delivery', 'Clear day-plan for dispatch', 'Calmer routes for drivers'],
      quote: 'I stopped getting calls asking where I am. The app just shows it.',
      closing:
        'The interface stays out of the way: the next stop and one obvious action, with everything else a swipe away.',
    }),
    processNote:
      'The driver flow was prototyped and tested in real vehicles first; the dispatcher view was then built around what drivers actually did.',
    order: 2,
  },
  {
    id: 'ux-property',
    slug: 'property-listings-platform',
    title: 'Property Listings Platform',
    subtitle: 'A verified-listings marketplace where trust is part of every screen.',
    category: 'Web Platform',
    service: 'UX & UI Design',
    year: '2024',
    website: null,
    coverImage: lpcCover,
    heroImage: lpcImage1,
    sections: story([lpcImage1, lpcImage2, lpcImage3, lpcImage4], {
      overview: [
        'Buyers struggled to tell genuine listings from unreliable ones. The platform makes verification visible at every step, from search results to the enquiry form.',
        'We audited competing platforms and interviewed recent buyers to find which trust signals actually mattered.',
      ],
      overviewBullets: ['Verification badges', 'Structured listing details', 'Guided enquiry flow', 'Consistent photo standards'],
      results:
        'Enquiry quality improved and the team spent less time filtering out unserious leads.',
      resultsBullets: ['More confident enquiries', 'Less lead filtering', 'Higher-quality listings', 'A reusable trust component set'],
      quote: 'The verified badge changed how confidently people reached out.',
      closing:
        'Verification and next steps sit above the fold on every listing, so trust is established before the first click.',
    }),
    processNote:
      'Competitor audits and buyer interviews came first; the trust patterns were prototyped and tested before the full listing flow was designed.',
    order: 3,
  },
]

export const getUxProjectBySlug = (slug) =>
  uxProjects.find((p) => p.slug === slug) ?? null

export const getAllUxProjects = () =>
  [...uxProjects].sort((a, b) => a.order - b.order)

export const getOtherUxProjects = (currentSlug, limit = 3) =>
  getAllUxProjects().filter((p) => p.slug !== currentSlug).slice(0, limit)

export default uxProjects
