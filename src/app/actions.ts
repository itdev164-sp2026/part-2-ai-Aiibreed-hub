"use server"

import { redirect } from "next/navigation";
import { projectSchema, type ProjectSchema, authSchema, type AuthSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function createProjectAction(formData: ProjectSchema) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in to create a project",
    };
  }

  const parseResult = projectSchema.safeParse(formData);

  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({ ...parseResult.data, user_id: user.id })
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

export async function signUpAction(formData: AuthSchema) {
  const supabase = await createClient();

  const parseResult = authSchema.safeParse(formData);

  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  const { error } = await supabase.auth.signUp({
    email: parseResult.data.email,
    password: parseResult.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    message: "Check your email to confirm your account",
  };
}

export async function signInAction(formData: AuthSchema) {
  const supabase = await createClient();

  const parseResult = authSchema.safeParse(formData);

  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parseResult.data.email,
    password: parseResult.data.password,
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  redirect("/projects");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
