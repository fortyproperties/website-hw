import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const SITE_URL = "https://fortyproperties.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Forty Properties | We Buy Land for Cash",
    template: "%s | Forty Properties",
  },

  description:
    "Forty Properties buys vacant land directly from property owners. Get a straightforward cash offer and a simple selling process.",

  generator: "v0.app",

  keywords: [
    "sell land for cash",
    "sell vacant land",
    "sell my land",
    "land buyers",
    "cash land buyers",
    "sell unwanted land",
    "sell vacant property",
    "land buying company",
  ],

  authors: [{ name: "Forty Properties" }],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Forty Properties",
    title: "Forty Properties | We Buy Land for Cash",
    description:
      "Forty Properties buys vacant land directly from property owners. Get a straightforward cash offer and a simple selling process.",
    images: [
      {
        url: "/images/hero-land.png",
        width: 1200,
        height: 630,
        alt: "Aerial view of vacant land at golden hour",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Forty Properties | We Buy Land for Cash",
    description:
      "Forty Properties buys vacant land directly from property owners. Get a straightforward cash offer and a simple selling process.",
    images: ["/images/hero-land.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#0f1b2d",
  width: "device-width",
  initialScale: 1,
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Forty Properties",
  description:
    "Forty Properties buys vacant land directly from property owners with a simple, straightforward process.",
  url: SITE_URL,
  slogan: "We Buy Land for Cash",
  areaServed: "United States",
  knowsAbout: ["Vacant Land", "Land Acquisition", "Selling Land for Cash"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <SiteHeader />

        <main>{children}</main>

        <SiteFooter />

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}