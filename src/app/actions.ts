"use server"

import { projectSchema, type ProjectSchema } from "@/lib/schemas";
import { supabase } from "@/lib/supabase";

export async function createProjectAction(formData: ProjectSchema) {
  const parseResult = projectSchema.safeParse(formData);

  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  const { data, error } = await supabase
    .from("projects")
    .insert(parseResult.data)
    .select()
    .single();

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    project: data,
  };
}
