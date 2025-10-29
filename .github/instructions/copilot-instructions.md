# 🦾 Copilot Instructions for ACCESSIBLE-COMPONENTS

## Project Overview
- **React + TypeScript** library focused on accessibility-first UI components.
- All components aim for WCAG 2.1 AA compliance: focus management, keyboard navigation, screen reader support.
- Modern stack: React 19, TypeScript 5.8, Vite 7.1, Yarn 4 (managed via Corepack).

## Architecture & Structure
- `src/components/`: Core reusable components (modals, dialogs, navigation, code examples).
- `src/pages/`: Example pages demonstrating component usage and accessibility patterns.
- `src/styles/`: CSS modules for each component/page.
- `src/utils/`: Utility functions, including accessibility test helpers.
- `tests/e2e/`: Playwright end-to-end tests (see `playwright.config.ts`).
- `docs/`: Accessibility guides and solutions for focus management and screen readers.

## Developer Workflows
- **Install dependencies:** `yarn install` (Yarn 4 required; use Corepack)
- **Start dev server:** `yarn dev` (Vite, runs at http://localhost:5173)
- **Run unit tests:** `yarn test` (Vitest)
- **Run accessibility tests:** `yarn test:a11y` (axe-core integration)
- **Run e2e tests:** `yarn test:e2e` (Playwright)
- **Lint & format:** `yarn lint`, `yarn format`, `yarn validate`
- **Build for production:** `yarn build`

## Patterns & Conventions
- **Accessibility-first:** All components use ARIA roles, keyboard handlers, and focus management utilities.
- **Testing:** Unit tests in `src/components/__tests__` and `src/hooks/__tests__`; e2e tests in `tests/e2e`.
- **Utilities:** Use `src/utils/test-accessibility.ts` for axe-core accessibility assertions.
- **Documentation:** Each component/page is documented with live examples and accessibility notes.
- **Styling:** CSS modules per component/page; no global styles except resets.
- **Modal/Dialog:** See `InformationModal.tsx`, `LibraryModal.tsx`, and `NativeAlertDialog.tsx` for accessible dialog patterns.

## Integration Points
- **axe-core:** Used for automated accessibility testing.
- **Playwright:** For browser-based e2e tests; config in `playwright.config.ts`.
- **Radix UI:** Used for some primitives (dialogs, tooltips) to ensure accessibility.

## Example: Accessibility Test Utility
```ts
// src/utils/test-accessibility.ts
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);
export async function testA11y(element) {
  const results = await axe(element);
  expect(results).toHaveNoViolations();
}
```

## CI/CD
- See `.github/workflows/accessibility.yml` for automated accessibility checks.

---
**For AI agents:**
- Always prioritize accessibility and WCAG compliance in new code.
- Reference existing components and utilities for patterns.
- Use project scripts for builds, tests, and formatting.
- Document new components/pages with accessibility notes and live examples.
