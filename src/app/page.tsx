import { Skills } from "@/components/skills";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          [Akorede Bolajoko]
        </h1>
        <p className="text-muted-foreground">
          I am a passionate web development student currently learning modern technologies like Next.js, TypeScript, and Tailwind CSS. I enjoy building responsive and user-friendly web applications while exploring the intersection of AI and development.
        </p>
      </section>

      <Skills />
    </div>
  );
}
