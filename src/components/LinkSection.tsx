import React from 'react';
import '../styles/LinkSection.css';

type LinkSectionLink = {
  label: string;
  url: string;
};

type LinkSectionProps = {
  links: LinkSectionLink[];
  title?: string;
  labelId?: string;
};

const LinkSection: React.FC<LinkSectionProps> = ({ links, title = "Useful Links:", labelId }) => (
  <aside className="link-section" aria-labelledby={labelId}>
    <div>
      <h2 id={labelId} className="link-section-title">
        {title}
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
