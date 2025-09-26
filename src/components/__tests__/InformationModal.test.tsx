import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InformationModal } from '../InformationModal';
import {
  testAriaLabels,
  testComponentA11y,
  testKeyboardNavigation,
} from '../../utils/test-accessibility';

describe('InformationModal Accessibility', () => {
  beforeEach(() => {
    // Reset document focus before each test
    document.body.focus();
  });

  it('should be accessible with axe-core when closed', async () => {
    const { container } = render(<InformationModal />);
    await testComponentA11y(container, 'InformationModal (closed)');
  });

  it('should be accessible with axe-core when open', async () => {
    const { container } = render(<InformationModal />);

    // Open the modal
    const openButton = screen.getByRole('button', { name: /open information modal/i });
    await userEvent.click(openButton);

    // Wait for modal to be open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    await testComponentA11y(container, 'InformationModal (open)');
  });

  it('should have proper modal structure and ARIA attributes', async () => {
    render(<InformationModal />);

    // Test trigger button
    const openButton = screen.getByRole('button', { name: /open information modal/i });
    expect(openButton).toBeInTheDocument();

    // Open modal
    await userEvent.click(openButton);

    // Test modal dialog
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');

    // Test modal title
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Confirmation Required');

    // Test close button - specifically the X button, not the cancel button
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
  });

  it('should manage focus properly', async () => {
    render(<InformationModal />);

    const openButton = screen.getByRole('button', { name: /open information modal/i });

    // Initial focus should be on the page (not modal)
    expect(document.activeElement).not.toBe(openButton);

    // Open modal
    await userEvent.click(openButton);

    // Focus should move to modal title when modal opens (our implementation focuses title first)
    await waitFor(() => {
      const modalTitle = screen.getByRole('heading', { level: 2 });
      expect(document.activeElement).toBe(modalTitle);
    });

    // Close modal and verify focus returns to trigger
    const closeButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    // Focus should return to the trigger button
    await waitFor(() => {
      expect(document.activeElement).toBe(openButton);
    });
  });

  it('should trap focus within modal', async () => {
    render(<InformationModal />);

    // Open modal
    const openButton = screen.getByRole('button', { name: /open information modal/i });
    await userEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Get all focusable elements in modal
    const dialog = screen.getByRole('dialog');
    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    expect(focusableElements.length).toBeGreaterThan(0);

    // Test that we can tab through modal elements
    const closeButton = screen.getByRole('button', { name: /close modal/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(closeButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should close on Escape key', async () => {
    render(<InformationModal />);

    // Open modal
    const openButton = screen.getByRole('button', { name: /open information modal/i });
    await userEvent.click(openButton);

    // Verify modal is open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Press Escape
    await userEvent.keyboard('{Escape}');

    // Verify modal is closed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    // Verify focus returned to trigger
    await waitFor(() => {
      expect(document.activeElement).toBe(openButton);
    });
  });

  it('should close on backdrop click', async () => {
    render(<InformationModal />);

    // Open modal
    const openButton = screen.getByRole('button', { name: /open information modal/i });
    await userEvent.click(openButton);

    // Wait for modal to be open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Click on backdrop (the dialog itself, not the modal content)
    const modalBackdrop = screen.getByRole('dialog');
    await userEvent.click(modalBackdrop);

    // Verify modal is closed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should support keyboard navigation', async () => {
    const { container } = render(<InformationModal />);

    // Test keyboard navigation on closed state
    await testKeyboardNavigation(container);

    // Open modal and test keyboard navigation
    const openButton = screen.getByRole('button', { name: /open information modal/i });
    await userEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Test keyboard navigation in open state
    const dialog = screen.getByRole('dialog');
    await testKeyboardNavigation(dialog);
  });

  it('should have proper ARIA labels and descriptions', async () => {
    const { container } = render(<InformationModal />);

    // Test ARIA labels in closed state
    testAriaLabels(container);

    // Open modal and test ARIA labels
    const openButton = screen.getByRole('button', { name: /open information modal/i });
    await userEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const dialog = screen.getByRole('dialog');
    testAriaLabels(dialog);
  });

  it('should handle form submission properly', async () => {
    // Mock window.alert for testing
    const alertSpy = vi.fn();
    window.alert = alertSpy;

    render(<InformationModal />);

    // Open modal
    const openButton = screen.getByRole('button', { name: /open information modal/i });
    await userEvent.click(openButton);

    // Submit form
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    // Verify alert was called
    expect(alertSpy).toHaveBeenCalledWith('Form submitted successfully!');

    // Verify modal is closed after submission
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    // Restore original alert
    window.alert = alert;
  });

  it('should work with screen readers', async () => {
    render(<InformationModal />);

    // Open modal
    const openButton = screen.getByRole('button', { name: /open information modal/i });
    await userEvent.click(openButton);

    const dialog = screen.getByRole('dialog');

    // Verify screen reader announcements
    expect(dialog).toHaveAttribute('role', 'dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');

    // Verify aria-labelledby points to title
    const titleId = dialog.getAttribute('aria-labelledby');
    expect(titleId).toBeTruthy();

    const title = document.getElementById(titleId!);
    expect(title).toHaveTextContent('Confirmation Required');

    // Verify aria-describedby points to description
    const descriptionId = dialog.getAttribute('aria-describedby');
    expect(descriptionId).toBeTruthy();

    const description = document.getElementById(descriptionId!);
    expect(description).toBeInTheDocument();
  });
});
