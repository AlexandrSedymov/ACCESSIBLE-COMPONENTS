import React, { useRef } from 'react';
import '../styles/ModalDialog.css';

export const NativeAlertDialog: React.FC = () => {
  const nativeDialogRef = useRef<HTMLDialogElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  const openDialog = () => {
    if (nativeDialogRef.current) {
      nativeDialogRef.current.showModal();
      // Focus the confirm button after opening
      setTimeout(() => {
        if (confirmButtonRef.current) {
          confirmButtonRef.current.focus();
        }
      }, 0);
    }
  };

  const closeDialog = () => {
    if (nativeDialogRef.current) {
      nativeDialogRef.current.close();
      // Native dialog automatically restores focus - no manual intervention needed
    }
  };

  const handleConfirm = () => {
    alert('Action confirmed!');
    closeDialog();
  };

  return (
    <>
      <button
        onClick={openDialog}
        aria-haspopup="dialog"
        className="modal-open-button alert-button"
      >
        Open Native Alert Dialog
      </button>

      <dialog
        ref={nativeDialogRef}
        className="native-alert-dialog"
        aria-labelledby="native-alert-title"
        aria-describedby="native-alert-description"
      >
        <div className="modal-content alert-dialog-content">
          <div className="alert-icon" aria-hidden="true">
            ⚠️
          </div>
          <h3 id="native-alert-title" className="modal-title alert-title">
            Confirm Action (Native Dialog)
          </h3>
          <p id="native-alert-description" className="modal-description alert-description">
            Are you sure you want to delete this item? This action cannot be undone. This dialog
            uses the native HTML &lt;dialog&gt; element with .showModal().
          </p>
          <div className="alert-actions">
            <button
              ref={confirmButtonRef}
              onClick={handleConfirm}
              className="alert-confirm-button"
              aria-describedby="native-alert-description"
            >
              Delete Item
            </button>
            <button
              onClick={closeDialog}
              className="alert-cancel-button"
              aria-label="Cancel deletion"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
