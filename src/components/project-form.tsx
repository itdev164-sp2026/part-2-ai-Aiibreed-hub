"use client"

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { projectSchema, type ProjectSchema } from "@/lib/schemas";
import { createProjectAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "Archived", value: "archived" },
] as const;

type FormValues = ProjectSchema;

export function ProjectForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "active",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const result = await createProjectAction(values);

    if (!result.success) {
      toast.error(result.error || "Unable to create project.");
      return;
    }

    toast.success("Project created successfully.");
    form.reset();
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input id="title" placeholder="Project title" {...form.register("title")} />
        <FieldError errors={form.formState.errors.title ? [form.formState.errors.title] : undefined} />
      </Field>

      <Field>
        <FieldLabel htmlFor="description">Description</FieldLabel>
        <Textarea
          id="description"
          placeholder="Project description"
          rows={5}
          {...form.register("description")}
        />
        <FieldError
          errors={
            form.formState.errors.description
              ? [form.formState.errors.description]
              : undefined
          }
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="status">Status</FieldLabel>
        <Controller
          name="status"
          control={form.control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={form.formState.errors.status ? [form.formState.errors.status] : undefined} />
      </Field>

      <Button type="submit" className="w-full justify-center">
        Create Project
      </Button>
    </form>
  );
}
