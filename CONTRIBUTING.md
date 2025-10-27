# Contributing to EME 5608 Course Assistant

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, browser)

### Suggesting Enhancements

Enhancement suggestions are welcome! Include:

- **Clear title and description**
- **Use case** for the enhancement
- **Expected behavior**
- **Alternative solutions** you've considered

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test your changes** thoroughly
5. **Commit with clear messages**:
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/your-username/eme5608-course-assistant.git
cd eme5608-course-assistant

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your GEMINI_API_KEY

# Run development server
npm run dev
```

## Project Structure

```
eme5608-course-assistant/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── lib/           # Utilities
├── server/                # Backend Express app
│   ├── gemini.ts         # AI integration
│   ├── pdfExtractor.ts   # PDF processing
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage
└── shared/               # Shared types
    └── schema.ts         # Zod schemas
```

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Define proper types (avoid `any`)
- Use Zod for runtime validation

### React Components

```typescript
// Use functional components with hooks
export function MyComponent({ prop }: MyComponentProps) {
  const [state, setState] = useState<Type>(initial);
  
  return (
    <div data-testid="my-component">
      {/* content */}
    </div>
  );
}
```

### API Routes

```typescript
app.post("/api/endpoint", async (req, res) => {
  try {
    const validated = schema.parse(req.body);
    // ... logic
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Message" });
  }
});
```

### Styling

- Use TailwindCSS classes
- Follow existing color scheme
- Use shadcn/ui components
- Add `data-testid` for testable elements

### Git Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add delete confirmation dialog
fix: resolve timestamp serialization issue
docs: update deployment guide
refactor: extract timestamp normalization utilities
```

## Testing

### Manual Testing

Test these scenarios before submitting:

1. **First-time user flow**:
   - Open app
   - Click suggested prompt
   - Wait for PDF extraction
   - Verify response with page citations

2. **Chat history**:
   - Create multiple chats
   - Switch between sessions
   - Delete a session
   - Verify timestamps display correctly

3. **Responsive design**:
   - Test on mobile viewport
   - Test on tablet viewport
   - Test on desktop

### Automated Testing

```bash
# Run tests (when available)
npm test

# E2E tests
npm run test:e2e
```

## Areas for Contribution

### High Priority

- [ ] Add persistent database storage (PostgreSQL)
- [ ] Implement user authentication
- [ ] Add export chat functionality
- [ ] Improve PDF text extraction accuracy
- [ ] Add dark mode support

### Medium Priority

- [ ] Add support for multiple textbooks
- [ ] Implement search within chat history
- [ ] Add keyboard shortcuts
- [ ] Improve mobile UI/UX
- [ ] Add loading skeletons

### Low Priority

- [ ] Add chat sharing functionality
- [ ] Implement chat analytics
- [ ] Add more AI model options
- [ ] Create admin dashboard
- [ ] Add multilingual support

## Documentation

When adding features, update:

- `README.md` - User-facing documentation
- `DEPLOYMENT.md` - Deployment instructions
- Code comments - Complex logic explanation
- Type definitions - Keep schemas updated

## Questions?

- Open an issue for questions
- Tag with `question` label
- We'll respond as soon as possible

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing! 🎉
