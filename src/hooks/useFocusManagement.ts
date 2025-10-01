import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to manage focus after route navigation for accessibility.
 * 
 * This hook automatically moves focus to the main content area when:
 * 1. The route changes (user navigates via navigation links)
 * 2. The main content element exists on the page
 * 
 * For optimal screen reader support (especially VoiceOver), it prioritizes
 * focusing the H1 element when available, as this provides the clearest
 * announcement of the page content. Falls back to the main element if no H1 is found.
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
        // For VoiceOver compatibility, try to focus the H1 first
        const h1Element = mainElement.querySelector('h1') as HTMLElement;
        
        if (h1Element) {
          // Make sure the H1 can receive focus
          if (!h1Element.hasAttribute('tabindex')) {
            h1Element.setAttribute('tabindex', '-1');
          }
          
          // Focus the H1 - VoiceOver will read the heading content
          h1Element.focus();
        } else {
          // Fallback to main element if no H1 found
          // Make sure the element can receive focus
          if (!mainElement.hasAttribute('tabindex')) {
            mainElement.setAttribute('tabindex', '-1');
          }
          
          // Focus the main content area
          mainElement.focus();
        }
        
        // Optional: Add visual focus indicator for keyboard users
        // Apply to the focused element (H1 or main)
        const focusedElement = h1Element || mainElement;
        focusedElement.style.outline = '2px solid #007acc';
        focusedElement.style.outlineOffset = '2px';
        
        // Remove the focus outline after a short delay or on next interaction
        const removeFocusStyle = () => {
          focusedElement.style.outline = '';
          focusedElement.style.outlineOffset = '';
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