# 🩸 RedConnect

**Real-Time Blood Donation & Inventory Management Platform**

## Project Description

RedConnect is a full-stack Next.js platform designed to solve critical coordination issues in India's blood donation ecosystem. The problem isn't a lack of donors, but rather **poor coordination and outdated inventory data**. Blood availability information is often stale, manually updated, or inaccessible during emergencies, leading to critical delays that can cost lives.

RedConnect connects **donors, hospitals, blood banks, and NGOs**, providing:
- **Location-aware discovery** of blood availability
- **Live availability dashboards** with real-time updates
- **Secure role-based access** for different user types
- **Emergency response workflows** for urgent blood requests

This platform ensures fast access, fresh data, and scalable infrastructure, especially in life-critical scenarios where every minute counts.

---

## 📁 Folder Structure

```
redconnect/
├── src/
│   ├── app/              # Routes & pages (App Router)
│   │   ├── layout.tsx    # Root layout component
│   │   ├── page.tsx      # Home page
│   │   ├── globals.css   # Global styles
│   │   └── favicon.ico   # Site favicon
│   ├── components/       # Reusable UI components
│   │   └── (components will be added here)
│   └── lib/              # Utilities, helpers, configs
│       └── (utilities will be added here)
├── public/               # Static assets (images, icons, etc.)
├── .gitignore           # Git ignore rules
├── next.config.ts       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

### Directory Explanations

#### `src/app/`
Contains all routes and pages using Next.js App Router. This directory follows the file-based routing convention where:
- `layout.tsx` defines the root layout for all pages
- `page.tsx` files represent routes
- Nested folders create nested routes
- Special files like `loading.tsx`, `error.tsx` handle loading and error states

**Purpose:** Centralizes all application routes and page-level components, making navigation and routing intuitive and maintainable.

#### `src/components/`
Houses reusable UI components that can be shared across different pages and features. Examples include:
- Button components
- Form inputs
- Cards and containers
- Navigation bars
- Modals and dialogs

**Purpose:** Promotes code reusability, consistency in UI/UX, and easier maintenance. Components here follow a modular approach, making it easy to test and update individual pieces of the interface.

#### `src/lib/`
Contains utility functions, helper modules, and configuration files. This includes:
- API client configurations
- Data validation utilities
- Date/time formatters
- Constants and enums
- Type definitions
- Database connection helpers

**Purpose:** Separates business logic and utilities from UI components, making the codebase more organized and testable. This structure supports clean architecture principles.

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd S64-0126-Team05-Full-Stack-With-Nextjs-RedConnect-1
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

---

## 📸 Application Screenshot

![RedConnect Running Locally](./screenshot.png)

*Screenshot of RedConnect running locally on http://localhost:3000*

> **Note:** To capture your own screenshot:
> 1. Run `npm run dev`
> 2. Open http://localhost:3000 in your browser
> 3. Take a screenshot
> 4. Save it as `screenshot.png` in the project root
> 5. Update this README with the actual screenshot

---

## 🏗️ Naming Conventions

### Files and Folders
- **Components**: Use PascalCase (e.g., `BloodCard.tsx`, `DonorForm.tsx`)
- **Utilities/Helpers**: Use camelCase (e.g., `formatDate.ts`, `validateEmail.ts`)
- **Pages/Routes**: Use lowercase with hyphens for multi-word routes (e.g., `blood-availability/page.tsx`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_DONORS_PER_PAGE`)

### Code
- **Components**: PascalCase for component names
- **Functions/Variables**: camelCase
- **Types/Interfaces**: PascalCase with descriptive names (e.g., `BloodInventory`, `DonorProfile`)
- **Constants**: UPPER_SNAKE_CASE

---

## 💭 Reflection: Why This Structure?

### Scalability

This folder structure supports scalability in several ways:

1. **Clear Separation of Concerns**: By separating routes (`app/`), UI components (`components/`), and business logic (`lib/`), developers can easily locate and modify specific parts of the application without affecting others.

2. **Modular Architecture**: The `components/` directory allows us to build a library of reusable components. As the application grows, we can add new features by composing existing components rather than rewriting code.

3. **Maintainable Codebase**: The `lib/` directory centralizes utilities and configurations. When we need to update API endpoints, validation rules, or constants, we know exactly where to look.

4. **Team Collaboration**: With a clear structure, multiple team members can work on different features simultaneously without conflicts. Frontend developers can focus on `components/`, backend integration can happen in `lib/`, and routing logic stays in `app/`.

### Future Sprints

This structure will help our team scale the app in future sprints by:

- **Adding New Features**: New pages can be added to `src/app/` following the same pattern, making onboarding easier for new team members.
- **Component Library Growth**: As we build more UI components, they'll be organized in `src/components/`, potentially with subdirectories for different feature areas (e.g., `components/donors/`, `components/hospitals/`).
- **API Integration**: The `src/lib/` directory can expand to include API clients, data fetching utilities, and state management, keeping business logic separate from presentation.
- **Testing**: The clear structure makes it easier to write unit tests for components and integration tests for features.
- **Performance Optimization**: With organized code, we can easily identify and optimize specific areas (e.g., lazy loading components, code splitting by route).

### Clarity

The structure provides immediate clarity:
- New developers can understand the codebase organization within minutes
- Code reviews become more efficient when reviewers know where to expect certain types of code
- Documentation is easier to maintain when the structure itself is self-documenting

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **React**: 19.2.3
- **Linting**: ESLint with Next.js config

---

## 📝 Development Notes

- The project uses Next.js App Router for modern React Server Components
- TypeScript is configured with strict mode enabled for type safety
- Tailwind CSS is set up for utility-first styling
- The `src/` directory structure is used to keep the root directory clean

---

## 🤝 Contributing

This project follows a structured development workflow:
1. Create a feature branch from `main`
2. Make your changes following the folder structure and naming conventions
3. Test your changes locally
4. Submit a pull request with a clear description

---

## 🔀 Git Workflow & Branch Strategy

### Branch Naming Conventions

We follow a consistent branch naming pattern to maintain clarity and traceability:

- **Features**: `feature/<feature-name>`
  - Example: `feature/login-auth`, `feature/blood-inventory-dashboard`
- **Bug Fixes**: `fix/<bug-name>`
  - Example: `fix/navbar-alignment`, `fix/api-error-handling`
- **Chores/Tasks**: `chore/<task-name>`
  - Example: `chore/update-dependencies`, `chore/refactor-utils`
- **Documentation**: `docs/<update-name>`
  - Example: `docs/update-readme`, `docs/api-documentation`

**Important**: All team members must follow this naming format to ensure consistency across the repository.

### Pull Request Template

We use a standardized PR template located at `.github/pull_request_template.md`. When creating a pull request, the template will automatically populate with the following sections:

- **Summary**: Brief explanation of the PR's purpose
- **Changes Made**: List of key updates or fixes
- **Screenshots / Evidence**: Visual proof or console output when relevant
- **Checklist**: Verification items including:
  - Code builds successfully
  - Lint & tests pass
  - Reviewed by at least one teammate
  - Linked to corresponding issue
  - No console errors or warnings
  - ESLint + Prettier checks pass
  - Comments and documentation are meaningful
  - Sensitive data is not exposed

This template helps reviewers quickly understand the purpose and scope of each PR.

### Code Review Checklist

Every pull request must be reviewed using our shared checklist located at `.github/CODE_REVIEW_CHECKLIST.md`. The checklist includes:

**Code Quality**
- Code follows naming conventions and structure
- Functionality verified locally
- No console errors or warnings
- ESLint + Prettier checks pass
- Comments and documentation are meaningful
- Sensitive data is not exposed

**Code Structure**
- Files are organized according to project structure
- Components are reusable and follow single responsibility principle
- No duplicate code or unnecessary complexity
- TypeScript types are properly defined

**Functionality**
- Feature works as expected
- Edge cases are handled appropriately
- Error handling is implemented where needed
- User experience is considered

**Security & Best Practices**
- No hardcoded secrets or API keys
- Environment variables are used correctly
- Input validation is implemented
- No security vulnerabilities introduced

**Performance**
- No unnecessary re-renders
- Large data sets are handled efficiently
- Images and assets are optimized
- Code splitting is considered for large features

Reviewers should use this checklist to ensure consistent code quality across all contributions.

### Branch Protection Rules

To maintain code quality and prevent direct pushes to the main branch, we have configured branch protection rules on GitHub:

**Protected Branch: `main`**

1. **Require pull request reviews before merging**
   - At least one approval from a team member is required
   - Dismiss stale reviews when new commits are pushed

2. **Require status checks to pass before merging**
   - ESLint checks must pass
   - Build must succeed
   - All required checks must be green

3. **Disallow direct pushes to main**
   - All changes must go through pull requests
   - No force pushes allowed

4. **Require PRs to be up to date before merging**
   - PRs must be rebased or merged with the latest `main` branch
   - Prevents merge conflicts and integration issues

**How to Configure:**
1. Go to your GitHub repository
2. Navigate to **Settings** → **Branches**
3. Click **Add branch protection rule**
4. Set branch name pattern to `main`
5. Enable the rules listed above
6. Save the protection rule

### Workflow Reflection

This structured Git workflow helps maintain code quality, collaboration, and velocity in several ways:

**Code Quality**
- **Consistent Standards**: Branch naming conventions make it easy to identify the purpose of each branch at a glance, reducing confusion and improving traceability.
- **Automated Checks**: Branch protection rules ensure that all code passes linting and builds successfully before merging, catching errors early.
- **Review Process**: The PR template and review checklist ensure that all code is thoroughly examined, maintaining high standards across the codebase.

**Collaboration**
- **Clear Communication**: PR templates provide a structured way to communicate changes, making it easier for reviewers to understand what was done and why.
- **Knowledge Sharing**: Code reviews become learning opportunities where team members can share best practices and catch potential issues.
- **Reduced Conflicts**: Requiring PRs to be up to date before merging prevents integration conflicts and keeps the main branch stable.

**Velocity**
- **Faster Reviews**: Standardized templates and checklists make reviews faster and more efficient, as reviewers know exactly what to look for.
- **Fewer Bugs**: The review process catches issues before they reach production, reducing the time spent on bug fixes later.
- **Confidence**: Team members can merge code with confidence, knowing it has been reviewed and tested, which speeds up the development cycle.

**Traceability**
- **Issue Linking**: Linking PRs to issues creates a clear audit trail of what was changed and why.
- **Branch History**: Consistent naming makes it easy to search and filter branches, improving project management.
- **Documentation**: PR descriptions serve as documentation of changes, making it easier to understand the evolution of the codebase.

This workflow creates a safety net that allows the team to move quickly while maintaining high code quality standards.

---

## 📄 License

This project is part of a team assignment for Sprint 1.

---

**Team**: Team05 - RedConnect  
**Sprint**: Sprint 1 - Project Initialization & Folder Structure


## Aryan 
**In Concept 2.10**
 I set up secure environment variable management for the project. I created a .env.local file to store sensitive credentials and a .env.example file to document all required variables with placeholders. I ensured that only variables prefixed with NEXT_PUBLIC_ are accessible on the client side, keeping server secrets secure. I updated .gitignore to prevent environment files from being committed. Finally, I documented the purpose and usage of each variable in the README and avoided common security pitfalls.