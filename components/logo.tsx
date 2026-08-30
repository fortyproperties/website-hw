import { cn } from "@/lib/utils"

type LogoProps = {
  invert?: boolean
  className?: string
}

/**
 * FORTY Properties wordmark rendered with type so it stays crisp
 * at every size and inverts cleanly on dark backgrounds.
 */
export function Logo({ invert = false, className }: LogoProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-3 leading-none",
        invert ? "text-primary-foreground" : "text-foreground",
        className,
      )}
      aria-label="FORTY Properties"
    >
      <span className="text-2xl font-semibold tracking-tight">40</span>
      <span
        aria-hidden="true"
        className={cn(
          "h-6 w-px",
          invert ? "bg-primary-foreground/40" : "bg-border",
        )}
      />
      <span className="flex flex-col">
        <span className="text-sm font-semibold uppercase tracking-[0.28em]">
          Forty
        </span>
        <span
          className={cn(
            "text-[0.5rem] font-medium uppercase tracking-[0.34em]",
            invert ? "text-primary-foreground/60" : "text-muted-foreground",
          )}
        >
          Properties
        </span>
      </span>
    </span>
  )
}
