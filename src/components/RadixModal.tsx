import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import '../styles/LibraryModal.css';

export const LibraryModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission process
    setTimeout(() => {
      setIsOpen(false);
      setFormData({ name: '', email: '', message: '' });
      alert('Form submitted successfully!');
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="library-modal-demo">
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <button className="library-modal-trigger">
            Open Contact Form
          </button>
        </Dialog.Trigger>
        
        <Dialog.Portal>
          <Dialog.Overlay className="library-modal-overlay" />
          <Dialog.Content className="library-modal-content">
            <div className="library-modal-header">
              <Dialog.Title className="library-modal-title">
                Contact Us
              </Dialog.Title>
              <Dialog.Description className="library-modal-description">
                Send us a message and we'll get back to you as soon as possible.
              </Dialog.Description>
            </div>

            <form onSubmit={handleSubmit} className="library-modal-form">
              <div className="library-form-field">
                <label htmlFor="contact-name" className="library-form-label">
                  Name *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="library-form-input"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="library-form-field">
                <label htmlFor="contact-email" className="library-form-label">
                  Email *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="library-form-input"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="library-form-field">
                <label htmlFor="contact-message" className="library-form-label">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="library-form-textarea"
                  placeholder="Enter your message"
                />
              </div>

              <div className="library-modal-actions">
                <Dialog.Close asChild>
                  <button type="button" className="library-modal-button library-modal-button--secondary">
                    Cancel
                  </button>
                </Dialog.Close>
                <button type="submit" className="library-modal-button library-modal-button--primary">
                  Send Message
                </button>
              </div>
            </form>

            <Dialog.Close asChild>
              <button className="radix-modal-close" aria-label="Close dialog">
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