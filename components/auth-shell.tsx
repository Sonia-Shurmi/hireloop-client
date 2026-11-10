import Link from "next/link"
import { cn } from "cn"

import { Logo } from "@/components/logo"

export function AuthShell({
  title,
  subtitle,
  toggle,
  children,
  className,
}: {
  title: string
  subtitle: string
  toggle: { prompt: string; label: string; href: string }
  children: React.ReactNode
  className?: string
}) {
  return (
    <main
      className={cn(
        "relative grid min-h-svh place-items-center overflow-hidden bg-[#0b0a0f] px-4 py-12 sm:py-16",
        className
      )}
    >
      {/* Background layers */}
      <div
        aria-hidden="true"
        className="hero-stars absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(124,92,255,0.14),transparent)]"
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo className="text-[1.5rem]" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400">{subtitle}</p>

          <div className="mt-6 sm:mt-8">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-400">
          {toggle.prompt}{" "}
          <Link
            href={toggle.href}
            className="font-medium text-brand-violet transition-colors hover:text-brand-violet/80"
          >
            {toggle.label}
          </Link>
        </p>
      </div>
    </main>
  )
}
