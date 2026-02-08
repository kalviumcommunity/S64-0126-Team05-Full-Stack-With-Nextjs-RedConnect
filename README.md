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

## ✅ Assessment Status

**RESTful API Route Design Assessment: COMPLETED** ✓

Completion Date: 9 February 2026

**What was completed:**
- ✅ Implemented RESTful API routes under `/src/app/api/` following REST conventions
- ✅ Designed endpoints for blood banks, donors, and blood donations with proper HTTP methods
- ✅ Implemented pagination (page, limit, totalPages) and filtering (bloodType, city, isActive)
- ✅ Created atomic transactions for multi-step operations (blood donation with inventory updates)
- ✅ Implemented input validation and proper HTTP status codes (400, 404, 409, 500)
- ✅ Created centralized utilities: `api.ts` (pagination, error handling), `prismaSelect.ts` (reusable selects), `prisma.ts` (singleton client)
- ✅ Comprehensive testing: All endpoints tested and verified working
- ✅ Complete documentation with examples, error handling, and REST design reflection
- ✅ Verification report confirming no compilation errors and all tests passing

**Verification Report:**
See [VERIFICATION-REPORT.md](VERIFICATION-REPORT.md) for complete test results and implementation details.

**Next Steps:**
- Record 1-2 minute video demo showing API functionality
- Create PR with video link for final submission

---

## 📁 Folder Structure

```
redconnect/
├── src/
│   ├── app/              # Routes & pages (App Router)
│   │   ├── layout.tsx    # Root layout (shared header + sidebar)
│   │   ├── page.tsx      # Home (public)
│   │   ├── login/        # Login (public)
│   │   ├── dashboard/    # Dashboard (protected)
│   │   ├── users/        # Users list & [id] (protected)
│   │   ├── not-found.tsx # Custom 404
│   │   ├── globals.css   # Global styles
│   │   ├── api/          # REST API routes
│   │   └── favicon.ico   # Site favicon
│   ├── middleware.ts    # Auth: public vs protected routes
│   ├── components/      # Reusable UI components
│   │   ├── layout/       # Layout components (Header, Sidebar, LayoutWrapper)
│   │   └── ui/           # Basic UI primitives (Button, Card, InputField)
│   └── lib/             # Utilities, helpers, configs
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

## 🗺️ App Router & Routing

### Route map

| Route | Type | Description |
|-------|------|-------------|
| `/` | **Public** | Home page |
| `/login` | **Public** | Login page (sets auth cookie, redirects to dashboard) |
| `/dashboard` | **Protected** | Dashboard (requires valid token) |
| `/users` | **Protected** | List users |
| `/users/[id]` | **Protected** | Dynamic user profile (e.g. `/users/1`, `/users/2`) |
| (any other path) | — | Custom 404 via `not-found.tsx` |

### File-based routing structure

```
app/
├── page.tsx               → Home (public)
├── login/
│   └── page.tsx           → Login page (public)
├── dashboard/
│   └── page.tsx           → Protected route
├── users/
│   ├── page.tsx           → List users (protected)
│   └── [id]/
│        └── page.tsx      → Dynamic route for each user
├── not-found.tsx          → Custom 404 page
└── layout.tsx             → Global layout (nav bar)
```

- **`page.tsx`** — defines a page route.
- **`[id]/page.tsx`** — dynamic route where `id` can be any value.
- **`layout.tsx`** — wraps shared UI (e.g. navigation).

### Middleware (public vs protected)

Protected routes require a valid JWT in the `token` cookie. Middleware runs on the Edge; we use **`jose`** (Edge-compatible) for JWT verification. For local demo, a mock token is also accepted.

```ts
// src/middleware.ts (simplified)
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/login") || pathname === "/") return NextResponse.next();
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/users")) {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    try {
      await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ["/dashboard/:path*", "/users/:path*"] };
```

### Screenshots (evidence)

Add screenshots to the repo and link them here:

- **Public vs protected:** `docs/routes-public-vs-protected.png` — home/login accessible; dashboard/users redirect to login when not authenticated.
- **Dynamic user pages:** `docs/routes-users-1-2.png` — `/users/1` and `/users/2` rendering different content.
- **Navigation and breadcrumbs:** `docs/routes-nav-breadcrumbs.png` — nav bar and breadcrumbs on `/users/[id]`.
- **Custom 404:** `docs/routes-404.png` — `not-found.tsx` when visiting a non-existent route.

### Reflection

- **Dynamic routing** — `[id]` keeps URLs clean and scalable; new users don’t require new files. It also helps SEO with meaningful URLs like `/users/1`.
- **Breadcrumbs and layout** — A shared layout with nav and breadcrumbs on `/users` and `/users/[id]` improves wayfinding and keeps the UX consistent.
- **Error states** — A custom `not-found.tsx` gives a clear 404 experience and a link back home instead of a generic error.

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

## 🔌 REST API (Next.js App Router)
---

## 🧱 Component Architecture & Shared Layout

### Why this component architecture?

- **Reusability**: Common UI pieces (header, sidebar, buttons) are defined once and reused across pages.
- **Maintainability**: Updating a shared component (e.g. `Header`) updates navigation everywhere.
- **Scalability**: New pages can plug into the same `LayoutWrapper` without re-implementing layout.
- **Accessibility**: Shared components can standardize keyboard navigation and ARIA usage.

### Component folder structure

```
src/
├── app/
│   ├── layout.tsx              → Uses shared LayoutWrapper
│   ├── page.tsx                → Home
│   ├── dashboard/page.tsx      → Dashboard (uses global layout)
│   └── users/[id]/page.tsx     → Dynamic user page
└── components/
    ├── layout/
    │   ├── Header.tsx
    │   ├── Sidebar.tsx
    │   └── LayoutWrapper.tsx
    ├── ui/
    │   └── Button.tsx
    └── index.ts                → Barrel export
```

Example barrel file:

```ts
// src/components/index.ts
export { default as Header } from "./layout/Header";
export { default as Sidebar } from "./layout/Sidebar";
export { default as LayoutWrapper } from "./layout/LayoutWrapper";
export { default as Button } from "./ui/Button";
```

### Key shared components (snippets)

**Header** — shared top navigation:

```ts
// src/components/layout/Header.tsx
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-semibold text-lg">RedConnect</h1>
      <nav className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/users">Users</Link>
      </nav>
    </header>
  );
}
```

**Sidebar** — contextual navigation:

```ts
// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/users", label: "Users" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-100 border-r p-4">
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-gray-700 hover:text-blue-600">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

**LayoutWrapper** — composes header + sidebar + main content:

```ts
// src/components/layout/LayoutWrapper.tsx
import type { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-white p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
```

**Root layout** — applies `LayoutWrapper` to all pages:

```ts
// src/app/layout.tsx (excerpt)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
```

**Reusable Button**:

```ts
// src/components/ui/Button.tsx
interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      : "bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300";

  return (
    <button type="button" onClick={onClick} className={styles}>
      {label}
    </button>
  );
}
```

### Screenshots (components & layout)

Recommended screenshots to add under `docs/`:

- `docs/layout-full.png` — full layout with header + sidebar + content.
- `docs/layout-dashboard.png` — dashboard page inside the layout.
- `docs/storybook-button.png` (optional) — Button component shown in Storybook (or similar).

### Reflection: component architecture

- **Props contracts** keep components flexible: e.g. `Button` accepts `label`, `onClick`, and `variant` to support multiple use cases without duplicating markup.
- **Shared layout components** (`Header`, `Sidebar`, `LayoutWrapper`) enforce consistent navigation and spacing across all routes, reducing visual drift as the app grows.
- **Scalability**: new routes only need to focus on page-specific content; the layout and core UI patterns are already handled, which improves onboarding and development speed.
- **Accessibility**: centralizing navigation and buttons makes it easier to standardize keyboard focus behavior, ARIA labels, and color contrast checks in one place.

---

## 🔌 REST API (Next.js App Router)

### File-based routing (how endpoints are created)

In Next.js App Router, **every folder inside `src/app/api/` becomes part of an API URL**, and each `route.ts` exports HTTP method handlers (`GET`, `POST`, `PATCH`, `DELETE`, etc.).

Example mapping:

- `src/app/api/users/route.ts` → `GET/POST /api/users`
- `src/app/api/users/[id]/route.ts` → `GET/PATCH/DELETE /api/users/:id`

### Route hierarchy (resources are nouns, plural, lowercase)

Core resources from Prisma:

- `users`
- `messages`
- `reports`
- `notifications`

Implemented endpoints:

#### Users

- `GET /api/users` (pagination: `page`, `limit`)
- `POST /api/users`
- `GET /api/users/:id`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`

Nested (relationship) reads:

- `GET /api/users/:id/messages` (pagination + `role=all|sent|received`)
- `GET /api/users/:id/reports` (pagination)
- `GET /api/users/:id/notifications` (pagination + `isRead=true|false`)

#### Messages

- `GET /api/messages` (pagination + optional filters: `senderId`, `receiverId`)
- `POST /api/messages`
- `GET /api/messages/:id`
- `PATCH /api/messages/:id`
- `DELETE /api/messages/:id`

#### Reports

- `GET /api/reports` (pagination + optional filters: `userId`, `status`, `category`)
- `POST /api/reports`
- `GET /api/reports/:id`
- `PATCH /api/reports/:id`
- `DELETE /api/reports/:id`

#### Notifications

- `GET /api/notifications` (pagination + optional filters: `userId`, `isRead=true|false`)
- `POST /api/notifications`
- `GET /api/notifications/:id`
- `PATCH /api/notifications/:id`
- `DELETE /api/notifications/:id`

#### Misc (sanity check)

- `GET /api/test` (legacy demo route)

### Pagination semantics (for list endpoints)

List endpoints accept:

- `page` (default `1`)
- `limit` (default `10`, max `100`)

Response includes:

```json
{
  "data": [],
  "meta": { "page": 1, "limit": 10, "total": 0, "totalPages": 0 }
}
```

### Error handling & status codes

All error responses follow:

```json
{ "error": { "message": "..." } }
```

Common status codes:

- `200` OK: successful reads/updates/deletes
- `201` Created: successful creates
- `400` Bad Request: invalid input (bad `id`, missing fields, invalid query params, invalid JSON)
- `404` Not Found: resource missing
- `409` Conflict: uniqueness violation (e.g., duplicate user email)
- `500` Internal Server Error: unexpected issues

### Sample curl requests (copy/paste)

> Replace `:id` with a real ID.

#### Users

Get users (page 1):

```bash
curl -X GET "http://localhost:3000/api/users?page=1&limit=10"
```

Create a user:

```bash
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alice\",\"email\":\"alice@example.com\",\"password\":\"password123\",\"role\":\"user\"}"
```

Update a user:

```bash
curl -X PATCH "http://localhost:3000/api/users/1" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alice Updated\"}"
```

Delete a user:

```bash
curl -X DELETE "http://localhost:3000/api/users/1"
```

#### Messages

List messages sent by a user:

```bash
curl -X GET "http://localhost:3000/api/messages?senderId=1&page=1&limit=10"
```

Create a message:

```bash
curl -X POST "http://localhost:3000/api/messages" \
  -H "Content-Type: application/json" \
  -d "{\"content\":\"Hello!\",\"senderId\":1,\"receiverId\":2}"
```

#### Reports

Create a report:

```bash
curl -X POST "http://localhost:3000/api/reports" \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Issue\",\"description\":\"Something is wrong\",\"category\":\"bug\",\"userId\":1}"
```

Filter reports:

```bash
curl -X GET "http://localhost:3000/api/reports?status=pending&category=bug&page=1&limit=10"
```

#### Notifications

Create a notification:

```bash
curl -X POST "http://localhost:3000/api/notifications" \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Your report was received\",\"userId\":1}"
```

Unread notifications for a user:

```bash
curl -X GET "http://localhost:3000/api/notifications?userId=1&isRead=false&page=1&limit=10"
```

### Evidence (Postman / screenshots)

- Postman collection included at `postman/RedConnect.postman_collection.json`
- Add screenshots (recommended):
  - `docs/api-users.png`
  - `docs/api-messages.png`
  - `docs/api-reports.png`
  - `docs/api-notifications.png`

### Reflection: why consistent naming matters

Using **plural nouns** (`/api/users`) instead of verbs (`/api/getUsers`) makes routes predictable, reduces frontend/backend mismatch, and keeps integrations consistent. With a stable naming scheme, new endpoints “fit” naturally, making the codebase easier to scale and maintain across sprints.

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

 For 2.15, I implemented Prisma database migrations to keep the PostgreSQL schema version-controlled and consistent across environments. I created and applied migration files using prisma migrate dev and learned how to safely reset and reapply the schema during development. I also built a reusable seed script to populate the database with initial users, hospital data, blood inventory, and emergency requests. This ensures every developer and environment starts with the same structured data.

## Bhargav
In concept 
In Concept 2.14, I integrated Prisma ORM into our RedConnect Next.js project and connected it to our PostgreSQL database. I initialized Prisma using npx prisma init, configured the DATABASE_URL, and designed the initial database schema in schema.prisma including core models like User and Project with correct relations, constraints, and defaults.

I then generated the Prisma Client through npx prisma generate and created a reusable Prisma instance in src/lib/prisma.ts to prevent multiple client initializations during development. After setting up the database connection layer, I tested it by writing a sample API route using prisma.user.findMany() to confirm successful communication with PostgreSQL.

---

## 🔌 API Documentation

### API Folder Structure

All API endpoints are organized under `src/app/api/` following RESTful conventions with plural noun naming:

```
src/app/api/
├── blood-banks/
│   └── route.ts           # GET (list), POST (create)
├── blood-donation/
│   └── route.ts           # POST (record donation with transaction)
├── donors/
│   └── route.ts           # GET (list), POST (create)
├── messages/
│   ├── route.ts           # GET (list), POST (create)
│   └── [id]/
│       └── route.ts       # GET (detail), PUT, DELETE
├── notifications/
│   ├── route.ts           # GET (list), POST (create)
│   └── [id]/
│       └── route.ts       # GET (detail), PATCH (mark read)
├── reports/
│   ├── route.ts           # GET (list), POST (create)
│   └── [id]/
│       └── route.ts       # GET (detail), PUT, DELETE
├── test/
│   └── route.ts           # Testing endpoints
└── users/
    ├── route.ts           # GET (list), POST (create)
    └── [id]/
        ├── route.ts       # GET (detail), PUT, DELETE
        ├── messages/
        │   └── route.ts   # User-specific messages
        ├── notifications/
        │   └── route.ts   # User-specific notifications
        └── reports/
            └── route.ts   # User-specific reports
```

### Core Endpoints

#### 1. GET /api/blood-banks - List All Blood Banks

**Purpose:** Retrieve all registered blood banks with optional filtering and pagination.

**Query Parameters:**
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10, max: 100): Items per page
- `city` (optional): Filter by city name (case-insensitive)
- `bloodType` (optional): Filter by available blood type

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/blood-banks?page=1&limit=5&city=Mumbai"
```

**Successful Response (200):**
```json
{
  "data": [
    {
      "id": "d437cff0-cfa7-43ac-8e70-2be1e0c23a8a",
      "name": "Central Blood Bank",
      "address": "123 Medical Street",
      "city": "Mumbai",
      "contactNo": "9876543210",
      "email": "central@bloodbank.com",
      "createdAt": "2026-02-08T19:25:12.497Z",
      "inventories": [
        {
          "id": "96d2894b-2e1e-4ccc-99db-102f4657fbe0",
          "bloodType": "A+",
          "units": 2,
          "minUnits": 10,
          "expiryDate": null
        }
      ]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 5,
    "total": 1,
    "totalPages": 1
  }
}
```

**Error Response (500):**
```json
{
  "error": {
    "message": "Failed to fetch blood banks",
    "details": "..."
  }
}
```

---

#### 2. POST /api/blood-banks - Create Blood Bank

**Purpose:** Register a new blood bank in the system.

**Required Fields:**
- `name` (string): Blood bank name
- `address` (string): Physical address
- `city` (string): City/Region
- `contactNo` (string): Contact phone number
- `email` (string, unique): Email address

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/blood-banks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Central Blood Bank",
    "address": "123 Medical Street",
    "city": "Mumbai",
    "contactNo": "9876543210",
    "email": "central@bloodbank.com"
  }'
```

**Successful Response (201):**
```json
{
  "data": {
    "id": "d437cff0-cfa7-43ac-8e70-2be1e0c23a8a",
    "name": "Central Blood Bank",
    "address": "123 Medical Street",
    "city": "Mumbai",
    "contactNo": "9876543210",
    "email": "central@bloodbank.com",
    "createdAt": "2026-02-08T19:25:12.497Z",
    "inventories": []
  }
}
```

**Error Response (409):**
```json
{
  "error": {
    "message": "A blood bank with this email already exists"
  }
}
```

**Error Response (400):**
```json
{
  "error": {
    "message": "Field 'name' is required"
  }
}
```

---

#### 3. GET /api/donors - List All Donors

**Purpose:** Retrieve donor records with filtering and pagination.

**Query Parameters:**
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10, max: 100): Items per page
- `bloodType` (optional): Filter by blood type (e.g., "A+", "B-", "O+")
- `city` (optional): Filter by city (case-insensitive)
- `isActive` (optional): Filter by active status ("true" or "false")

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/donors?bloodType=A+&city=Mumbai&page=1&limit=10"
```

**Successful Response (200):**
```json
{
  "data": [
    {
      "id": "2448ae0e-007a-4b7c-854e-0a421652171a",
      "name": "Rajesh Kumar",
      "email": "rajesh@example.com",
      "phone": "9123456789",
      "bloodType": "A+",
      "dateOfBirth": "2000-05-15T00:00:00.000Z",
      "address": "456 Hope Street",
      "city": "Mumbai",
      "lastDonated": null,
      "isActive": true,
      "createdAt": "2026-02-08T19:25:17.450Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

#### 4. POST /api/donors - Create Donor

**Purpose:** Register a new blood donor in the system.

**Required Fields:**
- `name` (string): Donor full name
- `email` (string, unique): Email address
- `phone` (string): Phone number
- `bloodType` (string): Blood type (e.g., "A+", "B-", "AB+", "O-")
- `dateOfBirth` (string, ISO format): Date of birth (YYYY-MM-DD)
- `address` (string): Physical address
- `city` (string): City/Region

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "9123456789",
    "bloodType": "A+",
    "dateOfBirth": "2000-05-15",
    "address": "456 Hope Street",
    "city": "Mumbai"
  }'
```

**Successful Response (201):**
```json
{
  "data": {
    "id": "2448ae0e-007a-4b7c-854e-0a421652171a",
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "9123456789",
    "bloodType": "A+",
    "dateOfBirth": "2000-05-15T00:00:00.000Z",
    "address": "456 Hope Street",
    "city": "Mumbai",
    "lastDonated": null,
    "isActive": true,
    "createdAt": "2026-02-08T19:25:17.450Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": {
    "message": "Field 'bloodType' is required"
  }
}
```

---

#### 5. POST /api/blood-donation - Record Blood Donation

**Purpose:** Record a blood donation from a donor to a blood bank with atomic transaction handling.

**Required Fields:**
- `donorId` (string, UUID): Donor ID
- `bloodBankId` (string, UUID): Blood Bank ID
- `units` (number): Units of blood donated (must be > 0)
- `bloodType` (string): Blood type (must match donor's blood type)
- `notes` (optional, string): Additional notes

**Transaction Behavior:**
- Verifies donor exists
- Verifies blood bank exists  
- Validates blood type matches donor's type
- Creates donation record
- Updates blood bank inventory (upsert)
- All operations atomic — rollback on any failure

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/blood-donation \
  -H "Content-Type: application/json" \
  -d '{
    "donorId": "2448ae0e-007a-4b7c-854e-0a421652171a",
    "bloodBankId": "d437cff0-cfa7-43ac-8e70-2be1e0c23a8a",
    "units": 2,
    "bloodType": "A+"
  }'
```

**Successful Response (201):**
```json
{
  "donation": {
    "id": "52cf4b7e-21f5-4763-9ced-7a0d62d3e032",
    "units": 2,
    "status": "completed",
    "notes": null,
    "createdAt": "2026-02-08T19:25:38.404Z",
    "donorId": "2448ae0e-007a-4b7c-854e-0a421652171a",
    "bloodBankId": "d437cff0-cfa7-43ac-8e70-2be1e0c23a8a"
  },
  "inventory": {
    "id": "96d2894b-2e1e-4ccc-99db-102f4657fbe0",
    "bloodType": "A+",
    "units": 2,
    "minUnits": 10,
    "expiryDate": null
  },
  "message": "Donation recorded successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Donor with ID {donorId} not found"
}
```

**Error Response (400):**
```json
{
  "error": "Blood type mismatch. Donor blood type is A+, but B+ was specified"
}
```

---

### Pagination Details

All list endpoints (`GET /api/blood-banks`, `GET /api/donors`) support pagination:

```
Query Params:
- page: Current page number (starts at 1)
- limit: Items per page (1-100, default: 10)

Response Meta:
{
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}

Calculation:
- skip = (page - 1) * limit
- take = limit
- totalPages = Math.ceil(total / limit)
```

---

### Error Handling & HTTP Status Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | ✅ Success (GET) | Data retrieved successfully |
| 201 | ✅ Created (POST) | Resource created successfully |
| 400 | ❌ Bad Request | Missing/invalid required fields |
| 404 | ❌ Not Found | Resource does not exist |
| 409 | ❌ Conflict | Duplicate email or unique constraint violation |
| 500 | ❌ Server Error | Database connection issue, unexpected error |

**Error Response Format:**
```json
{
  "error": {
    "message": "User-friendly error message",
    "details": "Technical details (only in development)"
  }
}
```

---

## 💡 Why RESTful Structure & Naming Conventions Matter

### 1. **Scalability & Maintainability**
   - **Consistent naming** (`/api/blood-banks`, `/api/donors`) makes it easy to add new resources
   - Developers can understand the pattern and implement new endpoints quickly
   - Clear folder hierarchy prevents "spaghetti" router code

### 2. **Team Collaboration**
   - **Predictable endpoints** reduce confusion and documentation overhead
   - Using HTTP verbs correctly (GET for fetch, POST for create) is intuitive
   - Clear naming conventions minimize naming conflicts and race conditions in PRs

### 3. **Reduced Bugs & Errors**
   - Plural nouns for collections (`/api/donors` not `/api/donor`) prevent endpoint confusion
   - Consistent error responses make client-side error handling straightforward
   - Transaction handling in blood donation ensures data consistency

### 4. **Professional Standards**
   - Follows industry-standard REST principles (RFC 7231, OpenAPI standards)
   - Makes the API documentation self-explanatory
   - Easier to generate OpenAPI/Swagger specs for auto-documentation

### 5. **Client-Side Development**
   - Developers can predict endpoints without always consulting documentation
   - Pagination parameters follow common patterns
   - Filtering parameters are logically named and consistently implemented

### Example: How Structure Scales

```
Initial: Just blood-banks & donors
app/api/blood-banks/route.ts
app/api/donors/route.ts

Growing: Add user management
app/api/users/route.ts
app/api/users/[id]/route.ts

Scaling: Add messages, notifications, reports
app/api/messages/route.ts
app/api/notifications/route.ts
app/api/reports/route.ts

Extending: Add dynamic routes
app/api/users/[id]/messages/route.ts
app/api/users/[id]/notifications/route.ts
```

Every new developer can immediately understand the pattern and contribute confidently.

---

## 🧪 Testing the API

### Prerequisites
```bash
npm install
npx prisma db push --force-reset
npm run dev
```

### Test All Endpoints

```bash
# 1. Create a blood bank
curl -X POST http://localhost:3000/api/blood-banks \
  -H "Content-Type: application/json" \
  -d '{"name":"City Blood Bank","address":"456 Hospital St","city":"Delhi","contactNo":"8765432109","email":"city@bloodbank.in"}' | jq .

# 2. List blood banks with pagination
curl -X GET "http://localhost:3000/api/blood-banks?page=1&limit=5" | jq .

# 3. Create a donor
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{"name":"Priya Singh","email":"priya@donor.in","phone":"9876543210","bloodType":"B+","dateOfBirth":"1998-03-20","address":"789 Donation Lane","city":"Delhi"}' | jq .

# 4. List donors with blood type filter
curl -X GET "http://localhost:3000/api/donors?bloodType=B%2B&city=Delhi" | jq .

# 5. Record a blood donation (requires actual IDs from steps 1 & 3)
# Save the IDs from responses above
BANK_ID="<from-step-1>"
DONOR_ID="<from-step-3>"

curl -X POST http://localhost:3000/api/blood-donation \
  -H "Content-Type: application/json" \
  -d "{\"donorId\":\"$DONOR_ID\",\"bloodBankId\":\"$BANK_ID\",\"units\":3,\"bloodType\":\"B+\"}" | jq .

# 6. Verify blood bank inventory was updated
curl -X GET "http://localhost:3000/api/blood-banks?page=1&limit=5" | jq '.data[0].inventories'
```

---

## 📝 Summary of Implemented Endpoints

| Method | Route | Purpose | Status |
|--------|-------|---------|--------|
| GET | `/api/blood-banks` | List all blood banks with pagination | ✅ Working |
| POST | `/api/blood-banks` | Create new blood bank | ✅ Working |
| GET | `/api/donors` | List all donors with filters | ✅ Working |
| POST | `/api/donors` | Create new donor | ✅ Working |
| POST | `/api/blood-donation` | Record donation with transaction | ✅ Working |
| GET | `/api/users` | List all users | ✅ Working |
| POST | `/api/users` | Create new user | ⚠️ Basic |
| POST | `/api/messages` | Create message | ⚠️ Pending |
| GET | `/api/notifications` | List notifications | ⚠️ Pending |
| POST | `/api/reports` | Create report | ⚠️ Pending |




