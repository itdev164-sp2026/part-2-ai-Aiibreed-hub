import { Code, Cpu, Database, Globe, Smartphone, Zap } from "lucide-react";

const skills = [
  {
    name: "HTML",
    icon: Globe,
  },
  {
    name: "CSS",
    icon: Code,
  },
  {
    name: "JavaScript",
    icon: Code,
  },
  {
    name: "React",
    icon: Zap,
  },
  {
    name: "Next.js",
    icon: Cpu,
  },
  {
    name: "TypeScript",
    icon: Database,
  },
];

export function Skills() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Skills</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40"
          >
            <Icon className="h-6 w-6 text-muted-foreground" />
            <span className="font-medium">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}