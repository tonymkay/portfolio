
export const uxProcess = {
  title: 'UX/Product Design Process',
  steps: [
    {
      title: 'Research & Discovery',
      objective: 'Understand the problem, the users and existing solutions before designing anything.',
      tools: [
        { name: 'Perplexity', role: 'Market research', how: 'Researches existing platforms, their features and workflows, and drafts research questions and interview guides.' },
        { name: 'Google Forms', role: 'User surveys', how: 'Surveys users about their current experience, pain points and how they prefer to access things.' },
        { name: 'Notion', role: 'Documentation', how: 'Keeps competitor research, survey responses, personas and requirements in one knowledge base.' },
      ],
      output: 'Research doc: user needs, competitor insights, requirements',
    },
    {
      title: 'Information Architecture',
      objective: 'Organise the product structure and decide how people move through it.',
      tools: [
        { name: 'Miro', role: 'Structure and flows', how: 'Maps the information architecture, user journeys, user flows and roles & permissions, and brainstorms solutions.' },
      ],
      output: 'Information architecture, user journeys, user flows',
    },
    {
      title: 'Wireframing & UI Design',
      objective: 'Turn the research and structure into real interface designs.',
      tools: [
        { name: 'Figma', role: 'Wireframes and prototypes', how: 'Wireframes, high-fidelity screens, components, tokens, responsive layouts, prototypes and the shared design system.' },
        { name: 'Figma plugins', role: 'Icons and assets', how: 'Iconify and Phosphor Icons for consistent interface icons, plus plugins for illustrations and images.' },
        { name: 'Illustrator', role: 'Custom vectors', how: 'Custom illustrations and vector artwork when existing resources are not enough.' },
      ],
      output: 'Interface designs, components, design system, prototypes',
    },
    {
      title: 'User Testing',
      objective: 'Find out whether people can understand and use the designs.',
      tools: [
        { name: 'Maze', role: 'Prototype testing', how: 'Tests the Figma prototype with real tasks and measures completion rate, time, misclicks and navigation paths. Problems send us back to Figma.' },
      ],
      output: 'Usability report',
    },
    {
      title: 'Developer Handoff',
      objective: 'Prepare the approved designs for developers to build.',
      tools: [
        { name: 'Figma Dev Mode', role: 'Specs and assets', how: 'Developers inspect spacing, colours, typography and component properties, and export assets.' },
        { name: 'Jira', role: 'Task management', how: 'Turns designs into development tasks, tracks progress and logs inconsistencies and bugs.' },
      ],
      output: 'Developer-ready specs, implementation backlog',
    },
    {
      title: 'Compatibility Testing',
      objective: 'Check that the built product works across devices, browsers and screen sizes.',
      tools: [
        { name: 'BrowserStack', role: 'Browser and device testing', how: 'Tests web apps across browsers and screen sizes, and Android and iOS builds on different devices.' },
      ],
      output: 'Compatibility issues list',
    },
    {
      title: 'Analytics',
      objective: 'Understand how people actually use the live product.',
      tools: [
        { name: 'Mixpanel', role: 'Product analytics', how: 'Tracks sign-ups, lesson completion, retention and drop-off. Findings feed the next round of research.' },
      ],
      output: 'Usage reports, funnels, retention data',
    },
  ],
}
