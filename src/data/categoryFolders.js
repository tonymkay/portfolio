import { getAllUxProjects } from './uxProjects'
import asnLogo from '../assets/images/logos/ASN.webp'
import geoLogo from '../assets/images/logos/GEONAVIGATOR.webp'
import orionLogo from '../assets/images/logos/ORION.webp'
import namasakaPoster from '../assets/images/posters/NAMASAKA.webp'
import adiliPoster from '../assets/images/posters/AdiliRealEstate.webp'
import citamPoster from '../assets/images/posters/CITAMPOSTER1.webp'

const ux = Object.fromEntries(getAllUxProjects().map((p) => [p.id, p]))

// Category cards: minimal (name only, no pills). UX has one image;
// Posters and Logos fan out three on hover.
export const uxCategory = {
  id: '/ui-ux',
  slug: '/ui-ux',
  title: 'UX Design Projects',
  minimal: true,
  cursorLabel: 'View UI/UX',
  coverImage: ux['ux-pataskills-app'].coverImage,
  to: '/ui-ux',
}

export const postersCategory = {
  id: '/posters',
  slug: '/posters',
  title: 'Poster Designs',
  minimal: true,
  cursorLabel: 'View Posters',
  covers: [adiliPoster, namasakaPoster, citamPoster],
  coverImage: namasakaPoster,
  to: '/posters',
}

export const logosCategory = {
  id: '/projects',
  slug: '/projects',
  title: 'Logo Designs',
  minimal: true,
  cursorLabel: 'View Identities',
  covers: [geoLogo, asnLogo, orionLogo],
  coverImage: asnLogo,
  to: '/projects',
}
