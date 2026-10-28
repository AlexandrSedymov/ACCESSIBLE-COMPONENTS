# 🌐 Accessible Components Library (WIP!)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/AlexandrSedymov/ACCESSIBLE-COMPONENTS)
[![Accessibility](https://img.shields.io/badge/a11y-WCAG%202.1%20AA-brightgreen.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1+-61dafb.svg)](https://reactjs.org/)

A comprehensive collection of **accessibility-first React components** built with TypeScript. This project demonstrates best practices for implementing WCAG 2.1 AA compliant UI components with proper focus management, screen reader support, and keyboard navigation.

## ✨ Features

- 🔍 **Accessibility-First**: Every component meets WCAG 2.1 AA standards (WIP)
- 🧪 **Automated Testing**: Comprehensive test suite with axe-core integration
- 📱 **Responsive Design**: Mobile-first approach with all screen sizes supported
- 🎨 **Modern Stack**: React 19, TypeScript 5.8, Vite 7.1
- 🛠️ **Developer Experience**: ESLint, Prettier, and comprehensive tooling
- 📖 **Living Documentation**: Interactive examples with code snippets

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
pnpm install

# Start development server
pnpm dev
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

## 🧪 Testing & Quality Assurance

### Accessibility Testing

```bash
# Run accessibility tests
pnpm test:a11y

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Code Quality

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code with Prettier
pnpm format

# Complete validation (format + lint + test + build)
pnpm validate
```

## 🛠️ Development Scripts

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `pnpm dev`        | Start development server                       |
| `pnpm build`      | Build for production                           |
| `pnpm preview`    | Preview production build                       |
| `pnpm test`       | Run test suite                                 |
| `pnpm test:ui`    | Run tests with UI                              |
| `pnpm lint`       | Check code quality                             |
| `pnpm format`     | Format code with Prettier                      |
| `pnpm type-check` | TypeScript type checking                       |
| `pnpm ci`         | Complete CI pipeline                           |
| `pnpm validate`   | Full validation (format + lint + test + build) |

## 📚 Documentation

Each component includes:

- **Live Examples**: Interactive demonstrations
- **Code Snippets**: Copy-paste ready implementations
- **Accessibility Notes**: Specific compliance details

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

---

**Made with ♿ for a more accessible web**
