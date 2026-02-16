/**
 * imageHelpers.js
 * Utilities for handling images — placeholder fallbacks, lazy loading helpers, etc.
 *
 * CMS NOTE: When the CMS is active, getImageUrl() will resolve API image URLs.
 * All image references in components should go through these helpers.
 */

/**
 * Returns the image src, or a placeholder SVG data URI if null/undefined.
 * The placeholder shows dimensions and optional label.
 *
 * @param {string|null} src       - Image source (import or URL)
 * @param {string}      label     - Text to show inside placeholder
 * @param {string}      bg        - Background color (hex or CSS color)
 * @returns {string}
 */
export const getImageSrc = (src, label = 'Image', bg = '#D1D1CB') => {
  if (src) return src
  // SVG placeholder with label
  const encoded = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
      <rect width="100%" height="100%" fill="${bg}"/>
      <text x="50%" y="48%" font-family="sans-serif" font-size="18" fill="#6B7280" text-anchor="middle" dy=".3em">${label}</text>
      <text x="50%" y="58%" font-family="sans-serif" font-size="13" fill="#9CA3AF" text-anchor="middle" dy=".3em">Add image to assets/images/</text>
    </svg>`
  )
  return `data:image/svg+xml,${encoded}`
}

/**
 * Returns an alt text string from a project title
 * @param {string} title
 * @param {string} suffix
 * @returns {string}
 */
export const getAltText = (title, suffix = '') =>
  suffix ? `${title} — ${suffix}` : title

/**
 * Future: resolves CMS image URL or falls back to asset path
 * @param {string|null} cmsUrl
 * @param {string|null} localSrc
 * @returns {string|null}
 */
export const resolveImage = (cmsUrl, localSrc) => cmsUrl ?? localSrc ?? null

export default { getImageSrc, getAltText, resolveImage }
