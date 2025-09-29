import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Modal Dialog', href: '/modal-dialog' },
  { label: 'Links VS Buttons', href: '/links-vs-buttons' },
  // { label: 'Radio Buttons', href: '/radio-buttons' },
  { label: 'Input Fields', href: '/input-fields' },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <ul className="navbar-list">
        {navItems.map(item => {
          const isCurrentPage = location.pathname === item.href;
          
          return (
            <li key={item.href}>
              <Link 
                to={item.href} 
                className={`navbar-link ${isCurrentPage ? 'navbar-link--current' : ''}`}
                aria-current={isCurrentPage ? 'page' : undefined}
                onClick={() => {
                  // Announce navigation to screen readers
                  const announcement = `Navigating to ${item.label} page`;
                  
                  // Create a temporary element to announce the navigation
                  const announcer = document.createElement('div');
                  announcer.setAttribute('aria-live', 'polite');
                  announcer.setAttribute('aria-atomic', 'true');
                  announcer.className = 'sr-only';
                  document.body.appendChild(announcer);
                  
                  // Announce after a brief delay to ensure it's heard
                  setTimeout(() => {
                    announcer.textContent = announcement;
                    
                    // Clean up after announcement
                    setTimeout(() => {
                      document.body.removeChild(announcer);
                    }, 1000);
                  }, 100);
                }}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
