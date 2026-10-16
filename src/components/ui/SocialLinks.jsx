import { siteContent } from '../../data/siteContent'
import styles from './SocialLinks.module.css'

const { social } = siteContent

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const links = [
  {
    key: 'instagram',
    label: 'Instagram',
    href: social.instagram,
    icon: (
      <svg {...svgProps}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: social.linkedin,
    icon: (
      <svg {...svgProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

/**
 * SocialLinks — a row of round icon links (Instagram, LinkedIn) from siteContent.social.
 * Reads the --ux-* colour tokens of the
 * page it sits in (falls back to a dark look).
 */
export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`${styles.list} ${className}`}>
      {links.map((s) => (
        <li key={s.key}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={styles.link}
          >
            {s.icon}
          </a>
        </li>
      ))}
    </ul>
  )
}
