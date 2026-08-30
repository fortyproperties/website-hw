"use server"

export type LandInquiryState = {
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

export async function submitLandInquiry(
  _prev: LandInquiryState,
  formData: FormData,
): Promise<LandInquiryState> {
  const values = {
    name: str(formData, "name"),
    email: str(formData, "email"),
    parcelState: str(formData, "parcelState").toUpperCase(),
    parcel: str(formData, "parcel"),
    details: str(formData, "details"),
    // Honeypot field — real users leave this empty.
    company: str(formData, "company"),
  }

  // Silently accept bot submissions caught by the honeypot.
  if (values.company) {
    return { status: "success", message: "Thanks — we'll be in touch soon." }
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
  if (!values.parcel) errors.parcel = "Parcel number or address is required."

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors,
    }
  }

  // In production, forward this to email/CRM. For now we log server-side.
  console.log("[v0] New land inquiry (Forty Properties LLC):", {
    ...values,
    company: undefined,
  })

  return {
    status: "success",
    message:
      "Thank you. We've received your parcel details and will reach out shortly with next steps.",
  }
}
