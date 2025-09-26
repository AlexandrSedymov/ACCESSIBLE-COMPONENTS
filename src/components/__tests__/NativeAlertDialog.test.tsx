import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { NativeAlertDialog } from '../NativeAlertDialog';
import {
  testAriaLabels,
  testComponentA11y,
  testKeyboardNavigation,
} from '../../utils/test-accessibility';

describe('NativeAlertDialog Accessibility', () => {
  beforeEach(() => {
    // Reset document focus before each test
    document.body.focus();
  });

  it('should be accessible with axe-core when closed', async () => {
    const { container } = render(<NativeAlertDialog />);
    await testComponentA11y(container, 'NativeAlertDialog (closed)');
  });

  it('should be accessible with axe-core when open', async () => {
    const { container } = render(<NativeAlertDialog />);

    // Open the dialog
    const openButton = screen.getByRole('button', { name: /open native alert dialog/i });
    await userEvent.click(openButton);

    // Wait for dialog to be open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    await testComponentA11y(container, 'NativeAlertDialog (open)');
  });

  it('should use native HTML5 dialog element', async () => {
    render(<NativeAlertDialog />);

    // Test trigger button
    const openButton = screen.getByRole('button', { name: /open native alert dialog/i });
    expect(openButton).toBeInTheDocument();

    // Open dialog
    await userEvent.click(openButton);

    // Test native dialog element
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.tagName.toLowerCase()).toBe('dialog');

    // Native dialog should have open attribute
    expect(dialog).toHaveAttribute('open');
  });

  it('should have proper ARIA attributes and structure', async () => {
    render(<NativeAlertDialog />);

    // Open dialog
    const openButton = screen.getByRole('button', { name: /open native alert dialog/i });
    await userEvent.click(openButton);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Test dialog title
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Confirm Action (Native Dialog)');

    // Test close button
    const closeButton = screen.getByRole('button', { name: /cancel deletion/i });
    expect(closeButton).toBeInTheDocument();
  });

  it('should manage focus with native browser behavior', async () => {
    render(<NativeAlertDialog />);

    const openButton = screen.getByRole('button', { name: /open native alert dialog/i });

    // Open dialog
    await userEvent.click(openButton);

    // Native dialog automatically manages focus
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    // Close dialog using cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel deletion/i });
    await userEvent.click(cancelButton);

    // Native dialog should restore focus automatically
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should close on Escape key (native behavior)', async () => {
    render(<NativeAlertDialog />);

    // Open dialog
    const openButton = screen.getByRole('button', { name: /open native alert dialog/i });
    await userEvent.click(openButton);

    // Verify dialog is open
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Press Escape (native browser behavior)
    await userEvent.keyboard('{Escape}');

    // Verify dialog is closed
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('should support keyboard navigation', async () => {
    const { container } = render(<NativeAlertDialog />);

    // Test keyboard navigation on closed state
    await testKeyboardNavigation(container);

    // Open dialog and test keyboard navigation
    const openButton = screen.getByRole('button', { name: /open native alert dialog/i });
    await userEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Test keyboard navigation in open state
    const dialog = screen.getByRole('dialog');
    await testKeyboardNavigation(dialog);
  });

  it('should have proper ARIA labels and descriptions', async () => {
    const { container } = render(<NativeAlertDialog />);

    // Test ARIA labels in closed state
    testAriaLabels(container);

    // Open dialog and test ARIA labels
    const openButton = screen.getByRole('button', { name: /open native alert dialog/i });
    await userEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const dialog = screen.getByRole('dialog');
    testAriaLabels(dialog);
  });

  it('should work with screen readers using native semantics', async () => {
    render(<NativeAlertDialog />);

    // Open dialog
    const openButton = screen.getByRole('button', { name: /open native alert dialog/i });
    await userEvent.click(openButton);

    const dialog = screen.getByRole('dialog');

    // Native dialog provides built-in accessibility
    expect(dialog).toHaveAttribute('role', 'dialog');

    // Should have proper heading structure
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('should handle multiple open/close cycles', async () => {
    render(<NativeAlertDialog />);

    const openButton = screen.getByRole('button', { name: /open native alert dialog/i });

    // Test multiple open/close cycles for stability
    for (let i = 0; i < 3; i++) {
      // Open
      await userEvent.click(openButton);
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Close
      const closeButton = screen.getByRole('button', { name: /cancel deletion/i });
      await userEvent.click(closeButton);
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    }
  });

  it('should maintain accessibility after state changes', async () => {
    const { container } = render(<NativeAlertDialog />);

    // Test accessibility in initial state
    await testComponentA11y(container, 'NativeAlertDialog initial');

    // Open, close, and test again
    const openButton = screen.getByRole('button', { name: /open native alert dialog/i });
    await userEvent.click(openButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /cancel deletion/i });
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    // Test accessibility after state change
    await testComponentA11y(container, 'NativeAlertDialog after interaction');
  });
});
