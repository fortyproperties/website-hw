import { CtaButton } from "@/components/cta-button"

type CtaSectionProps = {
  title?: string
  description?: string
  buttonLabel?: string
  href?: string
}

export function CtaSection({
  title = "Ready to Sell Your Land?",
  description = "Tell us about your property and we'll take a look.",
  buttonLabel = "Get Your Cash Offer",
  href = "/contact",
}: CtaSectionProps) {
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28">
        <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-primary-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/70">
          {description}
        </p>
        <div className="mt-9">
          <CtaButton href={href} variant="light" size="lg">
            {buttonLabel}
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
