"use client"

import { useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type LandInquiryState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: Record<string, string>
}

const initialState: LandInquiryState = {
  status: "idle",
  message: "",
}

const US_STATES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
  "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS",
  "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
  "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
  "WI", "WY", "DC",
])

const fieldBase =
  "rounded-md border bg-primary-foreground/[0.06] px-3.5 text-base text-primary-foreground transition-colors placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 focus:ring-offset-2 focus:ring-offset-primary"

function ErrorText({
  id,
  children,
}: {
  id: string
  children: string
}) {
  return (
    <p id={id} className="text-sm text-primary-foreground/80">
      {children}
    </p>
  )
}

export function LandInquiryForm() {
  const [state, setState] = useState<LandInquiryState>(initialState)
  const [pending, setPending] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const values = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      parcelState: String(formData.get("parcelState") ?? "")
        .trim()
        .toUpperCase(),
      parcel: String(formData.get("parcel") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
    }

    if (values.company) {
      setState({
        status: "success",
        message: "Thanks — we'll be in touch soon.",
      })
      return
    }

    const errors: Record<string, string> = {}

    if (!values.name) errors.name = "Name is required."

    if (!values.email) {
      errors.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Enter a valid email address."
    }

    if (!values.parcelState) {
      errors.parcelState = "Parcel state is required."
    } else if (!US_STATES.has(values.parcelState)) {
      errors.parcelState = "Enter a valid 2-letter state."
    }

    if (!values.parcel) {
      errors.parcel = "Parcel number or address is required."
    }

    if (Object.keys(errors).length > 0) {
      setState({
        status: "error",
        message: "Please correct the highlighted fields.",
        errors,
      })
      return
    }

    setPending(true)

    console.log("[v0] New land inquiry (Forty Properties LLC):", {
      ...Object.fromEntries(formData.entries()),
      company: undefined,
    })

    setTimeout(() => {
      setPending(false)
      setState({
        status: "success",
        message:
          "Thank you. We've received your parcel details and will reach out shortly with next steps.",
      })
    }, 500)
  }

  const errors = state.errors ?? {}

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.06] p-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground">
          <CheckCircle2 className="size-7" />
        </span>

        <h3 className="text-2xl font-semibold text-primary-foreground">
          Thank you
        </h3>

        <p className="max-w-md text-pretty leading-relaxed text-primary-foreground/70">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.03] p-6 text-left sm:p-8"
    >
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="li-company">Company</label>
        <input
          id="li-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="li-name"
            className="text-sm font-medium text-primary-foreground"
          >
            Name <span className="text-primary-foreground/50">*</span>
          </label>

          <input
            id="li-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={errors.name ? true : undefined}
            className={cn(
              "h-11",
              fieldBase,
              errors.name
                ? "border-primary-foreground/60"
                : "border-primary-foreground/20",
            )}
          />

          {errors.name ? (
            <ErrorText id="li-name-error">{errors.name}</ErrorText>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="li-email"
            className="text-sm font-medium text-primary-foreground"
          >
            Email <span className="text-primary-foreground/50">*</span>
          </label>

          <input
            id="li-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@example.com"
            aria-invalid={errors.email ? true : undefined}
            className={cn(
              "h-11",
              fieldBase,
              errors.email
                ? "border-primary-foreground/60"
                : "border-primary-foreground/20",
            )}
          />

          {errors.email ? (
            <ErrorText id="li-email-error">{errors.email}</ErrorText>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="li-parcelState"
            className="text-sm font-medium text-primary-foreground"
          >
            Parcel State <span className="text-primary-foreground/50">*</span>
          </label>

          <input
            id="li-parcelState"
            name="parcelState"
            required
            placeholder="TX"
            autoComplete="address-level1"
            aria-invalid={errors.parcelState ? true : undefined}
            className={cn(
              "h-11",
              fieldBase,
              errors.parcelState
                ? "border-primary-foreground/60"
                : "border-primary-foreground/20",
            )}
          />

          {errors.parcelState ? (
            <ErrorText id="li-parcelState-error">
              {errors.parcelState}
            </ErrorText>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="li-parcel"
            className="text-sm font-medium text-primary-foreground"
          >
            Parcel Number / Address{" "}
            <span className="text-primary-foreground/50">*</span>
          </label>

          <input
            id="li-parcel"
            name="parcel"
            required
            placeholder="APN 1234-56-789 or 123 County Rd"
            aria-invalid={errors.parcel ? true : undefined}
            className={cn(
              "h-11",
              fieldBase,
              errors.parcel
                ? "border-primary-foreground/60"
                : "border-primary-foreground/20",
            )}
          />

          {errors.parcel ? (
            <ErrorText id="li-parcel-error">{errors.parcel}</ErrorText>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            htmlFor="li-details"
            className="text-sm font-medium text-primary-foreground"
          >
            Additional Details / Notes
          </label>

          <textarea
            id="li-details"
            name="details"
            rows={4}
            placeholder="Acreage, access, timeline, or anything else we should know."
            className={cn(
              "py-3",
              fieldBase,
              "border-primary-foreground/20",
            )}
          />
        </div>
      </div>

      {state.status === "error" && state.message ? (
        <p className="mt-5 text-sm text-primary-foreground/80" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="mt-7">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary-foreground px-6 text-base font-medium tracking-wide text-primary transition-all hover:bg-primary-foreground/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Request My Cash Offer"
          )}
        </button>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-primary-foreground/60">
        Submitting this form does not obligate you to sell your property.
      </p>
    </form>
  )
}