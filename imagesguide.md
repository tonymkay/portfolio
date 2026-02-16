# Images Guide — Antony Murimi Portfolio

## Overview
All images live inside `portfolio/src/assets/images/`. This guide tells you exactly which image goes where, what to name it, and what dimensions to use.

---

## Naming Convention
`{page}_{descriptive-name}.{ext}`

Examples: `home_hero.jpg`, `about_portrait.jpg`, `alumni_cover.jpg`

Use lowercase, hyphens-only, no spaces.

---

## Page-by-Page Image Slots

### Home (`src/assets/images/home/`)
| Filename | Where Used | Recommended Size | Notes |
|---|---|---|---|
| `home_hero.jpg` | Hero section background | 1920×1080 | Dark overlay applied — high-contrast image works best |
| `home_portrait.jpg` | About intro section | 600×800 | Your professional photo |

---

### About (`src/assets/images/about/`)
| Filename | Where Used | Recommended Size | Notes |
|---|---|---|---|
| `about_portrait.jpg` | Main portrait photo | 600×800 | Studio or professional shot |
| `about_workspace.jpg` | Optional workspace shot | 1200×800 | Used as accent image |

---

### Projects (`src/assets/images/projects/`)
Only the cover image for the portfolio grid — one per project.

| Filename | Project | Recommended Size | Notes |
|---|---|---|---|
| `projects_alumni-cover.jpg` | Alumni Social Network grid tile | 800×600 | Square crop works fine |
| `projects_emita-cover.jpg` | Emita SAAS Product | 800×600 | |
| `projects_geopsy-cover.jpg` | GeoPsy Research | 800×600 | |
| `projects_gewal-cover.jpg` | Gewal Limited | 800×600 | |
| `projects_mcdonald-cover.jpg` | McDonald & Company | 800×600 | |
| `projects_midas-cover.jpg` | Midas Flowers & Gifts | 800×600 | |
| `projects_kezjoy-cover.jpg` | Kezjoy Ventures | 800×600 | |
| `projects_lpc-cover.jpg` | LPC — Land & Property | 800×600 | |

---

### Process (`src/assets/images/process/`)
| Filename | Where Used | Recommended Size | Notes |
|---|---|---|---|
| `process_moodboard1.jpg` | Moodboard grid slot 1 | 800×600 | Abstract/textural image |
| `process_moodboard2.jpg` | Moodboard grid slot 2 | 800×600 | |
| `process_moodboard3.jpg` | Moodboard grid slot 3 | 800×600 | |
| `process_moodboard4.jpg` | Moodboard wide slot | 1600×900 | Wide format — 2 cols span |
| `process_moodboard5.jpg` | Moodboard grid slot 5 | 800×600 | |
| `process_moodboard6.jpg` | Moodboard grid slot 6 | 800×600 | |
| `process_hero.jpg` | Hero section background | 1920×600 | Blurred or abstract |
| `process_cta.jpg` | CTA card background (above footer) | 1600×700 | Dark workspace/desk photo — overlay applied. See Image 1 reference (notebook, coffee, dark tone). Landscape orientation. |

**To activate `process_cta.jpg`:**
1. Drop `process_cta.jpg` into `src/assets/images/process/`
2. In `src/data/siteContent.js`, replace the `processCta` lines with:
   ```js
   import processCta from '../assets/images/process/process_cta.jpg'
   ```
   And remove the `const processCta = null` line.
3. Save — Vite HMR picks it up instantly.

### Process — Brand Direction panels (`src/assets/images/process/`)
These replace the old text-column layout. Each is a **portrait-orientation image** showing a curated group of logo references for brand direction. Use a screenshot/photo of logos printed/arranged to visually represent a style direction.

| Filename | Panel | Recommended Size | Suggested Content |
|---|---|---|---|
| `process_direction1.jpg` | Left panel — Heritage & Craft | 600×800 | Serif brands: Coca-Cola, Disney, Ford, Kellogg’s, Hallmark, Barbie, Ray-Ban... |
| `process_direction2.jpg` | Centre panel — Modern & Digital | 600×800 | Clean tech brands: Apple, Instagram, Spotify, WhatsApp, Airbnb, Pinterest... |
| `process_direction3.jpg` | Right panel — Bold & Iconic | 600×800 | Bold mark brands: Harley-Davidson, BMW, Lamborghini, Starbucks, UPS... |

**How to add:**
1. Place the 3 images in `src/assets/images/process/`
2. Open `src/data/siteContent.js`
3. Add imports at the top:
   ```js
   import direction1 from '../assets/images/process/process_direction1.jpg'
   import direction2 from '../assets/images/process/process_direction2.jpg'
   import direction3 from '../assets/images/process/process_direction3.jpg'
   ```
4. Replace the `brandDirection` array:
   ```js
   const brandDirection = [direction1, direction2, direction3]
   ```
5. Save. Vite HMR updates instantly.

---

### Contact (`src/assets/images/contact/`)
| Filename | Where Used | Recommended Size | Notes |
|---|---|---|---|
| `contact_hero.jpg` | Hero section background | 1920×600 | Workspace or desk shot |

---

## Per-Project Detail Pages

Each project has 4 image slots. Place them in `src/assets/images/projects/{project-folder}/`.

### Alumni Social Network (`projects/alumni/`)
| Filename | Slot | Size | Notes |
|---|---|---|---|
| `alumni_image1.jpg` | Top hero block | 1100×825 | Logo / brand reveal |
| `alumni_image2.jpg` | Mid large block | 1100×825 | Social media / application |
| `alumni_image3.jpg` | Bottom-left | 540×405 | Merch / mockup |
| `alumni_image4.jpg` | Bottom-right | 540×405 | Mockup / pattern |

### Emita (`projects/emita/`)
| Filename | Slot | Size |
|---|---|---|
| `emita_image1.jpg` | Top hero | 1100×825 |
| `emita_image2.jpg` | Mid | 1100×825 |
| `emita_image3.jpg` | Bottom-left | 540×405 |
| `emita_image4.jpg` | Bottom-right | 540×405 |

### GeoPsy Research (`projects/geopsy/`)
| Filename | Slot | Size |
|---|---|---|
| `geopsy_image1.jpg` | Top hero | 1100×825 |
| `geopsy_image2.jpg` | Mid | 1100×825 |
| `geopsy_image3.jpg` | Bottom-left | 540×405 |
| `geopsy_image4.jpg` | Bottom-right | 540×405 |

### Gewal Limited (`projects/gewal/`)
| Filename | Slot | Size |
|---|---|---|
| `gewal_image1.jpg` | Top hero | 1100×825 |
| `gewal_image2.jpg` | Mid | 1100×825 |
| `gewal_image3.jpg` | Bottom-left | 540×405 |
| `gewal_image4.jpg` | Bottom-right | 540×405 |

### McDonald & Company (`projects/mcdonald/`)
| Filename | Slot | Size |
|---|---|---|
| `mcdonald_image1.jpg` | Top hero | 1100×825 |
| `mcdonald_image2.jpg` | Mid | 1100×825 |
| `mcdonald_image3.jpg` | Bottom-left | 540×405 |
| `mcdonald_image4.jpg` | Bottom-right | 540×405 |

### Midas Flowers & Gifts (`projects/midas/`)
| Filename | Slot | Size |
|---|---|---|
| `midas_image1.jpg` | Top hero | 1100×825 |
| `midas_image2.jpg` | Mid | 1100×825 |
| `midas_image3.jpg` | Bottom-left | 540×405 |
| `midas_image4.jpg` | Bottom-right | 540×405 |

### Kezjoy Ventures (`projects/kezjoy/`)
| Filename | Slot | Size |
|---|---|---|
| `kezjoy_image1.jpg` | Top hero | 1100×825 |
| `kezjoy_image2.jpg` | Mid | 1100×825 |
| `kezjoy_image3.jpg` | Bottom-left | 540×405 |
| `kezjoy_image4.jpg` | Bottom-right | 540×405 |

### LPC — Land & Property (`projects/lpc/`)
| Filename | Slot | Size |
|---|---|---|
| `lpc_image1.jpg` | Top hero | 1100×825 |
| `lpc_image2.jpg` | Mid | 1100×825 |
| `lpc_image3.jpg` | Bottom-left | 540×405 |
| `lpc_image4.jpg` | Bottom-right | 540×405 |

---

## How to Add Images to a Project

1. Drop images into the correct folder (e.g. `src/assets/images/projects/alumni/`)
2. Open `src/data/projects.js`
3. At the top, import your images:
   ```js
   import alumniImg1 from '../assets/images/projects/alumni/alumni_image1.jpg'
   import alumniImg2 from '../assets/images/projects/alumni/alumni_image2.jpg'
   import alumniImg3 from '../assets/images/projects/alumni/alumni_image3.jpg'
   import alumniImg4 from '../assets/images/projects/alumni/alumni_image4.jpg'
   ```
4. In the alumni project object, update:
   ```js
   coverImage: alumniImg1,
   images: [alumniImg1, alumniImg2, alumniImg3, alumniImg4],
   ```
5. Save. Vite hot-reloads instantly.

---

## Font Files (`src/assets/fonts/`)

Place Manrope font files here:

| Filename | Weight |
|---|---|
| `Manrope-Regular.woff2` + `Manrope-Regular.woff` | 400 |
| `Manrope-Medium.woff2` + `Manrope-Medium.woff` | 500 |
| `Manrope-SemiBold.woff2` + `Manrope-SemiBold.woff` | 600 |
| `Manrope-Bold.woff2` + `Manrope-Bold.woff` | 700 |
| `Manrope-ExtraBold.woff2` + `Manrope-ExtraBold.woff` | 800 |

Download from: [Google Fonts — Manrope](https://fonts.google.com/specimen/Manrope)
(Use a tool like `fontsquirrel.com/tools/webfont-generator` to convert TTF → WOFF2/WOFF)

Until the font files are added, the site falls back to the system sans-serif stack defined in `global.css`.

---

## Image Format Recommendations
- **JPG** for photos and mockups
- **PNG** for logos (when transparency is needed)
- **WebP** for best performance (Vite handles these natively)
- Target file sizes: hero images < 400 KB, grid images < 150 KB, pair images < 100 KB
