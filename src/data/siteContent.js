/**
 * siteContent.js — Global site content constants.
 *
 * CMS NOTE: This file will be replaced by API calls when CMS is live.
 * All text, links, and social handles live here for easy global editing.
 */

// ── Page Images ─────────────────────────────────────────────────────────────
// All image files are imported here. Add a file to the correct folder
// (see imagesguide.md) and Vite HMR picks it up instantly.
// Components use conditional rendering, so a null image shows a styled placeholder.

import homeHero from '../assets/images/home/home_hero.webp'
import homePortrait from '../assets/images/home/home_portrait.jpg'
import heroPortrait from '../assets/images/home/hero_portrait.webp'
import heroBg from '../assets/images/home/hero_bg.webp'
import homeCta from '../assets/images/home/cta.webp'
import aboutPortrait from '../assets/images/about/about_portrait.jpg'
import aboutWorkspace from '../assets/images/about/about_workspace.webp'
import contactHero from '../assets/images/contact/contact_hero.webp'
import projectsHero from '../assets/images/projects/projects_hero.jpg'
// Navbar "Work" dropdown card image for the Logos & Identities entry
import navLogosCover from '../assets/images/logos/ORION.webp'
// Navbar "Work" dropdown card image for the UI/UX entry
import navUxCover from '../assets/images/ux/ux_pataskills-app-cover.webp'
// Navbar "Work" dropdown card image for the Posters entry
import navPostersCover from '../assets/images/posters/AdiliRealEstate.webp'
import brandBold from '../assets/images/process/bold.webp'
import brandRetro from '../assets/images/process/retro.webp'
import brandModern from '../assets/images/process/modern.webp'

// Brand Direction — 3 image-only panels (bold / retro / modern)
const brandDirection = [brandBold, brandRetro, brandModern]

// ── Experience ──────────────────────────────────────────────────────────────
// One source for "years of experience" everywhere on the site.
// Started in 2021 — the count updates itself every new year.
const experienceStartYear = 2021
const yearsOfExperience = new Date().getFullYear() - experienceStartYear

export const siteContent = {
  // ---------- Global ----------
  siteName: 'Murimi',
  siteTagline: 'Identity Designer & Strategist',
  siteUrl: 'https://murimi.me',
  copyrightYear: '2026',

  // ---------- Page Images ----------
  images: {
    homeHero,
    homePortrait,
    heroPortrait,
    heroBg,
    homeCta,
    aboutPortrait,
    aboutWorkspace,
    contactHero,
    projectsHero,
    // Array of 3 brand direction panel images (bold / retro / modern)
    brandDirection,
  },

  // ---------- Designer Info ----------
  designer: {
    fullName: 'Antony Murimi',
    firstName: 'Antony',
    lastName: 'Murimi',
    title: 'Identity / Product Designer',
    shortBio: "I'm a Digital Product and Identity Designer. I specialise in designing digital products, logos and visual identities with meaning.",
    longBio: "Since 2021 I have been crafting meaningful visual experiences, starting as a graphic designer and evolving into an identity designer in 2023. In 2024, I expanded into UX/UI design for digital products across diverse projects. My focus is on building distinctive brand identities and intuitive user interfaces, delivering thoughtful, cohesive outcomes that elevate brands and enhance user experiences.",
    yearsExperience: `${yearsOfExperience}Yrs`,
    experienceLabel: 'Experience in Design',
    email: 'tonymkay10@gmail.com',
    phone: '(+254) 000-000-000',
    location: 'Nairobi, Kenya',
    cvUrl: '#',
  },

  // ---------- Social Links ----------
  social: {
    linkedin: 'https://linkedin.com/in/antony-murimi/',
    instagram: 'https://instagram.com/tony_mkay',
  },

  // ---------- Navigation ----------
  nav: {
    about: {
      label: 'About',
      href: '/about',
      subItems: [
        { label: 'About Me', anchor: 'about-me' },
        { label: 'Experience', anchor: 'experience' },
      ],
    },
    process: {
      label: 'Process',
      href: '/process',
      subItems: [
        { label: 'Concept Design Process', anchor: 'concept-design' },
        { label: 'Establishing a Brand Direction', anchor: 'brand-direction' },
      ],
    },
    contact: { label: "Let's talk", href: '/contact' },
    work: {
      label: 'Work',
      items: [
        { label: 'Logos & Identities', short: 'Logos & Identities', cta: 'View Identities', href: '/projects', image: navLogosCover },
        { label: 'Posters', short: 'Posters', cta: 'View Posters', href: '/posters', image: navPostersCover },
        { label: 'UI/UX Projects', short: 'UI/UX', cta: 'View UI/UX', href: '/ui-ux', image: navUxCover },
      ],
    },
    links: [
      { label: 'About', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'UI/UX', href: '/ui-ux' },
      { label: 'Process', href: '/process' },
    ],
    cta: { label: 'Book a Call ↗', href: '/contact' },
  },

  // ---------- Home Page ----------
  home: {
    hero: {
      greeting: "Hello, I'm",
      name: 'Antony Murimi',
      subtitle: 'Identity/Product Designer',
      description: "I'm a Digital Product and Identity Designer. I specialise in designing digital products, logos and visual identities with meaning.\n\nI've designed logos for retailers, small businesses, agencies... you name it! And as a former designer for marketing agencies in Kenya, I have more than " + yearsOfExperience + " years of experience in the world of graphic design.\n\nCheck out some of my work here, and if you need help taking your business to the next level with a stand-out visual identity, you can book a 30-minute call with me here.",
      ctaLabel: "Let's talk ↗",
      ctaHref: '/contact',
      learnMoreLabel: 'BOOK A CALL',
      learnMoreHref: '/contact',
      // New split hero (name + tagline + portrait, side-column)
      verticalLabel: 'Innovating Advertising for the Future',
      firstName: 'Murimi',
      tagline: 'is a designer working with corporate and business owners to create great products and brands.',
      scrollLabel: 'Scroll down',
      // Centered typewriter hero
      eyebrow: "Hi, I'm Murimi",
      lead: 'I design',
      words: ['products', 'brands', 'identities', 'interfaces'],
      trail: ['that', 'people love'],
      contactLabel: 'Get in touch',
      contactHref: '/contact',
    },
    about: {
      eyebrow: 'About Me',
      heading: 'In My Own Words',
      body: "Since 2021 I have been crafting meaningful visual experiences, starting as a graphic designer and evolving into an identity designer in 2023. In 2024, I expanded into UX/UI design for digital products across diverse projects. My focus is on building distinctive brand identities and intuitive user interfaces, delivering thoughtful, cohesive outcomes that elevate brands and enhance user experiences.",
      statsLabel: `${yearsOfExperience}Yrs`,
      statsCaption: 'Experience in Design',
      // Home page dark "About Me" teaser band (below Projects)
      teaser: {
        lead: "… I'm a passionate designer who thrives on the dance between creativity and functionality.",
        rest: 'With a boundless curiosity to create meaningful experiences, I dive headfirst into the field of product design.',
        ctaLabel: 'About me',
        ctaHref: '/about',
      },
      journey: [
        { text: "My journey started with Identity design — shaping visual systems that bring brands to life. From logos to full brand suites, I learned how storytelling through visual design can communicate purpose and create connection." },
        { text: "As my skills evolved, so did my focus — toward crafting seamless digital experiences. UX/UI design became a natural extension of my creative-solving mindset. From wireframes to polished interfaces, each challenge deepened my passion for designing with empathy and intention." },
      ],
    },
    experience: {
      eyebrow: 'Experiences',
      heading: 'Explore My Journey As A Designer',
      description: 'Over the past ' + yearsOfExperience + '+ years, I\'ve had the opportunity to work on a wide range of design projects, collaborating with diverse teams and clients to bring creative visions to life.',
      ctaLabel: 'Book A Call ↗',
      ctaHref: '/contact',
      roles: [
        { year: '2025–', company: 'MediaPal Net', period: 'April 2025 – Present', start: [2025, 4], end: null, description: 'Designing Creatives for Programmatic Ads, Layout designs for Pitch Decks', tags: ['Ad Campaigns', 'UX/UI'] },
        {
          year: '2024–',
          company: 'Strategic Technologies',
          period: 'August 2024 – March 2025',
          start: [2024, 8],
          end: [2025, 3],
          description: 'UX/UI designer across four digital projects: Boma Project, ESSA Project, HERI Project, and Klima-Harvest.',
          tags: ['UX/UI', 'Product'],
        },
        { year: '2024–', company: 'Didupa Holdings Limited', period: 'February 2024 – July 2025', start: [2024, 2], end: [2025, 7], description: 'Visual designer for Social Media campaigns', tags: ['Branding', 'Comms', 'Posters'] },
        { year: '2023–', company: 'GeoPsy Research', period: 'August 2023 – January 2024', start: [2023, 8], end: [2024, 1], description: 'Researcher/Designer in GIS and Remote Sensing', tags: ['GIS/RS', 'Branding'] },
        { year: '2021–', company: 'Mkay Technologies', period: 'February 2021 – August 2023', start: [2021, 2], end: [2023, 8], description: 'Visual designer for Social Media campaigns', tags: ['Layout', 'Branding'] },
      ],
    },
    journey: {
      eyebrow: 'My Journey',
      heading: 'My Design Journey in Three Steps',
      steps: [
        { number: '1', title: 'Exploration & Discovery', description: 'Starting with a passion for design, I spent time learning and experimenting with various mediums, just to understand the fundamentals of UX/UI design.' },
        { number: '2', title: 'Growth & Experience', description: 'Building on early experiences, I took on diverse projects each time expanding my skills and shaping my approach to creating user-centred solutions.' },
        { number: '3', title: 'Innovation & Leadership', description: 'Now, with a wealth of experience, I lead complex design initiatives, constantly pushing the boundaries of creativity to deliver impactful and engaging digital experiences.' },
      ],
    },
    projects: {
      eyebrow: 'Selected Projects',
      heading: 'Explore My Portfolio',
      viewMoreLabel: 'View More ↗',
      viewMoreHref: '/posters',
    },
    testimonials: {
      eyebrow: 'Testimonials',
      heading: 'Listen From the Project Owners',
      viewMoreLabel: 'View More ↗',
      items: [
        { name: 'Joy Monica', role: 'Communications Officer', company: 'Boma', avatar: null, quote: "We needed to raise more money for our NGO, and Antony's process kept us clear at every step. The designs translated straight into decisions: one simple idea that gave supporters a clear reason to give, and it converted." },
        { name: 'Yvonne Okwara', role: 'Communications Officer', company: 'HERI Africa', avatar: null, quote: "HERI is built around education research, and the site had to show that. Antony took the time to understand our research focus and turned it into a site that makes our initiatives easy to find and easy to trust." },
        { name: 'Francis Oloo', role: 'Project Lead & Founder', company: 'GeoPsy Research', avatar: null, quote: "Antony researched environmental conservation projects with us, including the Kakamega West management project. The communication materials he delivered helped people understand how they can conserve the environment, and act on it." },
        { name: 'David Mabiria', role: 'Lead Developer', company: 'Strategic Technologies', avatar: null, quote: "On ESSA, we built a website to pull education researchers into one pool to create research materials together. Antony understood the problem before opening the design tool, and his designs were clean and easy to build from." },
        { name: 'Eveline Askuku', role: 'Lead of Communications', company: 'Alumni Social Network', avatar: null, quote: "Antony created the materials that tell who we are and why the network exists. They reached our alumni in a way that made them want to be part of it, and our story finally felt consistent." },
        { name: 'Frida Mwangi', role: 'Founder', company: 'Adili Real Estate', avatar: null, quote: "Most of what Antony designed for us were Meta ads on Facebook and Instagram. The creatives held attention, matched the promise on the ad to the landing page, and converted." },
      ],
    },
    cta: {
      // Shared by the CtaBanner on other pages
      heading: 'Ready to Start your Brand Design Process?',
      description: "Let's build your brand identities today!",
      ctaLabel: "Let's talk ↗",
      ctaHref: '/contact',
      // Home page dark CTA: keep the background phrase and button label distinct.
      backdropLabel: 'Get in touch',
      buttonLabel: "Let's Talk",
      segments: [
        { text: "If you're looking for a " },
        { text: 'digital designer', muted: true },
        { text: ' who can bring your vision to life, ' },
        { text: 'schedule a call', muted: true },
        { text: ' now.' },
      ],
    },
  },

  // ---------- About Page ----------
  about: {
    hero: {
      eyebrow: '● About Me',
      heading: 'In My Own Words',
      // Dark About hero — segments render white; `muted: true` renders grey.
      statement: [
        { text: "I'm Antony Murimi, an " },
        { text: 'Identity / Product Designer', muted: true },
        { text: ' based in Nairobi, Kenya.' },
      ],
      intro: [
        { text: `With ${yearsOfExperience}+ years of experience in crafting brilliant and impactful designs, I've been involved in various projects with a focus on user-centered design. ` },
        { text: "Let's collaborate to bring your ideas to life!", muted: true },
      ],
    },
    // Stat cards — each value counts up from 0 as it scrolls into view.
    // `suffix` (e.g. '+') renders right after the number.
    numbers: {
      years: { value: yearsOfExperience, suffix: '+', label: 'Experience' },
      clients: { value: 50, suffix: '+', label: 'Clients' },
      projects: { value: 6, suffix: '+', label: 'Projects' },
    },
    // Logo row between Experience and Projects. Swap `logo: null` for an
    // imported image (e.g. logo: boma) to replace the placeholder mark.
    clients: [
      { name: 'Boma', logo: null },
      { name: 'HERI Africa', logo: null },
      { name: 'GeoPsy Research', logo: null },
      { name: 'Strategic Technologies', logo: null },
      { name: 'Alumni Social Network', logo: null },
      { name: 'Adili Real Estate', logo: null },
      { name: 'MediaPal Net', logo: null },
      { name: 'Didupa Holdings', logo: null },
      { name: 'Mkay Technologies', logo: null },
      { name: 'ESSA', logo: null },
    ],
    projects: [
      { index: '01', name: 'Boma Project', description: [
        'Website revamp for Boma NGO.',
        'Developed an interactive prototype for the redesigned experience.',
        'Mapped user journeys and designed responsive interfaces for exploring Boma’s programs and impact.',
      ], tags: ['UX/UI', 'Product'] },
      { index: '02', name: 'ESSA Project', description: [
        'Website revamp for an education research platform.',
        'Restructured navigation and information architecture to make research easier to find.',
        'Designed responsive page layouts and reusable interface patterns for researchers.',
      ], tags: ['UX/UI', 'Product'] },
      { index: '03', name: 'HERI Project', description: [
        'Designed a simple landing page for HERI’s education research initiatives.',
        'Organized the content to make the organization’s research focus easy to understand.',
        'Created a clear, responsive layout to guide visitors to relevant information.',
      ], tags: ['UX/UI', 'Product'] },
      { index: '04', name: 'Klima-Harvest', description: [
        'Designed a trading platform for people working in conservation and carbon offsetting.',
        'Created for carbon harvesters, carbon investors, and institutions.',
      ], tags: ['UX/UI', 'Product'] },
      { index: '05', name: 'Kaya Connect Project', description: [
        'Worked with GeoPsy Research on visual communication for a mangrove and indigenous tree conservation project.',
        'Designed flyers, posters, and print materials to promote seedling sales.',
        'Communicated how buying seedlings supports conservation of indigenous trees.',
      ], tags: ['Visual Design', 'Print', 'Conservation'] },
      { index: '06', name: 'Kakamega Environment Conservation Project', description: [
        'Worked as a visual designer with GeoPsy Research on environmental conservation communication.',
        'Designed flyers, posters, and other print materials to share conservation information.',
        'Created communication materials to help audiences understand conservation activities and how to take part.',
      ], tags: ['Visual Design', 'Print', 'Comms'] },
    ],
  },

  // ---------- Projects Page ----------
  projects: {
    // Dark page header: big thin title, then a — 08 PROJECTS — rule row
    header: {
      title: 'Logos & Identities',
      label: 'Projects',
    },
    hero: {
      eyebrow: '● Portfolio',
      heading: 'Exploring My Design Portfolio\nCreative Solutions',
    },
    cta: {
      heading: 'Got a Vision? Let\'s Bring It to Life!',
      description: "I'm always excited to collaborate on new and innovative projects. Whether you're starting from scratch or refining an existing idea.",
      ctaLabel: 'Book A Call ↗',
      ctaHref: '/contact',
    },
  },

  // ---------- Posters Page ----------
  // Same dark header as Logos & Identities: big thin title + a — 30 POSTERS — rule row
  posters: {
    header: {
      title: 'Posters',
      label: 'Posters',
    },
  },

  // ---------- Process Page ----------
  process: {
    hero: {
      eyebrow: '● My Process',
      heading: 'My Creative Workflow',
    },
    steps: {
      eyebrow: '● My Process',
      heading: 'Design Process in Three Steps',
      items: [
        { number: '1', title: 'Discovery Call', description: 'A thorough brief of the project goals, customer base, timeline and price. During this call we discuss the direction to take for the brand design.' },
        { number: '2', title: 'Setting Visual Tone & Direction', description: 'Sourcing typography, colours and elements to form a visual style we both agree on. This step is not designing, it\'s researching the design right for the project.' },
        { number: '3', title: 'Designing Concepts', description: 'I develop the highest resolution of the idea selected. From this point it\'s not hard to see the final design for the brand, so we work.' },
      ],
    },
    moodboard: {
      eyebrow: '● Moodboard',
      heading: 'Setting the Visual Tone',
      viewMoreLabel: 'View More ↗',
      images: [],
    },
    direction: {
      eyebrow: '● Setting Direction',
      heading: 'Establishing a Brand Direction',
      description: 'From the moodboard, I narrow things down to a few clear directions. You pick the one that feels right before any real designing begins.',
      viewMoreLabel: 'View Traditions ↗',
    },
    workflow: {
      eyebrow: '● Designing',
      heading: 'Concept Design Process',
      cards: [
        { label: 'Nice to meet u', title: 'Discovery' },
        { label: 'Welcome', title: 'Onboarding' },
        { label: 'It all starts with an idea', title: 'Strategy & Concept' },
        { label: "Let's get creative", title: 'Design Phase' },
        { label: 'Goodbye', title: 'Offboarding' },
        { label: 'This is (not) the end', title: '*Support' },
      ],
    },
    cta: {
      heading: 'Ready to Start your Brand Design Process?',
      description: "Let's discuss your brand's direction today.",
      ctaLabel: 'Book A Call ↗',
      ctaHref: '/contact',
    },
  },

  // ---------- Contact / Book a Call Page ----------
  contact: {
    hero: {
      eyebrow: '● Book A Call',
      heading: 'Book a 30-Mins Brand Discovery Call',
      background: contactHero,
    },
    description: 'Choose a time and book your discovery call through Calendly.',
    calendlyUrl: 'https://calendly.com/tonymkay10/discovery-call',
    bookingLabel: 'Book A Call',
    processTeaser: {
      heading: 'A Quick look at the Design Process',
      description: "I'm always excited to bring bold ideas to life through a thoughtful, collaborative design process. Whether you're starting from scratch or refining an existing concept.",
      ctaLabel: 'Design Process ↗',
      ctaHref: '/process',
    },
  },
}

export default siteContent
