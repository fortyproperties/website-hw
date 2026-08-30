import Link from "next/link"
import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

const styles = {
  base: "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  size: {
    default: "h-11 px-6 text-sm tracking-wide",
    lg: "h-13 px-8 text-base tracking-wide",
  },
  variant: {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
    outline:
      "border border-border bg-transparent text-foreground hover:bg-secondary hover:-translate-y-0.5",
    light:
      "bg-background text-primary hover:bg-background/90 hover:-translate-y-0.5 shadow-sm",
    ghostLight:
      "border border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:-translate-y-0.5",
  },
}

type Variant = keyof typeof styles.variant
type Size = keyof typeof styles.size

type CtaButtonProps = {
  href: string
  variant?: Variant
  size?: Size
  className?: string
} & Omit<ComponentProps<typeof Link>, "href">

export function CtaButton({
  href,
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={cn(styles.base, styles.size[size], styles.variant[variant], className)}
      {...props}
    >
      {children}
    </Link>
  )
}
