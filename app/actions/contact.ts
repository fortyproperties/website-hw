"use server"

export type ContactState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: Record<string, string>
}

const US_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
])

function str(data: FormData, key: string) {
  return (data.get(key) ?? "").toString().trim()
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    firstName: str(formData, "firstName"),
    lastName: str(formData, "lastName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    address: str(formData, "address"),
    city: str(formData, "city"),
    state: str(formData, "state").toUpperCase(),
    zip: str(formData, "zip"),
    acreage: str(formData, "acreage"),
    message: str(formData, "message"),
    // Honeypot field — real users leave this empty.
    company: str(formData, "company"),
  }

  // Silently accept bot submissions caught by the honeypot.
  if (values.company) {
    return { status: "success", message: "Thanks — we'll be in touch soon." }
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
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors,
    }
  }

  // In production, forward this to email/CRM. For now we log server-side.
  console.log("[v0] New land inquiry:", {
    ...values,
    company: undefined,
  })

  return {
    status: "success",
    message:
      "Thank you. We've received your information and will be in touch soon.",
  }
}
