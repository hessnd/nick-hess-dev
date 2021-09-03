import React from 'react';

const Contact: React.FC = () => (
  <section className="contact">
    <h1 className="header border-bottom">Nick Hess</h1>
    <div className="socials header">
      <a className="social-link" href="mailto:nick@nickhess.dev">
        email
      </a>
      <span className="bull">&bull;</span>
      <a
        className="social-link"
        href="https://twitter.com/nickdhess"
        target="_blank"
        rel="noopener noreferrer"
      >
        twitter
      </a>
      <span className="bull">&bull;</span>
      <a
        className="social-link"
        href="https://github.com/hessnd"
        target="_blank"
        rel="noopener noreferrer"
      >
        github
      </a>
      <span className="bull">&bull;</span>
      <a
        className="social-link"
        href="https://www.linkedin.com/in/hessnick"
        target="_blank"
        rel="noopener noreferrer"
      >
        linkedin
      </a>
    </div>
    <span className="location header">Living in Denver, CO</span>
    <style jsx>
      {`
        $slate: #393f42;

        .contact {
          margin-top: 20px;

          > h1 {
            border-bottom: solid $slate 4px;
            transition: border-bottom 0.2s ease;
          }

          .location {
            display: block;
          }

          a,
          .location {
            color: inherit;
            text-decoration: none;
            font-size: 4vw;
            font-weight: 100;
            font-variation-settings: 'opsz' 30;
            transition: font-weight 0.2s ease-in;
          }

          & > .socials {
            display: flex;
            align-items: center;
          }

          .bull {
            padding: 0 5px;
          }
        }
      `}
    </style>
  </section>
);

export default Contact;
