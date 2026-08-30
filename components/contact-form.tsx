"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2, Loader2 } from "lucide-react"
import { submitContact, type ContactState } from "@/app/actions/contact"
import { cn } from "@/lib/utils"

const initialState: ContactState = { status: "idle", message: "" }

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

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
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
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState)
  const errors = state.errors ?? {}

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
          <CheckCircle2 className="size-7" />
        </span>
        <h2 className="text-2xl font-semibold text-foreground">Thank you</h2>
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className="rounded-xl border border-border bg-card p-6 sm:p-8"
      noValidate
    >
      {/* Honeypot: visually hidden, off from tab order */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First Name" name="firstName" required autoComplete="given-name" error={errors.firstName} />
        <Field label="Last Name" name="lastName" required autoComplete="family-name" error={errors.lastName} />
        <Field label="Email" name="email" type="email" required autoComplete="email" error={errors.email} />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" error={errors.phone} />
        <Field label="Property Address" name="address" required autoComplete="street-address" className="sm:col-span-2" error={errors.address} />
        <Field label="City" name="city" required autoComplete="address-level2" error={errors.city} />
        <div className="grid grid-cols-2 gap-5">
          <Field label="State" name="state" required placeholder="TX" autoComplete="address-level1" error={errors.state} />
          <Field label="ZIP Code" name="zip" required autoComplete="postal-code" error={errors.zip} />
        </div>
        <Field label="Approximate Acreage" name="acreage" placeholder="e.g. 5" className="sm:col-span-2" />

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
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
        <SubmitButton />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Submitting this form does not obligate you to sell your property.
      </p>
    </form>
  )
}
