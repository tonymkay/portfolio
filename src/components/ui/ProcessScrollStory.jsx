import { useEffect, useMemo, useRef } from 'react'
import styles from './ProcessScrollStory.module.css'

const W = 240
const H = 150

// Scroll-driven cube caption (same X-axis roll as WordRotator)
const CAPTIONS = ['Bringing thoughts together', 'Organizing them into steps', 'Exploring the steps']

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
const buildTimeline = (count) => {
  const steps0 = 620
  return {
    hold: [0, 150],
    toCap1: [150, 210],
    gather: [170, 330],
    toCap2: [330, 390],
    organize: [350, 490],
    toCap3: [490, 550],
    zoom: [540, 620],
    steps0,
    total: steps0 + count * 100,
  }
}

export default function ProcessScrollStory({ id, navTitle, intro, steps }) {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const hintRef = useRef(null)
  const capWrapRef = useRef(null)
  const capCubeRef = useRef(null)
  const slidesRef = useRef(null)
  const itemRefs = useRef([])
  const contentRefs = useRef([])
  const glyphRefs = useRef([])
  const slideRefs = useRef([])
  const count = steps.length
  const tl = useMemo(() => buildTimeline(count), [count])

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
      const S = Math.min(168, (vw - 32) / count)
      const orderScale = (S * 0.86) / W
      const cover = Math.max(vw / W, vh / H) * 1.02
      const t1 = ease(seg('gather'))
      const sq = ease(range(seg('gather'), 0.5, 1))
      const t2 = ease(seg('organize'))
      const zoom = ease(seg('zoom'))
      const spread = 1 - 0.6 * sq
      const textIn = wide ? ease(range(seg('organize'), 0.4, 0.95)) : 0
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
        const ox = (i - (count - 1) / 2) * S
        let x = lerp(lerp(sx, px, t1), ox, t2)
        const y = lerp(lerp(sy, py, t1), 0, t2)
        const r = lerp(lerp(cfg.r, pr, t1), 0, t2)
        const base = lerp(lerp(cfg.s, 0.4, t1), orderScale, t2)
        let sc = base
        if (first) {
          x = lerp(x, 0, zoom)
          sc = lerp(base, cover, zoom)
          el.style.borderRadius = `${lerp(20, 0, zoom)}px`
          el.style.borderColor = zoom > 0.3 ? 'transparent' : ''
        }
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${sc})`
        el.style.opacity = String(first ? 1 : 1 - zoom)
        el.style.zIndex = String(first ? 12 : 2 + (i % 8))
        const blur = REAL_BLUR[i % REAL_BLUR.length] * (1 - t1)
        el.style.filter = blur > 0.05 ? `blur(${blur}px)` : 'none'
        const fade = first ? range(seg('zoom'), 0.55, 0.9) : 0
        if (content) content.style.opacity = String(textIn * (1 - fade))
        const glyph = glyphRefs.current[i]
        if (glyph) glyph.style.opacity = String((1 - textIn) * (1 - fade))
      }

      for (let j = 0; j < NOISE.length; j += 1) {
        const el = itemRefs.current[count + j]
        if (!el) continue
        const cfg = NOISE[j]
        const sx = cfg.x * vw + Math.sin(time * 0.7 + cfg.d) * 14 * (1 - t1)
        const sy = cfg.y * vh + Math.cos(time * 0.6 + cfg.d) * 12 * (1 - t1)
        const px = (j - 2.5) * 60 * spread
        const py = (((j * 7) % 5) - 2) * 45 * spread
        const x = lerp(sx, px, t1)
        const y = lerp(sy, py, t1)
        const r = lerp(cfg.r, (j - 2.5) * 6, t1)
        const sc = lerp(1, 0.35, t1)
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${sc})`
        el.style.opacity = String(1 - ease(range(seg('gather'), 0, 0.5)))
        const nb = NOISE_BLUR[j % NOISE_BLUR.length] * (1 - t1)
        el.style.filter = nb > 0.05 ? `blur(${nb}px)` : 'none'
      }

      // Heading rolls away as the first caption rolls in
      const ir = ease(seg('toCap1'))
      if (introRef.current) {
        introRef.current.style.opacity = String(1 - Math.min(1, ir * 1.4))
        introRef.current.style.transform = `perspective(900px) rotateX(${ir * 90}deg) translateY(${-ir * 16}px)`
      }
      if (hintRef.current) hintRef.current.style.opacity = String(1 - range(pv, 0, 40))

      // Caption cube: one roll per caption change
      if (capWrapRef.current) {
        const show = ease(range(pv, tl.toCap1[0] + 25, tl.toCap1[1]))
        const out = ease(range(seg('zoom'), 0, 0.5))
        capWrapRef.current.style.opacity = String(show * (1 - out))
      }
      if (capCubeRef.current) {
        const angle = 90 * ease(seg('toCap2')) + 90 * ease(seg('toCap3'))
        capCubeRef.current.style.transform = `translateZ(-0.6em) rotateX(${angle}deg)`
      }

      // Full-page slides: hold each step, then move to the next
      const u = clamp((pv - tl.steps0) / (count * 100)) * count
      const k = Math.min(count - 1, Math.floor(u))
      const cs = Math.min(count - 1, k + ease(range(u - k, 0.6, 1)))
      if (slidesRef.current) slidesRef.current.style.opacity = String(ease(range(seg('zoom'), 0.55, 1)))
      for (let i = 0; i < count; i += 1) {
        const slide = slideRefs.current[i]
        if (!slide) continue
        const d = i - cs
        const ad = Math.abs(d)
        slide.style.opacity = String(Math.max(0, 1 - ad * 1.8))
        slide.style.transform = `translate3d(0, ${d * 12}vh, 0) scale(${1 - ad * 0.03})`
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

        <div ref={capWrapRef} className={styles.capWrap}>
          <div ref={capCubeRef} className={styles.capCube}>
            {CAPTIONS.map((text, k) => (
              <div
                key={text}
                className={styles.capFace}
                style={{ transform: `rotateX(${-k * 90}deg) translateZ(0.6em)` }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

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
          {steps.map((step, i) => (
            <div key={step.title} ref={(el) => { slideRefs.current[i] = el }} className={styles.slide}>
              <span className={styles.slideNo}>{pad(i + 1)} / {pad(count)}</span>
              <h3 className={styles.slideTitle}>{step.title}</h3>
              <p className={styles.slideText}>{step.description}</p>
            </div>
          ))}
        </div>

        <div ref={hintRef} className={styles.hint}>Scroll</div>
      </div>
    </section>
  )
}
