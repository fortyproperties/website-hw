import { Route, Scale, HandHeart, CalendarCheck } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const items = [
  {
    icon: Route,
    title: "Simple Process",
    body: "We keep the process straightforward from your first conversation to closing.",
  },
  {
    icon: Scale,
    title: "Fair Offers",
    body: "We evaluate the property and provide a straightforward offer based on the land and its circumstances.",
  },
  {
    icon: HandHeart,
    title: "No Pressure",
    body: "There is no obligation to accept our offer. Take the time you need to decide what works for you.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible Closing",
    body: "We work to make the closing process as convenient as possible.",
  },
]

export function ValueProps() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Why owners work with us"
          title="A straightforward way to sell your land"
          description="No listings, no showings, no runaround. Just a clear path from property to closing."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col rounded-xl border border-border bg-card p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
