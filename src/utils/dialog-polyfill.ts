/**
 * Dialog polyfill for testing environments (JSDOM)
 * 
 * JSDOM doesn't implement the native HTMLDialogElement methods like showModal() and close().
 * This polyfill provides the essential functionality needed for testing.
 */

// Extend HTMLDialogElement interface for TypeScript
declare global {
  interface HTMLDialogElement {
    showModal(): void;
    close(): void;
    open: boolean;
  }
}

export function setupDialogPolyfill(): void {
  // Only polyfill if we're in a test environment without native support
  if (typeof window !== 'undefined' && window.HTMLDialogElement) {
    const dialogProto = window.HTMLDialogElement.prototype;
    
    // Check if showModal already exists (avoid double polyfilling)
    if (!dialogProto.showModal) {
      // Polyfill showModal method
      dialogProto.showModal = function(this: HTMLDialogElement) {
        // Set the open attribute
        this.setAttribute('open', '');
        this.open = true;
        
        // Add role="dialog" for accessibility testing
        if (!this.getAttribute('role')) {
          this.setAttribute('role', 'dialog');
        }
        
        // Add aria-modal="true" for accessibility
        this.setAttribute('aria-modal', 'true');
        
        // Simulate focus management
        this.focus();
        
        // Add Escape key listener for testing
        const escapeHandler = (event: Event) => {
          const keyboardEvent = event as KeyboardEvent;
          if (keyboardEvent.key === 'Escape') {
            this.close();
          }
        };
        
        // Store the handler reference for cleanup
        (this as HTMLDialogElement & { __escapeHandler?: EventListener }).__escapeHandler = escapeHandler;
        document.addEventListener('keydown', escapeHandler);
        
        // Dispatch custom event for testing
        this.dispatchEvent(new Event('dialog:opened'));
      };
    }
    
    if (!dialogProto.close) {
      // Polyfill close method
      dialogProto.close = function(this: HTMLDialogElement) {
        // Remove the open attribute
        this.removeAttribute('open');
        this.open = false;
        
        // Remove accessibility attributes
        this.removeAttribute('aria-modal');
        
        // Clean up Escape key listener
        const escapeHandler = (this as HTMLDialogElement & { __escapeHandler?: EventListener }).__escapeHandler;
        if (escapeHandler) {
          document.removeEventListener('keydown', escapeHandler);
          delete (this as HTMLDialogElement & { __escapeHandler?: EventListener }).__escapeHandler;
        }
        
        // Dispatch custom event for testing
        this.dispatchEvent(new Event('dialog:closed'));
      };
    }
    
    // Ensure open property exists
    if (!('open' in dialogProto)) {
      Object.defineProperty(dialogProto, 'open', {
        get(this: HTMLDialogElement) {
          return this.hasAttribute('open');
        },
        set(this: HTMLDialogElement, value: boolean) {
          if (value) {
            this.setAttribute('open', '');
          } else {
            this.removeAttribute('open');
          }
        },
        configurable: true,
        enumerable: true
      });
    }
  }
}

// Auto-setup when this module is imported
setupDialogPolyfill();