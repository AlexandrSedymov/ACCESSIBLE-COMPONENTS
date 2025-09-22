import React, { useRef, useState } from "react";

export const ModalDialog: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    // Trap focus inside modal when open
    React.useEffect(() => {
        if (isOpen && closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div>
            <button onClick={openModal} aria-haspopup="dialog">
                Open Modal
            </button>
            {isOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    className="modal-backdrop"
                    tabIndex={-1}
                    style={{
                        position: "fixed",
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    }}
                    onClick={closeModal}
                >
                    <div
                        style={{
                            background: "#fff",
                            padding: "2rem",
                            borderRadius: "8px",
                            minWidth: "300px",
                            position: "relative",
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 id="modal-title">Accessible Modal Dialog</h2>
                        <p>This is a basic accessible modal dialog example.</p>
                        <button
                            ref={closeButtonRef}
                            onClick={closeModal}
                            aria-label="Close modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};