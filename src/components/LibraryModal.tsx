import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import '../styles/utilities.css';
import '../styles/LibraryModal.css';

export const LibraryModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmationSubmit = () => {
    setIsOpen(false);
  };

  return (
    <div className="library-modal-demo">
      <button className="btn-base btn-primary library-modal-trigger" onClick={() => setIsOpen(true)}>
        Open Library Modal
      </button>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="library-modal-overlay" />
          <Dialog.Content className="library-modal-content">
            <div className="library-modal-header">
              <Dialog.Title className="library-modal-title">
                Confirmation Required
              </Dialog.Title>
              <Dialog.Description className="library-modal-description">
                Please confirm that you want to proceed with this action. This will save your changes and continue.
              </Dialog.Description>
            </div>

            <div className="library-modal-actions">
              <button
                onClick={handleConfirmationSubmit}
                className="library-modal-button library-modal-button--primary"
                type="button"
              >
                Confirm
              </button>
              <Dialog.Close asChild>
                <button type="button" className="library-modal-button library-modal-button--secondary">
                  Cancel
                </button>
              </Dialog.Close>
            </div>

            <Dialog.Close asChild>
              <button className="library-modal-close" aria-label="Close dialog">
                x
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};