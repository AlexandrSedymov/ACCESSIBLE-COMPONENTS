import React, { useState, useRef, useEffect } from 'react';
import '../styles/ModalDialog.css';

// Selector for all focusable elements
const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const InputFieldPage: React.FC = () => {
    const [value, setValue] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const loginModalUsernameRef = useRef<HTMLInputElement>(null);
    const loginModalRef = useRef<HTMLDivElement>(null);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        closeLoginModal();
    };

    // Set initial focus when login modal opens
    useEffect(() => {
        if (isLoginModalOpen && loginModalUsernameRef.current) {
            loginModalUsernameRef.current.focus();
        }
    }, [isLoginModalOpen]);

    // Focus trapping logic for login modal
    useEffect(() => {
        if (!isLoginModalOpen || !loginModalRef.current) return;

        const modalElement = loginModalRef.current;
        const focusableElements = Array.from(modalElement.querySelectorAll(FOCUSABLE_SELECTOR)) as HTMLElement[];
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;

            // If shift + tab is pressed
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else { // If tab is pressed
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Cleanup function
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isLoginModalOpen]);

    // Handle ESC key for login modal
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isLoginModalOpen) {
                closeLoginModal();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [isLoginModalOpen]);

    return (
        <main id="main-content" role="main" className="modal-page">
            <h1 className="modal-page-title">Accessible Input Field Examples</h1>
            
            {/* Basic Input Field Example */}
            <div className="modal-example">
                <h2>Basic Input Field</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="accessible-input" className="form-label">
                            Your Name <span aria-label="required" className="required">*</span>
                        </label>
                        <input
                            id="accessible-input"
                            type="text"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            aria-label="Your Name"
                            autoComplete="name"
                            required
                            aria-required="true"
                            className="form-input"
                            placeholder="Enter your full name"
                        />
                    </div>
                </form>
            </div>

            {/* Interactive Login Modal Example */}
            <div className="modal-example">
                <h2>Interactive Login Modal with Input Fields</h2>
                <p className="modal-description">
                    This example demonstrates accessible input fields within a modal dialog context.
                </p>
                <button onClick={openLoginModal} aria-haspopup="dialog" className="modal-open-button login-button">
                    Open Login Modal
                </button>
                {isLoginModalOpen && (
                    <div
                        ref={loginModalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="login-modal-title"
                        aria-describedby="login-modal-description"
                        className="modal-backdrop"
                        tabIndex={-1}
                        onClick={closeLoginModal}
                    >
                        <div className="modal-content login-modal-content" onClick={e => e.stopPropagation()}>
                             <h3 id="login-modal-title" className="modal-title">User Login</h3>
                             <p id="login-modal-description" className="modal-description">
                                Please enter your credentials to log in.
                             </p>
                            <form onSubmit={handleLoginSubmit} className="login-form">
                               <div className="form-group">
                                   <label htmlFor="modal-username" className="form-label">
                                       Username <span aria-label="required" className="required">*</span>
                                   </label>
                                   <input 
                                       ref={loginModalUsernameRef} 
                                       type="text" 
                                       id="modal-username" 
                                       name="username"
                                       required
                                       aria-required="true"
                                       aria-describedby="modal-username-error"
                                       className="form-input"
                                       placeholder="Enter your username"
                                   />
                                   <div id="modal-username-error" className="error-message" aria-live="polite"></div>
                               </div>
                               <div className="form-group">
                                   <label htmlFor="modal-password" className="form-label">
                                       Password <span aria-label="required" className="required">*</span>
                                   </label>
                                   <input 
                                       type="password" 
                                       id="modal-password" 
                                       name="password"
                                       required
                                       aria-required="true"
                                       aria-describedby="modal-password-error"
                                       className="form-input"
                                       placeholder="Enter your password"
                                   />
                                   <div id="modal-password-error" className="error-message" aria-live="polite"></div>
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