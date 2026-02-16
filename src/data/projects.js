/**
 * projects.js — Single source of truth for all project data.
 *
 * CMS NOTE: When the CMS is introduced, this file will be replaced by
 * an API call (e.g. GET /api/projects). The shape of each object
 * must remain identical so no page components need changing.
 *
 * TO ADD A NEW PROJECT:
 *  1. Copy any existing entry below and update all fields.
 *  2. Add images to src/assets/images/projects/{slug}/
 *  3. Import them at the top of this file.
 *  4. Reference them in the images[] array.
 *  5. Done — the Projects grid and routing update automatically.
 */

// ── Project Cover Images ────────────────────────────────────────
import alumniCover from '../assets/images/projects/projects_alumni-cover.jpg'
import emitaCover from '../assets/images/projects/projects_emita-cover.jpg'
import geopsyCover from '../assets/images/projects/projects_geopsy-cover.jpg'
import gewalCover from '../assets/images/projects/projects_gewal-cover.jpg'
import kezjoyCover from '../assets/images/projects/projects_kezjoy-cover.jpg'
import lpcCover from '../assets/images/projects/projects_lpc-cover.jpg'
import mcdonaldCover from '../assets/images/projects/projects_mcdonald-cover.png'
import midasCover from '../assets/images/projects/projects_midas-cover.jpg'

// ── Alumni Project Images ───────────────────────────────────────
import alumniImage1 from '../assets/images/projects/alumni/alumni_image1.jpg'
import alumniImage2 from '../assets/images/projects/alumni/alumni_image2.jpg'
import alumniImage3 from '../assets/images/projects/alumni/alumni_image3.jpg'
import alumniImage4 from '../assets/images/projects/alumni/alumni_image4.jpg'

// ── Page Images ───────────────────────────────────────────
import homeHero from '../assets/images/home/home_hero.jpg'
import homePortrait from '../assets/images/home/home_portrait.jpg'
import aboutPortrait from '../assets/images/about/about_portrait.jpg'
import aboutWorkspace from '../assets/images/about/about_workspace.jpg'

// ── Graceful Fallback Function ───────────────────────────────────
const createImageFallback = (title, index) => {
  // Creates a consistent placeholder with project title
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="grad-${title}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2D6A8F;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1E2B3C;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad-${title})"/>
      <text x="50%" y="45%" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="600" fill="#ffffff" text-anchor="middle" dy=".3em">${title}</text>
      <text x="50%" y="55%" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#94A3B8" text-anchor="middle" dy=".3em">Image ${index + 1}</text>
    </svg>
  `)}`
}

export const projects = [
  {
    id: 'alumni',
    slug: 'alumni-social-network',
    title: 'Alumni Social Network',
    client: 'Alumni Social Network',
    category: 'Brand Identity',
    year: '2024',
    tags: ['Branding', 'Identity', 'Logo'],
    coverImage: alumniCover,
    heroImage: alumniImage1,
    images: [alumniImage1, alumniImage2, alumniImage3, alumniImage4],
    summary: 'Rebranding a digital marketing agency — a hummingbird-inspired identity that is efficient, streamlined, and constantly in motion.',
    brief: 'Peterborough-based digital marketing agency Web Windows was looking to rebrand to a new name. Their strategic director Tom Anderson found me through TikTok and messaged me asking for help in creating the new brand, Hummingbird. The new agency aimed to embody characteristics of a hummingbird: efficient, streamlined and constantly in motion. Tom needed a full rework of their company assets, including the logo, social media templates, company stationery and background assets to use across their online and print collateral.',
    inspiration: 'PostSharp and Metalama are two frameworks that help software developers improve their code quality and productivity through meta-programming. President & Principal Engineer Gael Fraiteur needed help branding the new product, Metalama, in a way that harmonised with the current branding for PostSharp, which already had a lot of traction in the market. So we\'d need to stick to the current colours and fonts, but introduce a new icon for Metalama, which would be the flagship product moving forward.',
    applications: '"Designing a logo of a new product under an established brand demands the right balance of creativity and humility. James rose to the challenge with unmatched professionalism." — Gael Fraiteur',
    testimonial: '"Designing a logo of a new product under an established brand demands the right balance of creativity and humility. James rose to the challenge with unmatched professionalism." — Gael Fraiteur',
    testimonialAuthor: 'Tom Anderson',
    testimonialRole: 'Strategic Director, Web Windows',
    featured: true,
    order: 1,
  },
  {
    id: 'emita',
    slug: 'emita',
    title: 'Emita SAAS Product',
    client: 'Emita',
    category: 'Brand Identity',
    year: '2024',
    tags: ['Branding', 'Identity', 'SAAS'],
    coverImage: emitaCover,
    heroImage: null,
    images: [
      createImageFallback('Emita', 0),
      createImageFallback('Emita', 1),
      createImageFallback('Emita', 2),
      createImageFallback('Emita', 3)
    ],
    summary: 'A smart water metering brand — providing efficient workflows through a clean, technology-forward visual identity.',
    brief: 'A pioneering smart water metering company needed a complete brand identity that would communicate efficiency, reliability, and technological innovation. The brand needed to resonate with both corporate clients and government bodies across East Africa.',
    inspiration: 'The circular form of the Emita logo references the water cycle — endless flow and efficiency. The blue palette communicates trust, cleanliness, and water, while the forward-leaning letterforms suggest motion and progress.',
    applications: '"Designing a logo of a new product under an established brand demands the right balance of creativity and humility. James rose to the challenge with unmatched professionalism." — Gael Fraiteur',
    testimonial: '"The Emita brand perfectly captures what we stand for — efficiency, reliability, and innovation in water management." — CEO, Emita',
    testimonialAuthor: 'CEO',
    testimonialRole: 'Emita',
    featured: true,
    order: 2,
  },
  {
    id: 'geopsy',
    slug: 'geopsy-research',
    title: 'GeoPsy Research',
    client: 'GeoPsy Research',
    category: 'Brand Identity',
    year: '2023',
    tags: ['Branding', 'GIS', 'Research'],
    coverImage: geopsyCover,
    heroImage: null,
    images: [
      createImageFallback('GeoPsy', 0),
      createImageFallback('GeoPsy', 1),
      createImageFallback('GeoPsy', 2),
      createImageFallback('GeoPsy', 3)
    ],
    summary: 'A bold, geo-inspired identity system for a research company in GIS and remote sensing space.',
    brief: 'GeoPsy Research needed a brand identity that would position them as a credible, forward-thinking research organisation in the competitive GIS and geospatial analytics sector.',
    inspiration: 'The globe-within-G mark directly references geospatial thinking — looking at the world from above. The confident blue palette and bold typography communicate authority and expertise.',
    applications: '"Designing a logo for a research institution requires balancing academic credibility with modern appeal. The result exceeded our expectations." — Research Director',
    testimonial: '"Our new brand has completely transformed how potential clients and partners perceive us. Professional, bold, and memorable." — Research Director, GeoPsy',
    testimonialAuthor: 'Research Director',
    testimonialRole: 'GeoPsy Research',
    featured: true,
    order: 3,
  },
  {
    id: 'gewal',
    slug: 'gewal-limited',
    title: 'Gewal Limited',
    client: 'Gewal Limited',
    category: 'Brand Identity',
    year: '2024',
    tags: ['Branding', 'Logistics', 'Identity'],
    coverImage: gewalCover,
    heroImage: null,
    images: [
      createImageFallback('Gewal', 0),
      createImageFallback('Gewal', 1),
      createImageFallback('Gewal', 2),
      createImageFallback('Gewal', 3)
    ],
    summary: 'A premium logistics brand identity — "It\'s a Walk in the Pack" — combining strength and approachability.',
    brief: 'Gewal Limited needed a distinctive brand presence that would set them apart in a crowded logistics market while communicating reliability, scale, and a human touch.',
    inspiration: 'The interlocking G-L lettermark creates a sense of structural strength and interconnection — mirroring the logistics network Gewal operates. Warm greens suggest reliability and growth.',
    applications: '"The brand works beautifully across everything from vehicle wraps to digital ads. Exactly what we needed." — MD, Gewal Limited',
    testimonial: '"Our new identity has opened doors. Clients take us more seriously. The brand communicates exactly what we are." — Managing Director, Gewal Limited',
    testimonialAuthor: 'Managing Director',
    testimonialRole: 'Gewal Limited',
    featured: true,
    order: 4,
  },
  {
    id: 'mcdonald',
    slug: 'mcdonald-company-advocates',
    title: 'McDonald & Company Advocates',
    client: 'McDonald & Company Advocates',
    category: 'Brand Identity',
    year: '2024',
    tags: ['Branding', 'Legal', 'Corporate'],
    coverImage: mcdonaldCover,
    heroImage: null,
    images: [
      createImageFallback('McDonald', 0),
      createImageFallback('McDonald', 1),
      createImageFallback('McDonald', 2),
      createImageFallback('McDonald', 3)
    ],
    summary: 'A refined, authoritative brand identity for a legal advocacy firm, balancing tradition with modern clarity.',
    brief: 'McDonald & Company Advocates required a brand identity that would command authority in the legal sector while remaining approachable to clients navigating complex legal matters.',
    inspiration: 'The monogram mark draws from classic legal heraldry — structured, deliberate, and authoritative. Deep navy and gold communicate gravitas, heritage, and premium positioning.',
    applications: '"The brand perfectly reflects our firm\'s values — professional, trustworthy, and client-focused." — Joseph McDonald',
    testimonial: '"Our rebrand has significantly elevated our firm\'s profile. New clients consistently mention our professional appearance as a factor in their decision." — Joseph McDonald, Principal Advocate',
    testimonialAuthor: 'Joseph McDonald',
    testimonialRole: 'Principal Advocate',
    featured: true,
    order: 5,
  },
  {
    id: 'midas',
    slug: 'midas-flowers-gifts',
    title: 'Midas Flowers & Gifts',
    client: 'Midas Flowers & Gifts',
    category: 'Brand Identity',
    year: '2024',
    tags: ['Branding', 'Retail', 'Floral'],
    coverImage: midasCover,
    heroImage: null,
    images: [
      createImageFallback('Midas', 0),
      createImageFallback('Midas', 1),
      createImageFallback('Midas', 2),
      createImageFallback('Midas', 3)
    ],
    summary: 'An elegant floral brand with warm, earthy tones and an organic mark that communicates luxury and nature.',
    brief: 'Midas Flowers & Gifts needed a brand that would elevate their offering from ordinary flower shop to premium gifting destination, appealing to corporate clients and high-end retail customers alike.',
    inspiration: 'The Midas mark abstracts the petals of a flower into a refined, continuous form. Warm burgundy and cream tones evoke luxury, romance, and the timeless beauty of florals.',
    applications: '"The brand elevated our entire operation. We\'re now seen as a premium gift supplier rather than just a flower shop." — Founder, Midas',
    testimonial: '"Exactly the transformation we were looking for. The brand feels premium without being cold." — Founder, Midas Flowers & Gifts',
    testimonialAuthor: 'Founder',
    testimonialRole: 'Midas Flowers & Gifts',
    featured: true,
    order: 6,
  },
  {
    id: 'kezjoy',
    slug: 'kezjoy-ventures',
    title: 'Kezjoy Ventures',
    client: 'Kezjoy Ventures',
    category: 'Brand Identity',
    year: '2024',
    tags: ['Branding', 'Construction', 'Identity'],
    coverImage: kezjoyCover,
    heroImage: null,
    images: [
      createImageFallback('Kezjoy', 0),
      createImageFallback('Kezjoy', 1),
      createImageFallback('Kezjoy', 2),
      createImageFallback('Kezjoy', 3)
    ],
    summary: 'A bold, dynamic identity for a construction and ventures company built on strength and forward motion.',
    brief: 'Kezjoy Ventures required a brand that would communicate strength, reliability, and dynamism — positioning them as a serious player in the construction and investment sector.',
    inspiration: 'The angular KJ monogram references structural precision and forward momentum — a nod to the construction world. The orange-and-navy palette communicates energy, reliability, and ambition.',
    applications: '"The brand works incredibly well on everything — site signage, hard hats, vehicle branding. We look the part." — Director, Kezjoy',
    testimonial: '"We went from looking like a startup to looking like an industry leader overnight. The brand delivered exactly that shift." — Director, Kezjoy Ventures',
    testimonialAuthor: 'Director',
    testimonialRole: 'Kezjoy Ventures',
    featured: false,
    order: 7,
  },
  {
    id: 'lpc',
    slug: 'lpc-land-property',
    title: 'LPC — Land & Property',
    client: 'LPC',
    category: 'Brand Identity',
    year: '2024',
    tags: ['Branding', 'Property', 'Logo'],
    coverImage: lpcCover,
    heroImage: null,
    images: [
      createImageFallback('LPC', 0),
      createImageFallback('LPC', 1),
      createImageFallback('LPC', 2),
      createImageFallback('LPC', 3)
    ],
    summary: 'A refreshed brand for a land and property company — trust, credibility, and professionalism through a confident circular mark.',
    brief: 'LPC were looking for a refreshed brand identity that would communicate trust, credibility, and professionalism in the land and property sector. As a growing company focused on verified property listings and transparent transactions, they needed a logo and visual system that would reflect their reliability and forward-thinking approach. The goal was to create a mark that feels confident and established.',
    inspiration: 'The LPC identity was inspired by the foundation of its business — connecting people to genuine land and property opportunities. The logo combines two simple but powerful symbols: a house and a stretch of land, representing security, ownership, and growth. Together, they form a balanced mark that communicates trust and stability.',
    applications: '"Designing a logo of a new product under an established brand demands the right balance of creativity and humility. James rose to the challenge with unmatched professionalism." — Gael Fraiteur',
    testimonial: '"Our new brand immediately communicated what we stand for. Clients feel more confident approaching us, and that has directly impacted our conversions." — Managing Director, LPC',
    testimonialAuthor: 'Managing Director',
    testimonialRole: 'LPC',
    externalUrl: 'https://lpc.co.ke',
    featured: false,
    order: 8,
  },
]

export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug) ?? null

export const getFeaturedProjects = () =>
  projects.filter((p) => p.featured).sort((a, b) => a.order - b.order)

export const getAllProjects = () =>
  [...projects].sort((a, b) => a.order - b.order)

export const getAdjacentProjects = (currentSlug) => {
  const sorted = getAllProjects()
  const index = sorted.findIndex((p) => p.slug === currentSlug)
  return {
    prev: index > 0 ? sorted[index - 1] : sorted[sorted.length - 1],
    next: index < sorted.length - 1 ? sorted[index + 1] : sorted[0],
  }
}

export const projectCategories = [
  'All',
  'Brand Identity',
  'SAAS UIUX',
  'Webflow Development',
  'E-commerce',
  'Mobile App',
  'Others',
]

export default projects
