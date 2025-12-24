# ApniSec - Complete Documentation

A security issue tracking platform built with React and TypeScript.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [How It Works](#how-it-works)
5. [API Reference](#api-reference)
6. [Database Schema](#database-schema)
7. [Connecting a Real Backend](#connecting-a-real-backend)
8. [Common Patterns](#common-patterns)

---

## Quick Start

### Running the App
```bash
npm install
npm run dev
# Open http://localhost:5173
```

### Testing Login
The app uses mock data - enter any email/password to test the dashboard.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI components |
| **TypeScript** | Type safety |
| **Vite** | Fast dev server |
| **Tailwind CSS** | Styling |
| **React Router** | Navigation |
| **React Hook Form** | Form handling |
| **Zod** | Validation |
| **Shadcn UI** | UI components |

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn components (Button, Input, etc.)
│   ├── layout/         # Navbar, Footer
│   ├── landing/        # Landing page sections
│   └── dashboard/      # Dashboard components
│
├── pages/              # Page components
│   ├── Index.tsx       # Landing page
│   ├── Login.tsx       # Login form
│   ├── Register.tsx    # Registration form
│   ├── Dashboard.tsx   # Issue management
│   └── Profile.tsx     # User settings
│
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication state
│
├── services/           # API communication
│   └── api.ts          # All API functions
│
├── types/              # TypeScript types
│   └── index.ts        # All interfaces
│
├── App.tsx             # Main app with routes
└── main.tsx            # Entry point
```

---

## How It Works

### Authentication Flow

```
1. User visits /login
2. Enters email + password
3. Frontend calls authApi.login()
4. API returns user + tokens
5. Tokens saved to localStorage
6. User redirected to /dashboard
```

### Protected Routes

```tsx
// Dashboard requires login
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>    {/* Checks authentication */}
      <Dashboard />      {/* Only shown if logged in */}
    </ProtectedRoute>
  }
/>
```

### Context Provider Structure

```
App.tsx
└── QueryClientProvider (data caching)
    └── BrowserRouter (navigation)
        └── AuthProvider (auth state)
            └── Routes (pages)
```

---

## API Reference

### Base Configuration

```typescript
// src/services/api.ts
const BASE_URL = "/api";  // Change to your backend URL
```

### Response Format

All APIs return:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

---

### Authentication Endpoints

#### POST /api/auth/register
```json
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}

// Response
{
  "success": true,
  "data": {
    "user": { "id": "1", "name": "John", "email": "john@example.com" },
    "tokens": { "accessToken": "jwt...", "refreshToken": "jwt..." }
  }
}
```

#### POST /api/auth/login
```json
// Request
{ "email": "john@example.com", "password": "SecurePass123" }

// Response (same as register)
```

#### POST /api/auth/logout
```
Headers: Authorization: Bearer <token>
Response: { "success": true }
```

#### GET /api/auth/me
```
Headers: Authorization: Bearer <token>
Response: { "success": true, "data": { user object } }
```

#### POST /api/auth/forgot-password
```json
// Request
{ "email": "john@example.com" }
// Response
{ "success": true, "message": "Reset email sent" }
```

#### POST /api/auth/reset-password
```json
// Request
{ "token": "reset-token", "password": "NewPass", "confirmPassword": "NewPass" }
```

---

### User Endpoints

#### GET /api/users/profile
```
Headers: Authorization: Bearer <token>
```

#### PUT /api/users/profile
```json
// Request
{ "name": "New Name", "email": "new@email.com" }
```

#### PUT /api/users/change-password
```json
// Request
{
  "currentPassword": "OldPass",
  "newPassword": "NewPass",
  "confirmPassword": "NewPass"
}
```

---

### Issues Endpoints

#### GET /api/issues
```
Headers: Authorization: Bearer <token>
Query params (optional):
  - type: cloud_security | reteam_assessment | vapt
  - status: open | in_progress | resolved | closed
  - priority: low | medium | high | critical
  - search: text to search
```

#### GET /api/issues/:id
```
Headers: Authorization: Bearer <token>
```

#### POST /api/issues
```json
// Request
{
  "type": "vapt",
  "title": "XSS Vulnerability",
  "description": "Found XSS in search...",
  "priority": "high",
  "status": "open"
}
```

#### PUT /api/issues/:id
```json
// Request (all fields optional)
{ "status": "resolved", "priority": "critical" }
```

#### DELETE /api/issues/:id
```
Headers: Authorization: Bearer <token>
```

---

## Database Schema

### PostgreSQL

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Issues
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  priority VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_issues_user ON issues(user_id);
CREATE INDEX idx_issues_status ON issues(status);
```

### Supabase (with RLS)

```sql
-- Issues table
CREATE TABLE public.issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- Users can only access their own issues
CREATE POLICY "Users manage own issues" ON public.issues
  FOR ALL USING (auth.uid() = user_id);
```

---

## Connecting a Real Backend

### Step 1: Update Base URL

```typescript
// src/services/api.ts
const BASE_URL = "https://your-api.com/api";
```

### Step 2: Enable Real API Calls

In each function, uncomment the real API call:

```typescript
// BEFORE (mock)
login: async (data) => {
  await delay(500);
  return { success: true, data: { user: mockUser, tokens: mockTokens } };
}

// AFTER (real)
login: async (data) => {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data)
  });
}
```

### Step 3: Remove Mock Data

Delete the mock data section from `api.ts`:
- `mockUser`
- `mockTokens`
- `mockIssues`
- `delay()` function

---

## Common Patterns

### Using useState

```tsx
// Create state variable
const [count, setCount] = useState(0);

// Update state
setCount(count + 1);
setCount(prev => prev + 1);
```

### Using useEffect

```tsx
// Run once on mount
useEffect(() => {
  fetchData();
}, []);

// Run when dependency changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

### Using Context

```tsx
// Access auth anywhere
const { user, login, logout, isAuthenticated } = useAuth();

if (isAuthenticated) {
  console.log("Welcome", user.name);
}
```

### Form Handling

```tsx
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { email: "" }
});

const onSubmit = async (data) => {
  const result = await authApi.login(data);
  if (result.success) {
    // Success!
  }
};
```

### API Calls

```tsx
const result = await authApi.login({ email, password });

if (result.success) {
  console.log("User:", result.data.user);
} else {
  console.error("Error:", result.error);
}
```

---

## TypeScript Types Reference

```typescript
// User
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Issue Types
type IssueType = "cloud_security" | "reteam_assessment" | "vapt";
type IssuePriority = "low" | "medium" | "high" | "critical";
type IssueStatus = "open" | "in_progress" | "resolved" | "closed";

// Issue
interface Issue {
  id: string;
  userId: string;
  type: IssueType;
  title: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  createdAt: string;
  updatedAt: string;
}
```

---

## Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com)
- [React Hook Form](https://react-hook-form.com)
- [Shadcn UI](https://ui.shadcn.com)

---

Happy coding! 🚀
