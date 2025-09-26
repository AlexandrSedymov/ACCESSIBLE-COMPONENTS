import React from 'react';
import '../styles/LinkSection.css';

type LinkSectionLink = {
  label: string;
  url: string;
};

type LinkSectionProps = {
  links: LinkSectionLink[];
};

const LinkSection: React.FC<LinkSectionProps> = ({ links }) => (
  <aside className="link-section" aria-labelledby="link-section-title">
    <div>
      <h2 id="link-section-title" className="link-section-title">
        Useful Links:
      </h2>
      <ul className="link-section-links">
        {links.map((link, idx) => (
          <li key={idx}>
            <a href={link.url} className="link-section-link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

export default LinkSection;
