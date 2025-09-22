import React, { useRef, useState } from "react";
import '../styles/ModalDialog.css';

export const ModalDialog: React.FC = () => {
    const [isSimpleModalOpen, setIsSimpleModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const simpleModalCloseButtonRef = useRef<HTMLButtonElement>(null);
    const loginModalUsernameRef = useRef<HTMLInputElement>(null);

    const openSimpleModal = () => setIsSimpleModalOpen(true);
    const closeSimpleModal = () => setIsSimpleModalOpen(false);
    
    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        closeLoginModal();
    };

    // Trap focus inside simple modal when open
    React.useEffect(() => {
        if (isSimpleModalOpen && simpleModalCloseButtonRef.current) {
            simpleModalCloseButtonRef.current.focus();
        }
    }, [isSimpleModalOpen]);

    // Trap focus inside login modal when open
    React.useEffect(() => {
        if (isLoginModalOpen && loginModalUsernameRef.current) {
            loginModalUsernameRef.current.focus();
        }
    }, [isLoginModalOpen]);

    // Handle ESC key for both modals
    React.useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (isSimpleModalOpen) {
                    closeSimpleModal();
                } else if (isLoginModalOpen) {
                    closeLoginModal();
                }
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [isSimpleModalOpen, isLoginModalOpen]);

    return (
        <main id="main-content" role="main" className="modal-page">
            <h1 className="modal-page-title">Accessible Modal Dialog Examples</h1>
            
            {/* Simple Modal Example */}
            <div className="modal-example">
                <h2>Simple Information Modal</h2>
                <button onClick={openSimpleModal} aria-haspopup="dialog" className="modal-open-button">
                    Open Simple Modal
                </button>
                {isSimpleModalOpen && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className="modal-backdrop"
                        tabIndex={-1}
                        onClick={closeSimpleModal}
                    >
                        <div
                            className="modal-content"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 id="simple-modal-title" className="modal-title">Information Modal</h3>
                            <p id="simple-modal-description" className="modal-description">
                                This is a simple information modal dialog. It demonstrates basic accessibility features.
                            </p>
                            <button
                                ref={simpleModalCloseButtonRef}
                                onClick={closeSimpleModal}
                                aria-label="Close information modal"
                                className="modal-close-button"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Login Modal Example */}
            <div className="modal-example">
                <h2>Interactive Login Modal</h2>
                <button onClick={openLoginModal} aria-haspopup="dialog" className="modal-open-button login-button">
                    Open Login Modal
                </button>
                {isLoginModalOpen && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="login-modal-title"
                        aria-describedby="login-modal-description"
                        className="modal-backdrop"
                        tabIndex={-1}
                        onClick={closeLoginModal}
                    >
                        <div
                            className="modal-content login-modal-content"
                            onClick={e => e.stopPropagation()}
                        >
                            <h3 id="login-modal-title" className="modal-title">User Login</h3>
                            <p id="login-modal-description" className="modal-description">
                                Please enter your credentials to log in.
                            </p>
                            <form onSubmit={handleLoginSubmit} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="username" className="form-label">
                                        Username <span aria-label="required" className="required">*</span>
                                    </label>
                                    <input
                                        ref={loginModalUsernameRef}
                                        type="text"
                                        id="username"
                                        name="username"
                                        required
                                        aria-required="true"
                                        aria-describedby="username-error"
                                        className="form-input"
                                        placeholder="Enter your username"
                                    />
                                    <div id="username-error" className="error-message" aria-live="polite"></div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">
                                        Password <span aria-label="required" className="required">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        required
                                        aria-required="true"
                                        aria-describedby="password-error"
                                        className="form-input"
                                        placeholder="Enter your password"
                                    />
                                    <div id="password-error" className="error-message" aria-live="polite"></div>
                                </div>
                                <div className="form-actions">
                                    <button
                                        type="submit"
                                        className="modal-submit-button"
                                        aria-describedby="login-modal-description"
                                    >
                                        Log In
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeLoginModal}
                                        aria-label="Cancel login and close modal"
                                        className="modal-close-button"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};