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
    key: 'twitter',
    label: 'X',
    href: social.twitter,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: 'dribbble',
    label: 'Dribbble',
    href: social.dribbble,
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
      </svg>
    ),
  },
  {
    key: 'behance',
    label: 'Behance',
    href: social.behance,
    icon: <span className={styles.behance} aria-hidden="true">Bē</span>,
  },
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
 * SocialLinks — a row of round icon links (X, Dribbble, Behance, Instagram,
 * LinkedIn) from siteContent.social. Reads the --ux-* colour tokens of the
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
