import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigationLinks = [
  { label: "Browse Jobs", href: "/browse-jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
] as const

function Logo({ className }: React.ComponentProps<"a">) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-baseline text-[1.4rem] leading-none font-bold tracking-tight lowercase",
        className
      )}
    >
      <span className="text-brand-blue">hire</span>
      <span className="text-brand-orange">loop</span>
    </Link>
  )
}

function NavLinks({ className }: { className?: string }) {
  return (
    <nav className={cn("flex", className)} aria-label="Main navigation">
      {navigationLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

const getStartedClasses =
  "inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand-violet px-8 text-sm font-medium whitespace-nowrap text-white shadow-[0_0_20px_rgba(124,92,255,0.4)] transition-all outline-none select-none hover:bg-brand-violet/85 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-50"

export function Navbar({ className }: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 border-b border-white/10 bg-[#0b0a0f]",
        className
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop right side */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLinks className="items-center gap-8" />

          <span
            aria-hidden="true"
            className="h-5 w-px shrink-0 bg-white/15"
          />

          <Link
            href="/sign-in"
            className="text-sm font-medium text-brand-violet transition-colors hover:text-brand-violet/80"
          >
            Sign In
          </Link>

          <Link href="/get-started" className={getStartedClasses}>
            Get Started
          </Link>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-300 hover:bg-white/10 hover:text-white md:hidden"
                aria-label="Open menu"
              />
            }
          >
            <MenuIcon />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 border-white/10 bg-[#0b0a0f] text-white"
          >
            <SheetHeader>
              <SheetTitle className="p-0">
                <Logo className="text-[1.25rem]" />
              </SheetTitle>
            </SheetHeader>

            <NavLinks className="flex-col items-start gap-1 px-4 [&_a]:w-full [&_a]:py-2.5 [&_a]:text-base" />

            <SheetFooter>
              <SheetClose
                render={
                  <Link
                    href="/sign-in"
                    className="flex min-h-11 w-full items-center justify-center text-base font-medium text-brand-violet"
                  />
                }
              >
                Sign In
              </SheetClose>

              <SheetClose
                render={
                  <Link
                    href="/get-started"
                    className={cn(
                      getStartedClasses,
                      "w-full min-h-11 text-base"
                    )}
                  />
                }
              >
                Get Started
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
