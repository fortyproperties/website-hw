import type { Metadata } from "next"
import Image from "next/image"
import { Compass, MessageSquare, Sliders, ShieldCheck } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { SectionHeading } from "@/components/section-heading"
import { CtaSection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Forty Properties works directly with landowners to buy vacant land for cash. Learn how we make selling land simple, honest, and straightforward.",
  alternates: { canonical: "/about" },
}

const reasons = [
  {
    icon: Compass,
    title: "Direct",
    body: "You work directly with us instead of dealing with a complicated chain of buyers.",
  },
  {
    icon: MessageSquare,
    title: "Straightforward",
    body: "We communicate clearly and keep the process simple.",
  },
  {
    icon: Sliders,
    title: "Flexible",
    body: "We understand that every property and seller's situation is different.",
  },
  {
    icon: ShieldCheck,
    title: "Professional",
    body: "We take the transaction seriously and work to make the process smooth from beginning to end.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Forty Properties"
        title="A Simpler Way to Sell Land"
        description="We work directly with property owners to purchase vacant land and create a straightforward path from property to closing."
      />

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Forty Properties is a land-buying company focused on making the
              sale of vacant land easier for property owners. We purchase land
              directly, which means you can skip the steps that often make
              selling feel complicated.
            </p>
            <p>
              We believe the process should be clear from your very first
              conversation with us. We listen, we ask questions about your
              property, and we provide a straightforward offer. There is never
              any pressure to accept.
            </p>
            <p>
              Whether your land is wooded acreage, an open field, or a parcel
              you simply no longer need, we are happy to take a look and let you
              know if it is a fit.
            </p>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image
              src="/images/open-field.png"
              alt="Open rural field under a soft sky"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="What sets us apart"
            title="Why Forty Properties?"
            align="center"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="flex gap-5 rounded-xl border border-border bg-card p-7"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <reason.icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {reason.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Have land you're thinking about selling?"
        description="Tell us a little about your property and we'll be in touch."
        buttonLabel="Get Your Cash Offer"
      />
    </>
  )
}
