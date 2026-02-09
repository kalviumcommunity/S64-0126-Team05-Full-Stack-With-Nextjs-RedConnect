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
│   │   ├── layout.tsx    # Root layout component
│   │   ├── page.tsx      # Home page
│   │   ├── globals.css   # Global styles
│   │   └── api/          # REST API routes (App Router route handlers)
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

---

## 🎯 Global API Response Handler

All API endpoints in RedConnect use a **unified response handler** that ensures consistent response formatting across the entire API. This standardized approach improves developer experience, enables better error tracking, and simplifies frontend integration.

### Response Format

#### Success Response
Every successful API response follows this standardized format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "...": "response payload"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Fields:**
- `success` (boolean): Always `true` for successful responses
- `message` (string): Human-readable success message
- `data` (any): The actual response payload (varies by endpoint)
- `timestamp` (string): ISO 8601 timestamp when response was generated

#### Error Response
All error responses follow a consistent structure:

```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional error details (only in development)"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Fields:**
- `success` (boolean): Always `false` for error responses
- `message` (string): User-friendly error description
- `error.code` (string): Machine-readable error code for programmatic handling
- `error.details` (object, optional): Extra debugging information (development only)
- `timestamp` (string): ISO 8601 timestamp when error occurred

### Error Codes Reference

The API uses standardized error codes for consistent error handling:

| Code | Description | HTTP Status |
|------|-------------|-------------|
| E001 | Validation error - invalid input | 400 |
| E002 | Missing required field | 400 |
| E003 | Invalid format or data type | 400 |
| E004 | Resource not found | 404 |
| E005 | Donor not found in database | 404 |
| E006 | Blood bank not found in database | 404 |
| E007 | Email already exists (duplicate) | 409 |
| E008 | Duplicate record | 409 |
| E009 | Blood type mismatch | 400 |
| E010 | Database operation failed | 500 |
| E011 | Database connection failure | 500 |
| E012 | Transaction execution failed | 500 |
| E500 | Internal server error | 500 |
| E501 | Unknown error occurred | 500 |

### Response Handler Implementation

The global response handler is implemented in `/src/lib/responseHandler.ts`:

```typescript
// Success response
export const sendSuccess = (data, message = "Success", status = 200) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};

// Error response
export const sendError = (message, code, status = 500, details?) => {
  return NextResponse.json(
    {
      success: false,
      message,
      error: { code, details },
      timestamp: new Date().toISOString(),
    },
    { status }
  );
};
```

### Usage Examples

#### Example 1: Successful List Endpoint
```bash
curl "http://localhost:3000/api/donors?page=1&limit=5"
```

Response:
```json
{
  "success": true,
  "message": "Donors fetched successfully",
  "data": {
    "data": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "John Doe",
        "email": "john@example.com",
        "bloodType": "AB+",
        "city": "Mumbai"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 5,
      "total": 100,
      "totalPages": 20
    }
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

#### Example 2: Successful Creation
```bash
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com",...}'
```

Response:
```json
{
  "success": true,
  "message": "Donor created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "bloodType": "O+",
    "createdAt": "2026-02-09T10:30:45.123Z"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

#### Example 3: Validation Error
```bash
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'  # Missing required fields
```

Response (400):
```json
{
  "success": false,
  "message": "Field 'email' is required",
  "error": {
    "code": "E002"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

#### Example 4: Duplicate Email Error
```bash
curl -X POST http://localhost:3000/api/blood-banks \
  -H "Content-Type: application/json" \
  -d '{"name":"Bank","email":"existing@bank.com",...}'
```

Response (409):
```json
{
  "success": false,
  "message": "A blood bank with this email already exists",
  "error": {
    "code": "E007"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

### Developer Experience (DX) Benefits

1. **Predictable Responses**: Every endpoint returns the same response structure, making frontend code simpler and more maintainable.

2. **Easier Error Handling**: Standardized error codes enable consistent error handling logic across the entire application:
   ```typescript
   if (response.error?.code === "E007") {
     showNotification("Email already exists");
   }
   ```

3. **Better Debugging**: Every response includes timestamps and error codes, making it easier to trace issues in logs.

4. **Faster Onboarding**: New developers understand the API structure immediately without needing to study each endpoint individually.

5. **Consistent Timestamps**: All responses include ISO 8601 timestamps for reliable audit trails and request tracing.

### Observability & Production Benefits

1. **Centralized Logging**: Error codes can be easily parsed and indexed in logging systems (ELK, Datadog, etc.)

2. **Monitoring Integration**: Consistent error codes enable automated monitoring and alerting:
   - Track error frequency by type
   - Set up alerts for critical errors (E500, E012)
   - Monitor database errors (E010, E011)

3. **API Analytics**: Response structure enables detailed metrics:
   - Track success vs error rates
   - Monitor endpoint performance
   - Analyze common validation errors

4. **Third-party Tools**: Postman, Sentry, and other tools can automatically parse standardized responses.

5. **Backward Compatibility**: New error codes can be added without breaking existing clients that check `success` field first.

### Example: Frontend Integration

```typescript
// Frontend code using the standardized response
async function fetchDonors(page: number) {
  try {
    const response = await fetch(`/api/donors?page=${page}`);
    const json = await response.json();
    
    if (json.success) {
      // Handle success - structure is always the same
      renderTable(json.data.data);
      updatePagination(json.data.meta);
    } else {
      // Handle error with code
      if (json.error.code === "E005") {
        showError("Donor not found");
      } else if (json.error.code === "E010") {
        showError("Database error - try again later");
      } else {
        showError(json.message);
      }
    }
  } catch (err) {
    showError("Network error");
  }
}
```

---

## ✅ Input Validation with Zod

All API endpoints use **Zod schemas** for runtime validation, ensuring type-safe input handling and consistent error messages. This provides defense-in-depth protection against invalid data while maintaining excellent developer experience.

### Why Zod for Validation?

1. **Type Safety**: Zod infers TypeScript types automatically, eliminating type duplication
2. **Runtime Validation**: Catch errors at the API boundary before database operations
3. **Composable Schemas**: Reuse common validation patterns across endpoints
4. **Clear Error Messages**: Custom error messages for each validation rule
5. **Complex Validation**: Support for conditional logic, transformations, and refinements

### Validation Architecture

```
API Request
    ↓
Zod Schema Validation
    ├─ Field-level validation (regex, min/max length, format)
    ├─ Type coercion & transformation
    └─ Custom refinements (age checks, enum validation)
    ↓
If valid → Business Logic & Database
If invalid → sendValidationError() → Standardized 400 Response
```

### Implemented Schemas

#### 1. Blood Bank Schema (`/src/lib/schemas/bloodBankSchema.ts`)

Validates creation and updates of blood bank records.

**Validation Rules:**
- `name`: 2-100 characters, required
- `address`: 5-200 characters, required
- `city`: 2-100 characters, required
- `contactNo`: Valid phone format (7-15 digits with + - space), required
- `email`: Valid email format, max 100 chars, required and unique

**Example Valid Request:**
```json
{
  "name": "City Blood Bank",
  "address": "123 Medical Center Drive",
  "city": "New York",
  "contactNo": "+1-555-0123",
  "email": "contact@cityblood.com"
}
```

**Example Invalid Request (missing field):**
```json
{
  "name": "BC"
}
```

**Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "E001",
    "details": {
      "errors": [
        {
          "field": "name",
          "message": "Blood bank name must be at least 2 characters long"
        },
        {
          "field": "address",
          "message": "Invalid input: expected string, received undefined"
        },
        {
          "field": "city",
          "message": "Invalid input: expected string, received undefined"
        },
        {
          "field": "contactNo",
          "message": "Invalid input: expected string, received undefined"
        },
        {
          "field": "email",
          "message": "Invalid input: expected string, received undefined"
        }
      ],
      "summary": "5 validation error(s)"
    }
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

#### 2. Donor Schema (`/src/lib/schemas/donorSchema.ts`)

Validates donor registration with comprehensive health & safety checks.

**Validation Rules:**
- `name`: 2-100 characters, required
- `email`: Valid email format, max 100 chars, required and unique
- `phone`: Valid phone format (7-15 digits), required
- `bloodType`: Enum (A+, A-, B+, B-, AB+, AB-, O+, O-), required
- `dateOfBirth`: YYYY-MM-DD format, must be >= 18 years old, required
- `address`: 5-200 characters, required
- `city`: 2-100 characters, required

**Key Features:**
- Custom age validation: Ensures donors are at least 18 years old
- Blood type enum constraint: Only valid blood types accepted
- Phone format validation: Supports international formats

**Example Valid Request (with age check):**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1-555-0200",
  "bloodType": "O+",
  "dateOfBirth": "1995-08-20",
  "address": "456 Oak Avenue",
  "city": "San Francisco"
}
```

**Example Invalid Request (minor trying to donate):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0100",
  "bloodType": "A+",
  "dateOfBirth": "2010-05-15",
  "address": "123 Main Street",
  "city": "Boston"
}
```

**Response (400) - Age validation failure:**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "E001",
    "details": {
      "errors": [
        {
          "field": "dateOfBirth",
          "message": "Donor must be at least 18 years old (YYYY-MM-DD format)"
        }
      ],
      "summary": "1 validation error(s)"
    }
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

#### 3. Blood Donation Schema (`/src/lib/schemas/bloodDonationSchema.ts`)

Validates blood donation records with inventory management.

**Validation Rules:**
- `donorId`: Valid UUID format, required
- `bloodBankId`: Valid UUID format, required
- `units`: Positive number, max 5 units per donation, required
- `bloodType`: Enum (A+, A-, B+, B-, AB+, AB-, O+, O-), required
- `notes`: Optional, max 500 characters

**Example Valid Request:**
```json
{
  "donorId": "81ea37ba-9262-4d33-8a57-1f8acc4277e6",
  "bloodBankId": "3d407b08-d057-4641-8d19-0d390018ac36",
  "units": 2,
  "bloodType": "O+",
  "notes": "Regular donation"
}
```

**Example Invalid Request (units exceed limit):**
```json
{
  "donorId": "81ea37ba-9262-4d33-8a57-1f8acc4277e6",
  "bloodBankId": "3d407b08-d057-4641-8d19-0d390018ac36",
  "units": 10,
  "bloodType": "O+"
}
```

**Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "E001",
    "details": {
      "errors": [
        {
          "field": "units",
          "message": "Units cannot exceed 5 per donation"
        }
      ],
      "summary": "1 validation error(s)"
    }
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

### Validation Error Response Format

All validation errors return **400 Bad Request** with consistent structure:

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "E001",
    "details": {
      "errors": [
        {
          "field": "fieldName",
          "message": "Specific validation error message"
        }
      ],
      "summary": "N validation error(s)"
    }
  },
  "timestamp": "ISO 8601 timestamp"
}
```

### Validation Implementation Details

**File Structure:**
```
src/lib/
├── schemas/
│   ├── bloodBankSchema.ts      # Blood bank validation rules
│   ├── donorSchema.ts           # Donor validation rules
│   └── bloodDonationSchema.ts   # Donation validation rules
├── validationUtils.ts           # Zod error parsing helper
└── responseHandler.ts           # Global response format
```

**Flow in API Routes:**

```typescript
// Example from /api/blood-banks/route.ts
export async function POST(req: Request) {
  const parsed = await safeJson(req);
  if (!parsed.ok) return jsonError("Invalid JSON body", 400);

  try {
    // ✓ Validate input with Zod schema
    const validatedData = bloodBankCreateSchema.parse(parsed.data);
    
    // ✓ Create database record with validated data
    const bloodBank = await prisma.bloodBank.create({
      data: validatedData,
      select: bloodBankSelect,
    });

    return sendSuccess(bloodBank, "Blood bank created successfully", 201);
  } catch (err) {
    // ✓ Catch validation errors and return consistent format
    if (err instanceof ZodError) {
      return sendValidationError(err);
    }
    
    // ✓ Handle specific database errors
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return sendError("Email already exists", ERROR_CODES.DUPLICATE_EMAIL, 409, err);
    }
    
    return sendError("Failed to create blood bank", ERROR_CODES.DATABASE_ERROR, 500, err);
  }
}
```

### Benefits of This Validation Approach

1. **Single Source of Truth**: Schema defines validation logic + TypeScript types
2. **Reusable Schemas**: Schemas exported for client-side validation
3. **Clear Error Messages**: Custom messages per validation rule
4. **Composable Validation**: Combine simple rules into complex validators
5. **Production Safe**: All invalid data caught before database operations
6. **DX Friendly**: TypeScript autocomplete for validated data

### Testing Validation with curl

```bash
# Test missing fields
curl -X POST http://localhost:3000/api/blood-banks \
  -H "Content-Type: application/json" \
  -d '{"name":"AB"}'

# Test invalid email
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"invalid-email","phone":"+1-555-0100","bloodType":"A+","dateOfBirth":"1995-01-01","address":"123 Main","city":"NYC"}'

# Test age validation
curl -X POST http://localhost:3000/api/donors \
  -H "Content-Type: application/json" \
  -d '{"name":"Minor","email":"minor@test.com","phone":"+1-555-0100","bloodType":"A+","dateOfBirth":"2015-01-01","address":"123 Main","city":"NYC"}'

# Test units limit
curl -X POST http://localhost:3000/api/blood-donation \
  -H "Content-Type: application/json" \
  -d '{"donorId":"81ea37ba-9262-4d33-8a57-1f8acc4277e6","bloodBankId":"3d407b08-d057-4641-8d19-0d390018ac36","units":10,"bloodType":"O+"}'
```

---

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
  "success": true,
  "message": "Blood banks fetched successfully",
  "data": {
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
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Failed to fetch blood banks",
  "error": {
    "code": "E010"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
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
  "success": true,
  "message": "Blood bank created successfully",
  "data": {
    "id": "d437cff0-cfa7-43ac-8e70-2be1e0c23a8a",
    "name": "Central Blood Bank",
    "address": "123 Medical Street",
    "city": "Mumbai",
    "contactNo": "9876543210",
    "email": "central@bloodbank.com",
    "createdAt": "2026-02-08T19:25:12.497Z",
    "inventories": []
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Error Response (409):**
```json
{
  "success": false,
  "message": "A blood bank with this email already exists",
  "error": {
    "code": "E007"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Field 'name' is required",
  "error": {
    "code": "E002"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
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
  "success": true,
  "message": "Donors fetched successfully",
  "data": {
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
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
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
  "success": true,
  "message": "Donor created successfully",
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
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Field 'bloodType' is required",
  "error": {
    "code": "E002"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
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

**Successful Response (201) - Full Format:**
```json
{
  "success": true,
  "message": "Donation processed successfully",
  "data": {
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
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Donor or blood bank not found",
  "error": {
    "code": "E005"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Blood type mismatch. Donor blood type is A+, but B+ was specified",
  "error": {
    "code": "E009"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
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

## � Authentication APIs (Signup / Login)

RedConnect implements secure user authentication using **bcrypt** for password hashing and **JWT (JSON Web Token)** for session management. This ensures that user credentials are protected even if the database is compromised, and sessions are verifiable without storing state on the server.

### Authentication vs Authorization

| Concept | Definition | Example |
|---------|-----------|---------|
| **Authentication** | Verifying who the user is | User logs in with email/password |
| **Authorization** | Determining what user can do | Only admins can access /api/admin |

This lesson focuses on **authentication** — securely verifying user identity using bcrypt and JWT.

### Signup Endpoint

**POST /api/auth/signup**

Registers a new user with secure password hashing using bcrypt (10 salt rounds).

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "securepassword123",
  "role": "DONOR"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "DONOR",
    "createdAt": "2026-02-09T10:30:45.123Z"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Validation Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "code": "E001",
    "details": {
      "errors": [
        {
          "field": "password",
          "message": "Password must be at least 6 characters long"
        }
      ]
    }
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Duplicate Email Response (409):**
```json
{
  "success": false,
  "message": "A user with this email already exists",
  "error": {
    "code": "E007"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**curl Example:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "securepassword123",
    "role": "DONOR"
  }'
```

### Login Endpoint

**POST /api/auth/login**

Authenticates user credentials and returns a JWT token for accessing protected routes. Token expires after 24 hours by default.

**Request Body:**
```json
{
  "email": "alice@example.com",
  "password": "securepassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MCIsImVtYWlsIjoiYWxpY2VAZXhhbXBsZS5jb20iLCJyb2xlIjoiRE9OT1IiLCJpYXQiOjE3NDQzNzYwMDB9.signature",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "role": "DONOR"
    }
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Invalid Credentials Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "error": {
    "code": "E102"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**curl Example:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "securepassword123"
  }'
```

### Protected Route Example

**GET /api/users**

Lists all users. Requires valid JWT token in Authorization header.

**Request with Token:**
```bash
# Save token from login response first
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MCIsImVtYWlsIjoiYWxpY2VAZXhhbXBsZS5jb20ifQ.signature"

curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": {
    "data": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "role": "DONOR",
        "createdAt": "2026-02-09T10:30:45.123Z"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Missing Token Response (401):**
```json
{
  "success": false,
  "message": "Authorization token required",
  "error": {
    "code": "E103"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Expired Token Response (403):**
```json
{
  "success": false,
  "message": "Invalid or expired token",
  "error": {
    "code": "E104"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

### Implementation Details

#### Password Hashing with bcrypt

**Why bcrypt?**
- Automatically generates random salt (10 rounds in our implementation)
- Computationally expensive — slows down brute-force attacks
- Even if database is leaked, passwords remain unreadable

**How it works:**
```typescript
// Hashing (in signup)
const hashedPassword = await bcrypt.hash(password, 10);
// Output: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjxGFlYKIJvN2OvU7o0c4J2YmXL82.K

// Verification (in login)
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
// Returns: true or false
```

#### JWT Token Generation

**Token Structure:**
```
header.payload.signature
```

**Payload contains:**
```json
{
  "id": "user-id-uuid",
  "email": "user@example.com",
  "role": "DONOR",
  "iat": 1744376000,
  "exp": 1744462400
}
```

Where:
- `iat` — Issued At timestamp
- `exp` — Expiration timestamp (24 hours from issue)

**Verification:** Token can only be verified with the secret key. If tampered, verification fails.

### Authentication Flow Diagram

```
▼
User Signup
    ├─ POST /api/auth/signup
    ├─ Validate (name, email, password, role)
    ├─ Hash password with bcrypt
    └─ Store in database
    
User Login
    ├─ POST /api/auth/login
    ├─ Find user by email
    ├─ Compare hashed password with bcrypt
    ├─ Generate JWT token
    └─ Return token + user info
    
Access Protected Route
    ├─ POST /api/users with Authorization: Bearer <token>
    ├─ Extract token from header
    ├─ Verify signature + expiration
    ├─ Decode payload (user id, email, role)
    └─ Proceed with request
```

### Security Best Practices

1. **Never log passwords** — bcrypt ensures passwords are never plain text
2. **Use HTTPS in production** — Protect token transmission
3. **Store tokens securely**:
   - Cookies (httpOnly, Secure flags) — Preferred for SPA
   - localStorage — Less secure but works for SPAs
   - Session storage — Clears on tab close
4. **Token expiry** — Set reasonable expiry (1-24 hours)
5. **Refresh tokens** — Implement refresh mechanism for long-lived sessions
6. **Environment variables** — Keep JWT_SECRET in .env (never commit)

### Environment Setup

Add to `.env.local`:
```env
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRY=24h
```

**Never commit `.env` files with secrets to git!**

### Complete Authentication Flow Test

```bash
# 1. Signup new user
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Smith",
    "email": "bob@example.com",
    "password": "bobsecure123",
    "role": "DONOR"
  }' | jq '.data.id'

# 2. Login (get token)
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "bob@example.com",
    "password": "bobsecure123"
  }' | jq -r '.data.token')

echo "Token: $TOKEN"

# 3. Access protected route with token
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" | jq '.data.data | length'

# 4. Try accessing without token (should fail)
curl -X GET http://localhost:3000/api/users | jq '.error.code'
# Should return: "E103" (token missing)
```

### New Error Codes for Authentication

| Code | Description | HTTP Status |
|------|-------------|-------------|
| E102 | Invalid credentials (wrong email/password) | 401 |
| E103 | Authorization token required | 401 |
| E104 | Invalid or expired token | 403 |

---

## �📝 Summary of Implemented Endpoints

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




