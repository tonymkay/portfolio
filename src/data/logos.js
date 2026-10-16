/**
 * logos.js — Logos & Identities shown in the staggered (masonry) grid on
 * the Projects page.
 *
 * Every image in src/assets/images/logos/ becomes a project automatically:
 * drop in a new .webp (or .png/.jpg) and it appears in the grid, no code
 * changes needed. Files are listed alphabetically by filename.
 *
 * The title comes from the filename (KIRINAT.webp → "Kirinat"). To show a
 * nicer name, add the filename (without extension) to `titleOverrides`.
 *
 * Optional: give a logo its own detail-page images by adding an entry to
 * `panelsByFile`, e.g. { ALFA: [alfa1, alfa2] } — otherwise the detail page
 * shows the logo image followed by the "Thank you" panel.
 */

const modules = import.meta.glob('../assets/images/logos/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})

const titleOverrides = {
  McDONALD: 'McDonald & Company Advocates',
  GEWAL: 'Gewal Limited',
  KEZJOY: 'Kezjoy Ventures',
  LPC: 'LPC — Land & Property',
  MIDAS: 'Midas Flowers & Gifts',
}

// Optional detail-page images per logo, keyed by filename (no extension):
//   import alfa1 from '../assets/images/logos/alfa/1.webp'
//   const panelsByFile = { ALFA: [alfa1, alfa2] }
const panelsByFile = {}

const toTitle = (name) =>
  titleOverrides[name] ?? name.charAt(0) + name.slice(1).toLowerCase()

export const logoProjects = Object.entries(modules)
  .map(([path, src]) => {
    const file = path.split('/').pop().replace(/\.[^.]+$/, '')
    return {
      id: `logo-${file.toLowerCase()}`,
      slug: file.toLowerCase(),
      title: toTitle(file),
      client: toTitle(file),
      category: 'Brand Identity',
      year: '2025',
      coverImage: src,
      images: panelsByFile[file] ?? [src],
    }
  })
  .sort((a, b) => a.slug.localeCompare(b.slug))

export const getLogoBySlug = (slug) =>
  logoProjects.find((p) => p.slug === slug) ?? null

export const getOtherLogos = (currentSlug, limit = 3) => {
  const index = logoProjects.findIndex((p) => p.slug === currentSlug)
  const others = []
  for (let i = 1; i < logoProjects.length && others.length < limit; i++) {
    others.push(logoProjects[(index + i) % logoProjects.length])
  }
  return others
}

export default logoProjects
