import React from 'react';

const links = [
  {
    text: 'twitter',
    href: 'https://twitter.com/nickdhess',
  },
  {
    text: 'github',
    href: 'https://github.com/hessnd',
  },
  {
    text: 'linkedin',
    href: 'https://www.linkedin.com/in/hessnick',
  },
];

export default function Contact() {
  return (
    <section className="mt-4">
      <h1>Nick Hess</h1>
      <div className="flex items-center">
        <a href="mailto:nick@nickhess.dev">email</a>
        {links.map(({ text, href }) => (
          <React.Fragment key={href}>
            <span className="px-1">&bull;</span>
            <a href={href} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
          </React.Fragment>
        ))}
      </div>
      <span className="block">Living in Denver, CO</span>
    </section>
  );
}
