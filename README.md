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

## ✅ Assessment Completion Status

All **5 Assessments** have been successfully completed and implemented. **State management (Context & Hooks)** is also implemented and documented.

### 1. RESTful API Route Design ✅
**Status:** COMPLETE | **Date:** 9 February 2026

**Implemented:**
- ✅ Blood banks CRUD endpoints (`/api/blood-banks`)
- ✅ Donors CRUD endpoints (`/api/donors`)
- ✅ Blood donations endpoints (`/api/blood-donation`)
- ✅ Pagination with `page`, `limit`, `totalPages`
- ✅ Filtering support (bloodType, city, isActive)
- ✅ Atomic transactions for multi-step operations
- ✅ Proper HTTP status codes (400, 404, 409, 500)
- ✅ Comprehensive error handling

**Files:** `/src/app/api/blood-banks/route.ts`, `/src/app/api/donors/route.ts`, `/src/app/api/blood-donation/route.ts`

---

### 2. Global API Response Handler ✅
**Status:** COMPLETE | **Date:** 9 February 2026

**Implemented:**
- ✅ Centralized `sendSuccess()` response utility
- ✅ Centralized `sendError()` response utility
- ✅ Standardized respo nse format across all endpoints
- ✅ Global error code mapping (E001-E012)
- ✅ Consistent error response structure
- ✅ Integrated with all existing endpoints

**Files:** `/src/lib/responseHandler.ts`, `/src/lib/errorCodes.ts`

**Response Format:**
```json
{
  "success": true/false,
  "message": "...",
  "data": {...},
  "error": {"code": "E001"},
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

---

### 3. Input Validation with Zod ✅
**Status:** COMPLETE | **Date:** 9 February 2026

**Implemented:**
- ✅ Blood bank schema validation
- ✅ Donor schema validation
- ✅ Blood donation schema validation
- ✅ Auth (signup/login) schema validation
- ✅ Type-safe validation with Zod
- ✅ Integrated validation error handling
- ✅ Custom error messages for each field

**Files:** 
- `/src/lib/schemas/bloodBankSchema.ts`
- `/src/lib/schemas/donorSchema.ts`
- `/src/lib/schemas/bloodDonationSchema.ts`
- `/src/lib/schemas/authSchema.ts`
- `/src/lib/validationUtils.ts`

---

### 4. Authentication APIs (Signup/Login) ✅
**Status:** COMPLETE | **Date:** 9 February 2026

**Implemented:**
- ✅ `/api/auth/signup` - User registration with bcrypt password hashing
- ✅ `/api/auth/login` - User authentication with JWT token generation
- ✅ Password hashing with bcrypt (10 salt rounds for security)
- ✅ JWT token generation and verification using jose
- ✅ 24-hour token expiry
- ✅ Bearer token extraction and validation
- ✅ Error codes: E102 (invalid credentials), E103 (missing token), E104 (expired token)

**Files:**
- `/src/app/api/auth/signup/route.ts`
- `/src/app/api/auth/login/route.ts`
- `/src/lib/jwtUtils.ts`

**Key Features:**
- Secure password hashing (passwords never stored plain text)
- JWT-based stateless sessions
- Token verification in protected routes
- Automatic user info attachment to requests

---

### 5. Authorization Middleware (Role-Based Access Control) ✅
**Status:** COMPLETE | **Date:** 9 February 2026

**Implemented:**
- ✅ Comprehensive authorization middleware in `src/middleware.ts`
- ✅ JWT token validation for all API routes
- ✅ Role-based access control (RBAC) enforcement
- ✅ Support for 3 user roles: DONOR, HOSPITAL, ADMIN
- ✅ Protected `/api/admin` route (ADMIN only)
- ✅ Protected `/api/users` route (all authenticated users)
- ✅ Bearer token extraction and verification
- ✅ User info attachment to request headers (x-user-id, x-user-email, x-user-role)
- ✅ Error code E105 for insufficient permissions

**Files:**
- `/src/middleware.ts` - Main authorization middleware
- `/src/app/api/admin/route.ts` - Admin-only endpoint

**Route Configuration:**
```typescript
/api/admin          → ["ADMIN"]
/api/admin/users    → ["ADMIN"]
/api/admin/reports  → ["ADMIN"]
/api/users          → ["DONOR", "ADMIN", "HOSPITAL"]
```

**Public Routes (No Auth Required):**
- `/` - Home page
- `/login` - Login page
- `/api/auth/signup` - User registration
- `/api/auth/login` - User authentication
- `/api/test` - Health check

---

### 6. Error Handling Middleware ✅
**Status:** COMPLETE | **Date:** 9 February 2026

**Implemented:**
- ✅ Centralized error handler (`handleError()`, `handleTypedError()`, `asyncHandler()`)
- ✅ Structured logging utility with JSON format
- ✅ Development vs production error response differentiation
- ✅ Stack trace redaction in production
- ✅ Full error logging for debugging (internal only)
- ✅ Safe user-facing error messages
- ✅ Error testing endpoint (`/api/test-error`)
- ✅ Support for 7 error scenarios (database, validation, auth, etc.)
- ✅ Comprehensive error classification system

**Files:**
- `/src/lib/logger.ts` - Structured logging utility
- `/src/lib/errorHandler.ts` - Centralized error handler
- `/src/app/api/test-error/route.ts` - Error testing endpoint

**Key Features:**
```typescript
// Centralized error handling
handleError(error, "GET /api/users")

// Type-safe error handling
handleTypedError({ message: "...", code: "E104", status: 401 })

// Async wrapper (eliminates try-catch boilerplate)
asyncHandler(async () => { ... }, "GET /route")
```

**Error Response Comparison:**
- **Development:** Shows full error details + stack trace
- **Production:** Shows generic message, logs full details internally

---

### 7. Caching Layer with Redis ✅
**Status:** COMPLETE | **Date:** 9 February 2026

**Implemented:**
- ✅ Redis client setup using `ioredis`
- ✅ Cache-aside pattern on all API **GET** routes
- ✅ TTL policy (60 seconds default; 30 seconds for `/api/test`)
- ✅ Cache invalidation on user creation/update/delete and donation updates
- ✅ Safe fallback when Redis is unavailable

**Files:**
- `/src/lib/redis.ts` — Redis client + safe helpers
- `/src/lib/cacheKeys.ts` — cache key + pattern helpers
- `/src/app/api/users/route.ts` — cache-aside logic with TTL
- `/src/app/api/users/[id]/route.ts` — invalidation on update/delete
- `/src/app/api/auth/signup/route.ts` — invalidation on signup
- `/src/app/api/donors/route.ts` — cache-aside + invalidation
- `/src/app/api/blood-banks/route.ts` — cache-aside + invalidation
- `/src/app/api/blood-donation/route.ts` — cache-aside + invalidation
- `/src/app/api/admin/route.ts` — cache-aside (per-user)
- `/src/app/api/test/route.ts` — cache-aside (short TTL)

**Note:** `/api/test-error` intentionally remains uncached to preserve error testing behavior.

**Redis Setup (Utility):**
```ts
// src/lib/redis.ts
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
export default redis;
```

**Cache-Aside Example (GET /api/users):**
```ts
const cacheKey = usersListCacheKey(page, limit);
const cachedData = await getCache(cacheKey);

if (cachedData) {
  return sendSuccess(JSON.parse(cachedData), "Users fetched successfully (cache)");
}

const payload = { data: users, meta: { page, limit, total, totalPages } };
await setCache(cacheKey, JSON.stringify(payload), 60);
return sendSuccess(payload, "Users fetched successfully");
```

**TTL Policy**
- **60 seconds** for most GET routes
- **30 seconds** for `/api/test`
- Keys are page/limit/filter aware where applicable
- Keys are page/limit aware (`users:list:p{page}:l{limit}`)

**Cache Invalidation Strategy**
- `users:list:*`, `users:detail:*`, `test:users` invalidated on:
  - `POST /api/auth/signup`
  - `POST /api/users`
  - `PATCH /api/users/[id]`
  - `DELETE /api/users/[id]`
- `donations:list:*`, `blood-banks:list:*`, `donors:list:*` invalidated on:
  - `POST /api/blood-donation`

**Evidence of Latency Improvement (Verify via Logs)**
Sample logs to observe after hitting the route twice:
```
Users cache miss { cacheKey: "users:list:p1:l10" }
Users cache hit { cacheKey: "users:list:p1:l10" }
```
Typical observation: first request hits DB, second request returns from cache within TTL.

**Reflection**
- **Cache coherence risk:** stale data if invalidation is missed.
- **TTL trade-off:** shorter TTL improves freshness, longer TTL improves performance.
- **When caching can be counterproductive:** highly personalized or rapidly changing data, where invalidation overhead outweighs benefits.

---

### 8. File Upload API with AWS S3 (Pre-Signed URLs) ✅
**Status:** COMPLETE | **Date:** 9 February 2026

**Implemented:**
- ✅ Pre-signed URL generation for direct uploads to S3
- ✅ File type and size validation before issuing URL
- ✅ Database record creation for uploaded files
- ✅ Short-lived upload URLs (60 seconds)

**Files:**
- `/src/app/api/upload/route.ts` — pre-signed URL API
- `/src/app/api/files/route.ts` — file metadata storage API
- `/src/lib/schemas/fileUploadSchema.ts` — validation rules
- `/prisma/schema.prisma` — `FileUpload` model

**Upload Flow (Pre-Signed URL)**
```mermaid
flowchart LR
  "Client" --> "POST /api/upload"
  "POST /api/upload" --> "Validate Type/Size"
  "Validate Type/Size" --> "Generate Signed URL"
  "Generate Signed URL" --> "Client"
  "Client" --> "PUT to S3 URL"
  "PUT to S3 URL" --> "POST /api/files"
  "POST /api/files" --> "Save metadata in DB"
```

**API Example: Generate Upload URL**
```bash
curl -X POST http://localhost:3000/api/upload \
  -H "Content-Type: application/json" \
  -d '{"filename":"report.pdf","fileType":"application/pdf","fileSize":120000}'
```

**Response**
```json
{
  "success": true,
  "message": "Pre-signed upload URL generated",
  "data": {
    "uploadURL": "https://...",
    "fileURL": "https://<bucket>.s3.<region>.amazonaws.com/uploads/...",
    "key": "uploads/...",
    "expiresIn": 60
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**API Example: Store File Metadata**
```bash
curl -X POST http://localhost:3000/api/files \
  -H "Content-Type: application/json" \
  -d '{"fileName":"report.pdf","fileURL":"https://...","fileSize":120000,"fileType":"application/pdf"}'
```

**Validation Rules**
- Allowed types: `image/*` and `application/pdf`
- Max size: **5 MB**
- URL expiry: **60 seconds**

**Security & Lifecycle Notes**
- Use private buckets by default; only expose public URLs if needed.
- Keep pre-signed URL expiry short to reduce misuse.
- Configure S3 lifecycle rules to archive or delete old uploads.

**Reflection**
- **Public vs private trade-off:** public URLs are simple but less secure; private URLs require signed access for reads.
- **Lifecycle policies reduce cost:** auto-expire stale files and keep storage lean.

---

### 9. Email Service Integration with AWS SES ✅
**Status:** COMPLETE | **Date:** 9 February 2026

**Implemented:**
- ✅ SES email API endpoint with HTML support
- ✅ Validation for recipients, subject, and template/message
- ✅ Reusable HTML template (`welcomeTemplate`)
- ✅ Structured logs with SES message ID

**Files:**
- `/src/app/api/email/route.ts` — SES email API
- `/src/lib/schemas/emailSchema.ts` — request validation
- `/src/lib/emailTemplates.ts` — HTML templates

**Email Flow**
```mermaid
flowchart LR
  "Client" --> "POST /api/email"
  "POST /api/email" --> "Validate payload"
  "Validate payload" --> "Build HTML"
  "Build HTML" --> "Send via SES"
  "Send via SES" --> "Return MessageId"
```

**API Example: Send Email**
```bash
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{"to":"student@example.com","subject":"Welcome!","template":"welcome","userName":"Aditi"}'
```

**Response**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "data": {
    "messageId": "01010189b2example123"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Example Log**
```
Email sent { messageId: "01010189b2example123", to: "student@example.com", subject: "Welcome!" }
```

**Template Example**
```ts
export const welcomeTemplate = (userName: string) => `
  <h2>Welcome to TrustMail, ${userName}!</h2>
  <p>We’re thrilled to have you onboard.</p>
`;
```

**Sandbox vs Production**
- SES sandbox allows sending only to verified addresses.
- Move to production by requesting SES production access and verifying domain.

**Rate Limits & Bounce Handling**
- SES enforces sending quotas; use retry/backoff or a queue for spikes.
- Monitor bounces/complaints in SES and configure notifications (SNS).
- Configure SPF/DKIM for trusted sender authentication.

**Reflection**
- **Security:** Verified sender + short‑lived credentials reduce abuse risk.
- **Reliability:** Logs + message IDs provide traceability.
- **Compliance:** Bounce monitoring and SPF/DKIM improve deliverability and trust.

---

### 10. Secure JWT & Session Management (Concept + Design Notes)
**Status:** DOCUMENTED | **Date:** 10 February 2026

This section documents a secure, production‑ready JWT + refresh token session strategy and how it maps to this project.

**JWT Structure (Header / Payload / Signature)**
```json
{
  "header": { "alg": "HS256", "typ": "JWT" },
  "payload": { "userId": "12345", "exp": 1715120000, "role": "ADMIN" },
  "signature": "hashed-verification-string"
}
```
- **Header:** Algorithm + token type
- **Payload:** Claims like user ID, role, and expiry
- **Signature:** Verifies the token wasn’t tampered with

**Access vs Refresh Tokens**
- **Access Token:** short‑lived (e.g., 15 minutes), sent with API requests
- **Refresh Token:** long‑lived (e.g., 7 days), used only to obtain a new access token

**Recommended Token Flow**
```mermaid
sequenceDiagram
  participant Client
  participant Server
  Client->>Server: Login (credentials)
  Server-->>Client: Access Token + Refresh Token
  Client->>Server: API request (Access Token)
  Server-->>Client: 401 if expired
  Client->>Server: Refresh (Refresh Token)
  Server-->>Client: New Access Token (rotate refresh token)
```

**Secure Storage Choices**
- **Access Token:** store in memory or short‑lived HTTP‑only cookie
- **Refresh Token:** store in HTTP‑only, `SameSite=Strict` cookie to reduce XSS/CSRF risk

Example cookie settings (server‑side):
```ts
res.cookie("refreshToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
});
```

**Token Expiry & Rotation**
- Always validate access token on protected routes
- If expired, verify refresh token, issue a new access token
- Rotate refresh tokens on every use to reduce replay risk

**Security Threats & Mitigations**
| Threat | Risk | Mitigation |
| --- | --- | --- |
| XSS | Token theft from JS‑accessible storage | Use HTTP‑only cookies, sanitize inputs |
| CSRF | Unwanted authenticated requests | SameSite cookies, CSRF tokens, Origin checks |
| Replay | Stolen token reused | Short TTL + refresh token rotation |

**Project Mapping (Current vs Recommended)**
- **Current:** JWT access token only, 24‑hour expiry (`/src/lib/jwtUtils.ts`)
- **Recommended extension:** add refresh token issuance, rotation, and `/api/auth/refresh` endpoint

**Example Request (Refresh)**
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  --cookie "refreshToken=<token>"
```

**Evidence to Capture (Suggested)**
- Log showing expired access token → refresh flow success
- API response with new access token
- Console output with refresh token rotation

**Reflection**
- **Short TTL improves security** but requires reliable refresh handling.
- **HTTP‑only cookies reduce XSS exposure** but require CSRF protections.
- **Rotation limits replay risk** at the cost of extra server state or token tracking.

---

### 11. State Management Using Context and Hooks ✅

**Status:** COMPLETE | **Date:** 11 February 2026

Global client-side state is provided via **React Context** (Auth, UI), with **custom hooks** (`useAuth`, `useUI`) giving a clean API for components. This keeps shared data (logged-in user, theme, sidebar) available without prop drilling.

#### Why Use Context and Hooks?

| Concept | Purpose | Example |
|--------|---------|--------|
| **Context** | Pass data through the component tree without props | Share logged-in user across pages |
| **Custom Hook** | Encapsulate reusable logic for cleaner components | `useAuth()` handles login, logout, and state access |
| **Reducer (optional)** | Manage complex state transitions predictably | e.g. UI theme toggling with action types |

**Key idea:** Context centralizes data; custom hooks provide a simple interface to use it anywhere.

#### Folder Structure

```
src/
├── app/
│   ├── layout.tsx      # Wraps app with AuthProvider + UIProvider
│   └── page.tsx        # Home page using useAuth + useUI
├── context/
│   ├── AuthContext.tsx # User auth state (login/logout)
│   └── UIContext.tsx   # Theme + sidebar state
└── hooks/
    ├── useAuth.ts      # Consumes AuthContext, exposes isAuthenticated, user, login, logout
    └── useUI.ts        # Consumes UIContext, exposes theme, toggleTheme, sidebarOpen, toggleSidebar
```

#### Purpose of Each Context

- **AuthContext:** Holds `user` (string | null), `login(username)`, and `logout()`. Used to share “who is logged in” across the app without passing props. The provider wraps the app in `layout.tsx`.
- **UIContext:** Holds `theme` (light | dark), `toggleTheme()`, `sidebarOpen`, and `toggleSidebar()`. Used for consistent theme and sidebar visibility across routes.

#### Custom Hooks Encapsulate Shared Logic

- **useAuth:** Wraps `useAuthContext()` and returns `{ isAuthenticated, user, login, logout }`. Components use `useAuth()` instead of touching the context directly.
- **useUI:** Wraps `useUIContext()` and returns `{ theme, toggleTheme, sidebarOpen, toggleSidebar }`. Same idea: one place to consume UI state.

#### State Flow

1. **Layout** renders `AuthProvider` → `UIProvider` → `LayoutWrapper` → `children`.
2. Any page or component under the tree can call `useAuth()` or `useUI()`.
3. **Login** updates AuthContext → components using `useAuth()` re-render with new `user`.
4. **Toggle theme/sidebar** updates UIContext → components using `useUI()` re-render.

```
RootLayout
  → AuthProvider (user, login, logout)
    → UIProvider (theme, sidebarOpen, toggleTheme, toggleSidebar)
      → LayoutWrapper
        → page.tsx (useAuth + useUI)
```

#### Code Snippets

**Consuming context via hooks (e.g. Home page):**

```tsx
// src/app/page.tsx
const { user, login, logout, isAuthenticated } = useAuth();
const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUI();
```

**Providing context globally:**

```tsx
// src/app/layout.tsx
<AuthProvider>
  <UIProvider>
    <LayoutWrapper>{children}</LayoutWrapper>
  </UIProvider>
</AuthProvider>
```

#### Evidence (Console Logs)

When using the home page demo:

- **Login:** `User logged in: KalviumUser`
- **Logout:** `User logged out`
- **Theme toggle:** `Theme toggled to dark` / `Theme toggled to light`
- **Sidebar:** `Sidebar opened` / `Sidebar closed`

Screenshots can be added under `docs/` (e.g. home page with theme toggle and auth state).

#### Reflection

- **Performance:** Use React DevTools → Components tab to inspect context values. Wrap context consumers in `React.memo()` if they re-render too often. For heavier state transitions, consider `useReducer()` with a dispatch pattern.
- **Scalability & readability:** Context + hooks keep state in one place and components declarative. New features can add new contexts or hooks without cluttering props.
- **Potential pitfalls:** Any context value change re-renders all consumers. Splitting contexts (Auth vs UI) helps. Avoid putting frequently changing and rarely used data in the same context as stable data.

---

## 🔒 Security Features Implemented

✅ **Password Security:** bcrypt hashing with 10 salt rounds  
✅ **Session Security:** JWT tokens with 24-hour expiry  
✅ **Authorization:** Role-based access control across all routes  
✅ **Token Validation:** Bearer token extraction and signature verification  
✅ **Least Privilege:** Users get minimum necessary permissions based on role  
✅ **Error Handling:** Secure error messages without exposing system details  
✅ **Input Validation:** Zod schemas for all user inputs  
✅ **Structured Logging:** JSON logging for debugging and monitoring  

---

## 📚 Complete Documentation Sections

- [RESTful API Design](#restful-api-design--overview) - REST conventions, endpoints, pagination
- [Global API Response Handler](#global-api-response-handler) - Response format, error codes
- [Input Validation with Zod](#input-validation-with-zod) - Schema definitions, validation examples
- [Authentication APIs (Signup/Login)](#-authentication-apis-signup--login) - User registration, JWT tokens
- [Authorization Middleware (RBAC)](#-authorization-middleware-role-based-access-control) - Role-based access, testing
- [Error Handling Middleware](#-error-handling-middleware) - Centralized error handling, logging

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
│   ├── context/        # React Context providers (Auth, UI)
│   │   ├── AuthContext.tsx
│   │   └── UIContext.tsx
│   ├── hooks/          # Custom hooks (useAuth, useUI)
│   │   ├── useAuth.ts
│   │   └── useUI.ts
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

#### `src/context/`
Contains React Context providers for global client state. `AuthContext` provides user auth state (login/logout); `UIContext` provides theme and sidebar state. Both are wrapped around the app in the root layout.

#### `src/hooks/`
Custom hooks that consume context and expose a simple API. `useAuth()` and `useUI()` keep components clean and avoid prop drilling. See [State Management Using Context and Hooks](#11-state-management-using-context-and-hooks-).

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

## � Authorization Middleware (Role-Based Access Control)

RedConnect implements comprehensive authorization middleware to enforce role-based access control (RBAC) across all API routes. This ensures that users can only perform actions their role permits, following the principle of **least privilege**.

### Authentication vs Authorization

| Concept | Acronym | Definition | Example |
|---------|---------|-----------|---------|
| **Authentication** | AuthN | Verifying who the user is | User logs in with email/password |
| **Authorization** | AuthZ | Determining what user can do | Only admins can access /api/admin |

While authentication answers "Who are you?", authorization answers "What are you allowed to do?"

### User Roles in RedConnect

We've defined three core roles in the system:

| Role | Description | Permissions |
|------|-------------|-------------|
| **DONOR** | Regular blood donor | Can view user list, manage own profile |
| **HOSPITAL** | Blood bank/hospital | Can manage blood inventory, view donors |
| **ADMIN** | System administrator | Full access to all routes, user management |

### Middleware Architecture

**File:** `src/middleware.ts`

The middleware intercepts all incoming requests and:

1. **Identifies protected routes** - Routes requiring authentication/authorization
2. **Extracts JWT token** - From `Authorization: Bearer <token>` header
3. **Validates token** - Using `jose` library to verify JWT signature and expiry
4. **Checks user role** - Maps current route to required roles
5. **Enforces access** - Grants or denies access based on role match

**Request Flow Diagram:**
```
Incoming Request
    ↓
Is route public? → YES → Allow request ✓
    ↓ NO
Extract JWT Token from header
    ↓
Token exists? → NO → Return 401 (E103) ✗
    ↓ YES
Verify JWT signature & expiry
    ↓
Token valid? → NO → Return 403 (E104) ✗
    ↓ YES
Extract user role from token payload
    ↓
Route requires specific roles?
    ↓ YES
User role matches required roles? → NO → Return 403 (E105) ✗
    ↓ YES
Attach user info to headers
    ↓
Allow request ✓
```

### Protected Routes Configuration

The middleware defines which roles can access which routes:

```typescript
const ROLE_BASED_ROUTES: Record<string, string[]> = {
  "/api/admin": ["ADMIN"],                          // Admin only
  "/api/admin/users": ["ADMIN"],                    // Admin only
  "/api/admin/reports": ["ADMIN"],                  // Admin only
  "/api/users": ["DONOR", "ADMIN", "HOSPITAL"],    // All authenticated users
};
```

### Public Routes

The following routes **do not require authentication**:

- `/` - Home page
- `/login` - Login page
- `/api/auth/signup` - User registration
- `/api/auth/login` - User authentication
- `/api/test` - Health check endpoint

### Protected API Endpoints

#### 1. Admin Dashboard

**Endpoint:** `GET /api/admin`

**Access:** ADMIN only

**Request:**
```bash
curl -X GET http://localhost:3000/api/admin \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin access granted",
  "data": {
    "message": "Welcome to Admin Dashboard",
    "accessLevel": "Full administrative access",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "admin@example.com",
      "role": "ADMIN"
    },
    "availableActions": [
      "View all users",
      "Delete users",
      "View reports",
      "Manage blood banks",
      "View system analytics"
    ]
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Access Denied Response (403):**
```json
{
  "success": false,
  "message": "Access denied. Required role: ADMIN",
  "error": {
    "code": "E105"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

#### 2. User List (Protected)

**Endpoint:** `GET /api/users`

**Access:** DONOR, HOSPITAL, ADMIN

**Request with JWT:**
```bash
# Get token from login endpoint first
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' | jq -r '.data.token')

# Use token to access protected route
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN"
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

### Error Codes for Authorization

| Code | Status | Message | When |
|------|--------|---------|------|
| **E103** | 401 | Authorization token required | Missing Authorization header |
| **E104** | 403 | Invalid or expired token | JWT verification failed |
| **E105** | 403 | Access denied - insufficient permissions | User role doesn't match required roles |

### Testing Authorization Scenarios

#### Scenario 1: Admin Access Allowed

```bash
# 1. Login as admin
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"adminpass123"}' \
  | jq -r '.data.token' > /tmp/admin_token.txt

# 2. Access admin route
ADMIN_TOKEN=$(cat /tmp/admin_token.txt)
curl -X GET http://localhost:3000/api/admin \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  | jq '.success, .message'

# Expected: true, "Admin access granted"
```

#### Scenario 2: User Access Denied to Admin Route

```bash
# 1. Login as regular donor
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"donor@example.com","password":"donorpass123"}' \
  | jq -r '.data.token' > /tmp/donor_token.txt

# 2. Try to access admin route
DONOR_TOKEN=$(cat /tmp/donor_token.txt)
curl -X GET http://localhost:3000/api/admin \
  -H "Authorization: Bearer $DONOR_TOKEN" \
  | jq '.success, .error.code'

# Expected: false, "E105" (Access denied)
```

#### Scenario 3: Missing Token

```bash
# Try to access protected route without token
curl -X GET http://localhost:3000/api/users \
  | jq '.error.code, .message'

# Expected: "E103", "Authorization token required"
```

#### Scenario 4: Expired Token

```bash
# Use an old/expired JWT token
EXPIRED_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImV4cCI6MTcwMDAwMDAwMH0.invalid"

curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $EXPIRED_TOKEN" \
  | jq '.error.code, .message'

# Expected: "E104", "Invalid or expired token"
```

### How Middleware Works: Step-by-Step

1. **Token Extraction:**
   - Middleware reads `Authorization` header
   - Removes "Bearer " prefix to get raw JWT token

2. **Route Matching:**
   - Checks if current pathname requires authorization
   - Looks up required roles for that route

3. **Token Verification:**
   - Uses jose library to verify JWT signature
   - Validates token hasn't expired
   - Decodes payload containing user info (id, email, role)

4. **Role Validation:**
   - Extracts user's role from decoded token
   - Checks if role is in required roles array
   - Denies access if role not authorized

5. **Header Injection:**
   - Attaches user info to request headers
   - Makes available to downstream route handlers via:
     - `x-user-id`
     - `x-user-email`
     - `x-user-role`

### Principle of Least Privilege

**Definition:** Users should have the minimum permissions necessary to perform their job.

**Implementation in RedConnect:**

- **DONOR role:** Can only view public data, doesn't get admin access
- **HOSPITAL role:** Can manage blood inventory, doesn't get full admin access
- **ADMIN role:** Only assign to trusted administrators

**Future Extension Example:** Adding MODERATOR role

```typescript
// In src/middleware.ts
const ROLE_BASED_ROUTES: Record<string, string[]> = {
  "/api/admin": ["ADMIN"],
  "/api/reports": ["ADMIN", "MODERATOR"],  // NEW
  "/api/users": ["DONOR", "ADMIN", "HOSPITAL", "MODERATOR"],  // NEW
};
```

### Why Role-Based Middleware Matters

✅ **Security:** Prevents unauthorized users from accessing sensitive data
✅ **Scalability:** Easy to add new roles and routes
✅ **Consistency:** Single place to define authorization rules
✅ **Maintainability:** Changes propagate to all routes
✅ **Auditability:** Clear log of what access was granted/denied

---

## �️ Error Handling Middleware

RedConnect implements a centralized error handling system to ensure consistent, structured error logging while keeping production responses safe from exposing sensitive information.

### Why Centralized Error Handling Matters

Modern web applications fail in many ways — database timeouts, API errors, validation failures, authentication issues, etc. A centralized error handler ensures:

| Benefit | Impact |
|---------|--------|
| **Consistency** | Every error follows the same response format |
| **Security** | Stack traces and sensitive data hidden in production |
| **Observability** | Structured logs for easier debugging and monitoring |
| **Maintainability** | Single place to update error handling logic |

### Error Handling Architecture

**Files:**
- `/src/lib/logger.ts` - Structured logging utility
- `/src/lib/errorHandler.ts` - Centralized error handler functions
- `/src/app/api/test-error/route.ts` - Error testing endpoint

### 1. Structured Logger Utility

**File:** `src/lib/logger.ts`

Provides consistent, JSON-formatted logging across the application:

```typescript
export const logger = {
  info: (message: string, meta?: LogMeta) => { ... },
  warn: (message: string, meta?: LogMeta) => { ... },
  error: (message: string, meta?: LogMeta, stack?: string) => { ... },
  debug: (message: string, meta?: LogMeta) => { ... },
};
```

**Log Format:**
```json
{
  "level": "error",
  "message": "Error in GET /api/users",
  "meta": {
    "status": 500,
    "message": "Database connection timeout"
  },
  "stack": "REDACTED or actual stack trace",
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

### 2. Centralized Error Handler

**File:** `src/lib/errorHandler.ts`

Provides reusable error handling functions:

```typescript
// Basic error handler
export function handleError(
  error: unknown,
  context: string,
  status: number = 500
): NextResponse

// Type-safe error handler for custom errors
export function handleTypedError(appError: AppError): NextResponse

// Async wrapper to eliminate repetitive try-catch
export async function asyncHandler(
  handler: () => Promise<NextResponse>,
  context: string
): Promise<NextResponse>
```

### 3. Development vs Production Error Responses

**Key Difference:**

| Scenario | Development | Production |
|----------|-------------|-----------|
| Stack Trace | ✅ Shown in response | 🔒 Logged only, not sent |
| Error Details | ✅ Full message shown | 🔒 Generic message sent |
| Debugging | ✅ Easy with full info | ✅ Logs available for team |
| User Trust | - | ✅ Safe, minimal info |

#### Development Mode Response:
```bash
NODE_ENV=development
curl http://localhost:3000/api/test-error?type=database
```

**Response:**
```json
{
  "success": false,
  "message": "Database connection timeout after 30 seconds",
  "error": {
    "code": "E500",
    "details": "Database connection timeout after 30 seconds"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Console Log:**
```json
{
  "level": "error",
  "message": "Error in GET /api/test-error",
  "meta": {
    "status": 500,
    "message": "Database connection timeout after 30 seconds",
    "context": "GET /api/test-error"
  },
  "stack": "Error: Database connection timeout...\n    at Database.connect...",
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

#### Production Mode Response:
```bash
NODE_ENV=production
curl http://localhost:3000/api/test-error?type=database
```

**Response (Safe, No Details):**
```json
{
  "success": false,
  "message": "Something went wrong. Please try again later.",
  "error": {
    "code": "E500"
  },
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Console Log (Full Details Still Logged):**
```json
{
  "level": "error",
  "message": "Error in GET /api/test-error",
  "meta": {
    "status": 500,
    "message": "Database connection timeout after 30 seconds",
    "context": "GET /api/test-error"
  },
  "stack": "REDACTED",
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

### 4. Error Testing Endpoint

**Endpoint:** `GET /api/test-error`

Test different error scenarios to see how the error handler responds:

**Supported error types:**

```bash
# Generic error
curl http://localhost:3000/api/test-error?type=generic

# Database error
curl http://localhost:3000/api/test-error?type=database

# Validation error (400)
curl http://localhost:3000/api/test-error?type=validation

# Authentication error (401)
curl http://localhost:3000/api/test-error?type=authentication

# Authorization error (403)
curl http://localhost:3000/api/test-error?type=authorization

# Timeout error
curl http://localhost:3000/api/test-error?type=timeout

# Not found error (404)
curl http://localhost:3000/api/test-error?type=notfound
```

### 5. Using Error Handler in Routes

**Basic Usage:**
```typescript
import { handleError } from "@/lib/errorHandler";
import { logger } from "@/lib/logger";

export async function GET(req: Request) {
  try {
    logger.info("Fetching users");
    const users = await db.user.findMany();
    return sendSuccess(users);
  } catch (error) {
    return handleError(error, "GET /api/users");
  }
}
```

**Type-Safe Usage:**
```typescript
import { handleTypedError } from "@/lib/errorHandler";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.email) {
      return handleTypedError({
        message: "Email is required",
        code: "E002",
        status: 400,
        context: "POST /api/users",
      });
    }
    
    // ... rest of logic
  } catch (error) {
    return handleError(error, "POST /api/users");
  }
}
```

**Async Wrapper Usage (Cleanest):**
```typescript
import { asyncHandler } from "@/lib/errorHandler";

export async function GET(req: Request) {
  return asyncHandler(async () => {
    logger.info("Fetching users");
    const users = await db.user.findMany();
    return sendSuccess(users);
  }, "GET /api/users");
}
```

### 6. Error Classification System

RedConnect uses a hierarchical error classification:

| Error Type | Status | Code Pattern | Example |
|-----------|--------|--------------|---------|
| Validation | 400 | E00x | E001, E002, E003 |
| Authentication | 401 | E10x | E103, E104 |
| Authorization | 403 | E10x | E105 |
| Not Found | 404 | E00x | E004, E005, E006 |
| Conflict/Duplicate | 409 | E00x | E007, E008, E009 |
| Server Error | 500 | E5xx | E500, E501 |

**Error Codes Reference:**
- **E001-E003:** Validation errors (missing fields, invalid format)
- **E004-E006:** Not found errors (resource doesn't exist)
- **E007-E009:** Conflict errors (duplicates, mismatches)
- **E010-E012:** Database errors
- **E102:** Invalid credentials
- **E103:** Token required
- **E104:** Token invalid/expired
- **E105:** Access denied (insufficient permissions)
- **E500-E501:** Internal server errors

### 7. How Error Handling Works: Step-by-Step

```
1. Route Handler Executes
   ↓
2. Error Occurs (thrown or caught)
   ↓
3. handleError() or handleTypedError() Called
   ↓
4. Logger.error() Records Full Details
   ├─ In Dev: Includes full stack trace
   └─ In Prod: Stack trace marked "REDACTED"
   ↓
5. Create Safe Response
   ├─ In Dev: Shows actual error message
   └─ In Prod: Shows generic "Something went wrong" message
   ↓
6. Return NextResponse (json) to Client
```

### 8. Debugging with Structured Logs

**Finding Errors:**
```bash
# Search logs for all errors
grep '"level":"error"' logs.json

# Search for specific endpoint errors
grep 'GET /api/users' logs.json | grep error

# Search for specific error code
grep 'E104' logs.json

# Get errors from specific time range
grep '2026-02-09' logs.json | grep error
```

**Log Analysis Example:**
```json
{
  "level": "error",
  "message": "Error in GET /api/users",
  "meta": {
    "status": 500,
    "code": "E500",
    "message": "Query timeout: User.findMany() exceeded 10s timeout",
    "context": "GET /api/users"
  },
  "stack": "Error: Query timeout...",
  "timestamp": "2026-02-09T10:30:45.123Z"
}
```

**Debugging Steps:**
1. Look at timestamp to correlate with user reports
2. Check error message for root cause
3. Review stack trace (dev) or search logs (prod) for context
4. Identify error code to categorize issue
5. Update route handler or database query to fix

### 9. Security Benefits

✅ **No Stack Trace Leaks:** Production won't expose file paths, function names, or system details  
✅ **Safe Error Messages:** Generic messages prevent attackers from learning system internals  
✅ **Full Logging:** Developers still get complete information for debugging  
✅ **Audit Trail:** All errors logged with timestamp for compliance  
✅ **Environment-Aware:** Development and production have different behaviors  

### 10. Future Extensions

**Adding Custom Error Types:**
```typescript
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
  }
}

// In error handler:
if (error instanceof ValidationError) {
  return handleTypedError({
    message: `Validation error in field: ${error.field}`,
    code: "E001",
    status: 400,
  });
}
```

**Adding Error Tracking Service:**
```typescript
// Send errors to external service (e.g., Sentry, LogRocket)
logger.error(message, meta, stack);
if (isProd) {
  sendToExternalTracker({ level: "error", message, meta });
}
```

---

## 📝 Complete API Endpoint Summary


### Blood Management Endpoints

| Method | Route | Purpose | Auth Required | Status |
|--------|-------|---------|---------------|--------|
| GET | `/api/blood-banks` | List all blood banks with pagination | ❌ No | ✅ LIVE |
| POST | `/api/blood-banks` | Create new blood bank | ❌ No | ✅ LIVE |
| GET | `/api/blood-banks/[id]` | Get blood bank by ID | ❌ No | ✅ LIVE |
| PATCH | `/api/blood-banks/[id]` | Update blood bank | ❌ No | ✅ LIVE |
| DELETE | `/api/blood-banks/[id]` | Delete blood bank | ❌ No | ✅ LIVE |

### Donor Management Endpoints

| Method | Route | Purpose | Auth Required | Status |
|--------|-------|---------|---------------|--------|
| GET | `/api/donors` | List all donors with filters | ❌ No | ✅ LIVE |
| POST | `/api/donors` | Create new donor | ❌ No | ✅ LIVE |
| GET | `/api/donors/[id]` | Get donor by ID | ❌ No | ✅ LIVE |
| PATCH | `/api/donors/[id]` | Update donor | ❌ No | ✅ LIVE |
| DELETE | `/api/donors/[id]` | Delete donor | ❌ No | ✅ LIVE |

### Blood Donation Endpoints

| Method | Route | Purpose | Auth Required | Status |
|--------|-------|---------|---------------|--------|
| POST | `/api/blood-donation` | Record new donation | ❌ No | ✅ LIVE |
| GET | `/api/blood-donation` | List all donations | ❌ No | ✅ LIVE |

### Authentication Endpoints

| Method | Route | Purpose | Auth Required | Status |
|--------|-------|---------|---------------|--------|
| POST | `/api/auth/signup` | User registration with password hashing | ❌ No | ✅ LIVE |
| POST | `/api/auth/login` | User authentication with JWT token | ❌ No | ✅ LIVE |

### User Management Endpoints

| Method | Route | Purpose | Auth Required | Required Role | Status |
|--------|-------|---------|---------------|---------------|--------|
| GET | `/api/users` | List all users | ✅ Yes | DONOR, HOSPITAL, ADMIN | ✅ LIVE |
| POST | `/api/users` | Create new user | ✅ Yes | DONOR, HOSPITAL, ADMIN | ✅ LIVE |
| GET | `/api/users/[id]` | Get user by ID | ✅ Yes | DONOR, HOSPITAL, ADMIN | ✅ LIVE |
| PATCH | `/api/users/[id]` | Update user | ✅ Yes | DONOR, HOSPITAL, ADMIN | ✅ LIVE |
| DELETE | `/api/users/[id]` | Delete user | ✅ Yes | DONOR, HOSPITAL, ADMIN | ✅ LIVE |

### Admin Endpoints

| Method | Route | Purpose | Auth Required | Required Role | Status |
|--------|-------|---------|---------------|---------------|--------|
| GET | `/api/admin` | Admin dashboard | ✅ Yes | ADMIN | ✅ LIVE |
| GET | `/api/admin/users` | View all users (admin) | ✅ Yes | ADMIN | ⏳ Planned |
| GET | `/api/admin/reports` | View system reports | ✅ Yes | ADMIN | ⏳ Planned |

### Utility Endpoints

| Method | Route | Purpose | Auth Required | Status |
|--------|-------|---------|---------------|--------|
| GET | `/api/test` | Health check endpoint | ❌ No | ✅ LIVE |

---

## 🎯 Key Implementation Highlights

### Data Validation
- ✅ All inputs validated using Zod schemas
- ✅ Type-safe validation with TypeScript integration
- ✅ Custom error messages for each validation failure
- ✅ Comprehensive error responses

### Security
- ✅ Bcrypt password hashing (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Bearer token validation
- ✅ Protected routes with middleware

### API Design
- ✅ RESTful endpoint structure
- ✅ Proper HTTP status codes
- ✅ Pagination support (page, limit, totalPages)
- ✅ Filtering capabilities (bloodType, city, isActive)
- ✅ Atomic transactions for complex operations

### Response Format
- ✅ Standardized success/error responses
- ✅ Consistent error code mapping
- ✅ Timestamp in all responses
- ✅ Metadata for paginated results

---

## 🚀 Getting Started

### 1. Setup Environment Variables

Create `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/redconnect"
JWT_SECRET="your-super-secret-key-change-in-production"
REDIS_URL="redis://localhost:6379"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="ap-south-1"
AWS_BUCKET_NAME="your-bucket-name"
SES_EMAIL_SENDER="no-reply@yourdomain.com"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database
```bash
npx prisma db push
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```

Server runs on `http://localhost:3000`

---

## 📖 Documentation Index

- **[RESTful API Design](#restful-api-design--overview)** - REST conventions, CRUD operations
- **[Global Response Handler](#global-api-response-handler)** - Response format, error codes
- **[Input Validation](#input-validation-with-zod)** - Schema validation with Zod
- **[Authentication](#-authentication-apis-signup--login)** - Signup, login, JWT tokens
- **[Authorization](#-authorization-middleware-role-based-access-control)** - RBAC, protected routes

---

## 🎨 Tailwind Configuration Summary

### Custom Breakpoints

The project uses Tailwind CSS v4 with a compatibility `tailwind.config.js` loaded via the `@config` directive. Custom responsive breakpoints are defined as:

| Breakpoint | Min Width | Typical Device |
|-----------|-----------|----------------|
| `sm` | 640px | Large phone / small tablet |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop / landscape tablet |
| `xl` | 1280px | Desktop |

### Design Tokens — Brand Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-light` | `#93C5FD` | Accents, hover states, highlights |
| `brand` (DEFAULT) | `#3B82F6` | Primary brand actions |
| `brand-dark` | `#1E40AF` | Active states, emphasis |

### Theme Variables (Light & Dark)

| CSS Variable | Light Value | Dark Value |
|-------------|-------------|------------|
| `--background` | `#ffffff` | `#0f172a` |
| `--foreground` | `#171717` | `#f1f5f9` |
| `--card-bg` | `#ffffff` | `#1e293b` |
| `--card-border` | `#e5e7eb` | `#334155` |
| `--muted` | `#f3f4f6` | `#1e293b` |
| `--muted-foreground` | `#6b7280` | `#94a3b8` |
| `--accent` | `#dc2626` | `#ef4444` |

### Dark Mode Configuration

Dark mode uses the **class strategy** (`darkMode: 'class'` in `tailwind.config.js`). The `.dark` class is toggled on the `<html>` element by `UIContext`. Theme preference is persisted via `localStorage`.

---

## 📱 Responsiveness Evidence

### Breakpoint Behavior

| Viewport | Header Nav | Hero Layout | Stats Grid | Mission Cards | Footer Grid |
|----------|-----------|-------------|------------|---------------|-------------|
| **Mobile** (<640px) | Hamburger menu | Single column, centered | 1 column | 1 column | 1 column |
| **Small** (640px) | Hamburger menu | Single column, centered | 3 columns | 2 columns | 2 columns |
| **Tablet** (768px) | Full nav bar | Two columns side-by-side | 3 columns | 2 columns | 4 columns |
| **Desktop** (1024px+) | Full nav bar | Two columns, larger gaps | 3 columns | 3 columns | 4 columns |

### How to Test Responsiveness

1. Run `npm run dev` and open `http://localhost:3000`
2. Open Chrome DevTools → **Device Toolbar** (Ctrl+Shift+M)
3. Test with presets: iPhone SE (375px), iPad (768px), Desktop (1280px)
4. Verify: text sizes scale, grid columns adjust, no content clipping/overlapping

### Key Responsive Utilities Used

- **Padding:** `px-4 sm:px-6`, `py-12 sm:py-16`
- **Typography:** `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- **Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, `grid-cols-1 sm:grid-cols-2 md:grid-cols-4`
- **Layout:** `flex-col md:flex-row`, `hidden md:flex`
- **Navigation:** Mobile hamburger menu (visible below `md`) / full nav bar (visible at `md`+)

---

## 🌗 Theme Reflection

### Implementation Approach

- **Strategy:** Class-based dark mode (`darkMode: 'class'`) — the `.dark` class is toggled on `<html>` by a React context (`UIContext.tsx`)
- **Toggle Component:** `ThemeToggle.tsx` with animated sun ↔ moon icon transition
- **Persistence:** Theme preference stored in `localStorage` and restored on page load via `useEffect`
- **Smooth Transitions:** CSS `transition: background-color 0.3s ease, color 0.3s ease` on `body` for seamless switching

### Color Contrast Considerations (WCAG)

| Element | Light Mode | Dark Mode | Contrast Ratio |
|---------|-----------|-----------|---------------|
| Body text on background | `#171717` on `#ffffff` | `#f1f5f9` on `#0f172a` | ~15.4:1 / ~13.8:1 ✅ |
| Muted text | `#6b7280` on `#ffffff` | `#94a3b8` on `#0f172a` | ~5.4:1 / ~7.1:1 ✅ |
| Accent (red) on background | `#dc2626` on `#ffffff` | `#ef4444` on `#0f172a` | ~4.6:1 / ~4.8:1 ✅ |

All combinations meet **WCAG AA** (minimum 4.5:1 for normal text, 3:1 for large text).

### Challenges Faced

1. **Tailwind v4 vs v3 configuration:** The project uses Tailwind v4 which does not support a `tailwind.config.js` by default. Solved by using Tailwind v4's `@config` directive to load a v3-compatible config file.
2. **SSR hydration mismatch:** Since the `dark` class is applied client-side from `localStorage`, there's a brief mismatch on first render. Mitigated with `suppressHydrationWarning` on the `<html>` element.
3. **Smooth transitions across all elements:** Rather than adding `dark:` variants to every color utility, we used CSS custom properties that change under `.dark`, so all elements transition automatically.

### Accessibility Notes

- Theme toggle button includes `aria-label` describing the target mode ("Switch to dark mode" / "Switch to light mode")
- The toggle button has clear visual affordance (sun/moon icon with smooth animation)
- All interactive elements maintain sufficient color contrast in both themes
- Focus states are preserved through Tailwind's default focus ring utilities

---

## 📜 License

This project is licensed under the MIT License.

---

**Last Updated:** 17 February 2026  
**Version:** 1.1.0 (All Assessments + Responsive Layout & Dark Mode Complete)

