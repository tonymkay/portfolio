/**
 * Typography Tokens
 * Manrope is the brand font. Falls back to system sans-serif.
 */

export const typography = {
  // Font families
  fontPrimary: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  // Font weights
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Font sizes (rem)
  size: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    md: '1.125rem',   // 18px
    lg: '1.25rem',    // 20px
    xl: '1.5rem',     // 24px
    '2xl': '1.875rem', // 30px
    '3xl': '2.25rem',  // 36px
    '4xl': '3rem',     // 48px
    '5xl': '3.75rem',  // 60px
    '6xl': '4.5rem',   // 72px
  },

  // Line heights
  leading: {
    tight: 1.1,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.65,
    loose: 1.8,
  },

  // Letter spacing
  tracking: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.15em',
  },
}

export default typography
