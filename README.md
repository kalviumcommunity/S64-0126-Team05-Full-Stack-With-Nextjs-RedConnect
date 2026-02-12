# RedConnect - Context & Hooks Documentation

## Overview

This document outlines the implementation of Context API and custom Hooks for managing authentication and UI state globally across the RedConnect application.

## Why Use Context and Hooks?

| Concept | Purpose | Example |
|---------|---------|---------|
| **Context** | Provides a way to pass data through the component tree without props. | Share logged-in user data across pages. |
| **Custom Hook** | Encapsulates reusable logic for cleaner components. | `useAuth()` handles login, logout, and state access. |
| **Reducer (optional)** | Manages complex state transitions predictably. | Handle UI theme toggling with action types. |

**Key Idea**: Context centralizes data, while custom hooks provide an elegant interface to use it anywhere.

---

## Folder Structure

```
src/
 ├── app/
 │   ├── layout.tsx
 │   ├── page.tsx
 │   └── ...
 ├── context/
 │   ├── AuthContext.tsx
 │   └── UIContext.tsx
 ├── hooks/
 │   ├── useAuth.ts
 │   └── useUI.ts
 └── components/
     └── ...
```

---

## Implementation Details

### 1. AuthContext (`src/context/AuthContext.tsx`)

Manages authentication state globally. Provides user login/logout functionality.

**Key Features:**
- Stores authenticated user information
- Provides `login()` and `logout()` methods
- Custom hook `useAuthContext()` for accessing context values
- Error handling for usage outside of provider

**Type Definition:**
```typescript
interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}
```

**State Flow:**
1. User clicks "Login" button
2. `login()` method updates state with username
3. Console logs "User logged in: [username]"
4. All child components receive updated user state
5. Components re-render with new auth status

**Performance Considerations:**
- Wrapped in "use client" directive for client-side state management
- Uses `useState()` for simple authentication state
- Consumers wrapped in `React.memo()` to prevent unnecessary re-renders

---

### 2. UIContext (`src/context/UIContext.tsx`)

Manages UI state including theme and sidebar visibility.

**Key Features:**
- Toggles between light and dark themes
- Controls sidebar open/close state
- Provides consistent UI experience across all routes

**Type Definition:**
```typescript
interface UIContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}
```

**State Flow:**
1. User clicks "Toggle Theme" button
2. `toggleTheme()` updates theme state (light ↔ dark)
3. All components using `useUI()` receive new theme value
4. Conditional CSS classes apply theme styling
5. Sidebar state similarly managed with `toggleSidebar()`

**Performance Considerations:**
- Theme state is lightweight and doesn't cause excessive re-renders
- Can be optimized with `useReducer()` for complex theme systems
- CSS classes applied conditionally based on theme value

---

### 3. Custom Hooks

#### `useAuth()` (`src/hooks/useAuth.ts`)

Abstracts authentication context logic for cleaner component usage.

```typescript
export function useAuth() {
  const { user, login, logout } = useAuthContext();

  return {
    isAuthenticated: !!user,
    user,
    login,
    logout,
  };
}
```

**Usage Example:**
```typescript
const { isAuthenticated, user, login, logout } = useAuth();
```

**Benefits:**
- Derived state: `isAuthenticated` computed from `user` value
- Cleaner component code - no need to access context directly
- Centralized logic for auth-related operations

---

#### `useUI()` (`src/hooks/useUI.ts`)

Abstracts UI context logic for cleaner component usage.

```typescript
export function useUI() {
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUIContext();

  return {
    theme,
    toggleTheme,
    sidebarOpen,
    toggleSidebar,
  };
}
```

**Usage Example:**
```typescript
const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUI();
```

**Benefits:**
- Consistent interface for accessing UI state
- Easy to refactor theme logic in one place
- Components remain focused on rendering, not state management

---

## Global Setup

### `src/app/layout.tsx`

Both providers are wrapped globally at the root layout level:

```typescript
import { AuthProvider } from "@/context/AuthContext";
import { UIProvider } from "@/context/UIContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <UIProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

**Behavior:**
- `AuthProvider` wraps the entire app, making authentication available globally
- `UIProvider` wraps inside `AuthProvider` for consistent state management
- All child components can access both contexts via custom hooks
- Nesting order allows future expansion (add ThemeProvider, NotificationProvider, etc.)

---

## Example Usage

### `src/app/page.tsx`

Demonstrates consuming both contexts in a page component:

```typescript
"use client";
import { useAuth } from "@/hooks/useAuth";
import { useUI } from "@/hooks/useUI";

export default function Home() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUI();

  return (
    <main className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className="text-2xl font-bold mb-4">Context & Hooks Demo</h1>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Auth State</h2>
        {isAuthenticated ? (
          <>
            <p>Logged in as: {user}</p>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <button onClick={() => login("RedConnectUser")} className="bg-green-500 text-white px-3 py-1 rounded">Login</button>
        )}
      </section>

      <section>
        <h2 className="font-semibold mb-2">UI Controls</h2>
        <p>Current Theme: {theme}</p>
        <button onClick={toggleTheme} className="bg-blue-500 text-white px-3 py-1 rounded mr-3">Toggle Theme</button>
        <button onClick={toggleSidebar} className="bg-yellow-500 text-black px-3 py-1 rounded">
          {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
      </section>
    </main>
  );
}
```

---

## Console Output Example

When interacting with the demo page:

```
User logged in: RedConnectUser
User logged out
```

**Flow Example:**
1. Click "Login" button → Console: "User logged in: RedConnectUser" → Button changes to "Logout"
2. Click "Toggle Theme" → Background color switches (light ↔ dark)
3. Click "Toggle Sidebar" → Button text changes
4. Click "Logout" → Console: "User logged out" → Button changes back to "Login"

---

## Debugging & Performance Tips

### Using React DevTools

1. Install **React Developer Tools** browser extension
2. Open browser DevTools → "Components" tab
3. Navigate to your Context Provider component
4. Inspect context values in real-time
5. Watch state changes as you interact with the app

### Preventing Unnecessary Re-renders

**Memoization Example:**
```typescript
import { memo } from "react";

const MyComponent = memo(function MyComponent({ user, theme }) {
  return <div>{user} - {theme}</div>;
});
```

**Why Memoization Matters:**
- Child components re-render when parent context changes
- `React.memo()` prevents re-renders if props haven't changed
- Especially important for large component trees

### Using `useReducer()` for Complex State

For more complex state transitions, consider upgrading from `useState()` to `useReducer()`:

```typescript
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(reducer, initialState);
```

**Benefits:**
- Better handling of related state updates
- Easier testing of state logic
- Clearer intent when multiple actions update state

---

## Reflection & Best Practices

### Why Context Improves Code Quality

1. **Eliminates Prop Drilling**: No need to pass props through multiple component levels
2. **Centralized State**: Single source of truth for authentication and UI state
3. **Scalability**: Easy to add new contexts for notifications, modals, etc.
4. **Reusability**: Custom hooks can be used across any component

### Potential Pitfalls to Avoid

| Pitfall | Impact | Solution |
|---------|--------|----------|
| Overusing Context | Unnecessary re-renders | Split contexts by domain (Auth, UI, Data) |
| Large Context Objects | All consumers re-render on any change | Use `useReducer()` or multiple contexts |
| Not memoizing consumers | Performance degradation | Wrap components in `React.memo()` |
| Context outside provider | Runtime error | Always check provider wrapping hierarchy |
| Hard-coded values | Difficult to test | Use custom hooks for abstraction |

### When to Use Context vs Props

| Scenario | Use | Reason |
|----------|-----|--------|
| Global app state (auth, theme) | Context | Avoid prop drilling across many levels |
| Passing simple data to direct children | Props | Keep component dependencies explicit |
| Frequently changing data | useReducer + Context | Better performance and clarity |
| Complex business logic | Custom hooks | Logic reuse across multiple components |

---

## Deliverables Checklist

✅ **Working global context setup:**
- [AuthContext.tsx](src/context/AuthContext.tsx) - Manages authentication state
- [UIContext.tsx](src/context/UIContext.tsx) - Manages UI state (theme, sidebar)

✅ **Custom hooks (one per context):**
- [useAuth.ts](src/hooks/useAuth.ts) - Provides clean interface to auth context
- [useUI.ts](src/hooks/useUI.ts) - Provides clean interface to UI context

✅ **Demonstrated state changes:**
- Login/Logout functionality in [page.tsx](src/app/page.tsx)
- Theme toggle demonstration
- Sidebar toggle demonstration

✅ **Integration:**
- [layout.tsx](src/app/layout.tsx) - Global provider setup
- [page.tsx](src/app/page.tsx) - Example usage page

✅ **Documentation:**
- State flow diagrams (above)
- Code structure explanation
- Performance considerations
- Reflection on best practices

---

## How to Test

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the home page:**
   - Visit `http://localhost:3000`

3. **Test authentication:**
   - Click "Login" button → See user state update → Check console for log
   - Click "Logout" button → User state clears → Check console for log

4. **Test UI controls:**
   - Click "Toggle Theme" → Background color changes
   - Click "Toggle Sidebar" → Sidebar state updates

5. **Test with React DevTools:**
   - Open Components tab
   - Locate `<AuthProvider>` and `<UIProvider>`
   - Watch context values change as you interact

---

## Future Enhancements

- **Persist Auth State**: Use localStorage to remember logged-in user
- **Advanced Theme System**: Support multiple themes (light, dark, auto)
- **Notification Context**: Add toast notifications globally
- **Error Boundary**: Wrap providers with error handling
- **Performance Optimization**: Split contexts to prevent unnecessary re-renders
- **Role-Based Access**: Extend auth context with user roles and permissions

---

## References

- [React Context API Documentation](https://react.dev/reference/react/useContext)
- [Custom Hooks - React Docs](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [useReducer - React Docs](https://react.dev/reference/react/useReducer)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

---

**Last Updated**: February 11, 2026  
**Project**: RedConnect - Blood Donation & Inventory Management Platform
---

# Client-Side Data Fetching with SWR

## Overview

SWR (Stale-While-Revalidate), built by Vercel (creators of Next.js), provides an efficient approach to client-side data fetching in the RedConnect application. It implements the stale-while-revalidate HTTP cache invalidation strategy for optimal performance and user experience.

## Why SWR for Client-Side Data Fetching?

| Concept | Description | Benefit |
|---------|-------------|---------|
| **SWR** | Stale-While-Revalidate — returns cached (stale) data immediately, then revalidates in the background. | Users see data instantly without waiting |
| **Automatic Caching** | Avoids redundant network requests by reusing data across components | Reduced network traffic & faster load times |
| **Revalidation** | Fetches new data automatically when the user revisits or refocuses the page | Data stays fresh without manual refresh |
| **Optimistic UI** | Updates UI instantly while waiting for server confirmation | Responsive, instant feedback to users |
| **Deduplication** | Multiple requests for the same data are merged into one | Efficient resource utilization |

**Key Insight**: Your UI stays fast and responsive, even during network operations, thanks to intelligent caching and background revalidation.

## Installation & Setup

### 1. Install SWR

```bash
npm install swr
```

**Status**: ✅ Completed and added to package.json

### 2. Fetcher Function with JWT Support

Location: [lib/fetcher.ts](src/lib/fetcher.ts)

**Key Features**:
- ✅ Automatically includes JWT token from localStorage
- ✅ Handles authentication with Authorization header
- ✅ Error logging for debugging
- ✅ Works with server-side rendering checks

## SWR Key Structure

SWR keys uniquely identify cached data:

```typescript
// URL with query parameters
useSWR("/api/users?page=1&limit=50", fetcher);

// Single resource by ID
useSWR(`/api/users/${userId}`, fetcher);

// Conditional key (pauses fetching when null)
useSWR(userId ? `/api/users/${userId}` : null, fetcher);
```

**Cache Hit Example**:
```
Component A: useSWR("/api/users?page=1&limit=50", fetcher)
  └─ Network request → data cached

Component B: useSWR("/api/users?page=1&limit=50", fetcher)
  └─ ✅ Cache HIT - data returned instantly, no network request
```

**Cache Miss Example**:
```
Component A: useSWR("/api/users?page=1&limit=50", fetcher)
  └─ Network request → data cached

Component B: useSWR("/api/users?page=2&limit=50", fetcher)
  └─ ❌ Cache MISS - different key, new network request
```

## Revalidation Strategies

### 1. On Tab Focus (revalidateOnFocus: true)

```typescript
const { data } = useSWR("/api/users", fetcher, {
  revalidateOnFocus: true,  // Default: true
});
```

Refetches data when user switches back to the tab after viewing another window.

### 2. On Network Reconnect (revalidateOnReconnect: true)

```typescript
const { data } = useSWR("/api/users", fetcher, {
  revalidateOnReconnect: true,  // Default: true
});
```

Automatically refetches when internet connection is restored.

### 3. Auto Refresh Interval (refreshInterval)

```typescript
const { data } = useSWR("/api/blood-inventory", fetcher, {
  refreshInterval: 10000,  // Refresh every 10 seconds
});
```

Continuously refetches data at specified intervals.

### 4. Request Deduplication (dedupingInterval)

```typescript
const { data } = useSWR("/api/users", fetcher, {
  dedupingInterval: 60000,  // Merge requests within 60 seconds
});
```

Multiple simultaneous requests for same URL are merged into one network request.

## Components Implementing SWR

### 1. Users List Page ([app/users/page.tsx](src/app/users/page.tsx))

**Demonstrates**:
- ✅ Basic data fetching with SWR
- ✅ Loading/error/empty states
- ✅ Manual refresh button
- ✅ Pagination info display
- ✅ Cache status indicator

**Key Code**:
```typescript
"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function UsersList() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/users?page=1&limit=50",
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Failed to load users</p>;

  return (
    <div>
      {data?.data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 2. Add User Component ([components/AddUser.tsx](src/components/AddUser.tsx))

**Demonstrates**:
- ✅ Optimistic updates pattern
- ✅ Form submission with SWR mutation
- ✅ Automatic cache revalidation
- ✅ Error recovery
- ✅ Success/error messaging

**Optimistic Update Flow**:
```
1. User submits form
2. UI updates immediately with new user
3. API request sent in background
4. Response arrives → data revalidates
5. Error occurs → UI reverts to correct state
```

## Mutation & Optimistic Updates

The `mutate()` function updates the cache and triggers revalidation:

```typescript
import { mutate } from "swr";

// Soft mutation (update cache, don't revalidate)
mutate("/api/users", newData, false);

// Hard mutation (update cache and revalidate)
mutate("/api/users");
// or equivalently:
await mutate("/api/users", undefined, true);
```

**Optimistic Update Pattern**:
```typescript
// Create optimistic data
const optimisticData = [...currentData, newItem];

// Update UI immediately
mutate("/api/users", optimisticData, false);

// Send API request
const response = await fetch("/api/users", { method: "POST", ... });

// Revalidate with real data
await mutate("/api/users");
```

## Error Handling

### Basic Error Handling

```typescript
const { data, error } = useSWR("/api/users", fetcher);

if (error) {
  return <div>Error: {error.message}</div>;
}
```

### Advanced Error Retry

```typescript
const { data } = useSWR("/api/users", fetcher, {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    if (error.status === 401) return;  // Don't retry auth errors
    if (retryCount >= 3) return;        // Max 3 retries
    
    // Exponential backoff: 1s, 2s, 4s
    setTimeout(() => revalidate({ retryCount }), 1000 * Math.pow(2, retryCount));
  },
});
```

## Cache Hit vs Miss Indicators

**Observing with Console**:
```javascript
// Open DevTools Console
// Monitor these values as you interact

// Cache HIT - data served from memory instantly
console.log("isLoading: false, isValidating: false");

// Cache MISS - new network request triggered
console.log("isLoading: true, isValidating: false");

// Background revalidation - data exists, refreshing
console.log("isLoading: false, isValidating: true");
```

## Performance Improvements

### Traditional Fetch vs SWR

**Without SWR** (multiple components):
```
Component A: fetch("/api/users") → 500ms network request
Component B: fetch("/api/users") → 500ms network request
Total effect: 1000ms
```

**With SWR** (deduplication + caching):
```
Component A: useSWR("/api/users") → 500ms network request + cached
Component B: useSWR("/api/users") → 2ms from cache
Total effect: 502ms (50% faster!)
```

### Optimistic Update Experience

**Traditional UI** (wait for server):
- User clicks button
- Wait 500-1000ms for server response
- UI updates after network round-trip
- Perceived latency: 500-1000ms ⏱️

**Optimistic UI** (instant feedback):
- User clicks button
- UI updates immediately
- Server syncs in background
- Perceived latency: 0ms ⚡

## Debugging & Logs

All fetches are logged via the fetcher:

```typescript
// Console output examples
[SWR] Fetching: /api/users?page=1&limit=50
[SWR] Response status: 200
[SWR] Data fetched successfully

// Optimistic update
[SWR] Optimistic update: { id: 'temp-123', name: 'John' }
[SWR] User created successfully
[SWR] Revalidating cache
```

## Comparison: SWR vs Alternatives

| Feature | SWR | React Query | Fetch API |
|---------|-----|------------|-----------|
| **Bundle Size** | ~3.5 KB | ~25 KB | N/A |
| **Built-in Cache** | ✅ | ✅ | ❌ |
| **Auto Revalidation** | ✅ | ✅ | ❌ |
| **Optimistic Updates** | ✅ | ✅ | ❌ |
| **Ease of Use** | ⭐ Easy | ⭐⭐ Medium | ⭐ but manual |
| **Learning Curve** | Fast | Moderate | None |

**Why SWR for RedConnect**: Minimal bundle size, tight Next.js integration, excellent DX, and perfect for data-fetching needs.

## RedConnect API Endpoints with SWR Keys

```typescript
// Authentication
useSWR("/api/auth/me", fetcher);

// Users
useSWR("/api/users?page=1&limit=50", fetcher);
useSWR(`/api/users/${userId}`, fetcher);

// Blood Banks
useSWR("/api/blood-banks", fetcher);
useSWR(`/api/blood-banks/${id}`, fetcher);

// Blood Donations
useSWR("/api/blood-donation", fetcher);
useSWR(`/api/blood-donation?donorId=${id}`, fetcher);

// Donors
useSWR("/api/donors", fetcher);
useSWR(`/api/donors/${id}`, fetcher);
```

## Testing SWR Integration

### Manual Testing Steps

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Test cache behavior**:
   - Navigate to `/users`
   - Network tab shows initial request
   - Refresh page → Single request (deduplication)
   - Switch tabs → Return → Revalidation triggered

3. **Test optimistic updates**:
   - Fill "Add User" form
   - Submit → New user appears immediately
   - API request in progress in Network tab
   - Wait for response → Data syncs

4. **Test error recovery**:
   - Disable network in DevTools
   - Try to add user → Error displayed
   - Re-enable network
   - Retry works correctly

## Deliverables

✅ **Installation**: SWR installed and added to package.json

✅ **Fetcher Function**: [lib/fetcher.ts](src/lib/fetcher.ts)
- JWT token automatically included
- Error handling and logging
- SSR-compatible

✅ **Components**:
- [app/users/page.tsx](src/app/users/page.tsx) - Data fetching with SWR
- [components/AddUser.tsx](src/components/AddUser.tsx) - Optimistic updates

✅ **Documentation**:
- SWR key structure explained
- Revalidation strategies documented
- Optimistic update pattern demonstrated
- Performance comparison with alternatives
- Error handling strategies shown

## Key Takeaways

1. **SWR = Stale-While-Revalidate**: Return cached data now, update in background
2. **Cache Keys**: Different URLs = different cache entries
3. **Deduplication**: Multiple requests for same data = single network request
4. **Optimistic Updates**: Update UI instantly, sync with server later
5. **Revalidation Triggers**: Tab focus, network reconnect, manual triggers
6. **Error Recovery**: Automatic retry, graceful degradation, user-initiated retry
7. **Performance**: 50%+ faster with caching, instant UI with optimistic updates

---

**Last Updated**: February 12, 2026  
**Project**: RedConnect - Blood Donation & Inventory Management Platform  
**SWR Status**: ✅ Fully Integrated and Tested