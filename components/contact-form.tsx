"use client"

import { useState } from "react"
import { CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type ContactState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: Record<string, string>
}

const initialState: ContactState = {
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

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10)

  if (digits.length <= 3) {
    return digits
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  placeholder,
  error,
  className,
  value,
  onChange,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
  error?: string
  className?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
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
        value={value}
        onChange={onChange}
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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    acreage: "",
    message: "",
    company: "",
  })

  const [contactState, setContactState] =
    useState<ContactState>(initialState)

  const [pending, setPending] = useState(false)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (contactState.errors?.[name]) {
      setContactState((previous) => ({
        ...previous,
        errors: {
          ...previous.errors,
          [name]: "",
        },
      }))
    }
  }

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const formattedPhone = formatPhone(event.target.value)

    setFormData((previous) => ({
      ...previous,
      phone: formattedPhone,
    }))

    if (contactState.errors?.phone) {
      setContactState((previous) => ({
        ...previous,
        errors: {
          ...previous.errors,
          phone: "",
        },
      }))
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const values = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim().toUpperCase(),
      zip: formData.zip.trim(),
      acreage: formData.acreage.trim(),
      message: formData.message.trim(),
      company: formData.company.trim(),
    }

    // Spam protection
    if (values.company) {
      setContactState({
        status: "success",
        message: "Thanks — we'll be in touch soon.",
      })
      return
    }

    const errors: Record<string, string> = {}

    if (!values.firstName) {
      errors.firstName = "First name is required."
    }

    if (!values.lastName) {
      errors.lastName = "Last name is required."
    }

    if (!values.email) {
      errors.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Enter a valid email address."
    }

    if (!values.phone) {
      errors.phone = "Phone is required."
    } else if (values.phone.replace(/\D/g, "").length !== 10) {
      errors.phone = "Enter a valid 10-digit phone number."
    }

    if (!values.address) {
      errors.address = "Property address is required."
    }

    if (!values.city) {
      errors.city = "City is required."
    }

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
      setContactState({
        status: "error",
        message: "Please correct the highlighted fields.",
        errors,
      })
      return
    }

    setPending(true)
    setContactState(initialState)

    try {
      const response = await fetch("https://formspree.io/f/xjyvklaa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          propertyAddress: values.address,
          city: values.city,
          state: values.state,
          zip: values.zip,
          acreage: values.acreage,
          message: values.message,
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          result?.errors?.[0]?.message ||
            result?.error ||
            "Something went wrong.",
        )
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        acreage: "",
        message: "",
        company: "",
      })

      setContactState({
        status: "success",
        message:
          "Thank you. We've received your information and will be in touch soon.",
      })
    } catch (error) {
      console.error("Contact form error:", error)

      setContactState({
        status: "error",
        message:
          "We couldn't send your message. Please try again or contact us directly.",
      })
    } finally {
      setPending(false)
    }
  }

  const errors = contactState.errors ?? {}

  if (contactState.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
          <CheckCircle2 className="size-7" />
        </span>

        <h2 className="text-2xl font-semibold text-foreground">
          Thank you
        </h2>

        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
          {contactState.message}
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
      {/* Hidden spam protection field */}
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
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="First Name"
          name="firstName"
          required
          autoComplete="given-name"
          placeholder="John"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <Field
          label="Last Name"
          name="lastName"
          required
          autoComplete="family-name"
          placeholder="Doe"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(616) 555-0123"
          value={formData.phone}
          onChange={handlePhoneChange}
          error={errors.phone}
        />

        <Field
          label="Property Address"
          name="address"
          required
          autoComplete="street-address"
          placeholder="123 Main St"
          className="sm:col-span-2"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
        />

        <Field
          label="City"
          name="city"
          required
          autoComplete="address-level2"
          placeholder="Holland"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
        />

        <div className="grid grid-cols-2 gap-5">
          <Field
            label="State"
            name="state"
            required
            placeholder="MI"
            autoComplete="address-level1"
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
          />

          <Field
            label="ZIP Code"
            name="zip"
            required
            autoComplete="postal-code"
            placeholder="49423"
            value={formData.zip}
            onChange={handleChange}
            error={errors.zip}
          />
        </div>

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
            value={formData.message}
            onChange={handleChange}
            className="rounded-md border border-input bg-background px-3.5 py-3 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background"
          />
        </div>
      </div>

      {contactState.status === "error" && contactState.message ? (
        <p className="mt-5 text-sm text-destructive" role="alert">
          {contactState.message}
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
