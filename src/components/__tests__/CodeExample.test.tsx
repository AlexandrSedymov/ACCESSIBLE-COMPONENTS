import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import CodeExample from '../CodeExample';
import {
  testAriaLabels,
  testComponentA11y,
  testKeyboardNavigation,
} from '../../utils/test-accessibility';

const sampleCode = `
function HelloWorld() {
  return <div>Hello, World!</div>;
}
`.trim();

describe('CodeExample Accessibility', () => {
  it('should be accessible with axe-core when collapsed', async () => {
    const { container } = render(
      <CodeExample title="Sample React Component" code={sampleCode} language="tsx" />
    );
    await testComponentA11y(container, 'CodeExample (collapsed)');
  });

  it('should be accessible with axe-core when expanded', async () => {
    const { container } = render(
      <CodeExample title="Sample React Component" code={sampleCode} language="tsx" />
    );

    // Expand the code example
    const summary = screen.getByText('Sample React Component').closest('summary');
    expect(summary).toBeInTheDocument();
    await userEvent.click(summary!);

    await waitFor(() => {
      expect(screen.getByText(/function HelloWorld/)).toBeInTheDocument();
    });

    await testComponentA11y(container, 'CodeExample (expanded)');
  });

  it('should use semantic HTML details/summary structure', () => {
    render(<CodeExample title="Test Component" code={sampleCode} language="tsx" />);

    // Test details element
    const details = screen.getByRole('group');
    expect(details).toBeInTheDocument();
    expect(details.tagName.toLowerCase()).toBe('details');

    // Test summary element (acts as button)
    const summary = screen.getByRole('button', { name: /test component/i });
    expect(summary).toBeInTheDocument();
    expect(summary.tagName.toLowerCase()).toBe('summary');
  });

  it('should handle keyboard interaction properly', async () => {
    const { container } = render(
      <CodeExample title="Keyboard Test" code={sampleCode} language="tsx" />
    );

    const summary = screen.getByRole('button', { name: /keyboard test/i });

    // Test keyboard activation (Enter and Space)
    summary.focus();
    expect(document.activeElement).toBe(summary);

    // Press Enter to expand
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(screen.getByText(/function HelloWorld/)).toBeInTheDocument();
    });

    // Press Enter again to collapse
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(screen.queryByText(/function HelloWorld/)).not.toBeInTheDocument();
    });

    // Test Space key
    await userEvent.keyboard(' ');
    await waitFor(() => {
      expect(screen.getByText(/function HelloWorld/)).toBeInTheDocument();
    });

    await testKeyboardNavigation(container);
  });

  it('should provide proper ARIA attributes and labels', () => {
    const { container } = render(
      <CodeExample title="ARIA Test Component" code={sampleCode} language="tsx" />
    );

    testAriaLabels(container);

    // Test that summary has proper role
    const summary = screen.getByRole('button', { name: /aria test component/i });
    expect(summary).toHaveAttribute('aria-expanded');
  });

  it('should indicate expanded/collapsed state to screen readers', async () => {
    render(<CodeExample title="State Test" code={sampleCode} language="tsx" />);

    const summary = screen.getByRole('button', { name: /state test/i });

    // Initially collapsed
    expect(summary).toHaveAttribute('aria-expanded', 'false');

    // Expand
    await userEvent.click(summary);
    await waitFor(() => {
      expect(summary).toHaveAttribute('aria-expanded', 'true');
    });

    // Collapse
    await userEvent.click(summary);
    await waitFor(() => {
      expect(summary).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('should display code content properly when expanded', async () => {
    render(<CodeExample title="Content Test" code={sampleCode} language="tsx" />);

    // Initially code should not be visible
    expect(screen.queryByText(/function HelloWorld/)).not.toBeInTheDocument();

    // Expand
    const summary = screen.getByRole('button', { name: /content test/i });
    await userEvent.click(summary);

    // Code should be visible
    await waitFor(() => {
      expect(screen.getByText(/function HelloWorld/)).toBeInTheDocument();
    });

    // Check that code is in proper pre/code structure
    const codeElement = screen.getByText(/function HelloWorld/).closest('code');
    expect(codeElement).toBeInTheDocument();

    const preElement = codeElement?.closest('pre');
    expect(preElement).toBeInTheDocument();
  });

  it('should handle different languages and code content', async () => {
    const cssCode = `
.example {
  color: red;
  background: blue;
}
    `.trim();

    render(<CodeExample title="CSS Example" code={cssCode} language="css" />);

    const summary = screen.getByRole('button', { name: /css example/i });
    await userEvent.click(summary);

    await waitFor(() => {
      expect(screen.getByText(/\.example/)).toBeInTheDocument();
    });
  });

  it('should handle empty or malformed code gracefully', async () => {
    const { container } = render(<CodeExample title="Empty Code Test" code="" language="tsx" />);

    await testComponentA11y(container, 'CodeExample with empty code');

    const summary = screen.getByLabelText(/empty code test/i);
    await userEvent.click(summary);

    // Should still be accessible even with empty code
    await testComponentA11y(container, 'CodeExample with empty code (expanded)');
  });

  it('should support focus management within expanded content', async () => {
    const { container } = render(
      <CodeExample title="Focus Test" code={sampleCode} language="tsx" />
    );

    // Test keyboard navigation
    await testKeyboardNavigation(container);

    // Expand and test focus doesn't get lost
    const summary = screen.getByLabelText(/focus test/i);
    await userEvent.click(summary);

    await waitFor(() => {
      expect(screen.getByText(/function HelloWorld/)).toBeInTheDocument();
    });

    // Focus should remain manageable
    await testKeyboardNavigation(container);
  });

  it('should work well with multiple instances', async () => {
    const { container } = render(
      <div>
        <CodeExample title="First Example" code="console.log('first')" language="js" />
        <CodeExample title="Second Example" code="console.log('second')" language="js" />
      </div>
    );

    await testComponentA11y(container, 'Multiple CodeExample instances');

    // Both should be independently operable
    const allSummaries = screen.getAllByLabelText(/first example|second example/i);
    const firstSummary = allSummaries.find(el => el.getAttribute('aria-label')?.includes('First'));
    const secondSummary = allSummaries.find(el => el.getAttribute('aria-label')?.includes('Second'));
    
    expect(firstSummary).toBeDefined();
    expect(secondSummary).toBeDefined();

    expect(firstSummary).toBeInTheDocument();
    expect(secondSummary).toBeInTheDocument();

    // Open first
    if (firstSummary) await userEvent.click(firstSummary);
    await waitFor(() => {
      expect(screen.getByText(/console\.log\('first'\)/)).toBeInTheDocument();
    });

    // Open second
    if (secondSummary) await userEvent.click(secondSummary);
    await waitFor(() => {
      expect(screen.getByText(/console\.log\('second'\)/)).toBeInTheDocument();
    });

    // Both should be open and accessible
    await testComponentA11y(container, 'Multiple CodeExample instances (both open)');
  });
});
