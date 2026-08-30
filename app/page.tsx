import { Hero } from "@/components/home/hero"
import { ValueProps } from "@/components/home/value-props"
import { HowItWorks } from "@/components/home/how-it-works"
import { WhyDirect } from "@/components/home/why-direct"
import { AboutPreview } from "@/components/home/about-preview"
import { CtaSection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <HowItWorks />
      <WhyDirect />
      <AboutPreview />
      <CtaSection />
    </>
  )
}
