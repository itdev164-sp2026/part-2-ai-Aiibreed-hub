"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { authSchema, type AuthSchema } from "@/lib/schemas"
import { signInAction, signUpAction } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type AuthMode = "signin" | "signup"

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin")
  const [isLoading, setIsLoading] = useState(false)

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<AuthSchema>({
  resolver: zodResolver(authSchema),
});


  const onSubmit = async (data: AuthSchema) => {
  setIsLoading(true);

  try {
    const action = mode === "signin" ? signInAction : signUpAction;
    const result = await action(data);

    if (!result.success) {
  toast.error(result.error);
  return;
}

if ("message" in result && result.message) {
  toast.success(result.message);
  reset();
}

  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    toast.error(message);
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};




  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</CardTitle>
        <CardDescription>
          {mode === "signin"
            ? "Enter your credentials to sign in"
            : "Create a new account to get started"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Loading..."
              : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>
            {mode === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            {" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin")
                reset()
              }}
              className="font-medium underline hover:text-primary"
              disabled={isLoading}
            >
              {mode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
