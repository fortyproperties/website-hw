import { SectionHeading } from "@/components/section-heading"
import { CtaButton } from "@/components/cta-button"

const steps = [
  {
    number: "01",
    title: "Contact Us",
    body: "Tell us a little about your property and how we can reach you.",
  },
  {
    number: "02",
    title: "Get Your Offer",
    body: "We'll review the property and provide you with a straightforward cash offer.",
  },
  {
    number: "03",
    title: "Close",
    body: "If you decide to move forward, we'll coordinate the closing and make the process as simple as possible.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="How it works"
          title="Three simple steps"
          align="center"
        />

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="relative flex flex-col">
              <span className="text-4xl font-semibold tabular-nums tracking-tight text-primary/25">
                {step.number}
              </span>
              <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Step {step.number}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex justify-center">
          <CtaButton href="/contact" size="lg">
            Tell Us About Your Land
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
