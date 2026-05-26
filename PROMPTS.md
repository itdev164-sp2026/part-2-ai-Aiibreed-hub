# Prompting Log — ITDEV-164

## Activity 1: The AI-Native Launchpad

### Prompt 1
**What I asked:**
> (Paste the exact prompt you gave to Copilot Agent Mode)

**What happened:**
> (Describe what the Agent did. Did it understand your intent immediately?
> Did it create the right files? Were there any errors?)

### Prompt 2
**What I asked:**
> (Paste your second prompt — this could be a follow-up correction or
> a completely new request)

**What happened:**
> (Describe the result. Did you have to "steer" the Agent?
> What did you learn about writing effective prompts?)

### Reflection
> Write 2-3 sentences reflecting on the experience. How did it feel
> to direct an AI to build something for you? What surprised you?
> What would you do differently next time?


## Activity 2: Building the Dashboard Shell

### Prompt 1

**What I asked:**

> Using the shadcn sidebar components that are now in my src/components/ui/ folder,
> create a professional, collapsible dashboard layout. It should include:
> 
> 1. A sidebar (src/components/app-sidebar.tsx) with navigation links for:
>    - Overview (use the Home icon from lucide-react)
>    - Projects (use the FolderOpen icon)
>    - Settings (use the Settings icon)
> 
> 2. A top navigation area with breadcrumbs showing the current page.
> 
> 3. A main content area that wraps the existing page content.
> 
> 4. Update src/app/layout.tsx to use the new SidebarProvider and sidebar layout.
> 
> Important: Preserve the Developer Profile content from Activity 1 in
> src/app/page.tsx — it should appear in the main content area of the new layout.
> Keep the dark mode toggle working.

**What happened:**

> The Agent handled multiple files efficiently and correctly. It created the app-sidebar.tsx file exactly as requested with the proper navigation links and icons. It successfully modified layout.tsx to integrate the SidebarProvider and new layout structure. The Agent also updated the header.tsx component to include breadcrumbs and a mobile sidebar toggle button. All changes were made without any errors, and the existing Activity 1 content was preserved exactly as requested.

### Prompt 2

**What I asked:**

> (No follow-up prompt was needed - the implementation worked perfectly on the first try)

**What happened:**

> (No follow-up was required since the Agent successfully implemented all requirements in the first prompt)

### Reflection

> The Agent did not accidentally delete or overwrite any of my Activity 1 code. It carefully preserved the Developer Profile content in src/app/page.tsx and maintained all existing functionality including the dark mode toggle. I learned that providing clear context about existing code that needs to be preserved is crucial - by specifically mentioning "Preserve the Developer Profile content from Activity 1", the Agent understood exactly what to protect while making the necessary layout changes.


## Activity 3: Server-Side Data with Supabase

### Prompt 1

**What I asked:**

> Using the Supabase client at src/lib/supabase.ts, create a new Server Component at src/app/projects/page.tsx that:
> 
> 1. Fetches all records from the "projects" table in Supabase
> 2. Displays them in a professional layout using shadcn/ui Card components (run `npx shadcn@latest add card` if needed)
> 3. Each card should show the project title, description, and a status badge
> 4. The status badge should be color-coded:
>    - "active" = green
>    - "completed" = blue
>    - "archived" = gray
> 
> Use @workspace context to match the styling of our existing Dashboard. This must be a React Server Component (async function, no "use client"). Do NOT use useEffect or useState for data fetching.

**What happened:**

> The Agent created a Server Component at src/app/projects/page.tsx and used async/await to fetch data directly from Supabase. It did not use useEffect or useState. The page renders professional shadcn/ui cards with title, description, and a color-coded status badge. The layout matches the existing dashboard style, and the data is fetched server-side as requested.

### Prompt 2

**What I asked:**

> (No follow-up prompt was needed - the projects page worked as intended with server-side fetching and card layout)

**What happened:**

> (No follow-up was required since the Agent successfully created the Server Component and implemented the requested layout and status badges on the first attempt)

### Reflection

> Fetching data on the server feels much cleaner than the useEffect pattern from Web Programming 1. It avoids client-side lifecycle complexity and makes the page render with data already available, which is faster and more reliable. In the App Router, server-side data fetching is surprisingly simple: just write an async component and await the Supabase client, with no extra hooks or loading state needed for the initial render.


## Activity 4: AI-Driven Forms & Validation

### Prompt 1

**What I asked:**

> Create a Zod validation schema in a new file src/lib/schemas.ts for a "Project" with the following fields:
> 
> - title: string, minimum 3 characters, with a custom error message "Title must be at least 3 characters"
> - description: string, minimum 10 characters, with a custom error message "Description must be at least 10 characters"
> - status: enum with values "active", "completed", "archived"
> 
> Export the schema and also export the inferred TypeScript type using z.infer.

**What happened:**

> The Agent created `src/lib/schemas.ts` with a `projectSchema` exactly as requested, including custom error messages and a `status` enum. It also exported the inferred type `ProjectSchema` using `z.infer<typeof projectSchema>`.

### Prompt 2

**What I asked:**

> Using the Zod schema from src/lib/schemas.ts, do the following:
> 
> 1. Create a form component at src/components/project-form.tsx that:
>    - Is a Client Component ("use client") because it uses react-hook-form hooks
>    - Uses react-hook-form with the zodResolver from @hookform/resolvers for validation
>    - Uses shadcn/ui Field, FieldLabel, and FieldError for field layout
>    - Uses shadcn/ui Input for title, Textarea for description, and Select for status
>    - Shows inline error messages under each field when validation fails
>    - Has a "Create Project" submit button
>    - Shows a sonner toast notification on successful submission
> 
> 2. Create a Server Action at src/app/actions.ts that:
>    - Has "use server" at the top of the file
>    - Accepts the validated form data
>    - Validates it again with the Zod schema (server-side validation)
>    - Inserts the validated data into the Supabase "projects" table
>    - Returns a success or error response
> 
> 3. Create a new page at src/app/projects/new/page.tsx that renders the project form within the dashboard layout.
> 
> 4. Add a "New Project" button to the existing projects page (src/app/projects/page.tsx) that links to /projects/new.
> 
> Use @workspace to match the existing project styling.

**What happened:**

> The Agent created `src/components/project-form.tsx` as a Client Component using `react-hook-form`, `zodResolver`, shadcn UI fields, and Sonner for toast notifications. It also created `src/app/actions.ts` with `use server`, re-validated the form data with Zod, and inserted the project into Supabase. A new `src/app/projects/new/page.tsx` page was added, and the existing projects page now includes a `New Project` button linking to `/projects/new`.

### Prompt 3

**What I asked:**

> Why is there an error in line 12 of src/app/actions.ts?

**What happened:**

> The Agent identified that `parseResult.error.errors` is invalid for Zod. It explained that Zod uses `parseResult.error.issues`, and then updated the server action to use `parseResult.error.issues.map((issue) => issue.message).join(", ")`.

### Reflection

> The schema-first approach with Zod makes form validation much more predictable and reusable. It helps prevent junk data from reaching the database by validating both client and server inputs against the same schema, so invalid fields are caught before insertion. Compared to previous courses where form validation often relied on ad-hoc checks or `useEffect`, Zod provides a cleaner, centralized contract for data shape and error messages.


## Activity 5: Securing the App with Supabase Auth

### Prompt 1

**What I asked:**

> Implement a complete email/password authentication flow for this Next.js 15 App Router project using @supabase/ssr. Here is what I need:
>
> 1. **SUPABASE CLIENTS**: Create server-side Supabase client utilities in `src/lib/supabase/` that work correctly with Next.js cookies. I need separate clients for Server Components, Server Actions, and Middleware.
>
> 2. **LOGIN PAGE**: Create a page at `src/app/(auth)/login/page.tsx` with a shadcn/ui card-based login form. It should support both "Sign In" and "Sign Up" (toggle between them). Handle auth via Server Actions, not client-side fetch.
>
> 3. **MIDDLEWARE**: Create `src/middleware.ts` that refreshes the user's auth session on every request, protects `/projects` routes, allows unauthenticated access to `/login`, and uses `supabase.auth.getUser()` (NOT `getSession()`) for verification.
>
> 4. **SIGN OUT**: Add a "Sign Out" button to the sidebar that calls a Server Action, signs the user out, and redirects to `/login`. Only render when authenticated.
>
> 5. **UPDATE DATA QUERIES**: Modify the projects page and create-project action to use the authenticated Supabase client with RLS policies.

**What happened:**

> The Agent created and modified 17 files in a single coordinated pass. It created: `src/lib/supabase/server.ts`, `src/lib/supabase/middleware.ts`, `src/lib/supabase/cookies.ts`, `src/components/auth-form.tsx`, `src/app/(auth)/login/page.tsx`, `src/app/auth/callback/route.ts`, `src/middleware.ts`, and supporting documentation. It also modified 9 existing files including `src/app/actions.ts` with auth actions, `src/app/layout.tsx` to be async and fetch the user, `src/components/app-sidebar.tsx` to add a Sign Out button, `src/app/projects/page.tsx` to use the authenticated client, and `src/lib/schemas.ts` with auth validation. The Agent understood that authentication isn't isolated—it requires coordinating middleware, layouts, actions, and database policies into a cohesive system.

### Prompt 2

**What I asked:**

> check the errors

**What happened:**

> The Agent identified three cascading TypeScript errors in the middleware: (1) using `response.redirect()` instead of `NextResponse.redirect()` (instance method vs static method), (2) attempting to set the read-only `response.status` property, and (3) missing the `NextResponse` import. It fixed all three by importing `NextResponse`, replacing the instance method calls with static `NextResponse.redirect()`, and preserving the Supabase session headers via `{ headers: response.headers }`. The middleware now compiles without errors.

### Reflection

> The biggest surprise was that the **root layout needed to become async**. Most developers would add login, middleware, and sign out, then assume they're done. But the layout must fetch `auth.getUser()` and pass the user as a prop to AppSidebar so it can conditionally render the Sign Out button—this cascading dependency isn't obvious upfront. I learned that middleware-based auth (centralizing route protection and session refresh) is far superior to component-level checks scattered across pages, but both have roles: middleware handles guards, layouts handle props. The three redirect bugs taught me that `NextResponse` uses only static methods and that cookie headers must be explicitly preserved when redirecting from middleware.


## Activity 6: Deployment, Webhooks, & AI-Testing

### Prompt 1

**What I asked:**

> I have a Next.js app with Supabase Auth. Using @workspace context to understand the app structure, write an End-to-End (E2E) test file at tests/auth.spec.ts using Playwright.
>
> The tests should verify:
> 1. **LOGIN PAGE VISIBLE**: Navigate to /login and confirm the login form is visible (check for email input, password input, and submit button).
> 2. **REDIRECT AFTER LOGIN**: After a successful login with valid credentials, the user is redirected to the dashboard or projects page.
> 3. **SIDEBAR NAVIGATION**: After login, verify that the sidebar navigation links are visible: "Overview", "Projects", and "Settings".
>
> Requirements:
> - Use role-based locators (getByRole, getByLabel, getByText) instead of CSS selectors or test IDs. This makes tests more accessible and resilient to UI changes.
> - Add clear test descriptions that explain what each test verifies.
> - Handle the async nature of navigation and page loads with proper Playwright waiting strategies.
> - Read test credentials from process.env.TEST_USER_EMAIL and process.env.TEST_USER_PASSWORD. Do not hardcode credentials. If those variables are not set, the credentialed tests should skip with a clear message rather than fail.

**What happened:**

> The Agent created `tests/auth.spec.ts` with all three test cases using role-based locators and clear docstrings. It correctly identified the auth flow from the workspace context and implemented proper async handling with `waitForLoadState()` and `waitForURL()`. The tests read credentials from environment variables and used `test.skip()` to gracefully skip tests when credentials weren't provided. **However, the initial tests failed on the first run** due to mismatches with the actual component structure: (1) `CardTitle` renders as a `<div>`, not a semantic heading, so the `getByRole('heading')` query failed, and (2) sidebar navigation links appeared in both the sidebar and breadcrumb, causing strict mode violations. The Agent had done the right thing by using role-based locators—the issue was understanding how Shadcn/ui custom components actually render.

### Prompt 2

**What I asked:**

> This Playwright test is failing with the following error: ... Look at the actual component code in @workspace and fix the test to match the real UI. Use role-based locators.

**What happened:**

> The Agent examined the actual component code, discovered that `CardTitle` renders as a styled `<div>` (not a heading), and that navigation links exist in both sidebar and breadcrumb. It then made three iterative fixes:
> 1. First attempt: Changed heading query to `page.getByText(/sign in/i)`, but this still hit strict mode because the text appeared in the title, description, and button.
> 2. Second attempt: Tried filtering with XPath-like expressions, which proved too complex.
> 3. **Third attempt (final)**: Used `page.getByText(/^Sign In$/).first()` for the title (exact text match + first occurrence) and added `.first()` to the sidebar navigation queries to select only the sidebar link, excluding the breadcrumb.
>
> **All three tests passed on the third iteration**, and the solution remained 100% role-based—no data-testid attributes or CSS selectors were introduced.

### Reflection

> Having the AI write and run tests **significantly increases confidence in the deploy button**. The Agent caught UI mismatches that a manual setup would have—specifically the difference between Shadcn's component rendering and standard HTML semantics. If I had written these tests manually in the browser, I likely would have resorted to CSS selectors or test IDs out of frustration, which would couple the tests to implementation details. Instead, by iterating with the Agent through actual test failures, I learned that role-based locators require understanding *how components render*, not just what role they should have. The Agent didn't just generate tests; it debugged the gap between intent and implementation, which is exactly where manual testing usually breaks down.

### Course Reflection

> Looking back at my Activity 1 prompt compared to now: **I've gone from vague ("build a dashboard") to hyper-specific ("use @workspace, role-based locators only, gracefully handle missing env vars, re-validate on server")**. 
>
> My prompting strategy evolved in three ways:
> 1. **Context is everything**: Early prompts left ambiguity. Now I always provide @workspace context and reference actual file paths, making the Agent's job deterministic rather than creative.
> 2. **Constraints drive quality**: I learned to say "no CSS selectors, only role-based" instead of hoping the Agent would choose the right pattern. Constraints eliminate guesswork.
> 3. **Expect failure as learning**: In Activity 1, a failed prompt felt like the Agent "didn't understand." By Activity 6, I treat failures as data—they reveal what the Agent assumed versus what's real, which makes the next iteration precise.
>
> **The most important thing I learned**: **AI coding tools excel at iteration, not divination.** The first run of any non-trivial feature will have gaps. Rather than trying to write the "perfect prompt" upfront, I now think of prompting as a conversation where each iteration refines the constraint space. The Agent is a knowledge base + execution engine; my job is to translate "what I want" into "constraints that eliminate wrong answers." When I did that here—"role-based locators only," "read from env vars," "skip tests if missing"—the Agent executed flawlessly. When I was vague, it filled gaps with reasonable defaults that didn't match my intent.

