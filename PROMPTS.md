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
