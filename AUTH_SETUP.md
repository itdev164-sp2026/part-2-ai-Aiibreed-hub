# Authentication Setup Guide

This guide explains how to set up and use the email/password authentication system for your Next.js application with Supabase.

## 1. Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Get these values from your Supabase project settings:
- Go to [supabase.com](https://supabase.com) and create a new project
- Navigate to Project Settings > API
- Copy the `Project URL` and `Anon Public` key

For production, set `NEXT_PUBLIC_APP_URL` to your production domain.

## 2. Database Schema

You'll need to set up a `projects` table in Supabase with Row Level Security (RLS) enabled. Here's the SQL to run in the Supabase SQL Editor:

```sql
-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create RLS policy - users can only see their own projects
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

-- Create RLS policy - users can only insert their own projects
CREATE POLICY "Users can create their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policy - users can only update their own projects
CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

-- Create RLS policy - users can only delete their own projects
CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);
```

## 3. Authentication Flow

### Sign Up
1. User fills out the sign-up form at `/login`
2. Form validates email and password using Zod schemas
3. `signUpAction()` sends credentials to Supabase
4. A confirmation email is sent (configure email templates in Supabase Dashboard)
5. User clicks link in email, which redirects to `/auth/callback`
6. Session is established and user is redirected to `/projects`

### Sign In
1. User fills out the sign-in form at `/login`
2. Form validates credentials
3. `signInAction()` authenticates with Supabase
4. Session is created via cookies
5. User is redirected to `/projects`

### Session Persistence
- The middleware (`src/middleware.ts`) runs on every request
- It calls `supabase.auth.getUser()` to refresh the session
- If the user is not authenticated and tries to access `/projects`, they're redirected to `/login`
- Authenticated users trying to access `/login` are redirected to `/projects`

## 4. Components & Actions

### Server Actions (`src/app/actions.ts`)

- **`signUpAction(formData)`** - Register a new user
- **`signInAction(formData)`** - Sign in an existing user
- **`signOutAction()`** - Sign out the current user and redirect to `/login`
- **`createProjectAction(formData)`** - Create a new project (authenticated users only)

### Client Components

- **`AuthForm`** (`src/components/auth-form.tsx`) - Toggle between Sign In and Sign Up
- **`AppSidebar`** (`src/components/app-sidebar.tsx`) - Updated to show Sign Out button when authenticated

### Server Components

- **`RootLayout`** (`src/app/layout.tsx`) - Fetches current user and passes to AppSidebar
- **`ProjectsPage`** (`src/app/projects/page.tsx`) - Displays user's projects using authenticated client

## 5. Supabase Client Utilities

### `src/lib/supabase/server.ts`
Creates a Supabase client for Server Components. Use this to:
- Fetch data from database
- Check authentication status
- Refresh sessions

```typescript
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
```

### `src/lib/supabase/middleware.ts`
Creates a Supabase client for the middleware. Automatically refreshes session on every request.

### `src/middleware.ts`
Main middleware that:
- Refreshes auth session
- Protects `/projects` routes (redirects unauthenticated users to `/login`)
- Redirects authenticated users away from `/login` to `/projects`

## 6. Email Configuration

Supabase sends confirmation emails for sign-ups. To customize the email template:

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Email Templates
3. Customize the sign-up confirmation email
4. The email should include a link to `[YOUR_APP_URL]/auth/callback?code=[CODE]`

## 7. Testing the Auth Flow

1. Start your dev server: `npm run dev`
2. Navigate to `http://localhost:3000/login`
3. Click "Sign Up" and enter your test email and password
4. Check your email for confirmation link (or use Supabase Dashboard > Authentication to confirm manually for testing)
5. After confirmation, you should be able to sign in
6. Create a project on the `/projects/new` page
7. View all your projects on `/projects`
8. Click "Sign Out" in the sidebar to log out

## 8. Important Notes

- User authentication state is managed via secure HTTP-only cookies
- Session refresh happens automatically via middleware on every request
- Projects are filtered by user ID using Supabase RLS policies
- All auth actions are Server Actions (no client-side password handling)
- Password validation requires minimum 6 characters (adjust in `src/lib/schemas.ts` if needed)

## 9. Troubleshooting

### "Email not confirmed" error
- User hasn't clicked the confirmation link in their email
- For testing, you can confirm users manually in Supabase Dashboard > Authentication

### "Invalid login credentials" error
- Email/password combination is incorrect
- Email hasn't been confirmed yet

### Projects not appearing after sign-in
- Check that RLS policies are correctly set up in your database
- Verify that the `user_id` field is being saved with the project

### Middleware not redirecting
- Ensure `src/middleware.ts` is in the root `src/` directory
- Restart your dev server after creating/modifying middleware
- Check that `_next/static` is in the matcher exclusion list
