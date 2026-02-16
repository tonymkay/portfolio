/**
 * 12-Column Grid Configuration
 * These values map to the CSS grid utilities in grid.css
 */

export const grid = {
  columns: 12,
  gutter: '1.5rem',      // gap between columns
  gutterMd: '2rem',      // gap on tablet+
  maxWidth: '1440px',    // max container width
  containerPadding: {
    mobile: '1.5rem',
    tablet: '2.5rem',
    desktop: '5rem',
  },
}

/**
 * Helper: column span class names
 * e.g. colSpan(6) => 'col-span-6'
 */
export const colSpan = (n) => `col-span-${n}`

export default grid
