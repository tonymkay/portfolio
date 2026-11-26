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

// Optional text shown beside a poster on its page (/posters/:slug), keyed by
// slug. Leave a poster out and it gets the generic description below.
// e.g. 'brit': 'Launch poster for Brit.'
const descriptionOverrides = {}

// Generic text used for every poster that has no override above.
const defaultDescription =
  'A poster designed to grab attention and get its message across at a glance. Bold layout, clear hierarchy, and a look built to stand out in print and on screen.'

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
      description: descriptionOverrides[slug] ?? defaultDescription,
      coverImage: src,
      images: [src],
    }
  })
  .sort((a, b) => a.slug.localeCompare(b.slug, undefined, { numeric: true }))

export const getPosterBySlug = (slug) => posterProjects.find((p) => p.slug === slug)

/** The next `count` posters after this one (wrapping around), never the poster itself. */
export const getRelatedPosters = (slug, count = 6) => {
  const at = posterProjects.findIndex((p) => p.slug === slug)
  if (at === -1) return []
  const others = [...posterProjects.slice(at + 1), ...posterProjects.slice(0, at)]
  return others.slice(0, count)
}

export default posterProjects
