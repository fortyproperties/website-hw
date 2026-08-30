import type { ReactNode } from "react"
import { PageHero } from "@/components/page-hero"

export function LegalLayout({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <>
      <PageHero eyebrow="FORTY Properties" title={title} />
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col gap-6 text-base leading-relaxed text-muted-foreground [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
            {children}
          </div>
        </div>
      </section>
    </>
  )
}
