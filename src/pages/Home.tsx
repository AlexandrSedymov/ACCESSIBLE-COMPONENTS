import React from 'react';
import '../styles/Home.css';
import LinkSection from '../components/LinkSection';

export const Home: React.FC = () => {
  return (
    <main className="home-container" role="main" id="main-content">
      <title>Accessibility Components - Learn & Build Accessible UI</title>
      <meta
        name="description"
        content="A comprehensive collection of accessible-first UI components with practical examples for developers."
      />
      <h1 className="home-title" id="main-title">Welcome to accessible components playground</h1>
      <p className="home-description">
        A collection of practical, accessible-first UI components. This project serves as a living
        guide to implementing web accessibility, providing documented examples for UX designers,
        developers and testers to learn from and use.
      </p>

      <LinkSection
        links={[
          {
            label: 'Reference book for creating accessible user interface elements',
            url: 'https://handreichungen.bfit-bund.de/accessible-uie/',
          },
          {
            label: 'DesOps system inspiration (U.S. Web Design System (USWDS))',
            url: 'https://designsystem.digital.gov/components/overview/',
          },
          { label: 'AREA patterns', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/' },
          {
            label: 'Web Content Accessibility Guidelines (WCAG) 2.2',
            url: 'https://www.w3.org/TR/WCAG22/',
          },
        ]}
      />
    </main>
  );
};
