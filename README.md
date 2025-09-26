# 🌐 Accessible Components Library (WIP!)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/AlexandrSedymov/ACCESSIBLE-COMPONENTS)
[![Accessibility](https://img.shields.io/badge/a11y-WCAG%202.1%20AA-brightgreen.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1+-61dafb.svg)](https://reactjs.org/)

A comprehensive collection of **accessibility-first React components** built with TypeScript. This project demonstrates best practices for implementing WCAG 2.1 AA compliant UI components with proper focus management, screen reader support, and keyboard navigation.

## ✨ Features

- 🔍 **Accessibility-First**: Every component meets WCAG 2.1 AA standards
- 🧪 **Automated Testing**: Comprehensive test suite with axe-core integration
- 📱 **Responsive Design**: Mobile-first approach with all screen sizes supported
- 🎨 **Modern Stack**: React 19, TypeScript 5.8, Vite 7.1
- 🛠️ **Developer Experience**: ESLint, Prettier, and comprehensive tooling
- 📖 **Living Documentation**: Interactive examples with code snippets
- ⚡ **Performance Optimized**: Fast builds and optimal bundle sizes

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Yarn 4.10.2+

### Installation

```bash
# Clone the repository
git clone https://github.com/AlexandrSedymov/ACCESSIBLE-COMPONENTS.git
cd ACCESSIBLE-COMPONENTS

# Install dependencies
yarn install

# Start development server
yarn dev
```

Visit `http://localhost:5173` to see the components in action.

## 🏗️ Project Structure

```
src/
├── components/           # Reusable accessible components
│   ├── CodeExample.tsx          # Interactive code display
│   ├── InformationModal.tsx     # Accessible modal dialogs
│   ├── NativeAlertDialog.tsx    # Native HTML5 alert dialogs
│   ├── LinkSection.tsx          # Accessible navigation links
│   ├── Navbar.tsx              # Main navigation component
│   └── ResponsiveSquare.tsx    # Responsive layout helper
├── pages/                # Example pages demonstrating components
│   ├── Home.tsx                # Project overview and navigation
│   ├── InputField.tsx          # Form input accessibility examples
│   ├── LinksVsButtons.tsx      # Semantic element usage guide
│   ├── ModalDialog.tsx         # Modal implementation examples
│   └── RadioButton.tsx         # Radio button accessibility
├── styles/               # Component-specific CSS modules
│   ├── InformationModal.css    # Modal dialog styles
│   ├── NativeAlertDialog.css   # Alert dialog styles
│   └── ModalDialog.css         # Shared layout styles
├── utils/                # Testing and utility functions
│   └── test-accessibility.ts   # Axe-core testing utilities
└── __tests__/           # Comprehensive test suites
```

## 🧩 Available Components

### Modal Dialogs

- **InformationModal**: Custom React modal with full accessibility support
- **NativeAlertDialog**: HTML5 `<dialog>` element implementation

### Form Elements

- **Accessible Input Fields**: Proper labeling, validation, and error handling
- **Radio Button Groups**: Keyboard navigation and screen reader support

### Navigation

- **Semantic Links vs Buttons**: Proper usage examples and implementations
- **Responsive Navigation**: Mobile-first navigation patterns

### Layout Helpers

- **ResponsiveSquare**: Accessible responsive design patterns
- **CodeExample**: Interactive code display with syntax highlighting

## 🧪 Testing & Quality Assurance

### Accessibility Testing

```bash
# Run accessibility tests
yarn test:a11y

# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn test:coverage
```

### Code Quality

```bash
# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Format code with Prettier
yarn format

# Complete validation (format + lint + test + build)
yarn validate
```

### Automated Testing Features

- **axe-core Integration**: Automated accessibility violation detection
- **Screen Reader Testing**: Focus management and ARIA compliance validation
- **Keyboard Navigation**: Tab order and keyboard interaction testing
- **Visual Regression**: Consistent UI rendering across browsers

## 🎯 Accessibility Standards

This project implements and demonstrates:

### WCAG 2.1 AA Compliance

- ✅ **1.4.3 Contrast (Minimum)**: 4.5:1 contrast ratio for normal text
- ✅ **2.1.1 Keyboard**: All functionality available via keyboard
- ✅ **2.1.2 No Keyboard Trap**: Users can navigate away using keyboard
- ✅ **2.4.3 Focus Order**: Logical focus sequence
- ✅ **2.4.7 Focus Visible**: Clear focus indicators
- ✅ **3.2.2 On Input**: No unexpected context changes
- ✅ **4.1.2 Name, Role, Value**: Proper ARIA implementation

### Screen Reader Support

- Proper heading hierarchy (h1-h6)
- Descriptive link text and button labels
- ARIA labels and descriptions
- Live regions for dynamic content
- Skip links for navigation

### Keyboard Navigation

- Tab order management
- Focus trapping in modals
- Escape key handling
- Arrow key navigation where appropriate

## 🛠️ Development Scripts

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `yarn dev`        | Start development server                       |
| `yarn build`      | Build for production                           |
| `yarn preview`    | Preview production build                       |
| `yarn test`       | Run test suite                                 |
| `yarn test:ui`    | Run tests with UI                              |
| `yarn lint`       | Check code quality                             |
| `yarn format`     | Format code with Prettier                      |
| `yarn type-check` | TypeScript type checking                       |
| `yarn ci`         | Complete CI pipeline                           |
| `yarn validate`   | Full validation (format + lint + test + build) |

## 📚 Documentation

Each component includes:

- **Live Examples**: Interactive demonstrations
- **Code Snippets**: Copy-paste ready implementations
- **Accessibility Notes**: Specific compliance details
- **Browser Support**: Compatibility information
- **Usage Guidelines**: Best practices and common patterns

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-component`
3. Make your changes following accessibility best practices
4. Add tests for new components
5. Run validation: `yarn validate`
6. Submit a pull request

## 📋 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Accessibility testing powered by [axe-core](https://github.com/dequelabs/axe-core)
- Design inspired by accessibility-first principles

---

**Made with ♿ for a more accessible web**
