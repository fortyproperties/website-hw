import type { Metadata } from "next"
import { PageHero } from "@/components/page-hero"
import { CtaSection } from "@/components/cta-section"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how selling vacant land to Forty Properties works, from your first message to a simple closing. A clear, no-pressure process for landowners.",
  alternates: { canonical: "/how-it-works" },
}

const steps = [
  {
    number: "01",
    title: "Tell Us About Your Property",
    body: "Submit the contact form or give us a call. We'll gather some basic information about the property.",
  },
  {
    number: "02",
    title: "We Review the Property",
    body: "We'll look at the property details and determine whether it is a fit for us.",
  },
  {
    number: "03",
    title: "Receive Your Offer",
    body: "If we're interested, we'll present you with a straightforward cash offer.",
  },
  {
    number: "04",
    title: "Decide What Works for You",
    body: "There is no obligation to accept the offer. You decide whether moving forward makes sense for you.",
  },
  {
    number: "05",
    title: "Close",
    body: "If you accept, we'll coordinate the next steps toward closing and work to make the process as smooth as possible.",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Selling Your Land Can Be Simple"
        description="From your first message to a straightforward closing, here's exactly what to expect when you work with Forty Properties."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
          <ol className="flex flex-col">
            {steps.map((step, index) => (
              <li key={step.number} className="flex gap-6 sm:gap-8">
                <div className="flex flex-col items-center">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold tabular-nums text-primary-foreground">
                    {step.number}
                  </span>
                  {index < steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="my-1 w-px flex-1 bg-border"
                    />
                  ) : null}
                </div>
                <div className={index < steps.length - 1 ? "pb-12" : "pb-0"}>
                  <h2 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection
        title="Have Land to Sell?"
        description="Tell us about your property and we'll take a look."
        buttonLabel="Get Your Cash Offer"
      />
    </>
  )
}
