import { Link } from 'react-router-dom'
import styles from './CubeButton.module.css'

/**
 * CubeButton — shared text-link CTA with an animated underline and arrow.
 *
 * Renders <Link> (to), <a> (href), or <button> (default).
 *
 * Props:
 *   to / href / external — link target (router link, plain link, new-tab link)
 *   onClick, type, disabled — as on a normal button
 *   variant   — sets the CTA text color for its background context.
 *   size      — 'sm' | 'md' | 'lg' | 'xl'
 *   rounded   — pill-shaped faces
 *   spaced    — uppercase, wide letter-spacing (editorial style)
 *   textLink  — use the shared underline-and-arrow treatment (enabled by default)
 *   fullWidth — stretch to the container width
 *   className — layout only (margin, align-self…) or --h / --px / --fs / --ls overrides
 *
 * Size controls type scale; width follows the label.
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
  textLink = true,
  fullWidth = false,
  compactMobile = false,
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
    textLink && styles.textLink,
    fullWidth && styles.block,
    compactMobile && styles.compactMobile,
    rollOnGroupHover && styles.groupRoll,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const buttonLabel = typeof children === 'string'
    ? children.replace(/\s*[↗→]\s*$/, '')
    : children

  const textLinkContents = textLink ? (
    <>
      <span className={styles.textLinkLabel}>{buttonLabel}</span>
      <span className={styles.textLinkArrowCircle} aria-hidden="true">
        <svg className={styles.textLinkArrow} viewBox="0 0 24 24" fill="none">
          <path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </>
  ) : children

  const inner = (
    <span className={styles.cube}>
      <span className={`${styles.face} ${styles.front}`}>{textLinkContents}</span>
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
