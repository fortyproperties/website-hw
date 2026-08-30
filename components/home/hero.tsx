import Image from "next/image"
import { CtaButton } from "@/components/cta-button"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-primary">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-land.png"
          alt="Aerial view of vast undeveloped vacant land at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-5 py-24 sm:px-8">
        <div className="max-w-2xl animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground/70">
            FORTY Properties
          </span>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-primary-foreground sm:text-6xl">
            We Buy Land for Cash
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
            We make selling vacant land simple. Get a straightforward offer
            without the hassle of listing your property or dealing with a
            complicated selling process.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton href="/contact" variant="light" size="lg">
              Get Your Cash Offer
            </CtaButton>
            <CtaButton href="/how-it-works" variant="ghostLight" size="lg">
              How It Works
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  )
}
