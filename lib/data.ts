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
    'Staff Engineering Leader with 11 years of experience architecting and delivering large-scale web platforms. Lead an 8-person engineering team owning Peloton\u2019s consumer-facing e-commerce experience at onepeloton.com and the web platform infrastructure serving 70+ engineers. Track record of expanding scope from internal platform engineering into public-facing product systems, defining technical direction across organizational boundaries, personally executing the highest-complexity initiatives, and measurably improving developer velocity and system reliability. Speaker at Next.js Conf 2024.',
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
          'Expanded team from 4 to 8 engineers, taking dual ownership of Peloton\u2019s consumer e-commerce experience (millions of monthly users) and the web platform infrastructure serving 70+ engineers across the organization.',
          'Cut deployment lead time by 50% by migrating 8 Next.js applications from Netlify to Vercel with custom orchestration, then building a full CI/CD pipeline (GitHub Actions, Vercel SDK, NX) used across ~55,000+ PRs in the monorepo.',
          'Decomposed a monolithic React application into independently deployable Next.js microfrontends using Vercel\u2019s split architecture, unlocking autonomous team releases and faster build times.',
          'Co-led migration from a GraphQL monolith to a federated architecture, eliminating schema-related production incidents and enabling safe, independent schema evolution across teams.',
          'Drove monorepo health initiatives \u2014 circular dependency guardrails, barrel import rewriting, React 18.3 upgrade \u2014 reducing build coupling and unblocking the org-wide pnpm migration.',
        ],
        [
          'Reduced customer support ticket volume by 40% during peak seasons by building Self Service features for direct member order modifications.',
          'Led incremental migration from a client-side-only React app to Next.js with SSR, improving Core Web Vitals and SEO \u2014 presented this work at Next.js Conf 2024.',
          'Modernized the release process to align with DORA metrics, achieving 50%+ faster deployment lead time and 10% improvement in pipeline reliability.',
        ],
        [
          'Shipped core e-commerce features across Peloton\u2019s consumer web platform (React, TypeScript, GraphQL), contributing to the shared design system and component library used by all e-commerce teams.',
          'Introduced ESLint configurations, automated testing patterns, and PR review workflows that became the org-wide standard for frontend code quality.',
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
    ],
  },
  education: {
    school: 'Michigan State University',
    degree: 'B.S. Media & Information, Interactive Media Design',
  },
};
