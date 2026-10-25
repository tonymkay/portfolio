/**
 * bomaSiteMap.js — BOMA's information architecture (from the published
 * sitemap, https://www.boma.ngo/site-map/). Rendered by SiteMap.jsx.
 *
 * tone → row colour:
 *   red    = section with its own card    orange = program
 *   sand   = page                         gold   = collection / list
 *   sage   = country                      solid  = conversion action (Donate)
 * A home row with `card: true` has a section card (and a connector).
 */

const page = (label) => ({ label, tone: 'sand' })
const program = (label) => ({ label, tone: 'orange' })
const list = (label) => ({ label, tone: 'gold' })
const country = (label) => ({ label, tone: 'sage' })

export const bomaSiteMap = {
  title: 'Information Architecture',
  home: {
    title: 'Home',
    rows: [
      { id: 'about', label: 'About Us', tone: 'red', card: true },
      { id: 'impact', label: 'Our Impact', tone: 'red', card: true },
      { id: 'solutions', label: 'Our Solutions', tone: 'red', card: true },
      { id: 'countries', label: 'Countries', tone: 'red', card: true },
      { id: 'resources', label: 'Resources', tone: 'red', card: true },
      { id: 'careers', label: 'Careers', tone: 'sand' },
      { id: 'contact', label: 'Contact Us', tone: 'sand' },
      { id: 'partner', label: 'Partner with Us', tone: 'sand' },
      { id: 'funders', label: 'Partners and Funders', tone: 'sand' },
      { id: 'search', label: 'Search', tone: 'sand' },
      { id: 'privacy', label: 'Privacy Policy', tone: 'sand' },
      { id: 'donate', label: 'Donate', tone: 'solid' },
    ],
  },
  cards: [
    {
      id: 'about',
      title: 'About Us',
      rows: [
        page('Who We Are'),
        page('Our History'),
        page('Our Leadership Team'),
        page('Sustainable Development Goals'),
      ],
    },
    {
      id: 'impact',
      title: 'Our Impact',
      rows: [
        page('Our Impact'),
        page('Our Approach'),
        page('Theory of Change'),
        page('Technology and Innovation'),
        page('Participants Stories'),
      ],
    },
    {
      id: 'solutions',
      title: 'Our Solutions',
      rows: [
        page('All Solutions'),
        program('Women’s Empowerment'),
        program('Climate'),
        program('Nutrition'),
        program('Refugees'),
        program('Youth'),
        program('Government'),
        page('Advisory Services'),
      ],
    },
    {
      id: 'countries',
      title: 'Countries',
      rows: [
        page('Countries Home'),
        country('Burkina Faso'),
        country('Cameroon'),
        country('Chad'),
        country('Ethiopia'),
        country('Kenya'),
        country('South Sudan'),
        country('Uganda'),
      ],
    },
    {
      id: 'resources',
      title: 'Resources',
      rows: [
        page('Frequently Asked Questions'),
        list('News and Updates'),
        list('Resource and Library'),
        list('Downloads'),
        list('Annual Report'),
        list('Impact Reports'),
      ],
    },
  ],
}

export default bomaSiteMap
