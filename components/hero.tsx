import Image from "next/image"
import Link from "next/link"
import { Briefcase, MapPin, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import globeImage from "@/app/images/globe.png"
import { cn } from "cn"

const trendingPositions = [
  { label: "Product Designer", href: "/browse-jobs?role=product-designer" },
  { label: "AI Engineering", href: "/browse-jobs?role=ai-engineering" },
  { label: "Dev-ops Engineer", href: "/browse-jobs?role=dev-ops-engineer" },
] as const

function AnnouncementBadge() {
  return (
    <div className="relative flex items-center">
      {/* Decorative side lines */}
      <span
        aria-hidden="true"
        className="absolute top-1/2 right-full hidden h-px w-16 -translate-y-1/2 bg-gradient-to-l from-white/25 to-transparent sm:block lg:w-28"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-full hidden h-px w-16 -translate-y-1/2 bg-gradient-to-r from-white/25 to-transparent sm:block lg:w-28"
      />

      <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pr-4 pl-1.5 sm:pr-5 sm:pl-2 backdrop-blur-sm">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-orange/15 text-brand-orange">
          <Briefcase className="size-3.5" />
        </span>
        <span className="text-sm font-semibold whitespace-nowrap text-white sm:text-base">
          50,000+
        </span>
        <span className="font-mono text-[0.65rem] tracking-[0.2em] whitespace-nowrap text-zinc-400 uppercase sm:text-xs">
          new jobs this month
        </span>
      </div>
    </div>
  )
}

function HeroSearchBar() {
  return (
    <form
      action="/browse-jobs"
      method="get"
      className="mt-8 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:mt-10 sm:flex-row sm:items-center"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2 sm:py-1">
        <SearchIcon className="size-4 shrink-0 text-zinc-500" />
        <input
          type="search"
          name="q"
          placeholder="Job title, skill or company"
          className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
        />
      </div>

      <span
        aria-hidden="true"
        className="hidden h-6 w-px shrink-0 bg-white/10 sm:block"
      />

      <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2 sm:py-1">
        <MapPin className="size-4 shrink-0 text-zinc-500" />
        <input
          type="search"
          name="location"
          placeholder="Location or Remote"
          className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
        />
      </div>

      <Button
        type="submit"
        size="icon-lg"
        aria-label="Search jobs"
        className="size-11 shrink-0 rounded-xl bg-brand-violet text-white shadow-[0_0_24px_rgba(124,92,255,0.45)] hover:bg-brand-violet/85 max-sm:w-full"
      >
        <SearchIcon className="size-4.5" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}

/* Globe artwork from app/images/globe.png — transparent top, glowing
   earth at the bottom. Anchored to the section's bottom edge on every
   viewport; sized with inline style because preflight max-width rules
   override Tailwind width utilities on replaced elements. `screen`
   blending melts its black space into the page background. */
function Globe() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
    >
      <Image
        src={globeImage}
        alt=""
        sizes="(min-width: 1486px) 1560px, 105vw"
        style={{
          width: "min(105vw, 1560px)",
          height: "auto",
          transform: "translateY(36%)",
        }}
        className="max-w-none shrink-0 mix-blend-screen"
      />
    </div>
  )
}

export function Hero({ className }: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#0b0a0f] text-white",
        className
      )}
    >
      {/* Background layers */}
      <div
        aria-hidden="true"
        className="hero-stars absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,10,15,0.9)_0%,transparent_18%,transparent_70%,rgba(11,10,15,0.55)_100%)]"
      />

      <Globe />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 pt-16 text-center sm:pt-24 lg:pt-28">
        <AnnouncementBadge />

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:mt-8 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-xl text-balance text-sm text-zinc-400 sm:mt-6 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <HeroSearchBar />

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm sm:mt-6">
          <span className="mr-1 text-zinc-500">Trending Position</span>
          {trendingPositions.map((position) => (
            <Link
              key={position.href}
              href={position.href}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {position.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom statement over the globe */}
      <div className="relative z-10 mt-36 px-4 pb-24 text-center sm:mt-52 sm:pb-32">
        <p className="mx-auto max-w-2xl text-2xl font-medium text-balance text-zinc-100 sm:text-4xl">
          Assisting over 15,000 job seekers find their dream positions.
        </p>
      </div>
    </section>
  )
}
