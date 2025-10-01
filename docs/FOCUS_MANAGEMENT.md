# Focus Management for Navigation

This document explains how focus management works in the Accessible Components project to improve the user experience for keyboard and screen reader users.

## Overview

When users navigate between pages using navigation links, it's important to programmatically move focus to the main content area. This helps:

1. **Screen reader users** know that the page has changed and where the new content begins
2. **Keyboard users** don't have to tab through the navigation again to reach the main content
3. **All users** have a clear indication of the page transition

## Implementation

### 1. `useFocusManagement` Hook

The custom hook automatically manages focus when routes change:

```typescript
import { useFocusManagement } from './hooks/useFocusManagement';

function AppContent() {
  // Enable automatic focus management for navigation
  useFocusManagement();
  
  return (
    // Your app content...
  );
}
```

**Key features:**
- Automatically detects route changes
- Prioritizes focusing H1 elements for VoiceOver compatibility
- Falls back to main content element (`#main-content`) if no H1 found
- Adds `tabindex="-1"` to make elements focusable programmatically
- Provides visual focus indicator for keyboard users
- Cleans up focus styles after user interaction

### 2. Enhanced Navigation Component

The `Navbar` component includes accessibility improvements:

```tsx
<nav className="navbar" role="navigation" aria-label="Main navigation">
  <ul className="navbar-list">
    {navItems.map(item => {
      const isCurrentPage = location.pathname === item.href;
      
      return (
        <li key={item.href}>
          <Link 
            to={item.href} 
            className={`navbar-link ${isCurrentPage ? 'navbar-link--current' : ''}`}
            aria-current={isCurrentPage ? 'page' : undefined}
            onClick={() => {
              // Announces navigation to screen readers
            }}
          >
            {item.label}
          </Link>
        </li>
      );
    })}
  </ul>
</nav>
```

**Key features:**
- Uses `aria-current="page"` to indicate current page
- Provides visual styling for current page
- Announces navigation to screen readers
- Proper ARIA labels and roles

### 3. Page Structure Requirements

Each page must have a main element with the correct structure:

```tsx
export const YourPage: React.FC = () => {
  return (
    <main id="main-content" role="main" className="your-page">
      <h1>Page Title</h1>
      {/* Page content */}
    </main>
  );
};
```

**Required attributes:**
- `id="main-content"` - Target for focus management
- `role="main"` - Semantic role for screen readers
- Proper heading hierarchy starting with `<h1>`

## CSS Styles

The implementation includes proper focus styles:

```css
/* Current page indicator */
.navbar-link--current {
  background: #007acc !important;
  color: white;
  font-weight: bold;
}

/* Hidden text for screen readers */
.navbar-link--current::after {
  content: ' (current page)';
  /* Screen reader only positioning */
}

/* Focus styles for main content */
main[tabindex="-1"]:focus {
  outline: 2px solid #007acc;
  outline-offset: 2px;
}

/* Screen reader only utility class */
.sr-only {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}
```

## Accessibility Benefits

1. **WCAG 2.1 Compliance**: Meets Success Criteria 2.4.3 (Focus Order) and 3.2.3 (Consistent Navigation)

2. **Screen Reader Support**: 
   - Announces page changes
   - Clearly indicates current page
   - Focuses H1 elements for better VoiceOver compatibility
   - Moves focus to main content automatically

3. **Keyboard Navigation**:
   - Reduces tab stops needed to reach content
   - Provides clear visual focus indicators
   - Maintains logical focus order

4. **Motor Impairment Support**:
   - Reduces navigation effort
   - Provides larger click targets
   - Clear visual feedback

## Testing

Run the focus management tests:

```bash
yarn test src/hooks/__tests__/useFocusManagement.test.ts
```

The tests verify:
- Focus moves to main element after navigation
- Graceful handling of missing elements
- Custom selector support
- Proper tabindex management

## Browser Support

This implementation works in all modern browsers and is compatible with:
- JAWS (screen reader)
- NVDA (screen reader)  
- VoiceOver (screen reader)
- Dragon NaturallySpeaking (voice control)
- Keyboard-only navigation

## VoiceOver-Specific Testing

For VoiceOver users on macOS:
1. **Enable VoiceOver**: Cmd + F5 or System Preferences → Accessibility
2. **Test in Safari**: Best compatibility for VoiceOver
3. **Listen for full announcements**: Should hear heading content, not just "heading level 1"
4. **Verify focus timing**: If announcements are cut off, increase `focusDelay` parameter

See `docs/VOICEOVER_FOCUS_SOLUTIONS.md` for detailed VoiceOver troubleshooting.

## Best Practices

1. **Always use semantic HTML**: `<main>`, `<nav>`, `<h1>-<h6>`
2. **Consistent page structure**: Every page should follow the same pattern
3. **Test with real assistive technology**: Use screen readers and keyboard-only navigation
4. **Focus H1 elements**: Provides clearest announcements for screen readers
5. **Provide fallbacks**: Always have main element as backup focus target
4. **Provide skip links**: Allow users to bypass repetitive navigation
5. **Clear page titles**: Each page should have descriptive titles in `<h1>` elements