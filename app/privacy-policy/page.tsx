import type { Metadata } from "next"
import { LegalLayout } from "@/components/legal-layout"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How FORTY Properties collects and uses the information you share with us.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        This Privacy Policy explains how FORTY Properties handles the
        information you provide when you contact us or use this website.
      </p>
      <h2>Information We Collect</h2>
      <p>
        When you submit our contact form, we collect the details you choose to
        share, such as your name, email, phone number, and information about
        your property. We use this information solely to respond to your inquiry
        and evaluate your property.
      </p>
      <h2>How We Use Your Information</h2>
      <p>
        We use the information you provide to communicate with you about your
        property and a potential offer. We do not sell your personal
        information.
      </p>
      <h2>Contact</h2>
      <p>
        If you have questions about this policy, you can reach us at
        hello@fortyproperties.com.
      </p>
    </LegalLayout>
  )
}
