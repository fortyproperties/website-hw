"use client"

import { useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type ContactState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: Record<string, string>
}

const initialState: ContactState = { status: "idle", message: "" }

const US_STATES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
  "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS",
  "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
  "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
  "WI", "WY", "DC",
])

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  placeholder,
  error,
  className,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
  error?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-muted-foreground"> *</span> : null}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "h-11 rounded-md border bg-background px-3.5 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background",
          error ? "border-destructive" : "border-input",
        )}
      />

      {error ? (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function ContactForm() {
  const [state, setState] = useState<ContactState>(initialState)
  const [pending, setPending] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const values = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      address: String(formData.get("address") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      state: String(formData.get("state") ?? "").trim().toUpperCase(),
      zip: String(formData.get("zip") ?? "").trim(),
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

    if (!values.firstName) errors.firstName = "First name is required."
    if (!values.lastName) errors.lastName = "Last name is required."

    if (!values.email) {
      errors.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Enter a valid email address."
    }

    if (!values.phone) {
      errors.phone = "Phone is required."
    } else if (values.phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Enter a valid phone number."
    }

    if (!values.address) errors.address = "Property address is required."
    if (!values.city) errors.city = "City is required."

    if (!values.state) {
      errors.state = "State is required."
    } else if (!US_STATES.has(values.state)) {
      errors.state = "Enter a valid 2-letter state."
    }

    if (!values.zip) {
      errors.zip = "ZIP code is required."
    } else if (!/^\d{5}(-\d{4})?$/.test(values.zip)) {
      errors.zip = "Enter a valid ZIP code."
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

    // The original server action only logged this data and did not
    // actually submit it anywhere. Keep the same behavior for now.
    console.log("[v0] New land inquiry:", {
      ...Object.fromEntries(formData.entries()),
      company: undefined,
    })

    setTimeout(() => {
      setPending(false)
      setState({
        status: "success",
        message:
          "Thank you. We've received your information and will be in touch soon.",
      })
    }, 500)
  }

  const errors = state.errors ?? {}

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
          <CheckCircle2 className="size-7" />
        </span>

        <h2 className="text-2xl font-semibold text-foreground">
          Thank you
        </h2>

        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-6 sm:p-8"
      noValidate
    >
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="First Name"
          name="firstName"
          required
          autoComplete="given-name"
          error={errors.firstName}
        />

        <Field
          label="Last Name"
          name="lastName"
          required
          autoComplete="family-name"
          error={errors.lastName}
        />

        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
        />

        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          error={errors.phone}
        />

        <Field
          label="Property Address"
          name="address"
          required
          autoComplete="street-address"
          className="sm:col-span-2"
          error={errors.address}
        />

        <Field
          label="City"
          name="city"
          required
          autoComplete="address-level2"
          error={errors.city}
        />

        <div className="grid grid-cols-2 gap-5">
          <Field
            label="State"
            name="state"
            required
            placeholder="TX"
            autoComplete="address-level1"
            error={errors.state}
          />

          <Field
            label="ZIP Code"
            name="zip"
            required
            autoComplete="postal-code"
            error={errors.zip}
          />
        </div>

        <Field
          label="Approximate Acreage"
          name="acreage"
          placeholder="e.g. 5"
          className="sm:col-span-2"
        />

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-foreground"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us a little about your property."
            className="rounded-md border border-input bg-background px-3.5 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background"
          />
        </div>
      </div>

      {state.status === "error" && state.message ? (
        <p className="mt-5 text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="mt-7">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-base font-medium tracking-wide text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
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

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Submitting this form does not obligate you to sell your property.
      </p>
    </form>
  )
}