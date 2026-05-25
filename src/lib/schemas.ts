import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  status: z.enum(["active", "completed", "archived"]),
});

export type ProjectSchema = z.infer<typeof projectSchema>;

export const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type AuthSchema = z.infer<typeof authSchema>;
