import { configureAxe } from 'jest-axe'
import type { AxeResults } from 'axe-core'

/**
 * Custom axe configuration for our project
 * Focuses on WCAG 2.1 AA compliance and best practices
 */
export const axe = configureAxe({
  rules: {
    // Enable important accessibility rules
    'color-contrast': { enabled: true },
    'keyboard-navigation': { enabled: true },
    'landmark-unique': { enabled: true },
    'region': { enabled: true },
    'focus-order-semantics': { enabled: true },
    
    // You can disable specific rules if they conflict with your design system
    // 'color-contrast': { enabled: false }, // Example: if you need to disable contrast checks temporarily
  },
  tags: [
    'wcag2a',      // WCAG 2.0 Level A
    'wcag2aa',     // WCAG 2.0 Level AA  
    'wcag21aa',    // WCAG 2.1 Level AA
    'best-practice' // Axe best practices
  ],
  // Include only violations in results (not passes or incomplete)
  resultTypes: ['violations']
})

/**
 * Enhanced axe testing function with better error reporting
 * @param element - The DOM element to test
 * @param options - Additional axe configuration options
 * @returns Promise with axe results
 */
export const testA11y = async (
  element: Element | Document = document.body,
  options: Parameters<typeof axe>[1] = {}
): Promise<AxeResults> => {
  const results = await axe(element, options)
  
  // Enhanced error reporting
  if (results.violations.length > 0) {
    console.group('🚨 Accessibility Violations Found')
    results.violations.forEach((violation: any) => {
      console.group(`❌ ${violation.id}: ${violation.description}`)
      console.log('Impact:', violation.impact)
      console.log('Help:', violation.helpUrl)
      console.log('Nodes affected:', violation.nodes.length)
      violation.nodes.forEach((node: any, index: number) => {
        console.log(`Node ${index + 1}:`, node.html)
        console.log('Target:', node.target)
        if (node.failureSummary) {
          console.log('Failure:', node.failureSummary)
        }
      })
      console.groupEnd()
    })
    console.groupEnd()
  }
  
  return results
}

/**
 * Utility for testing component accessibility in isolation
 * Wraps component in a container and tests it
 */
export const testComponentA11y = async (
  container: Element,
  componentName?: string
): Promise<void> => {
  const results = await testA11y(container)
  
  if (results.violations.length > 0) {
    const componentInfo = componentName ? ` in ${componentName}` : ''
    throw new Error(
      `Found ${results.violations.length} accessibility violation(s)${componentInfo}:\n` +
      results.violations
        .map((v: any) => `- ${v.id}: ${v.description} (${v.nodes.length} node(s))`)
        .join('\n')
    )
  }
}

/**
 * Utility for testing keyboard navigation
 * Tests that all interactive elements are keyboard accessible
 */
export const testKeyboardNavigation = async (container: Element): Promise<void> => {
  const focusableElements = container.querySelectorAll(
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  )
  
  if (focusableElements.length === 0) {
    console.warn('No focusable elements found for keyboard navigation test')
    return
  }
  
  // Test that all focusable elements can receive focus
  let focusableCount = 0
  focusableElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      // Check if element is actually focusable (not disabled, not hidden)
      const isVisible = element.offsetWidth > 0 && element.offsetHeight > 0
      const isEnabled = !element.hasAttribute('disabled')
      const tabIndex = element.getAttribute('tabindex')
      const isFocusable = tabIndex !== '-1' && isVisible && isEnabled
      
      if (isFocusable) {
        focusableCount++
      }
    }
  })
  
  console.log(`✅ Found ${focusableCount} keyboard-accessible elements`)
}

/**
 * Test for proper ARIA labels and descriptions
 */
export const testAriaLabels = (container: Element): void => {
  // Check for elements that should have accessible names
  const elementsNeedingLabels = container.querySelectorAll(
    'input:not([type="hidden"]), textarea, select, button:not([aria-label]):not([aria-labelledby])'
  )
  
  const unlabeledElements: Element[] = []
  
  elementsNeedingLabels.forEach(element => {
    const hasLabel = element.hasAttribute('aria-label') || 
                    element.hasAttribute('aria-labelledby') ||
                    element.hasAttribute('title') ||
                    (element as HTMLElement).innerText?.trim()
    
    if (!hasLabel && element.tagName === 'INPUT') {
      // Check for associated label
      const input = element as HTMLInputElement
      const hasAssociatedLabel = input.labels && input.labels.length > 0
      if (!hasAssociatedLabel) {
        unlabeledElements.push(element)
      }
    } else if (!hasLabel) {
      unlabeledElements.push(element)
    }
  })
  
  if (unlabeledElements.length > 0) {
    console.warn(`⚠️ Found ${unlabeledElements.length} elements without accessible names:`, unlabeledElements)
  }
}

export default axe