import { useEffect, useMemo, useRef } from 'react'
import styles from './ProcessScrollStory.module.css'

const W = 240
const H = 150

// 12 scattered thoughts, one per step
const REAL = Array.from({ length: 12 }, (_, i) => {
  const a = i * 2.399963
  const f = 0.6 + 0.4 * (((i * 5) % 7) / 6)
  return {
    x: Math.cos(a) * 0.42 * f,
    y: 0.14 + Math.sin(a) * 0.26 * f,
    r: ((i * 37) % 31) - 15,
    s: 0.45 + ((i * 3) % 5) * 0.03,
    d: i * 0.9,
  }
})

const NOISE = [
  { x: 0.02, y: -0.36, r: 20, w: 64, h: 64, d: 0.7 },
  { x: -0.28, y: -0.04, r: -18, w: 110, h: 54, d: 1.9 },
  { x: 0.24, y: 0.22, r: 12, w: 52, h: 52, d: 2.8 },
  { x: 0.42, y: -0.08, r: -25, w: 96, h: 48, d: 3.6 },
  { x: -0.1, y: 0.12, r: 30, w: 58, h: 58, d: 4.4 },
  { x: 0.04, y: 0.4, r: -10, w: 120, h: 60, d: 5.5 },
]

const REAL_GLYPHS = ['A', '7', 'Q', '3', 'K', '9', 'Z', '4', 'R', '1', 'W', '8']
const NOISE_GLYPHS = ['x', '2', 'M', '5', 'R', '8']
const REAL_BLUR = [0, 3, 0, 2, 0, 4]
const NOISE_BLUR = [2, 0, 4, 0, 3, 0]

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const range = (p, a, b) => clamp((p - a) / (b - a))
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const lerp = (a, b, t) => a + (b - a) * t
const pad = (n) => String(n).padStart(2, '0')

// Scroll budget in viewport heights (vh). Windows may overlap.
// hold      — concept design process stays on screen, thoughts float
// toCap1    — heading rolls away, "Bringing thoughts together" rolls in
// gather    — thoughts pull into a pile
// toCap2    — caption rolls to "Organizing them into steps"
// organize  — pile lines up into the row of steps
// toCap3    — caption rolls to "Exploring the steps"
// zoom      — first step expands to fill the page
// steps     — one full-page slide per step, 100vh each
const STEP = 35

const buildTimeline = (count) => {
  const steps0 = 90
  return {
    hold: [0, 6],
    toCap1: [6, 30],
    gather: [8, 70],
    zoom: [55, 90],
    steps0,
    total: steps0 + count * STEP,
  }
}

export default function ProcessScrollStory({ id, navTitle, intro, steps }) {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const hintRef = useRef(null)
  const slidesRef = useRef(null)
  const panelRef = useRef(null)
  const itemRefs = useRef([])
  const contentRefs = useRef([])
  const glyphRefs = useRef([])
  const slideRefs = useRef([])
  const railRefs = useRef([])
  const railListRef = useRef(null)
  const count = steps.length
  const tl = useMemo(() => buildTimeline(count), [count])

  // Click a stage on the left: scroll to the spot where that stage is current
  const goTo = (i) => {
    const section = sectionRef.current
    if (!section) return
    const top = section.getBoundingClientRect().top + window.scrollY
    const pv = tl.steps0 + (i + 0.3) * STEP
    window.scrollTo({ top: top + (pv / 100) * window.innerHeight, behavior: 'smooth' })
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let visible = true
    let current = 0

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(section)

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return

      const vw = window.innerWidth
      const vh = window.innerHeight
      const rect = section.getBoundingClientRect()
      const scrollable = Math.max(1, rect.height - vh)
      const target = clamp(-rect.top / scrollable)
      current += (target - current) * 0.14
      if (Math.abs(target - current) < 0.0002) current = target

      const pv = current * tl.total
      const seg = (k) => range(pv, tl[k][0], tl[k][1])

      const wide = vw >= 700
      const rows = wide ? 2 : 1
      const perRow = Math.ceil(count / rows)
      const S = Math.min(wide ? 220 : 168, (vw - (wide ? 96 : 32)) / perRow)
      const orderScale = (S * 0.86) / W
      const rowPitch = S * 0.86 * (H / W) + S * 0.16
      const t1 = ease(seg('gather'))
      const sq = ease(range(seg('gather'), 0.5, 1))
      const t2 = 0
      const zoom = ease(seg('zoom'))
      const spread = 1 - 0.6 * sq
      const textIn = 0
      const time = reduce ? 0 : now / 1000

      for (let i = 0; i < count; i += 1) {
        const el = itemRefs.current[i]
        const content = contentRefs.current[i]
        if (!el) continue
        const cfg = REAL[i % REAL.length]
        const first = i === 0
        const px = ((i % 3) - 1) * 70 * spread
        const py = (Math.floor(i / 3) - 1.5) * 50 * spread
        const pr = (i - (count - 1) / 2) * 4
        const sx = cfg.x * vw + Math.sin(time * 0.7 + cfg.d) * 14 * (1 - t1)
        const sy = cfg.y * vh + Math.cos(time * 0.6 + cfg.d) * 12 * (1 - t1)
        const railEl = railRefs.current[i]
        let tx = sx
        let ty = sy
        let tw = W * cfg.s
        let th = H * cfg.s
        if (railEl) {
          const b = railEl.getBoundingClientRect()
          tw = Math.min(b.width, 300)
          th = b.height + 6
          tx = b.left + tw / 2 - vw / 2
          ty = b.top + b.height / 2 - vh / 2
        }
        const x = lerp(sx, tx, t1)
        const y = lerp(sy, ty, t1)
        const r = lerp(cfg.r, 0, t1)
        const scX = lerp(cfg.s, tw / W, t1)
        const scY = lerp(cfg.s, th / H, t1)
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${scX}, ${scY})`
        el.style.opacity = String(1 - zoom)
        el.style.zIndex = String(first ? 12 : 2 + (i % 8))
        const blur = REAL_BLUR[i % REAL_BLUR.length] * (1 - t1)
        el.style.filter = blur > 0.05 ? `blur(${blur}px)` : 'none'
        if (content) content.style.opacity = '0'
        const glyph = glyphRefs.current[i]
        if (glyph) glyph.style.opacity = '1'
      }

      for (let j = 0; j < NOISE.length; j += 1) {
        const el = itemRefs.current[count + j]
        if (!el) continue
        const cfg = NOISE[j]
        const sx = cfg.x * vw + Math.sin(time * 0.7 + cfg.d) * 14 * (1 - t1)
        const sy = cfg.y * vh + Math.cos(time * 0.6 + cfg.d) * 12 * (1 - t1)
        let tx = sx
        let ty = sy
        let tw = cfg.w
        let th = cfg.h
        const panelEl = panelRef.current
        if (panelEl) {
          const b = panelEl.getBoundingClientRect()
          const peek = (NOISE.length - 1 - j) * 5
          tw = b.width
          th = b.height
          tx = b.left + b.width / 2 - vw / 2 + peek
          ty = b.top + b.height / 2 - vh / 2 - peek
        }
        const x = lerp(sx, tx, t1)
        const y = lerp(sy, ty, t1)
        const r = lerp(cfg.r, 0, t1)
        const cw = lerp(cfg.w, tw, t1)
        const ch = lerp(cfg.h, th, t1)
        el.style.width = `${cw}px`
        el.style.height = `${ch}px`
        el.style.margin = `${-ch / 2}px 0 0 ${-cw / 2}px`
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`
        el.style.borderRadius = `${lerp(8, 18, t1)}px`
        el.style.borderWidth = '1px'
        el.style.background = 'var(--ux-surface, #2e2e34)'
        el.style.opacity = '1'
        el.style.color = `rgba(156, 156, 166, ${1 - t1})`
        const nb = NOISE_BLUR[j % NOISE_BLUR.length] * (1 - t1)
        el.style.filter = nb > 0.05 ? `blur(${nb}px)` : 'none'
      }

      // Heading rolls away as the first caption rolls in
      const ir = ease(seg('toCap1'))
      if (introRef.current) {
        introRef.current.style.opacity = String(1 - Math.min(1, ir * 1.4))
        introRef.current.style.transform = `perspective(900px) rotateX(${ir * 90}deg) translateY(${-ir * 16}px)`
      }
      if (hintRef.current) hintRef.current.style.opacity = String(1 - range(pv, 0, 20))

      // Full-page slides: hold each step, then move to the next
      const u = clamp((pv - tl.steps0) / (count * STEP)) * count
      const k = Math.min(count - 1, Math.floor(u))
      const cs = Math.min(count - 1, k + ease(range(u - k, 0.3, 1)))
      if (slidesRef.current) slidesRef.current.style.opacity = String(ease(range(seg('zoom'), 0.55, 1)))
      if (railListRef.current) {
        railListRef.current.style.pointerEvents = seg('zoom') > 0.95 ? 'auto' : 'none'
      }
      for (let i = 0; i < count; i += 1) {
        const slide = slideRefs.current[i]
        if (slide) {
          const d = i - cs
          const ad = Math.abs(d)
          slide.style.opacity = String(Math.max(0, 1 - ad * 2))
          slide.style.transform = `translate3d(0, ${d * 4}vh, 0)`
        }
        const rail = railRefs.current[i]
        if (rail) {
          const near = 1 - Math.min(1, Math.abs(i - cs))
          rail.style.opacity = String(0.3 + 0.7 * near)
          rail.style.transform = `translate3d(${near * 12}px, 0, 0)`
        }
      }
    }

    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [count, tl])

  return (
    <section
      id={id}
      data-nav-title={navTitle}
      ref={sectionRef}
      className={styles.section}
      style={{ height: `${tl.total + 100}vh` }}
    >
      <div className={styles.stage}>
        <div ref={introRef} className={styles.intro}>{intro}</div>

        {NOISE.map((n, j) => (
          <div
            key={`noise-${j}`}
            ref={(el) => { itemRefs.current[count + j] = el }}
            className={`${styles.item} ${styles.shape}`}
            style={{ width: n.w, height: n.h, margin: `${-n.h / 2}px 0 0 ${-n.w / 2}px` }}
            aria-hidden="true"
          >
            {NOISE_GLYPHS[j]}
          </div>
        ))}

        {steps.map((step, i) => (
          <div
            key={step.title}
            ref={(el) => { itemRefs.current[i] = el }}
            className={`${styles.item} ${styles.card}`}
            style={{ width: W, height: H, margin: `${-H / 2}px 0 0 ${-W / 2}px` }}
          >
            <span ref={(el) => { glyphRefs.current[i] = el }} className={styles.glyph} aria-hidden="true">
              {REAL_GLYPHS[i % REAL_GLYPHS.length]}
            </span>
            <div ref={(el) => { contentRefs.current[i] = el }} className={styles.content}>
              <span className={styles.badge}>{i + 1}</span>
              <h3 className={styles.title}>{step.title}</h3>
            </div>
          </div>
        ))}

        <div ref={slidesRef} className={styles.slides}>
          <ol ref={railListRef} className={styles.rail}>
            {steps.map((step, i) => (
              <li key={step.title} ref={(el) => { railRefs.current[i] = el }} className={styles.railItem}>
                <button type="button" className={styles.railBtn} onClick={() => goTo(i)}>
                  <span className={styles.railNo}>{pad(i + 1)}</span>
                  <span className={styles.railTitle}>{step.title}</span>
                </button>
              </li>
            ))}
          </ol>
          <div ref={panelRef} className={styles.panel}>
            {steps.map((step, i) => (
              <div key={step.title} ref={(el) => { slideRefs.current[i] = el }} className={styles.slide}>
                <span className={styles.slideNo}>{pad(i + 1)} / {pad(count)}</span>
                <h3 className={styles.slideTitle}>{step.title}</h3>
                <ul className={styles.tools}>
                  {step.tools.map((tool) => (
                    <li key={tool.name} className={styles.tool}>
                      <span className={styles.toolName}>{tool.name}</span>
                      <span className={styles.toolRole}>{tool.role}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.meta}>
                  <span className={styles.metaLabel}>Output</span>
                  <span className={styles.metaValue}>{step.output}</span>
                </div>
                <div className={styles.meta}>
                  <span className={styles.metaLabel}>{i === count - 1 ? 'Loops to' : 'Feeds'}</span>
                  <span className={styles.metaValue}>
                    {pad(((i + 1) % count) + 1)} {steps[(i + 1) % count].title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={hintRef} className={styles.hint}>Scroll</div>
      </div>
    </section>
  )
}
