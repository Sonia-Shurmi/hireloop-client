import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"

export default function Page() {
  return (
    <div className="min-h-svh">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}
