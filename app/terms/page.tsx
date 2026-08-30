import type { Metadata } from "next"
import { LegalLayout } from "@/components/legal-layout"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that apply to your use of the FORTY Properties website.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p>
        By using this website, you agree to the following terms. Please review
        them carefully.
      </p>
      <h2>Use of This Website</h2>
      <p>
        The content on this website is provided for general informational
        purposes. Submitting an inquiry does not create any obligation for you
        to sell your property or for FORTY Properties to make an offer.
      </p>
      <h2>No Guarantees</h2>
      <p>
        Any offer we may present depends on the specific property and its
        circumstances. Nothing on this website should be considered a promise of
        a particular price, timeline, or outcome.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be directed to
        info@fortyproperties.com.
      </p>
    </LegalLayout>
  )
}
