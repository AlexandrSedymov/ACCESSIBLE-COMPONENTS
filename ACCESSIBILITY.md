# Accessibility Configuration

This project uses multiple tools to ensure accessibility compliance:

## Development Mode
- **@axe-core/react**: Automatically runs accessibility audits in development mode
- Real-time accessibility violation reporting in browser console
- Checks against WCAG 2.1 AA standards

## Automated Testing
- **jest-axe**: Accessibility testing in unit/integration tests
- **Vitest**: Test runner with React Testing Library
- Comprehensive component accessibility validation

## Components Tested
- ✅ InformationModal (React state-based modal with manual focus management)
- ✅ NativeAlertDialog (HTML5 dialog with native browser focus handling)
- ✅ CodeExample (Accessible spoiler/dropdown with proper ARIA states)

## Running Tests

```bash
# Run all tests including accessibility
yarn test

# Run only accessibility tests with verbose output
yarn test:a11y

# Run tests in watch mode during development
yarn test:watch

# Run complete validation (lint + test + build)
yarn validate
```

## CI/CD Integration
- GitHub Actions workflow runs accessibility tests on every PR
- Automated axe-core scanning on built application
- Test results uploaded as artifacts for review

## Accessibility Standards Checked
- WCAG 2.0 Level A
- WCAG 2.0 Level AA
- WCAG 2.1 Level AA
- axe-core Best Practices

## Manual Testing Checklist
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Space, Escape)
- [ ] Screen reader testing (VoiceOver, NVDA, JAWS)
- [ ] High contrast mode compatibility
- [ ] Color contrast verification
- [ ] Focus management and visible focus indicators
- [ ] Mobile accessibility and touch targets

## Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WebAIM Guidelines](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)