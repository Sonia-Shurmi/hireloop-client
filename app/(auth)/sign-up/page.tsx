"use client"

import * as React from "react"
import Link from "next/link"

import { AuthShell } from "@/components/auth-shell"
import { Input } from "@/components/ui/input"

const inputClasses =
  "h-11! rounded-xl! border-white/10! bg-white/[0.04]! px-4! text-white! placeholder:text-zinc-500! focus-visible:border-brand-violet/60!"

export default function SignUpPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget).entries())
    console.log("[sign-up] form data:", data)
    // TODO: integrate registration here
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
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className={inputClasses}
          />
        </div>

        <button
          type="submit"
          className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-full bg-brand-violet px-6 text-sm font-semibold whitespace-nowrap text-white shadow-[0_0_24px_rgba(124,92,255,0.4)] transition-all outline-none select-none hover:bg-brand-violet/85 focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
        >
          Create Account
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
