import type { Metadata } from "next"
import { Phone, Mail, Clock } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have vacant land you're considering selling? Contact FORTY Properties for a straightforward cash offer with no obligation.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's Talk About Your Land"
        description="Have a property you're considering selling? Tell us a little about it and we'll be in touch."
      />

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <aside className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Contact Information
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prefer to reach out directly? Use the details below and we'll
                get back to you.
              </p>
            </div>

            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Phone
                  </p>
                  <p className="mt-1 text-base text-foreground">(000) 000-0000</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Mail className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Email
                  </p>
                  <p className="mt-1 text-base text-foreground">
                    hello@fortyproperties.com
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Clock className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Response
                  </p>
                  <p className="mt-1 text-base text-foreground">
                    We review every inquiry we receive.
                  </p>
                </div>
              </li>
            </ul>

            <div className="rounded-xl border border-border bg-secondary/50 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                There's no obligation and no pressure. We'll review your
                property and let you know if it's a fit.
              </p>
            </div>
          </aside>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
