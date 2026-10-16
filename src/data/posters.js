/**
 * posters.js — Posters shown in the staggered (masonry) grid on the
 * Posters page (/posters). Same idea as logos.js.
 *
 * Every image in src/assets/images/posters/ becomes a poster automatically:
 * drop in a new .webp (or .png/.jpg) and it appears in the grid, no code
 * changes needed. Files are listed in filename order (numbers sort naturally).
 *
 * The title comes from the filename ("AdiliEmeraldProject.webp" →
 * "Adili Emerald Project"). It is only used for the image's alt text and the
 * cursor label on hover. To show a nicer name, add the filename (without
 * extension) to `titleOverrides`.
 */

const modules = import.meta.glob('../assets/images/posters/*.{webp,png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})

const titleOverrides = {
  BRIT: 'Brit',
  FGCK: 'FGCK',
  'THE LAW CHAMBERS': 'The Law Chambers',
}

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

/** "1_ORION FLYERS" → "Orion Flyers", "AdiliEmeraldProject2" → "Adili Emerald Project 2" */
const toTitle = (file) => {
  if (titleOverrides[file]) return titleOverrides[file]
  return file
    .replace(/^\d+_/, '') // leading order number
    .replace(/\(\d+\)/g, '') // "(1)" copy markers
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2') // split CamelCase
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) =>
      // short ALL-CAPS words (GIS, BS) stay as acronyms; the rest are Title Case
      w.length <= 3 && w === w.toUpperCase()
        ? w
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join(' ')
}

export const posterProjects = Object.entries(modules)
  .map(([path, src]) => {
    const file = path.split('/').pop().replace(/\.[^.]+$/, '')
    const slug = slugify(file)
    return {
      id: `poster-${slug}`,
      slug,
      title: toTitle(file),
      client: toTitle(file),
      category: 'Poster',
      year: '2025',
      coverImage: src,
      images: [src],
    }
  })
  .sort((a, b) => a.slug.localeCompare(b.slug, undefined, { numeric: true }))

export default posterProjects
