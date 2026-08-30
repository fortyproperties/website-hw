import Image from "next/image"
import { Check } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const points = [
  "No agent commissions",
  "No need to list the property",
  "No repairs or improvements required",
  "A straightforward selling process",
]

export function WhyDirect() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Why sell directly?"
            title="Selling land doesn't have to be complicated"
            description="Instead of preparing your property for the market, paying commissions, scheduling showings, and waiting for the right buyer, you can work directly with Forty Properties."
          />

          <ul className="mt-8 flex flex-col gap-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3.5" />
                </span>
                <span className="text-base text-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/open-field.png"
            alt="Open farmland and grassy field stretching to the horizon"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}
