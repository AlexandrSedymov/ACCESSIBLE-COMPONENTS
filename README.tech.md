# TODO rerun for every major changes -> tech stack for the project, libs used, general architure, conventions.

# Accessible Components - Technical Documentation

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1+** - Modern React with latest features and performance improvements
- **TypeScript 5.8+** - Type-safe JavaScript with advanced type checking
- **Vite 7.1+** - Fast build tool and dev server with SWC compilation
- **Node.js 20+** - Runtime environment
- **Yarn 4.10.2+** - Package manager with modern workspace support

### Styling & UI
- **TailwindCSS 4.1+** - Utility-first CSS framework
- **PostCSS 8.5+** - CSS processing and transformation
- **CSS Modules** - Scoped component-specific styling
- **Radix UI Primitives** - Accessible, unstyled UI components
  - `@radix-ui/react-dialog` - Modal dialogs
  - `@radix-ui/react-alert-dialog` - Alert dialogs
  - `@radix-ui/react-navigation-menu` - Navigation menus
  - `@radix-ui/react-tooltip` - Tooltips

### Routing & Forms
- **React Router DOM 7.9+** - Client-side routing
- **React Hook Form 7.63+** - Performant forms with minimal re-renders

### Development Tools
- **ESLint 9.33+** - Code linting with accessibility rules
- **Prettier 3.6+** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

### Testing Framework
- **Vitest 3.2+** - Unit and integration testing
- **Playwright 1.56+** - End-to-end testing
- **Testing Library** - React component testing utilities
  - `@testing-library/react` - React testing utilities
  - `@testing-library/user-event` - User interaction simulation
  - `@testing-library/jest-dom` - Custom Jest matchers
- **Axe-core 4.10+** - Accessibility testing
  - `@axe-core/react` - React integration
  - `jest-axe` - Jest integration for a11y tests
- **JSDOM 27.0+** - DOM implementation for Node.js testing

### Utility Libraries
- **clsx 2.1+** - Conditional class name utility
- **tailwind-merge 3.3+** - Tailwind class merging utility
- **react-syntax-highlighter 15.6+** - Code syntax highlighting

## 🏗️ Project Architecture

### Directory Structure
```
src/
├── components/          # Reusable accessible components
│   ├── __tests__/      # Component unit tests
│   └── *.tsx           # Individual components
├── pages/              # Page-level components (route handlers)
├── hooks/              # Custom React hooks
│   ├── __tests__/      # Hook unit tests
│   └── *.ts           # Custom hooks
├── styles/             # Component-specific CSS modules
├── utils/              # Utility functions and helpers
├── assets/             # Static assets (images, icons)
└── code-example/       # Code example text files

tests/
├── e2e/               # End-to-end tests (Playwright)
└── fixtures/          # Test data and fixtures

docs/                  # Project documentation
├── ACCESSIBILITY.md   # Accessibility guidelines
├── FOCUS_MANAGEMENT.md # Focus management patterns
└── VOICEOVER_FOCUS_SOLUTIONS.md # Screen reader solutions
```

### Component Architecture
- **Atomic Design Principles**: Components are built as reusable, composable units
- **Accessibility-First**: Every component implements WCAG 2.1 AA standards
- **TypeScript Interfaces**: Strong typing for props and component APIs
- **CSS Modules**: Scoped styling to prevent CSS conflicts
- **Radix UI Foundation**: Built on proven accessible primitives

### State Management
- **React Hooks**: Local component state using `useState`, `useEffect`
- **Custom Hooks**: Shared logic extraction (e.g., `useFocusManagement`)
- **React Hook Form**: Form state management with validation
- **URL State**: Route-based state via React Router

### Testing Architecture
- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: Component interaction and accessibility
- **E2E Tests**: Full user workflows and cross-browser testing
- **Accessibility Tests**: Automated a11y scanning with axe-core

## 📏 Conventions & Standards

### Code Style
- **ESLint Configuration**: Extends recommended rules + accessibility plugins
- **Prettier**: Consistent code formatting
- **TypeScript Strict Mode**: Maximum type safety
- **Import Organization**: Grouped and sorted imports

### Naming Conventions
```typescript
// Components: PascalCase
export const MyComponent: React.FC = () => {};

// Files: PascalCase for components, camelCase for utilities
MyComponent.tsx
useFocusManagement.ts

// CSS Classes: kebab-case with BEM methodology
.modal-dialog__header
.modal-dialog__content--active

// Props & Variables: camelCase
const userName = 'john';
interface ComponentProps {
  isVisible: boolean;
}
```

### Component Patterns
```typescript
// Functional Components with TypeScript
interface Props {
  title: string;
  isVisible?: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<Props> = ({ 
  title, 
  isVisible = false, 
  onClose 
}) => {
  // Component logic
};

// Custom Hooks
export const useCustomHook = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  // Hook logic
  return { value, setValue };
};
```

### Accessibility Standards
- **WCAG 2.1 AA Compliance**: All components meet accessibility guidelines
- **Semantic HTML**: Proper use of HTML elements for their intended purpose
- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus indication and trapping
- **Color Contrast**: Minimum 4.5:1 ratio for normal text

### Testing Patterns
```typescript
// Component Tests
describe('ComponentName', () => {
  it('should render with correct accessibility attributes', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// E2E Tests
test('navigation works correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Expected Title/);
});
```

### Git Workflow
- **Conventional Commits**: Standardized commit messages
  - `feat:` - New features
  - `fix:` - Bug fixes
  - `docs:` - Documentation updates
  - `test:` - Adding tests
  - `refactor:` - Code refactoring
- **Branch Naming**: `feature/`, `fix/`, `docs/`, `test/`
- **Pull Requests**: Required for main branch with CI checks

### Build & Deployment
- **Vite Build**: Optimized production builds with code splitting
- **Manual Chunks**: Strategic code splitting for better caching
- **TypeScript Compilation**: Type checking before build
- **Asset Optimization**: Automatic minification and compression

### CI/CD Pipeline
```yaml
# GitHub Actions workflow includes:
- ESLint code quality checks
- TypeScript type checking
- Unit tests with coverage
- Accessibility tests with axe-core
- E2E tests with Playwright
- Production build verification
```

## 🔧 Development Workflow

### Local Development
1. **Setup**: `yarn install` - Install dependencies
2. **Development**: `yarn dev` - Start dev server with HMR
3. **Testing**: `yarn test:watch` - Run tests in watch mode
4. **Type Checking**: `yarn type-check` - Verify TypeScript types
5. **Linting**: `yarn lint:fix` - Fix code quality issues
6. **Formatting**: `yarn format` - Apply consistent formatting

### Quality Assurance
- **Pre-commit**: Automated formatting and linting
- **CI Checks**: All tests must pass before merge
- **Accessibility**: Automated a11y scanning on every build
- **Cross-browser**: E2E testing across Chrome, Firefox, Safari

### Performance Considerations
- **Code Splitting**: Automatic chunking for better loading
- **Tree Shaking**: Unused code elimination
- **Bundle Analysis**: Regular bundle size monitoring
- **React Optimization**: Proper use of hooks and memoization
