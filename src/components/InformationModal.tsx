import React, { useEffect, useRef, useState } from 'react';
import '../styles/InformationModal.css';

// React way of creating a modal dialog with focus management and accessibility features
// Selector for all focusable elements
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const InformationModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalTitleRef = useRef<HTMLHeadingElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    // Restore focus to the trigger button after a brief delay
    setTimeout(() => {
      if (triggerButtonRef.current) {
        triggerButtonRef.current.focus();
      }
    }, 0);
  };

  const handleSubmit = () => {
    alert('Form submitted successfully!');
    closeModal();
  };

  // Set initial focus when modal opens - focus the title for screen readers
  useEffect(() => {
    if (isOpen && modalTitleRef.current) {
      modalTitleRef.current.focus();
    }
  }, [isOpen]);

  // Focus trapping logic
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modalElement = modalRef.current;
    const focusableElements = Array.from(modalElement.querySelectorAll(FOCUSABLE_SELECTOR));
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          (lastElement as HTMLElement).focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          (firstElement as HTMLElement).focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerButtonRef}
        onClick={openModal}
        aria-haspopup="dialog"
        className="modal-open-button"
      >
        Open Information Modal
      </button>
      {isOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="information-modal-title"
          aria-describedby="information-modal-description"
          className="modal-backdrop"
          onClick={e => {
            if (e.target === modalRef.current) {
              closeModal();
            }
          }}
          tabIndex={-1}
          onKeyDown={e => {
            if ((e.key === 'Enter' || e.key === ' ') && e.target === modalRef.current) {
              closeModal();
            }
          }}
        >
          <div className="modal-content">
            {/* Close Icon */}
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="modal-close-icon"
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>

            <h2
              ref={modalTitleRef}
              id="information-modal-title"
              className="modal-title"
              tabIndex={-1}
            >
              Confirmation Required
            </h2>
            <p id="information-modal-description" className="modal-description">
              Please confirm that you want to proceed with this action. This will save your changes
              and continue.
            </p>

            <div className="simple-modal-actions">
              <button
                ref={closeButtonRef}
                onClick={handleSubmit}
                className="modal-submit-button"
                type="button"
                aria-describedby="information-modal-description"
              >
                Submit
              </button>
              <button
                onClick={closeModal}
                aria-label="Cancel and close modal"
                className="modal-cancel-button"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
