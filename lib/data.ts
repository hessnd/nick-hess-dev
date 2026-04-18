type Job = {
  company: string;
  roles: { title: string; start: string; end: string; current: boolean }[];
  bullets: string[][];
  companyBullets?: string[];
};

export const resume: {
  name: string;
  location: string;
  email: string;
  links: { label: string; href: string }[];
  summary: string;
  experience: Job[];
  notable: { title: string; description: string; link: string; linkText: string };
  skills: Record<string, string[]>;
  education: { school: string; degree: string };
} = {
  name: 'Nick Hess',
  location: 'Denver, CO',
  email: 'nick@nickhess.dev',
  links: [
    { label: 'GitHub', href: 'https://github.com/hessnd' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/hessnick' },
  ],
  summary:
    'Staff Engineering Leader with 11 years of experience architecting and delivering large-scale web platforms. Lead an 8-person team at Peloton whose work spans three surfaces: the web platform serving 70+ engineers org-wide, every top-of-funnel e-commerce domain on onepeloton.com \u2014 used by millions of monthly visitors \u2014 and contributions to Peloton\u2019s MCP server powering the Peloton ChatGPT app. Track record of expanding scope across organizational boundaries, setting technical direction, personally executing the highest-complexity initiatives, and measurably improving developer velocity and system reliability. Speaker at Next.js Conf 2024.',
  experience: [
    {
      company: 'Peloton Interactive',
      roles: [
        {
          title: 'Staff Tech Lead Manager, Discovery',
          start: 'Jul 2024',
          end: 'Present',
          current: true,
        },
        {
          title: 'Senior Software Engineer',
          start: 'Sep 2023',
          end: 'Jul 2024',
          current: false,
        },
        {
          title: 'Software Engineer',
          start: 'May 2020',
          end: 'Sep 2023',
          current: false,
        },
      ],
      bullets: [
        [
          'Lead a team of 8 engineers (grown from 4) whose work spans three surfaces at Peloton: the web platform serving 70+ engineers org-wide, every top-of-funnel e-commerce domain \u2014 used by millions of monthly visitors \u2014 and contributions to Peloton\u2019s MCP server powering the Peloton ChatGPT app.',
          'Cut deployment lead time by 50% by migrating 8 Next.js apps from Netlify to Vercel and building a custom CI/CD pipeline on GitHub Actions, the Vercel SDK, and Nx \u2014 now running across 55,000+ PRs in the monorepo.',
          'Broke up a monolithic React app into independently deployable Next.js microfrontends on Vercel\u2019s split architecture, giving product teams autonomous release trains and cutting average build time by 40%.',
          'Co-led the migration from a GraphQL monolith to a federated graph, letting teams evolve their schemas independently and driving schema-related production incidents to near zero.',
          'Unblocked the org-wide pnpm migration by leading monorepo health work \u2014 circular-dependency guardrails, automated barrel-import rewrites, and the React 18.3 upgrade \u2014 cutting cross-package build coupling across the codebase.',
        ],
        [
          'Presented at Next.js Conf 2024 on incrementally migrating Peloton\u2019s consumer web from a client-rendered React SPA to Next.js with SSR, improving Core Web Vitals across the funnel and measurably lifting organic search traffic.',
          'Cut peak-season customer support ticket volume by 40% by shipping self-serve order-modification flows that let members change their own orders without contacting support.',
          'Rebuilt the release pipeline around DORA metrics: 50%+ faster deployment lead time and a 10% lift in pipeline reliability.',
        ],
        [
          'Shipped core storefront, PDP, and checkout features across Peloton\u2019s consumer web (React, TypeScript, GraphQL).',
          'Contributed to the shared design system and component library adopted by every e-commerce team at Peloton.',
          'Authored the ESLint configs, testing patterns, and PR review workflows that became the org-wide standard for frontend code quality.',
        ],
      ],
    },
    {
      company: 'LoftSmart',
      roles: [
        {
          title: 'Full Stack Engineer',
          start: 'Apr 2019',
          end: 'Mar 2020',
          current: false,
        },
      ],
      bullets: [
        [
          'Refactored a legacy multi-page application to a React SPA, improving time-to-interactive by 30%.',
          'Led TypeScript migration for the React frontend, reducing production bug rate by 80%.',
          'Developed an interactive rental preference quiz driving 10% conversion rate improvement across 5 university campuses.',
        ],
      ],
    },
    {
      company: 'Big Spaceship',
      roles: [
        {
          title: 'Senior Technologist',
          start: 'Feb 2019',
          end: 'Apr 2019',
          current: false,
        },
        {
          title: 'Technologist',
          start: 'Jan 2017',
          end: 'Feb 2019',
          current: false,
        },
        {
          title: 'Junior Technologist',
          start: 'Jul 2015',
          end: 'Jan 2017',
          current: false,
        },
      ],
      bullets: [[], [], []],
      companyBullets: [
        'Delivered bespoke web experiences for Starbucks, Compass, and other premium clients, handling high-traffic launches and complex interactive requirements.',
        'Established engineering standards including automated testing, CI pipelines, and code quality tooling, improving project delivery efficiency by 10%.',
      ],
    },
  ],
  notable: {
    title: 'Next.js Conf 2024',
    description:
      'Presented "Incrementally Migrating to Next.js from a Client-Side-Only App" to a global audience, detailing Peloton\u2019s multi-year migration strategy, performance gains, and architectural decisions.',
    link: 'https://youtu.be/Z77fshyTF3w',
    linkText: 'Watch the talk',
  },
  skills: {
    Languages: ['TypeScript', 'JavaScript', 'Python', 'Kotlin'],
    Frameworks: ['React', 'Next.js', 'GraphQL (Apollo, Federation)', 'Node.js'],
    Infrastructure: [
      'Vercel',
      'AWS',
      'Google Cloud',
      'Cloudflare',
      'Docker',
      'Kubernetes',
    ],
    'CI/CD & Tooling': [
      'GitHub Actions',
      'NX',
      'Turborepo',
      'Datadog',
      'Vercel SDK',
    ],
    Databases: ['PostgreSQL', 'MySQL', 'NoSQL (DynamoDB, Firestore)'],
    Architecture: [
      'Microfrontends',
      'Monorepo management',
      'Edge computing',
      'Federated GraphQL',
      'REST APIs',
      'MCP servers',
      'LLM / AI integrations',
    ],
  },
  education: {
    school: 'Michigan State University',
    degree: 'B.S. Media & Information, Interactive Media Design',
  },
};
