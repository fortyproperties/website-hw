import Image from "next/image"
import { SectionHeading } from "@/components/section-heading"
import { CtaButton } from "@/components/cta-button"

export function AboutPreview() {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-last aspect-[4/3] overflow-hidden rounded-2xl border border-border lg:order-first">
          <Image
            src="/images/wooded-acreage.png"
            alt="Aerial view of wooded acreage with a natural clearing"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <SectionHeading
            eyebrow="About Forty Properties"
            title="Selling land should be simple"
            description="At Forty Properties, we believe selling land should be simple. We work directly with property owners to purchase vacant land and create a straightforward path from property to closing."
          />
          <div className="mt-8">
            <CtaButton href="/about" variant="outline" size="lg">
              Learn More About Us
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  )
}
