import Link from "next/link"
import { cn } from "cn"

export function Logo({ className }: React.ComponentProps<"a">) {
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
