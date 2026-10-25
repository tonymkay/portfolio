import { useState } from 'react'
import { X } from 'lucide-react'
import CubeButton from '../ui/CubeButton'
import styles from './FloatingProjectLinks.module.css'

export default function FloatingProjectLinks({ title, coverImage, website, prototype }) {
  const [closed, setClosed] = useState(false)

  if (closed || (!website && !prototype)) return null

  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        {coverImage && <img src={coverImage} alt="" className={styles.cover} />}

        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
        </div>

        <div className={styles.actions}>
          {prototype && (
            <CubeButton href={prototype} external variant="light" size="sm">
              View on Figma
            </CubeButton>
          )}
          {website && (
            <CubeButton href={website} external variant="light" size="sm">
              Visit website
            </CubeButton>
          )}
        </div>

        <button
          type="button"
          className={styles.close}
          onClick={() => setClosed(true)}
          aria-label="Close"
        >
          <X size={16} strokeWidth={2.25} />
        </button>
      </div>
    </div>
  )
}
