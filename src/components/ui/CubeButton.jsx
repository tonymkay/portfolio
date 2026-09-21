import { Link } from 'react-router-dom'
import styles from './CubeButton.module.css'

/**
 * CubeButton — one button for the whole site, with a 3D "cube roll" hover.
 * At rest the front face shows; on hover / keyboard focus the cube rolls
 * up and a second face (same label) swings in from underneath.
 *
 * Renders <Link> (to), <a> (href), or <button> (default).
 *
 * Props:
 *   to / href / external — link target (router link, plain link, new-tab link)
 *   onClick, type, disabled — as on a normal button
 *   variant   — default/'solid': navy fill + white text at rest, outline on hover.
 *               'light': inverted (white fill at rest), for dark backgrounds.
 *               'surface': as default, outline face has a white backing (on photos).
 *               'active': flipped (outlined at rest, filled on hover) for selected states.
 *   size      — 'sm' | 'md' | 'lg' | 'xl'
 *   rounded   — pill-shaped faces
 *   spaced    — uppercase, wide letter-spacing (editorial style)
 *   fullWidth — stretch to the container width
 *   className — layout only (margin, align-self…) or --h / --px / --fs / --ls overrides
 *
 * Note: the cube needs a fixed height, so size sets --h. Width follows the label.
 */
export default function CubeButton({
  as,
  to,
  href,
  external = false,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'solid',
  size = 'md',
  rounded = false,
  spaced = false,
  fullWidth = false,
  rollOnGroupHover = false,
  className = '',
  children,
  ...props
}) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    rounded && styles.rounded,
    spaced && styles.spaced,
    fullWidth && styles.block,
    rollOnGroupHover && styles.groupRoll,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <span className={styles.cube}>
      <span className={`${styles.face} ${styles.front}`}>{children}</span>
      <span className={`${styles.face} ${styles.top}`} aria-hidden="true">{children}</span>
    </span>
  )

  // Non-interactive look-alike, for use inside something that is already a link
  // (e.g. the "View more" label on a project card). Nesting <a> in <a> is invalid.
  if (as === 'span') {
    return (
      <span className={cls} {...props}>
        {inner}
      </span>
    )
  }

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick} {...props}>
        {inner}
      </Link>
    )
  }

  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={cls} onClick={onClick} {...ext} {...props}>
        {inner}
      </a>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} {...props}>
      {inner}
    </button>
  )
}
