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
