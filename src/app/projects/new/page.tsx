import { ProjectForm } from "@/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground">
          Add a project to your dashboard and track progress easily.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <ProjectForm />
      </div>
    </div>
  );
}
