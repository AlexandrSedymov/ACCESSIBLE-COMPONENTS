import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to manage focus after route navigation for accessibility.
 * 
 * This hook automatically moves focus to the main content area when:
 * 1. The route changes (user navigates via navigation links)
 * 2. The main content element exists on the page
 * 
 * This is essential for screen reader users who need to know that
 * the page content has changed and where to start reading.
 */
export const useFocusManagement = (
  targetSelector: string = '#main-content',
  focusDelay: number = 100
) => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure DOM has updated after route change
    const timer = setTimeout(() => {
      const mainElement = document.querySelector(targetSelector) as HTMLElement;
      
      if (mainElement) {
        // Make sure the element can receive focus
        // If it doesn't have tabindex, add -1 (programmatic focus only)
        if (!mainElement.hasAttribute('tabindex')) {
          mainElement.setAttribute('tabindex', '-1');
        }
        
        // Focus the main content area
        mainElement.focus();
        
        // Optional: Add visual focus indicator for keyboard users
        // This will be removed when user interacts with other elements
        mainElement.style.outline = '2px solid #007acc';
        mainElement.style.outlineOffset = '2px';
        
        // Remove the focus outline after a short delay or on next interaction
        const removeFocusStyle = () => {
          mainElement.style.outline = '';
          mainElement.style.outlineOffset = '';
        };
        
        // Remove outline on next click or keyboard interaction
        const handleInteraction = () => {
          removeFocusStyle();
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('keydown', handleInteraction);
        };
        
        // Clean up after 3 seconds or on user interaction
        setTimeout(removeFocusStyle, 3000);
        document.addEventListener('click', handleInteraction);
        document.addEventListener('keydown', handleInteraction);
      }
    }, focusDelay);

    return () => clearTimeout(timer);
  }, [location.pathname, targetSelector, focusDelay]); // Re-run when route changes
};