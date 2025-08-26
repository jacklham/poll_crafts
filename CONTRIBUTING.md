# Contributing to PollCraft 🤝

Thank you for your interest in contributing to PollCraft! This document provides guidelines and instructions for contributing to the project.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended package manager)
- Git
- A GitHub account

### Setting Up Your Development Environment

1. **Fork the repository**

   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/your-username/poll_crafts.git
   cd poll_crafts
   ```

2. **Add the upstream remote**

   ```bash
   git remote add upstream https://github.com/jacklham/poll_crafts.git
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

## 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

### How to Submit a Bug Report

1. **Use the GitHub issue tracker**
2. **Provide a clear title** that describes the issue
3. **Include detailed steps to reproduce** the bug
4. **Add screenshots or videos** if applicable
5. **Specify your environment** (OS, browser, Node.js version)

### Bug Report Template

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment**

- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Node.js version: [e.g. 18.17.0]
- pnpm version: [e.g. 8.6.0]
```

## ✨ Suggesting Features

We love feature suggestions! Here's how to propose new features:

1. **Check existing issues** to see if the feature has been requested
2. **Open a new issue** with the "feature request" label
3. **Describe the feature** in detail
4. **Explain the use case** and why it would be valuable
5. **Add mockups or examples** if possible

## 🔧 Development Workflow

### Branch Naming Convention

- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation changes
- `refactor/description` - for code refactoring

### Making Changes

1. **Create a new branch**

   ```bash
   git checkout -b feature/amazing-new-feature
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**

   ```bash
   # Run type checking
   pnpm typecheck

   # Run tests
   pnpm test

   # Test the build
   pnpm build
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

5. **Push to your fork**

   ```bash
   git push origin feature/amazing-new-feature
   ```

6. **Create a Pull Request**
   - Go to GitHub and create a new PR
   - Fill out the PR template
   - Link any related issues

### Commit Message Convention

We use conventional commits for clear and consistent commit messages:

- `feat:` - new feature
- `fix:` - bug fix
- `docs:` - documentation changes
- `style:` - formatting, missing semicolons, etc.
- `refactor:` - code refactoring
- `test:` - adding or updating tests
- `chore:` - updating dependencies, build tools, etc.

Examples:

```bash
feat: add poll voting functionality
fix: resolve authentication redirect issue
docs: update installation instructions
style: format code with prettier
```

## 🧪 Testing Guidelines

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

### Writing Tests

- Write tests for new features and bug fixes
- Place tests next to the code they test
- Use descriptive test names
- Follow the existing test patterns

Example test structure:

```typescript
describe("PollCreation", () => {
  it("should create a poll with valid data", () => {
    // Test implementation
  });

  it("should show validation errors for invalid data", () => {
    // Test implementation
  });
});
```

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract custom hooks for reusable logic
- Use proper prop types

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design
- Test on different screen sizes

### File Organization

```
client/
├── components/
│   ├── ui/          # Reusable UI components
│   ├── feature/     # Feature-specific components
│   └── layout/      # Layout components
├── pages/           # Route components
├── hooks/           # Custom hooks
├── contexts/        # React contexts
├── lib/             # Utility functions
└── types/           # Type definitions
```

## 🔍 Code Review Process

### For Contributors

- Ensure your PR has a clear description
- Link any related issues
- Respond to review feedback promptly
- Keep PRs focused and reasonably sized

### Review Checklist

- [ ] Code follows the style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated if needed
- [ ] No breaking changes (or properly documented)
- [ ] Performance considerations are addressed

## 📖 Documentation

### Updating Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions
- Update type definitions
- Include examples in documentation

### Documentation Style

- Use clear, concise language
- Include code examples
- Add screenshots for UI changes
- Keep documentation up to date

## 🎉 Recognition

Contributors will be recognized in:

- GitHub contributors list
- Project README
- Release notes for significant contributions

## 📞 Getting Help

If you need help with contributing:

- **GitHub Discussions** - for general questions
- **Issues** - for bug reports and feature requests
- **Discord/Slack** - for real-time chat (if available)

## 📄 License

By contributing to PollCraft, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to PollCraft! 🙏
