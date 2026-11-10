"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { AuthShell } from "@/components/auth-shell"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

const inputClasses =
  "h-11! rounded-xl! border-white/10! bg-white/[0.04]! px-4! text-white! placeholder:text-zinc-500! focus-visible:border-brand-violet/60!"

export default function SignInPage() {
  const router = useRouter()
  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    )

    setError(null)
    setPending(true)

    const { data, error: signInError } = await authClient.signIn.email({
      email: String(formData.email), // required
      password: String(formData.password), // required — min 8, max 128 chars
      rememberMe: formData.remember === "on", // from the "Remember me" checkbox
      callbackURL: "/", // optional — where to redirect after sign-in
    })

    setPending(false)

    if (signInError) {
      console.log("[sign-in] failed:", signInError.message)
      setError(signInError.message ?? "Something went wrong. Please try again.")
      return
    }

    console.log("[sign-in] success:", data?.user)
    router.push("/")
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your job hunt."
      toggle={{
        prompt: "Don't have an account?",
        label: "Sign Up",
        href: "/sign-up",
      }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-zinc-300"
          >
            Email
          </label>
          <Input
            id="signin-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="signin-password"
              className="text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-zinc-400 transition-colors hover:text-white"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="signin-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className={inputClasses}
          />
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2.5 text-sm text-zinc-300 select-none">
          <Checkbox
            name="remember"
            className="data-checked:border-brand-violet! data-checked:bg-brand-violet!"
          />
          Remember me for 30 days
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-full bg-brand-violet px-6 text-sm font-semibold whitespace-nowrap text-white shadow-[0_0_24px_rgba(124,92,255,0.4)] transition-all outline-none select-none hover:bg-brand-violet/85 focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
        >
          {pending ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </AuthShell>
  )
}
