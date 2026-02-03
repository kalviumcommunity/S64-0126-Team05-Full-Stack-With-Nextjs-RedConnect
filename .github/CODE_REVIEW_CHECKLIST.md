# Code Review Checklist

Use this checklist for every pull request review to ensure code quality and consistency.

## Code Quality
- [ ] Code follows naming conventions and structure
- [ ] Functionality verified locally
- [ ] No console errors or warnings
- [ ] ESLint + Prettier checks pass
- [ ] Comments and documentation are meaningful
- [ ] Sensitive data is not exposed

## Code Structure
- [ ] Files are organized according to project structure (`src/app/`, `src/components/`, `src/lib/`)
- [ ] Components are reusable and follow single responsibility principle
- [ ] No duplicate code or unnecessary complexity
- [ ] TypeScript types are properly defined and used

## Functionality
- [ ] Feature works as expected
- [ ] Edge cases are handled appropriately
- [ ] Error handling is implemented where needed
- [ ] User experience is considered (loading states, error messages, etc.)

## Security & Best Practices
- [ ] No hardcoded secrets or API keys
- [ ] Environment variables are used correctly
- [ ] Input validation is implemented
- [ ] No security vulnerabilities introduced

## Performance
- [ ] No unnecessary re-renders
- [ ] Large data sets are handled efficiently
- [ ] Images and assets are optimized
- [ ] Code splitting is considered for large features

## Testing
- [ ] Changes are tested locally
- [ ] Manual testing scenarios are covered
- [ ] No breaking changes to existing functionality

## Documentation
- [ ] Code is self-documenting with clear variable/function names
- [ ] Complex logic has explanatory comments
- [ ] README or relevant docs are updated if needed

## Git & PR
- [ ] Branch follows naming convention (`feature/`, `fix/`, `chore/`, `docs/`)
- [ ] Commit messages are clear and descriptive
- [ ] PR description is complete and accurate
- [ ] Related issues are linked

---

**Reviewer Notes:**
<!-- Add any additional comments, suggestions, or concerns here -->
