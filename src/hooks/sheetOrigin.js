
/**
 * sheetOrigin — remembers the on-screen box of the tile that was clicked to
 * open a project, so <ProjectSheet> can grow out of it (and shrink back into
 * it on close). Plain module state: it only needs to survive one navigation.
 *
 * Boxes are in viewport coordinates, taken at click time.
 */
let origin = null

export function setSheetOrigin(el) {
  if (!el) {
    origin = null
    return
  }
  const r = el.getBoundingClientRect()
  // The listing doesn't move when the sheet opens (<ProjectSheet> reserves
  // the scrollbar gutter), so the click-time box is exactly where the tile
  // stays — no compensation needed.
  origin = {
    top: r.top,
    left: r.left,
    width: r.width,
    height: r.height,
  }
}

export const getSheetOrigin = () => origin
export const clearSheetOrigin = () => {
  origin = null
}
