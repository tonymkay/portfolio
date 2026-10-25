/**
 * bomaPersonas.js — the five audiences the BOMA website was designed for.
 * Rendered by components/case-study/Personas.jsx.
 *
 * layout: 'feature' | 'dark' | 'list' | 'checks' | 'wide'  (each is a different card design)
 * quote:  the problem, in the persona's own voice
 */
export const bomaPersonas = {
  title: 'Who We Designed For',
  intro:
    'Five audiences rely on the BOMA website. Each arrives with a different question, so the experience had to answer all of them clearly.',
  personas: [
    {
      id: 'donors',
      number: '01',
      layout: 'feature',
      group: 'Donors and Philanthropists',
      who: 'Individuals who want to give, and foundations looking to fund poverty-reduction work.',
      quote: 'I want to give, but I need to see exactly where my money goes and what it changes.',
      needs: [
        'A clear, prominent way to donate',
        'Proof of impact in plain language',
        'Confidence that funds reach families',
      ],
    },
    {
      id: 'funders',
      number: '02',
      layout: 'dark',
      group: 'Institutional Funders',
      who: 'Development agencies, governments and organizations weighing BOMA’s impact before they fund.',
      quote: 'Before I commit funding, I need evidence I can trust, and I need it fast.',
      needs: ['Impact data and evaluations', 'A clear program model', 'Reports to download and share'],
    },
    {
      id: 'partners',
      number: '03',
      layout: 'list',
      group: 'Implementation Partners and NGOs',
      who: 'Organizations that want to collaborate with BOMA or adopt its programs and approach.',
      quote: 'I would like to partner, but I cannot tell how to start or what BOMA offers.',
      needs: [
        'How the REAP model works',
        'A clear route to get in touch',
        'Examples of partnerships in action',
      ],
    },
    {
      id: 'government',
      number: '04',
      layout: 'checks',
      group: 'Government and Policy Stakeholders',
      who: 'Officials and policymakers exploring BOMA’s model, its evidence and its potential to scale.',
      quote: 'I need to know whether this model can work at scale in my region.',
      needs: [
        'Evidence of results at scale',
        'Policy-ready summaries',
        'A route into government collaboration',
      ],
    },
    {
      id: 'researchers',
      number: '05',
      layout: 'wide',
      group: 'Researchers and Development Professionals',
      who: 'People looking for the Theory of Change, impact reports and evidence on poverty reduction in dryland communities.',
      quote: 'I know the research exists, but finding it across the site takes too long.',
      needs: [
        'Theory of Change in one place',
        'Impact reports and evidence',
        'Resources that are easy to find and cite',
      ],
    },
  ],
}
