"use client"

import * as React from "react"
import Link from "next/link"

import { AuthShell } from "@/components/auth-shell"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

const inputClasses =
  "h-11! rounded-xl! border-white/10! bg-white/[0.04]! px-4! text-white! placeholder:text-zinc-500! focus-visible:border-brand-violet/60!"

export default function SignInPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget).entries())
    console.log("[sign-in] form data:", data)
    // TODO: integrate authentication here
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

        <button
          type="submit"
          className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-full bg-brand-violet px-6 text-sm font-semibold whitespace-nowrap text-white shadow-[0_0_24px_rgba(124,92,255,0.4)] transition-all outline-none select-none hover:bg-brand-violet/85 focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"
        >
          Sign In
        </button>
      </form>
    </AuthShell>
  )
}
