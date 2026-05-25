# Authentication Quick Reference

## Key Locations

| Component | Location | Purpose |
|-----------|----------|---------|
| Login Page | `src/app/(auth)/login/page.tsx` | Entry point for auth |
| Auth Form | `src/components/auth-form.tsx` | Sign in/up component |
| Auth Actions | `src/app/actions.ts` | Server-side auth logic |
| Middleware | `src/middleware.ts` | Session & route protection |
| Supabase Server | `src/lib/supabase/server.ts` | Create authenticated queries |
| Sidebar | `src/components/app-sidebar.tsx` | Sign out button |
| Layout | `src/app/layout.tsx` | Fetches current user |

## Common Tasks

### Get Current User in Server Component
```typescript
import { createClient } from "@/lib/supabase/server";

export default async function MyComponent() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return <div>Welcome, {user?.email}</div>;
}
```

### Create Authenticated Data Query
```typescript
import { createClient } from "@/lib/supabase/server";

async function getUserProjects() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*");
  return data;
}
```

### Sign Out a User
```typescript
import { signOutAction } from "@/app/actions";

<button onClick={() => signOutAction()}>
  Sign Out
</button>
```

### Handle Auth in Server Action
```typescript
import { createClient } from "@/lib/supabase/server";

export async function myAction(data: unknown) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  // Do authenticated operation...
}
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=          # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY= # Your Supabase anon key
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Your app URL
```

## Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/login` | Public | Sign in / Sign up |
| `/` | Public | Home page |
| `/projects` | Private | User's projects |
| `/projects/new` | Private | Create project |
| `/auth/callback` | Public | Email confirmation |

## Database Schema

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT now(),
);

-- Enable RLS and policies for user isolation
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
```

## Authentication Flow Diagram

```
User Visits /login
    ↓
Chooses Sign In or Sign Up
    ↓
Enters Credentials
    ↓
Server Action Validates & Authenticates
    ↓
For Sign Up: Email Confirmation Sent
    User Clicks Email Link → /auth/callback
    ↓
Session Created (HTTP-only Cookie)
    ↓
Middleware Validates on Every Request
    ↓
User Redirected to /projects
```

## Middleware Protection

```typescript
// Middleware automatically:
1. Refreshes session on every request
2. Redirects /projects/* → /login (if not authenticated)
3. Redirects /login → /projects (if authenticated)
```

## Error Handling

All auth actions return:
```typescript
// Success
{ success: true, project?: any, message?: string }

// Error
{ success: false, error: "User-friendly error message" }
```

## Testing Checklist

- [ ] Sign up with new email
- [ ] Confirm email from inbox
- [ ] Sign in with those credentials
- [ ] Create a project
- [ ] Refresh page (session persists)
- [ ] Sign out
- [ ] Try accessing /projects (redirects to login)
- [ ] Sign up with different email
- [ ] Verify new user only sees their own projects

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Not found" errors | Restart dev server |
| Middleware not working | Check `src/middleware.ts` exists |
| Auth not persisting | Check NEXT_PUBLIC_SUPABASE_URL is correct |
| Email not being sent | Check Supabase email provider settings |
| Can't create projects | Verify RLS policies in Supabase |

## Related Files to Review

- `AUTH_SETUP.md` - Detailed setup instructions
- `IMPLEMENTATION_SUMMARY.md` - Technical overview
- `.env.example` - Environment variable template
