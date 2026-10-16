import { logoProjects } from '../../../data/logos'
import { posterProjects } from '../../../data/posters'
import { getAllUxProjects } from '../../../data/uxProjects'
import styles from './Navbar.module.css'

// Work dropdown preview: a miniature of the page's own grid (like the Figma
// tab hover preview). Keyed by the card's href.
const SOURCES = {
  '/projects': { cols: 4, max: 16, list: () => logoProjects },
  '/posters': { cols: 4, max: 16, list: () => posterProjects },
  '/ui-ux': { cols: 3, max: 9, list: () => getAllUxProjects() },
}

// Placeholder blog preview: mock story cards (cover block + text lines).
const BLOG_MOCKS = [
  { tone: '#cfe3f1', lines: ['90%', '65%'] },
  { tone: '#f3dcc4', lines: ['80%', '55%'] },
  { tone: '#d6ecd9', lines: ['85%', '60%'] },
  { tone: '#e6d8f0', lines: ['75%', '50%'] },
]

function BlogMock() {
  return (
    <span className={styles.blogMock} aria-hidden="true">
      {BLOG_MOCKS.map((b, i) => (
        <span key={i} className={styles.blogCard}>
          <span className={styles.blogCover} style={{ background: b.tone }} />
          <span className={styles.blogLine} style={{ width: b.lines[0] }} />
          <span className={styles.blogLine} style={{ width: b.lines[1] }} />
        </span>
      ))}
    </span>
  )
}

export default function WorkPreview({ href, fallback }) {
  if (href === '/blogs') return <BlogMock />

  const source = SOURCES[href]
  const images = source
    ? source.list().slice(0, source.max).map((p) => p.coverImage).filter(Boolean)
    : []

  if (!images.length) {
    return fallback ? <img src={fallback} alt="" className={styles.cardImg} /> : null
  }

  const columns = Array.from({ length: source.cols }, (_, c) =>
    images.filter((_, i) => i % source.cols === c)
  )

  return (
    <span className={styles.preview} aria-hidden="true">
      {columns.map((col, c) => (
        <span key={c} className={styles.previewCol}>
          {col.map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" className={styles.previewImg} />
          ))}
        </span>
      ))}
    </span>
  )
}
