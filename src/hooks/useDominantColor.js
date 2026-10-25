import { useEffect, useState } from 'react'

/**
 * useDominantColor — reads an image and returns its main colour, dimmed for a
 * dark canvas: { base, chip } as hsl() strings (chip is a lighter shade).
 * Picks the hue bucket with the most saturated pixels, so a white background
 * or a photo's grey doesn't win. Returns null until the image has loaded.
 * Results are cached per src.
 */
const cache = new Map()

function rgbToHsl(r, g, b) {
  const rn = r / 255
  const gn = g / 255
  const bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  const d = max - min
  if (d === 0) return [0, 0, l]
  const s = d / (1 - Math.abs(2 * l - 1))
  let h
  if (max === rn) h = ((gn - bn) / d) % 6
  else if (max === gn) h = (bn - rn) / d + 2
  else h = (rn - gn) / d + 4
  h /= 6
  if (h < 0) h += 1
  return [h, s, l]
}

function dominant(img) {
  const size = 32
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(img, 0, 0, size, size)
  const { data } = ctx.getImageData(0, 0, size, size)

  const bins = Array.from({ length: 12 }, () => ({ w: 0, r: 0, g: 0, b: 0 }))
  let ar = 0
  let ag = 0
  let ab = 0
  let n = 0
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    ar += r
    ag += g
    ab += b
    n += 1
    const [h, s, l] = rgbToHsl(r, g, b)
    const w = s * (1 - Math.abs(2 * l - 1))
    if (w < 0.05) continue
    const bin = bins[Math.min(11, Math.floor(h * 12))]
    bin.w += w
    bin.r += r * w
    bin.g += g * w
    bin.b += b * w
  }
  if (!n) return null

  const best = bins.reduce((a, b) => (b.w > a.w ? b : a))
  const [r, g, b] = best.w > 1
    ? [best.r / best.w, best.g / best.w, best.b / best.w]
    : [ar / n, ag / n, ab / n]

  const [h, s] = rgbToHsl(r, g, b)
  const hue = Math.round(h * 360)
  const sat = Math.round(Math.min(0.5, Math.max(0.2, s)) * 100)
  return {
    base: `hsl(${hue} ${sat}% 28%)`,
    chip: `hsl(${hue} ${sat}% 38%)`,
  }
}

export default function useDominantColor(src) {
  const [color, setColor] = useState(() => cache.get(src) ?? null)

  useEffect(() => {
    if (!src) return undefined
    if (cache.has(src)) {
      setColor(cache.get(src))
      return undefined
    }
    let alive = true
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const result = dominant(img)
        cache.set(src, result)
        if (alive) setColor(result)
      } catch {
        /* unreadable image — keep the theme surface colour */
      }
    }
    img.src = src
    return () => {
      alive = false
    }
  }, [src])

  return color
}
