import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useFocusManagement } from '../useFocusManagement';

// Mock React Router
const mockLocation = {
  pathname: '/test',
  search: '',
  hash: '',
  state: null,
  key: 'default'
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => mockLocation
  };
});

describe('useFocusManagement', () => {
  beforeEach(() => {
    // Clear the DOM
    document.body.innerHTML = '';
    
    // Create a main element for testing
    const mainElement = document.createElement('main');
    mainElement.id = 'main-content';
    mainElement.setAttribute('role', 'main');
    document.body.appendChild(mainElement);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should focus main element after route change', () => {
    vi.useFakeTimers();
    
    const mainElement = document.getElementById('main-content') as HTMLElement;
    const focusSpy = vi.spyOn(mainElement, 'focus');
    
    renderHook(() => useFocusManagement(), {
      wrapper: BrowserRouter
    });

    // Fast-forward the timeout
    vi.advanceTimersByTime(100);
    
    expect(focusSpy).toHaveBeenCalled();
    expect(mainElement.getAttribute('tabindex')).toBe('-1');
    
    vi.useRealTimers();
  });

  it('should add tabindex if not present', () => {
    vi.useFakeTimers();
    
    const mainElement = document.getElementById('main-content') as HTMLElement;
    
    // Ensure no tabindex initially
    mainElement.removeAttribute('tabindex');
    
    renderHook(() => useFocusManagement());
    
    vi.advanceTimersByTime(100);
    
    expect(mainElement.getAttribute('tabindex')).toBe('-1');
    
    vi.useRealTimers();
  });

  it('should handle missing main element gracefully', () => {
    vi.useFakeTimers();
    
    // Remove the main element
    const mainElement = document.getElementById('main-content');
    if (mainElement) {
      document.body.removeChild(mainElement);
    }
    
    // This should not throw an error
    expect(() => {
      renderHook(() => useFocusManagement());
      vi.advanceTimersByTime(100);
    }).not.toThrow();
    
    vi.useRealTimers();
  });

  it('should use custom selector when provided', () => {
    vi.useFakeTimers();
    
    // Create custom element
    const customElement = document.createElement('div');
    customElement.id = 'custom-main';
    document.body.appendChild(customElement);
    
    const focusSpy = vi.spyOn(customElement, 'focus');
    
    renderHook(() => useFocusManagement('#custom-main'));
    
    vi.advanceTimersByTime(100);
    
    expect(focusSpy).toHaveBeenCalled();
    
    vi.useRealTimers();
  });
});