/**
 * Responsive Breakpoints
 * Mobile-first (min-width) media queries
 */

export const breakpoints = {
  xs: '375px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
}

/**
 * Media query strings for use in JS (e.g. framer-motion variants)
 */
export const mediaQuery = {
  xs: `(min-width: 375px)`,
  sm: `(min-width: 640px)`,
  md: `(min-width: 768px)`,
  lg: `(min-width: 1024px)`,
  xl: `(min-width: 1280px)`,
  '2xl': `(min-width: 1440px)`,
}

export default breakpoints
