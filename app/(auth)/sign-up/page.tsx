"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { AuthShell } from "@/components/auth-shell"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

const inputClasses =
  "h-11! rounded-xl! border-white/10! bg-white/[0.04]! px-4! text-white! placeholder:text-zinc-500! focus-visible:border-brand-violet/60!"

/* Values must match lib/auth.ts additionalFields.role */
const roles = [
  { label: "Jobseeker", value: "seeker" },
  { label: "Recruiter", value: "recruiter" },
  { label: "Admin", value: "admin" },
] as const

export default function SignUpPage() {
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

    const { data, error: signUpError } = await authClient.signUp.email({
      name: String(formData.fullName), // required — the name of the user
      email: String(formData.email), // required
      password: String(formData.password), // required — min 8, max 128 chars
      role: String(formData.role), // "seeker" | "recruiter" | "admin" — stored on the user via additionalFields
      callbackURL: "/", // optional — where to redirect after sign-up completes
    })

    setPending(false)

    if (signUpError) {
      console.log("[sign-up] failed:", signUpError.message)
      setError(signUpError.message ?? "Something went wrong. Please try again.")
      return
    }

    console.log("[sign-up] success:", data?.user)
    // better-auth signs the user in right away (email verification is off)
    router.push("/")
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start finding your dream job today."
      toggle={{
        prompt: "Already have an account?",
        label: "Sign In",
        href: "/sign-in",
      }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="signup-name"
            className="text-sm font-medium text-zinc-300"
          >
            Full name
          </label>
          <Input
            id="signup-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Cooper"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-zinc-300"
          >
            Email
          </label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-zinc-300"
          >
            Password
          </label>
          <Input
            id="signup-password"
            name="password"
            type="password"
            required
            minLength={8}
            maxLength={128}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className={inputClasses}
          />
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-zinc-300">
            I am joining as
          </legend>
          <div
            role="radiogroup"
            aria-label="Account type"
            className="grid grid-cols-3 gap-2"
          >
            {roles.map((role) => (
              <label key={role.value} className="relative">
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  defaultChecked={role.value === "seeker"}
                  className="peer sr-only"
                />
                <span className="flex h-11 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-center text-xs font-medium text-zinc-400 transition-colors peer-checked:border-brand-violet! peer-checked:bg-brand-violet/15! peer-checked:text-white peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 sm:text-sm">
                  {role.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

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
          {pending ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-xs leading-relaxed text-zinc-500">
          By creating an account, you agree to our{" "}
          <Link
            href="/terms"
            className="text-zinc-400 underline-offset-2 hover:text-white hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-zinc-400 underline-offset-2 hover:text-white hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthShell>
  )
}
