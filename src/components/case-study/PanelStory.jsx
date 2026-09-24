import styles from './PanelStory.module.css'

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
 * panels: [{ id, src, alt, background? }]
 * `background` is optional — set it per-panel for a transparent PNG that
 * needs a solid colour behind it; omitted panels just show the page bg.
 */
export default function PanelStory({ panels }) {
  if (!panels?.length) return null

  return (
    <div className={`container ${styles.panelStory}`}>
      {panels.map((panel) => (
        <div
          key={panel.id}
          className={styles.panel}
          style={panel.background ? { background: panel.background } : undefined}
        >
          <img src={panel.src} alt={panel.alt} loading="eager" />
        </div>
      ))}
    </div>
  )
}
