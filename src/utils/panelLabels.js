/**
 * panelLabels.js — turns a case-study panel's image name (its `id`, which
 * mirrors the file name: problem, scope, solution, mockup-3 …) into the
 * section name shown in the sticky breadcrumb as the reader scrolls.
 *
 * To override one panel, give it a `label` in uxProjects.js:
 *   { id: 'image2', src, alt, label: 'User Journey' }
 */

const RULES = [
  [/^cover/i, ''],
  [/^problem/i, 'Problem Statement'],
  [/^solution/i, 'Solution'],
  [/^(what-?i-?did|process)/i, 'What I Did'],
  [/^scope/i, 'Scope of Work'],
  [/^(research|journey)/i, 'UX Research'],
  [/^(product|screenshot|ui|image)/i, 'User Interface'],
  [/^mockup/i, 'Mockups'],
  [/^success/i, 'Success Story'],
  [/^thanks?/i, 'Thank You'],
]

export function labelFromId(id = '') {
  const hit = RULES.find(([re]) => re.test(id))
  return hit ? hit[1] : ''
}

/**
 * One label per panel, same order as `panels`. The opening cover has no
 * label (the breadcrumb just shows the project title). Any later panel
 * without a label of its own (e.g. a cover placed mid-flow) keeps the
 * section before it, so the breadcrumb never flickers to blank mid-story.
 */
export function resolvePanelLabels(panels = []) {
  let last = ''
  return panels.map((panel) => {
    const label = panel.label ?? labelFromId(panel.id)
    if (label) {
      last = label
      return label
    }
    return last
  })
}

/** Unique section names, in page order — used to reserve the breadcrumb's width. */
export function getPanelSections(panels = []) {
  return [...new Set(resolvePanelLabels(panels).filter(Boolean))]
}
