import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/ModalDialog.css';
import '../styles/InformationModal.css';
import '../styles/ReactHookForm.css';

// Selector for all focusable elements
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Form data types
type UserProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  country: string;
  bio: string;
  newsletter: boolean;
  preferredContact: 'email' | 'phone' | 'mail';
};

type LoginFormData = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export const InputFieldPage: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const loginModalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // React Hook Form setup for main form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isValid: isProfileValid },
    reset: resetProfile,
  } = useForm<UserProfileFormData>({
    mode: 'onBlur', // Validate on blur for better accessibility
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: 18,
      country: '',
      bio: '',
      newsletter: false,
      preferredContact: 'email',
    },
  });

  // React Hook Form setup for login modal
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isValid: isLoginValid },
    reset: resetLogin,
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
    resetLogin(); // Reset form when closing
  }, [resetLogin]);

  // Form submission handlers
  const onProfileSubmit = (data: UserProfileFormData) => {
    setIsSubmitted(true);
    
    // Show success message
    setTimeout(() => {
      alert(`Profile saved successfully!\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}`);
      setIsSubmitted(false);
    }, 500);
  };

  const onLoginSubmit = (data: LoginFormData) => {
    closeLoginModal();
    alert(`Login successful!\nUsername: ${data.username}\nRemember Me: ${data.rememberMe}`);
  };

  // Set initial focus when login modal opens
  useEffect(() => {
    if (isLoginModalOpen && firstInputRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [isLoginModalOpen]);

  // Focus trapping logic for login modal
  useEffect(() => {
    if (!isLoginModalOpen || !loginModalRef.current) return;

    const modalElement = loginModalRef.current;
    const focusableElements = Array.from(modalElement.querySelectorAll(FOCUSABLE_SELECTOR));
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      // If shift + tab is pressed
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        // If tab is pressed
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
  }, [isLoginModalOpen, closeLoginModal]);

  return (
    <main id="main-content" role="main" className="modal-page">
      <h1 className="modal-page-title">Accessible Form Examples with React Hook Form Library (WIP)</h1>

      {/* Comprehensive User Profile Form */}
      <div className="modal-example">
        <h2>User Profile Form</h2>
        <p className="modal-description">
          This form demonstrates various input types with React Hook Form validation and accessibility features.
        </p>
        
        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="profile-form" noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name{' '}
                <span aria-label="required" className="required">*</span>
              </label>
              <input
                {...registerProfile('firstName', {
                  required: 'First name is required',
                  minLength: { value: 2, message: 'First name must be at least 2 characters' },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'First name can only contain letters and spaces'
                  }
                })}
                id="firstName"
                type="text"
                className={`form-input ${profileErrors.firstName ? 'error' : ''}`}
                placeholder="Enter your first name"
                autoComplete="given-name"
                aria-describedby={profileErrors.firstName ? 'firstName-error' : undefined}
                aria-invalid={!!profileErrors.firstName}
              />
              {profileErrors.firstName && (
                <div id="firstName-error" className="error-message" role="alert" aria-live="polite">
                  {profileErrors.firstName.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name{' '}
                <span aria-label="required" className="required">*</span>
              </label>
              <input
                {...registerProfile('lastName', {
                  required: 'Last name is required',
                  minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'Last name can only contain letters and spaces'
                  }
                })}
                id="lastName"
                type="text"
                className={`form-input ${profileErrors.lastName ? 'error' : ''}`}
                placeholder="Enter your last name"
                autoComplete="family-name"
                aria-describedby={profileErrors.lastName ? 'lastName-error' : undefined}
                aria-invalid={!!profileErrors.lastName}
              />
              {profileErrors.lastName && (
                <div id="lastName-error" className="error-message" role="alert" aria-live="polite">
                  {profileErrors.lastName.message}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address{' '}
              <span aria-label="required" className="required">*</span>
            </label>
            <input
              {...registerProfile('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              id="email"
              type="email"
              className={`form-input ${profileErrors.email ? 'error' : ''}`}
              placeholder="Enter your email address"
              autoComplete="email"
              aria-describedby={profileErrors.email ? 'email-error' : 'email-hint'}
              aria-invalid={!!profileErrors.email}
            />
            <div id="email-hint" className="form-hint">
              We'll use this to send you important updates about your account.
            </div>
            {profileErrors.email && (
              <div id="email-error" className="error-message" role="alert" aria-live="polite">
                {profileErrors.email.message}
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                {...registerProfile('phone', {
                  pattern: {
                    value: /^[+]?[1-9][\d]{0,15}$/,
                    message: 'Please enter a valid phone number'
                  }
                })}
                id="phone"
                type="tel"
                className={`form-input ${profileErrors.phone ? 'error' : ''}`}
                placeholder="+1 (555) 123-4567"
                autoComplete="tel"
                aria-describedby={profileErrors.phone ? 'phone-error' : undefined}
                aria-invalid={!!profileErrors.phone}
              />
              {profileErrors.phone && (
                <div id="phone-error" className="error-message" role="alert" aria-live="polite">
                  {profileErrors.phone.message}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="age" className="form-label">
                Age{' '}
                <span aria-label="required" className="required">*</span>
              </label>
              <input
                {...registerProfile('age', {
                  required: 'Age is required',
                  min: { value: 13, message: 'You must be at least 13 years old' },
                  max: { value: 120, message: 'Please enter a valid age' },
                  valueAsNumber: true
                })}
                id="age"
                type="number"
                min="13"
                max="120"
                className={`form-input ${profileErrors.age ? 'error' : ''}`}
                placeholder="25"
                aria-describedby={profileErrors.age ? 'age-error' : undefined}
                aria-invalid={!!profileErrors.age}
              />
              {profileErrors.age && (
                <div id="age-error" className="error-message" role="alert" aria-live="polite">
                  {profileErrors.age.message}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country{' '}
              <span aria-label="required" className="required">*</span>
            </label>
            <select
              {...registerProfile('country', {
                required: 'Please select your country'
              })}
              id="country"
              className={`form-input ${profileErrors.country ? 'error' : ''}`}
              aria-describedby={profileErrors.country ? 'country-error' : undefined}
              aria-invalid={!!profileErrors.country}
            >
              <option value="">Select your country</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="de">Germany</option>
              <option value="fr">France</option>
              <option value="au">Australia</option>
              <option value="jp">Japan</option>
              <option value="other">Other</option>
            </select>
            {profileErrors.country && (
              <div id="country-error" className="error-message" role="alert" aria-live="polite">
                {profileErrors.country.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bio" className="form-label">
              Bio (Optional)
            </label>
            <textarea
              {...registerProfile('bio', {
                maxLength: { value: 500, message: 'Bio must be less than 500 characters' }
              })}
              id="bio"
              rows={4}
              className={`form-input ${profileErrors.bio ? 'error' : ''}`}
              placeholder="Tell us about yourself..."
              aria-describedby={profileErrors.bio ? 'bio-error' : 'bio-hint'}
              aria-invalid={!!profileErrors.bio}
            />
            <div id="bio-hint" className="form-hint">
              Optional: Share a brief description about yourself (max 500 characters).
            </div>
            {profileErrors.bio && (
              <div id="bio-error" className="error-message" role="alert" aria-live="polite">
                {profileErrors.bio.message}
              </div>
            )}
          </div>

          <fieldset className="form-fieldset">
            <legend className="form-legend">Preferred Contact Method</legend>
            <div className="radio-group" role="radiogroup" aria-labelledby="contact-legend">
              <div className="radio-option">
                <input
                  {...registerProfile('preferredContact')}
                  id="contact-email"
                  type="radio"
                  value="email"
                  className="radio-input"
                />
                <label htmlFor="contact-email" className="radio-label">
                  Email
                </label>
              </div>
              <div className="radio-option">
                <input
                  {...registerProfile('preferredContact')}
                  id="contact-phone"
                  type="radio"
                  value="phone"
                  className="radio-input"
                />
                <label htmlFor="contact-phone" className="radio-label">
                  Phone
                </label>
              </div>
              <div className="radio-option">
                <input
                  {...registerProfile('preferredContact')}
                  id="contact-mail"
                  type="radio"
                  value="mail"
                  className="radio-input"
                />
                <label htmlFor="contact-mail" className="radio-label">
                  Postal Mail
                </label>
              </div>
            </div>
          </fieldset>

          <div className="form-group">
            <div className="checkbox-group">
              <input
                {...registerProfile('newsletter')}
                id="newsletter"
                type="checkbox"
                className="checkbox-input"
              />
              <label htmlFor="newsletter" className="checkbox-label">
                Subscribe to our newsletter for updates and promotions
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className={`form-submit-button ${!isProfileValid ? 'disabled' : ''}`}
              disabled={isSubmitted}
              aria-describedby="submit-hint"
            >
              {isSubmitted ? 'Saving...' : 'Save Profile'}
            </button>
            <button
              type="button"
              onClick={() => resetProfile()}
              className="form-cancel-button"
              disabled={isSubmitted}
            >
              Reset Form
            </button>
          </div>
          <div id="submit-hint" className="form-hint">
            Please fill out all required fields before submitting.
          </div>
        </form>
      </div>

      {/* Login Modal Example */}
      <div className="modal-example">
        <h2>Login Modal with React Hook Form</h2>
        <p className="modal-description">
          This demonstrates form validation within a modal dialog using React Hook Form.
        </p>
        <button
          onClick={openLoginModal}
          aria-haspopup="dialog"
          className="modal-open-button login-button"
        >
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
            onKeyDown={e => {
              if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                closeLoginModal();
              }
            }}
          >
            <div
              className="modal-content login-modal-content"
              role="document"
              tabIndex={0}
              onClick={e => e.stopPropagation()}
              onKeyDown={e => {
                // Allow ESC, Enter, and Space to close modal for accessibility
                if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                  closeLoginModal();
                }
              }}
            >
              <h3 id="login-modal-title" className="modal-title">
                User Login
              </h3>
              <p id="login-modal-description" className="modal-description">
                Please enter your credentials to log in to your account.
              </p>
              
              <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="login-form" noValidate>
                <div className="form-group">
                  <label htmlFor="modal-username" className="form-label">
                    Username{' '}
                    <span aria-label="required" className="required">*</span>
                  </label>
                  <input
                    {...registerLogin('username', {
                      required: 'Username is required',
                      minLength: { value: 3, message: 'Username must be at least 3 characters' }
                    })}
                    ref={firstInputRef}
                    id="modal-username"
                    type="text"
                    className={`form-input ${loginErrors.username ? 'error' : ''}`}
                    placeholder="Enter your username"
                    autoComplete="username"
                    aria-describedby={loginErrors.username ? 'modal-username-error' : undefined}
                    aria-invalid={!!loginErrors.username}
                  />
                  {loginErrors.username && (
                    <div id="modal-username-error" className="error-message" role="alert" aria-live="polite">
                      {loginErrors.username.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="modal-password" className="form-label">
                    Password{' '}
                    <span aria-label="required" className="required">*</span>
                  </label>
                  <input
                    {...registerLogin('password', {
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                    id="modal-password"
                    type="password"
                    className={`form-input ${loginErrors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    aria-describedby={loginErrors.password ? 'modal-password-error' : undefined}
                    aria-invalid={!!loginErrors.password}
                  />
                  {loginErrors.password && (
                    <div id="modal-password-error" className="error-message" role="alert" aria-live="polite">
                      {loginErrors.password.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <div className="checkbox-group">
                    <input
                      {...registerLogin('rememberMe')}
                      id="remember-me"
                      type="checkbox"
                      className="checkbox-input"
                    />
                    <label htmlFor="remember-me" className="checkbox-label">
                      Remember me for 30 days
                    </label>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className={`form-submit-button ${!isLoginValid ? 'disabled' : ''}`}
                    disabled={!isLoginValid}
                    aria-describedby="login-modal-description"
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    onClick={closeLoginModal}
                    aria-label="Cancel login and close modal"
                    className="form-cancel-button"
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
