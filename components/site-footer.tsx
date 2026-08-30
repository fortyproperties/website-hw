import Link from "next/link"
import { Logo } from "@/components/logo"

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
]

const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo invert />
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-primary-foreground/70">
              We Buy Land for Cash. FORTY Properties purchases vacant land
              directly from owners with a simple, straightforward process.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-primary-foreground/80">
              <li>
                <span className="text-primary-foreground/60">Phone: </span>
                (000) 000-0000
              </li>
              <li>
                <span className="text-primary-foreground/60">Email: </span>
                info@fortyproperties.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} FORTY Properties. All rights
            reserved.
          </p>
          <ul className="flex gap-6">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
