import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import '../styles/LinksVsButtons.css';
import CodeExample from '../components/CodeExample';
import LinkSection from '../components/LinkSection';

export const LinksVsButtons: React.FC = () => {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsFormSubmitting(false);
      setShowNotification(true);
      setFormData({ name: '', email: '' });
      
      // Hide notification after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
    }, 1500);
  };

  const handleDeleteAction = () => {
    // Simulate delete action
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const linkExampleCode = `// ✅ Correct Link Usage
<a href="/products" className="product-link">
  View All Products
</a>

// ✅ External Link with Warning
<a 
  href="https://external-site.com" 
  target="_blank" 
  rel="noopener noreferrer"
  className="external-link"
>
  External Documentation
  <span className="sr-only">(opens in a new tab)</span>
</a>

// ✅ Anchor Link
<a href="#section-2" className="anchor-link">
  Jump to Section 2
</a>`;

  const buttonExampleCode = `// ✅ Correct Button Usage
<button 
  type="button" 
  onClick={handleAction}
  className="action-button"
>
  Toggle Menu
</button>

// ✅ Form Submit Button
<button 
  type="submit" 
  disabled={isSubmitting}
  className="submit-button"
>
  {isSubmitting ? 'Submitting...' : 'Submit Form'}
</button>

// ✅ Destructive Action with Confirmation
<AlertDialog.Root>
  <AlertDialog.Trigger asChild>
    <button className="delete-button">
      Delete Item
    </button>
  </AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay className="alert-overlay" />
    <AlertDialog.Content className="alert-content">
      <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone.
      </AlertDialog.Description>
      <div className="alert-actions">
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action onClick={handleDelete}>
          Delete
        </AlertDialog.Action>
      </div>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog.Root>`;

  return (
    <Tooltip.Provider>
      <main id="main-content" role="main" className="links-vs-buttons-page">
        <h1 className="page-title">Links vs Buttons: When to Use What</h1>
        
        {/* Introduction Section */}
        <section className="introduction-section">
          <div className="intro-content">
            <h2>Understanding the Difference</h2>
            <div className="guidelines">
              <div className="guideline-card link-guidelines">
                <h3>📎 Links</h3>
                <ul>
                  <li><strong>Navigation:</strong> Take users to other locations (URL changes)</li>
                  <li><strong>Keyboard:</strong> Activated with Enter key</li>
                  <li><strong>Purpose:</strong> Redirect to new page or section</li>
                  <li><strong>Screen Reader:</strong> Collected in "Links" window</li>
                  <li><strong>Avoid:</strong> Opening in new tabs without warning</li>
                </ul>
              </div>
              <div className="guideline-card button-guidelines">
                <h3>🔘 Buttons</h3>
                <ul>
                  <li><strong>Actions:</strong> Trigger scripted functionality</li>
                  <li><strong>Keyboard:</strong> Activated with Enter/Space keys</li>
                  <li><strong>Purpose:</strong> Execute JavaScript actions</li>
                  <li><strong>Screen Reader:</strong> Collected in "Form controls" window</li>
                  <li><strong>Examples:</strong> Submit forms, toggle UI, open modals</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Links Examples Section */}
        <section className="examples-section">
          <div className="example-container">
            <div className="example-demo">
              <h2>✅ Correct Link Usage</h2>
              <div className="demo-area">
                <div className="link-examples">
                  <h3>Navigation Links</h3>
                  <nav className="example-nav" role="navigation" aria-label="Example navigation">
                    <a href="/" className="nav-link">
                      Home
                    </a>
                    <a href="/modal-dialog" className="nav-link">
                      Modal Dialogs
                    </a>
                    <a href="/input-fields" className="nav-link">
                      Input Fields
                    </a>
                  </nav>

                  <h3>External Links</h3>
                  <div className="external-links">
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <a 
                          href="https://www.w3.org/WAI/ARIA/apg/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="external-link"
                        >
                          ARIA Authoring Practices
                          <span className="sr-only">(opens in a new tab)</span>
                          <span aria-hidden="true" className="external-icon">↗</span>
                        </a>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className="tooltip-content">
                          Opens in a new tab
                          <Tooltip.Arrow className="tooltip-arrow" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </div>

                  <h3>Anchor Links</h3>
                  <div className="anchor-links">
                    <a href="#buttons-section" className="anchor-link">
                      Jump to Button Examples
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="example-code">
              <h3>Code Example</h3>
              <CodeExample 
                code={linkExampleCode}
                title="Link Examples"
                language="tsx"
              />
            </div>
          </div>
        </section>

        {/* Buttons Examples Section */}
        <section id="buttons-section" className="examples-section">
          <div className="example-container">
            <div className="example-demo">
              <h2>✅ Correct Button Usage</h2>
              <div className="demo-area">
                <div className="button-examples">
                  <h3>Action Buttons</h3>
                  <div className="action-buttons">
                    <button 
                      type="button" 
                      onClick={() => setShowNotification(true)}
                      className="action-button primary"
                    >
                      Show Notification
                    </button>
                    
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <button 
                          type="button" 
                          onClick={() => document.body.classList.toggle('dark-mode')}
                          className="action-button secondary"
                        >
                          Toggle Theme
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className="tooltip-content">
                          Switch between light and dark mode
                          <Tooltip.Arrow className="tooltip-arrow" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </div>

                  <h3>Form Submission</h3>
                  <form onSubmit={handleFormSubmit} className="example-form">
                    <div className="form-field">
                      <label htmlFor="demo-name">Name:</label>
                      <input 
                        id="demo-name"
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="demo-email">Email:</label>
                      <input 
                        id="demo-email"
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="form-input"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isFormSubmitting}
                      className="submit-button"
                    >
                      {isFormSubmitting ? (
                        <>
                          <span className="loading-spinner" aria-hidden="true" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Form'
                      )}
                    </button>
                  </form>

                  <h3>Destructive Actions</h3>
                  <div className="destructive-actions">
                    <AlertDialog.Root>
                      <AlertDialog.Trigger asChild>
                        <button className="delete-button">
                          Delete Item
                        </button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay className="alert-overlay" />
                        <AlertDialog.Content className="alert-content">
                          <AlertDialog.Title className="alert-title">
                            Confirm Deletion
                          </AlertDialog.Title>
                          <AlertDialog.Description className="alert-description">
                            Are you sure you want to delete this item? This action cannot be undone and will permanently remove the data.
                          </AlertDialog.Description>
                          <div className="alert-actions">
                            <AlertDialog.Cancel asChild>
                              <button className="alert-cancel">Cancel</button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action asChild>
                              <button className="alert-confirm" onClick={handleDeleteAction}>
                                Delete
                              </button>
                            </AlertDialog.Action>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Portal>
                    </AlertDialog.Root>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="example-code">
              <h3>Code Example</h3>
              <CodeExample 
                code={buttonExampleCode}
                title="Button Examples"
                language="tsx"
              />
            </div>
          </div>
        </section>

        {/* Notification */}
        {showNotification && (
          <div 
            className="notification"
            role="alert"
            aria-live="polite"
          >
            ✅ Action completed successfully!
          </div>
        )}

        {/* Resources Section */}
        <LinkSection
          links={[
            {
              label: 'W3C: Links vs Buttons Guidelines',
              url: 'https://www.w3.org/WAI/ARIA/apg/practices/link-and-button-practices/',
            },
            {
              label: 'Radix UI Navigation Menu',
              url: 'https://www.radix-ui.com/docs/primitives/components/navigation-menu',
            },
            {
              label: 'Radix UI Alert Dialog',
              url: 'https://www.radix-ui.com/docs/primitives/components/alert-dialog',
            },
            {
              label: 'MDN: Button Element',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button',
            },
            {
              label: 'WebAIM: Links and Hypertext',
              url: 'https://webaim.org/techniques/hypertext/',
            },
          ]}
        />
      </main>
    </Tooltip.Provider>
  );
};
