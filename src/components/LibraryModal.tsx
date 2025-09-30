import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import '../styles/LibraryModal.css';

export const LibraryModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmationSubmit = () => {
    setIsOpen(false);
    alert('Action confirmed successfully!');
  };

  return (
    <div className="library-modal-demo">
      <button className="library-modal-trigger" onClick={() => setIsOpen(true)}>
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
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m11.7816 4.03157c.0824-.08241.0824-.21569 0-.2981-.0824-.08241-.2157-.08241-.2981 0L7.50002 7.71895 3.51909 3.73802c-.08241-.08241-.21569-.08241-.2981 0-.08241.08241-.08241.21569 0 .2981L7.20196 7.99999l-3.98093 3.98093c-.08241.0824-.08241.2157 0 .2981.08241.0824.21569.0824.2981 0L7.50002 8.29105l3.98093 3.98093c.0824.0824.2157.0824.2981 0 .0824-.0824.0824-.2157 0-.2981L7.79808 7.99999 11.7816 4.03157Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};