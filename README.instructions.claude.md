# Accessible Components - Codebase Analysis & Documentation

## 📋 Research Methodology

This document follows a systematic three-step approach to analyze the codebase:

**Step 1:** Read project documentation (README.md, docs/) to understand architecture and conventions  
**Step 2:** Scan the `src/` directory focusing on components, hooks, services, utilities, and workflows  
**Step 3:** Identify and document critical logic, edge cases, and business rules

---

## 🎯 Business Goals & Project Overview

### Primary Objectives
- **Accessibility-First Development**: Demonstrate WCAG 2.1 AA compliant React components
- **Educational Resource**: Teach developers how to build accessible web applications
- **Best Practices Showcase**: Provide reference implementations for common UI patterns
- **Testing Framework**: Establish automated accessibility testing standards

### Target Audience
- Frontend developers learning accessibility
- Teams implementing WCAG compliance
- React developers needing accessible component patterns
- QA engineers testing for accessibility

### Key Success Metrics
- All components pass WCAG 2.1 AA standards
- 100% keyboard navigability
- Screen reader compatibility (VoiceOver, NVDA, JAWS)
- Automated test coverage for accessibility violations
- Cross-browser E2E testing (Chrome, Firefox, Safari)

---

## 🏗️ Architecture Analysis

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser                          │
│  ┌───────────────────────────────────────────────┐ │
│  │         React Application (SPA)               │ │
│  │  ┌─────────────────────────────────────────┐ │ │
│  │  │  Router (React Router v7.9)             │ │ │
│  │  │  - Client-side navigation                │ │ │
│  │  │  - Focus management on route change      │ │ │
│  │  └─────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────┐ │ │
│  │  │  Pages (Route Components)               │ │ │
│  │  │  - Home, ModalDialog, LinksVsButtons   │ │ │
│  │  │  - InputField                           │ │ │
│  │  └─────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────┐ │ │
│  │  │  Reusable Components                    │ │ │
│  │  │  - InformationModal (React state)      │ │ │
│  │  │  - NativeAlertDialog (HTML5 dialog)    │ │ │
│  │  │  - LibraryModal (Radix UI)             │ │ │
│  │  │  - Navbar, CodeExample, LinkSection    │ │ │
│  │  └─────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────┐ │ │
│  │  │  Custom Hooks                           │ │ │
│  │  │  - useFocusManagement                   │ │ │
│  │  └─────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────┐ │ │
│  │  │  Utilities                              │ │ │
│  │  │  - test-accessibility.ts                │ │ │
│  │  │  - dialog-polyfill.ts                   │ │ │
│  │  └─────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
        ↓                          ↓
┌──────────────────┐    ┌──────────────────────┐
│  Accessibility   │    │   Testing Suite      │
│  Testing Tools   │    │  - Vitest + axe-core │
│  - axe-core      │    │  - Playwright E2E    │
│  - @axe-core/    │    │  - Testing Library   │
│    react         │    └──────────────────────┘
└──────────────────┘
```

### Technology Stack Summary
- **Frontend Framework**: React 19.1 (latest with concurrent features)
- **Language**: TypeScript 5.8 (strict mode enabled)
- **Build Tool**: Vite 7.1 + SWC (ultra-fast compilation)
- **Routing**: React Router DOM 7.9 (client-side navigation)
- **Forms**: React Hook Form 7.63 (performant, uncontrolled forms)
- **Styling**: TailwindCSS 4.1 + CSS Modules
- **UI Primitives**: Radix UI (accessible, unstyled components)
- **Testing**: Vitest 3.2, Playwright 1.56, Testing Library, jest-axe

---

## 🔍 Critical Logic Analysis

### 1. Focus Management System (`useFocusManagement.ts`)

**Purpose**: Automatically manages focus when users navigate between pages for screen reader and keyboard accessibility.

**Critical Logic Flow**:
```typescript
Route Change Detected (useLocation)
    ↓
Wait 100ms (DOM update delay)
    ↓
Query for #main-content element
    ↓
    ├─→ H1 element exists?
    │     ├─→ YES: Focus H1 (VoiceOver optimal)
    │     └─→ NO: Focus main element (fallback)
    ↓
Add tabindex="-1" (programmatic focus)
    ↓
Apply visual focus indicator (2px outline)
    ↓
Set up cleanup listeners (click/keydown)
    ↓
Auto-remove outline after 3s OR user interaction
```

**Edge Cases Handled**:
- ✅ **No H1 element**: Falls back to main element
- ✅ **No main element**: Fails gracefully (no error)
- ✅ **VoiceOver compatibility**: Prioritizes H1 for better announcements
- ✅ **Multiple navigations**: Cleanup prevents memory leaks
- ✅ **User interaction**: Removes visual outline on click/keydown
- ✅ **Configurable delay**: Default 100ms, adjustable via parameter
- ✅ **Configurable target**: Default `#main-content`, adjustable

**Business Impact**: Essential for WCAG 2.4.3 (Focus Order) compliance and superior UX for assistive technology users.

---

### 2. Modal Focus Trapping (`InformationModal.tsx`)

**Purpose**: Prevents keyboard focus from escaping modal dialogs, maintaining proper accessibility.

**Critical Logic Flow**:
```typescript
Modal Opens
    ↓
Query all focusable elements (FOCUSABLE_SELECTOR)
    ↓
Identify firstElement and lastElement
    ↓
Listen for Tab key events
    ↓
    ├─→ Tab pressed at lastElement → Focus firstElement
    │   (prevent.default to stop browser default)
    │
    └─→ Shift+Tab pressed at firstElement → Focus lastElement
        (prevent.default to stop browser default)
```

**Focusable Elements Selector**:
```typescript
const FOCUSABLE_SELECTOR = 
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
```

**Edge Cases Handled**:
- ✅ **No focusable elements**: Guards against empty array
- ✅ **Modal closed during Tab**: Cleanup removes event listener
- ✅ **ESC key**: Separate listener closes modal and restores focus
- ✅ **Backdrop click**: Closes modal and returns focus to trigger
- ✅ **Enter/Space on backdrop**: Accessible backdrop closure
- ✅ **Initial focus**: Title element focused first (screen reader context)
- ✅ **Focus restoration**: Returns to trigger button on close

**Business Impact**: Critical for WCAG 2.1.2 (No Keyboard Trap) compliance and modal usability.

---

### 3. Form Validation (`InputField.tsx`)

**Purpose**: Validate user input with accessible error messaging using React Hook Form.

**Critical Logic Flow**:
```typescript
Form Field Configuration (React Hook Form)
    ↓
Validation Mode: "onBlur" (accessibility-friendly)
    ↓
User Interactions:
    ├─→ Field Blur → Validate → Show errors
    ├─→ Form Submit → Validate all → Submit if valid
    └─→ Reset form → Clear errors and values
    ↓
Error Display:
    ├─→ aria-invalid="true" on invalid fields
    ├─→ aria-describedby links to error message
    └─→ Visual error styling
```

**Form Types**:
1. **UserProfileFormData**: Multi-field profile form
   - Text inputs: firstName, lastName, email, phone
   - Number input: age (with min validation)
   - Select: country
   - Textarea: bio
   - Checkbox: newsletter
   - Radio group: preferredContact

2. **LoginFormData**: Simple login modal
   - Text input: username
   - Password input: password
   - Checkbox: rememberMe

**Edge Cases Handled**:
- ✅ **Validation timing**: `onBlur` mode reduces noise for assistive tech
- ✅ **Field states**: Tracks touched, dirty, valid states
- ✅ **Async submission**: `isSubmitting` state prevents double submission
- ✅ **Modal form reset**: Clears form data when modal closes
- ✅ **Focus management**: First input focused when modal opens
- ✅ **Accessible errors**: ARIA attributes link errors to fields
- ✅ **Submit prevention**: Form disabled until valid

**Business Impact**: Ensures WCAG 3.3.1 (Error Identification) and 3.3.2 (Labels or Instructions) compliance.

---

### 4. Dialog Polyfill (`dialog-polyfill.ts`)

**Purpose**: Provide HTMLDialogElement functionality in test environments (JSDOM).

**Critical Logic Flow**:
```typescript
setupDialogPolyfill() called in test setup
    ↓
Check if HTMLDialogElement exists
    ↓
    ├─→ showModal() missing?
    │     ├─→ Set open attribute
    │     ├─→ Add role="dialog"
    │     ├─→ Add aria-modal="true"
    │     ├─→ Focus dialog element
    │     ├─→ Attach ESC key listener
    │     └─→ Dispatch 'dialog:opened' event
    │
    └─→ close() missing?
          ├─→ Remove open attribute
          ├─→ Remove aria-modal
          ├─→ Cleanup ESC listener
          └─→ Dispatch 'dialog:closed' event
```

**Edge Cases Handled**:
- ✅ **Double polyfilling**: Checks if methods exist before adding
- ✅ **Browser vs test environment**: Only polyfills in testing
- ✅ **Memory leaks**: Stores and cleans up event listeners
- ✅ **Accessibility attributes**: Adds ARIA attributes for testing
- ✅ **Event dispatching**: Custom events for test assertions
- ✅ **TypeScript support**: Extends HTMLDialogElement interface

**Business Impact**: Enables comprehensive testing of native dialog elements without browser dependencies.

---

### 5. Accessibility Testing Utilities (`test-accessibility.ts`)

**Purpose**: Provide reusable testing functions for automated accessibility validation.

**Critical Functions**:

#### `axe` - Configured axe-core instance
```typescript
export const axe = configureAxe({
  rules: {
    'color-contrast': { enabled: true },
    'landmark-unique': { enabled: true },
    region: { enabled: true },
  },
  resultTypes: ['violations'], // Only report failures
});
```

#### `testA11y()` - Enhanced testing with logging
```typescript
testA11y(element, options)
    ↓
Run axe-core on element
    ↓
Violations found?
    ├─→ YES: Log detailed report to console
    │   ├─→ Violation ID and description
    │   ├─→ Impact level (critical, serious, moderate, minor)
    │   ├─→ Help URL for remediation
    │   ├─→ Affected nodes with HTML
    │   └─→ Failure summary
    │
    └─→ NO: Return empty results
```

#### `testComponentA11y()` - Throw on violations
```typescript
testComponentA11y(container, componentName)
    ↓
Run testA11y()
    ↓
Violations found?
    ├─→ YES: Throw descriptive error with:
    │   - Component name (if provided)
    │   - Violation count
    │   - List of all violations
    │
    └─→ NO: Pass silently
```

#### `testKeyboardNavigation()` - Focusable elements check
```typescript
testKeyboardNavigation(container)
    ↓
Query for focusable elements (a[href], button, input, etc.)
    ↓
No elements found?
    ├─→ YES: Warn and exit
    │
    └─→ NO: Iterate through elements
          ├─→ Check visibility (offsetWidth/Height > 0)
          ├─→ Check enabled state (no disabled attribute)
          ├─→ Check tabindex (not "-1")
          └─→ Count truly focusable elements
```

**Edge Cases Handled**:
- ✅ **No violations**: Silent success (no noise)
- ✅ **Multiple violations**: Groups by type, shows all
- ✅ **Empty containers**: Warns instead of fails
- ✅ **Hidden elements**: Filters out non-focusable elements
- ✅ **Disabled elements**: Excludes from keyboard navigation test
- ✅ **Custom selectors**: Supports extended focusable selector
- ✅ **Result types**: Configurable (violations only by default)

**Business Impact**: Automates WCAG testing, catches violations early in development cycle.

---

### 6. Navigation & Routing (`App.tsx`, `Navbar.tsx`)

**Purpose**: Provide accessible client-side navigation with proper focus management.

**Critical Logic Flow**:

#### Application Initialization
```typescript
App Component
    ↓
BrowserRouter (React Router)
    ↓
AppContent
    ├─→ useFocusManagement() hook activated
    ├─→ Skip link to #main-title
    ├─→ Navbar component
    └─→ Routes definition
```

#### Navigation Component
```typescript
Navbar renders navigation links
    ↓
useLocation() gets current path
    ↓
For each navItem:
    ├─→ Compare href with current path
    ├─→ isCurrentPage === true?
    │     ├─→ Add 'navbar-link--current' class
    │     ├─→ Add aria-current="page"
    │     └─→ Visual indicator for current page
    │
    └─→ Render <Link> with:
          ├─→ Semantic <a> element (React Router)
          ├─→ Proper ARIA attributes
          └─→ Keyboard accessible (Enter key)
```

**Navigation Items** (Business Logic):
```typescript
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Modal Dialog', href: '/modal-dialog' },
  { label: 'Links VS Buttons', href: '/links-vs-buttons' },
  { label: 'Input Fields', href: '/input-fields' },
  // { label: 'Radio Buttons', href: '/radio-buttons' }, // Commented out
];
```

**Edge Cases Handled**:
- ✅ **Current page indication**: Visual and semantic (aria-current)
- ✅ **Keyboard navigation**: Full Tab and Enter support
- ✅ **Focus management**: Auto-focus main content on navigation
- ✅ **Skip link**: Allows bypassing navigation (WCAG 2.4.1)
- ✅ **Route not found**: Falls back gracefully (no 404 component)
- ✅ **Multiple navigation methods**: Supports browser back/forward

**Business Impact**: Ensures WCAG 2.4.1 (Bypass Blocks), 2.4.3 (Focus Order), and 2.4.8 (Location) compliance.

---

### 7. Three Modal Implementation Patterns

The project demonstrates three different approaches to modal dialogs, each with unique characteristics:

#### Pattern 1: React State-Based Modal (`InformationModal.tsx`)

**Approach**: Manual implementation using React state and DOM manipulation.

**Key Features**:
- ✅ Full manual control over focus management
- ✅ Custom focus trapping implementation
- ✅ Manual ESC key handling
- ✅ Manual backdrop click handling
- ✅ Manual focus restoration to trigger button
- ✅ Uses `role="dialog"` and `aria-modal="true"`

**When to Use**:
- Need complete control over behavior
- Custom animations or transitions
- Specific focus management requirements
- Learning/teaching accessibility concepts

**Complexity**: HIGH (Most code, most control)

---

#### Pattern 2: Native HTML5 Dialog (`NativeAlertDialog.tsx`)

**Approach**: Uses browser's native `<dialog>` element with `showModal()`.

**Key Features**:
- ✅ Browser-native focus trapping (automatic)
- ✅ Browser-native ESC key handling (automatic)
- ✅ Browser-native focus restoration (automatic)
- ✅ Browser-native backdrop (via `::backdrop` CSS)
- ✅ Uses `role="alertdialog"` for alerts
- ⚠️ Requires polyfill for older browsers
- ⚠️ Requires polyfill for JSDOM testing

**When to Use**:
- Modern browser targets (Chrome 37+, Firefox 98+, Safari 15.4+)
- Minimal JavaScript overhead
- Standard dialog behavior is sufficient
- Alert/confirmation dialogs

**Complexity**: LOW (Browser handles most behavior)

---

#### Pattern 3: Radix UI Library Modal (`LibraryModal.tsx`)

**Approach**: Uses Radix UI Dialog primitive (headless, accessible by default).

**Key Features**:
- ✅ Production-ready accessibility
- ✅ Built-in focus management
- ✅ Built-in keyboard handling
- ✅ Composable API (Portal, Overlay, Content, Close)
- ✅ Handles edge cases (nested dialogs, portals, etc.)
- ✅ Minimal code, maximum reliability
- ✅ Customizable via props and styling

**When to Use**:
- Production applications
- Need reliability and maintainability
- Want to focus on styling/UX, not accessibility plumbing
- Composable dialog components

**Complexity**: MEDIUM (Learn Radix API, but less code overall)

---

**Business Decision Matrix**:

| Factor                    | React State | Native Dialog | Radix UI |
|---------------------------|-------------|---------------|----------|
| **Browser Support**       | ✅ All      | ⚠️ Modern     | ✅ All   |
| **Code Complexity**       | ❌ High     | ✅ Low        | ✅ Low   |
| **Customization**         | ✅ Full     | ⚠️ Limited    | ✅ High  |
| **Maintenance**           | ❌ Manual   | ✅ Browser    | ✅ Lib   |
| **Production Ready**      | ⚠️ Requires testing | ✅ Yes | ✅ Yes   |
| **Learning Value**        | ✅ High     | ✅ Medium     | ⚠️ Low   |
| **Accessibility Guaranteed** | ⚠️ DIY   | ✅ Native     | ✅ Built-in |

---

## 🎨 Business Logic & Domain Rules

### 1. Page Structure Requirements (WCAG Compliance)

**Rule**: Every page MUST follow this structure:

```tsx
<main id="main-content" role="main" className="page-class">
  <h1 id="main-title">Page Title</h1>
  {/* Page content */}
</main>
```

**Rationale**:
- `id="main-content"`: Target for focus management hook
- `role="main"`: Landmark for screen reader navigation
- `<h1>`: First heading for VoiceOver focus priority
- `id="main-title"`: Target for skip link

**Enforced By**: `useFocusManagement` hook will fail gracefully if violated.

---

### 2. Focusable Elements Definition

**Rule**: Elements considered focusable in modal focus trapping:

```typescript
const FOCUSABLE_SELECTOR = 
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
```

**Exclusions**:
- ❌ `tabindex="-1"`: Programmatic focus only
- ❌ Hidden elements: `display: none` or `visibility: hidden`
- ❌ Disabled elements: `disabled` attribute

**Business Impact**: Ensures keyboard users can navigate modal dialogs efficiently.

---

### 3. External Link Handling

**Rule**: External links MUST include:

```tsx
<a 
  href="https://external.com"
  target="_blank"
  rel="noopener noreferrer"
  className="external-link"
>
  Link Text
  <span className="sr-only">(opens in a new tab)</span>
</a>
```

**Required Attributes**:
- `target="_blank"`: Open in new tab
- `rel="noopener noreferrer"`: Security (prevent window.opener access)
- Screen reader text: Warns about new tab

**Business Impact**: WCAG 3.2.5 (Change on Request) - users aren't surprised by new tabs.

---

### 4. Form Validation Timing

**Rule**: Use `mode: 'onBlur'` for React Hook Form validation.

```typescript
useForm<FormData>({
  mode: 'onBlur', // NOT 'onChange'
});
```

**Rationale**:
- ✅ Reduces noise for screen reader users
- ✅ Doesn't interrupt typing flow
- ✅ Shows errors after user completes field
- ❌ `onChange` mode announces errors while typing (bad UX)

**Business Impact**: Better accessibility and user experience.

---

### 5. Color Contrast Requirements

**Rule**: All text MUST meet WCAG AA contrast ratios:

- Normal text (< 18pt): 4.5:1
- Large text (≥ 18pt or bold ≥ 14pt): 3:1

**Enforcement**:
- Automated: `axe-core` with `color-contrast` rule enabled
- CI/CD: Fails build if violations found
- Development: `@axe-core/react` logs violations in console

**Business Impact**: WCAG 1.4.3 (Contrast Minimum) compliance.

---

### 6. Keyboard Navigation Standards

**Rule**: All interactive elements MUST be keyboard accessible.

**Standards**:
- **Links**: Activated by Enter key
- **Buttons**: Activated by Enter OR Space key
- **Modals**: ESC key closes, Tab/Shift+Tab cycles focus
- **Forms**: Tab navigates fields, Enter submits
- **Skip Links**: First element, visible on focus

**Testing**: `testKeyboardNavigation()` utility enforces these rules.

**Business Impact**: WCAG 2.1.1 (Keyboard) compliance.

---

## 🧪 Testing Strategy

### Unit Tests (Vitest + Testing Library)

**Coverage**:
- Component rendering and accessibility
- Custom hooks behavior
- Utility functions
- Form validation logic

**Example Test Pattern**:
```typescript
describe('ComponentName', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

### E2E Tests (Playwright)

**Coverage**:
- Navigation flows
- Cross-browser compatibility (Chrome, Firefox, Safari)
- Visual regression testing
- Full user workflows

**Configuration**:
- Retries in CI: 2
- Workers in CI: 1 (sequential for stability)
- Base URL: `http://localhost:5173`
- Test directory: `./tests/e2e`

---

### Accessibility Testing (axe-core)

**Levels**:
1. **Development**: `@axe-core/react` logs violations in console
2. **Unit Tests**: `jest-axe` in component tests
3. **CI/CD**: `@axe-core/cli` scans built application

**CI Integration**:
```bash
# Install matching Chrome/ChromeDriver
npx browser-driver-manager install chrome

# Run axe scan
axe http://localhost:3000 --exit --save axe-results.json
```

**Failure Handling**: CI fails if any violations found.

---

## 🚨 Common Edge Cases & Solutions

### Edge Case 1: VoiceOver Focus Announcement

**Problem**: VoiceOver may not announce page change properly.

**Solution**: Focus H1 element instead of main element.

```typescript
// Priority: H1 > main element
const h1Element = mainElement.querySelector('h1');
if (h1Element) {
  h1Element.focus(); // VoiceOver reads heading content
} else {
  mainElement.focus(); // Fallback
}
```

**Documented In**: `docs/VOICEOVER_FOCUS_SOLUTIONS.md`

---

### Edge Case 2: Modal Focus on Rapid Open/Close

**Problem**: Focus restoration may fail if modal closes before focus is set.

**Solution**: Use setTimeout to defer focus restoration.

```typescript
const closeModal = () => {
  setIsOpen(false);
  setTimeout(() => {
    triggerButtonRef.current?.focus(); // Deferred focus
  }, 0);
};
```

---

### Edge Case 3: Form Submit While Validating

**Problem**: User could submit form multiple times during async validation.

**Solution**: Track `isSubmitting` state and disable button.

```typescript
const { formState: { isSubmitting } } = useForm();

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>
```

---

### Edge Case 4: Dialog Polyfill in JSDOM

**Problem**: JSDOM doesn't implement HTMLDialogElement methods.

**Solution**: Custom polyfill in test setup.

```typescript
// test-setup.ts
import { setupDialogPolyfill } from './utils/dialog-polyfill';
setupDialogPolyfill();
```

**Documented In**: `src/utils/dialog-polyfill.ts`

---

### Edge Case 5: Skip Link Not Visible

**Problem**: Skip link should be visible on keyboard focus but hidden otherwise.

**Solution**: CSS-based visibility on focus.

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0; /* Visible on focus */
}
```

---

## 📊 Data Flow & State Management

### State Management Architecture

```
┌──────────────────────────────────────────────┐
│         Application State                    │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │  URL State (React Router)              │ │
│  │  - Current route                       │ │
│  │  - Navigation history                  │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │  Component Local State (useState)      │ │
│  │  - Modal open/close states             │ │
│  │  - Form data (temporary)               │ │
│  │  - UI toggles (notifications, etc.)    │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │  Form State (React Hook Form)          │ │
│  │  - Field values                        │ │
│  │  - Validation errors                   │ │
│  │  - Form submission state               │ │
│  │  - Touched/dirty/valid states          │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │  Refs (useRef)                         │ │
│  │  - DOM element references              │ │
│  │  - Focus management targets            │ │
│  │  - Modal/dialog references             │ │
│  └────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘

No global state management (Redux, Context, etc.)
Rationale: Simple demo app, component state sufficient
```

---

### Data Validation Rules

**Form Validation** (React Hook Form):

```typescript
// Example: Email validation
register('email', {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address'
  }
});

// Example: Age validation
register('age', {
  required: 'Age is required',
  min: {
    value: 18,
    message: 'Must be at least 18 years old'
  },
  max: {
    value: 120,
    message: 'Invalid age'
  }
});
```

**Validation Triggers**:
- `mode: 'onBlur'`: Validate when field loses focus
- Form submission: Validate all fields before submitting
- Manual: `trigger('fieldName')` for programmatic validation

---

## 🔒 Security Considerations

### 1. External Link Security

**Rule**: All external links include `rel="noopener noreferrer"`.

**Rationale**:
- `noopener`: Prevents new tab from accessing `window.opener`
- `noreferrer`: Prevents referrer header leakage

### 2. XSS Prevention

**Protection**: React automatically escapes user input.

**Safe Patterns**:
```typescript
// ✅ Safe: React escapes by default
<p>{userInput}</p>

// ❌ Dangerous: Avoid dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### 3. Form Data Handling

**Current Implementation**: Client-side only (no API calls).

**Production Considerations**:
- Use HTTPS for form submission
- Implement CSRF protection
- Sanitize input on server-side
- Validate on both client and server

---

## 📈 Performance Optimizations

### 1. Code Splitting (Vite Configuration)

**Strategy**: Manual chunks for better caching.

```typescript
manualChunks: {
  'react-vendor': ['react', 'react-dom'],
  'router': ['react-router-dom'],
  'syntax-highlighter': ['react-syntax-highlighter/dist/esm/light'],
  // ... more chunks
}
```

**Benefits**:
- Smaller initial bundle
- Better browser caching
- Faster subsequent loads

### 2. SWC Compilation

**Tool**: Vite + @vitejs/plugin-react-swc

**Benefits**:
- 20x faster than Babel
- Lower development server startup time
- Faster hot module replacement (HMR)

### 3. React Hook Form Performance

**Strategy**: Uncontrolled components + minimal re-renders.

**Benefits**:
- No re-render on every keystroke
- Faster form interactions
- Lower memory footprint

---

## 🎓 Key Learnings & Best Practices

### 1. Focus Management is Critical

**Lesson**: Screen readers need explicit focus management on route changes.

**Implementation**: `useFocusManagement` hook

### 2. Three Viable Modal Patterns

**Lesson**: Choose based on browser support, customization needs, and team expertise.

**Options**: React state, native dialog, Radix UI

### 3. Validation Timing Matters

**Lesson**: `onBlur` validation is more accessible than `onChange`.

**Rationale**: Less noise for screen reader users

### 4. Testing Must Include Accessibility

**Lesson**: Visual testing alone is insufficient.

**Solution**: Automated axe-core scanning in unit, integration, and E2E tests

### 5. Native HTML is Powerful

**Lesson**: Native `<dialog>` element handles most accessibility automatically.

**Caveat**: Requires browser support and polyfill for testing

---

## 🛠️ Development Workflows

### Local Development Workflow

```bash
# 1. Start development server
yarn dev

# 2. Run tests in watch mode (separate terminal)
yarn test:watch

# 3. Make changes
# - Edit components in src/components/
# - Edit pages in src/pages/
# - Edit styles in src/styles/

# 4. Verify accessibility
# - Check browser console for @axe-core/react violations
# - Run tests to catch regressions

# 5. Format and lint
yarn format:fix  # Fix formatting and linting

# 6. Type check
yarn type-check

# 7. Build
yarn build

# 8. Preview build
yarn preview
```

### Pre-Commit Checklist

- [ ] All tests pass (`yarn test:run`)
- [ ] No linting errors (`yarn lint`)
- [ ] No type errors (`yarn type-check`)
- [ ] No accessibility violations (check console)
- [ ] Code formatted (`yarn format`)

### CI/CD Workflow

```yaml
GitHub Actions Workflow:
1. Checkout code
2. Setup Node.js 22.x
3. Setup Yarn 4.10.2
4. Install dependencies (with cache)
5. Run ESLint
6. Run accessibility tests
7. Build project
8. Run axe-core scan on built app
9. Upload artifacts (test results, axe results)
```

---

## 📚 Additional Resources

### Internal Documentation
- `README.md` - Project overview and quick start
- `ACCESSIBILITY.md` - Accessibility configuration and standards
- `docs/FOCUS_MANAGEMENT.md` - Detailed focus management guide
- `docs/VOICEOVER_FOCUS_SOLUTIONS.md` - VoiceOver-specific solutions

### External Resources
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)

---

## 🔄 Future Enhancements & TODOs

### Potential Improvements
- [ ] Add Radio Button page (currently commented out)
- [ ] Implement server-side form submission
- [ ] Add more complex form validation examples
- [ ] Create reusable accessible component library
- [ ] Add internationalization (i18n)
- [ ] Implement dark mode toggle (with prefers-color-scheme)
- [ ] Add more E2E test coverage
- [ ] Create component documentation generator
- [ ] Add visual regression testing (Percy, Chromatic)

### Known Limitations
- No backend/API integration (client-side only)
- No authentication/authorization examples
- Limited form examples (no file uploads, drag-drop, etc.)
- No complex state management demonstrations

---

## 📝 Conclusion

This codebase serves as a comprehensive educational resource for building accessible React applications. It demonstrates:

- ✅ Three different modal implementation patterns
- ✅ Automated accessibility testing at multiple levels
- ✅ Focus management for single-page applications
- ✅ Form validation with accessibility considerations
- ✅ Keyboard navigation best practices
- ✅ Screen reader compatibility techniques
- ✅ WCAG 2.1 AA compliance strategies

The architecture prioritizes simplicity and educational value while maintaining production-quality accessibility standards. Each component serves as a reference implementation for common UI patterns.

**Target Audience**: Developers learning accessibility, teams implementing WCAG compliance, and accessibility advocates seeking practical examples.

**Success Metric**: If a developer can copy a component from this project and use it confidently in production, knowing it meets accessibility standards, the project has succeeded.
