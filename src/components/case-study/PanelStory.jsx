import { useState } from 'react'
import styles from './PanelStory.module.css'
import VideoModal from './VideoModal'

/**
 * PanelStory — the whole case-study body as a Behance-style stack of
 * full-container-width images. No text, no gap between panels, no
 * rounded corners. Each panel is one image; width always fills the
 * `.container` it sits in, height is whatever the image's own ratio
 * gives it.
 *
 * All panels render and load immediately on page load — no scroll
 * reveal animation and no lazy loading on this page.
 *
 * panels: [{ id, src, alt, background?, videoId? }]
 * `background` is optional — set it per-panel for a transparent PNG that
 * needs a solid colour behind it; omitted panels just show the page bg.
 * `videoId` is optional — a YouTube id; the panel becomes clickable and
 * opens the video in a pop-up.
 */
export default function PanelStory({ panels }) {
  const [activeVideo, setActiveVideo] = useState(null)

  if (!panels?.length) return null

  return (
    <div className={`container ${styles.panelStory}`}>
      {panels.map((panel) => {
        const bg = panel.background ? { background: panel.background } : undefined

        if (panel.videoId) {
          return (
            <button
              key={panel.id}
              type="button"
              className={`${styles.panel} ${styles.panelVideo}`}
              style={bg}
              aria-label={`Play video — ${panel.alt}`}
              onClick={() => setActiveVideo(panel)}
            >
              <img src={panel.src} alt={panel.alt} loading="eager" />
            </button>
          )
        }

        return (
          <div key={panel.id} className={styles.panel} style={bg}>
            <img src={panel.src} alt={panel.alt} loading="eager" />
          </div>
        )
      })}

      {activeVideo && (
        <VideoModal
          videoId={activeVideo.videoId}
          title={activeVideo.alt}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  )
}
