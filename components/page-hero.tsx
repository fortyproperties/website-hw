type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-primary">
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="animate-fade-up">
          {eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-foreground/60">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-primary-foreground sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/75">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
