/**
 * Lead form configuration + submission adapter.
 *
 * By default forms use a local mock submission (no backend). To connect a
 * provider, set NEXT_PUBLIC_FORM_PROVIDER and implement the matching adapter
 * below. See README → "Connecting the demo form".
 *
 * Never put private API keys in NEXT_PUBLIC_* variables. Providers that need a
 * secret (Resend, Salesforce, ActiveCampaign) should be called from a Next.js
 * Route Handler (e.g. app/api/lead/route.ts) and use provider "custom-api".
 */

export type FieldType = "text" | "email" | "select" | "textarea";

export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  autoComplete?: string;
  options?: string[];
  placeholder?: string;
  half?: boolean;
};

export type LeadPayload = Record<string, string> & { formId: string };

const propertyOptions = ["1", "2–5", "6–20", "21–50", "50+"];
const roleOptions = [
  "Owner",
  "General Manager",
  "Guest Experience",
  "Front Office / Front Desk",
  "Operations",
  "Revenue",
  "Technology / IT",
  "Other",
];

export const contactFields: FormField[] = [
  { name: "firstName", label: "First name", type: "text", required: true, autoComplete: "given-name", half: true },
  { name: "lastName", label: "Last name", type: "text", required: true, autoComplete: "family-name", half: true },
  { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { name: "company", label: "Company", type: "text", required: true, autoComplete: "organization", half: true },
  { name: "role", label: "Role", type: "select", required: true, options: roleOptions, half: true },
  { name: "properties", label: "Number of properties", type: "select", required: true, options: propertyOptions },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    placeholder: "Tell us a little about your property and what you'd like to discuss.",
  },
];

export const demoFields: FormField[] = [
  { name: "firstName", label: "First name", type: "text", required: true, autoComplete: "given-name", half: true },
  { name: "lastName", label: "Last name", type: "text", required: true, autoComplete: "family-name", half: true },
  { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
  { name: "company", label: "Hotel / company", type: "text", required: true, autoComplete: "organization", half: true },
  {
    name: "properties",
    label: "Number of properties",
    type: "select",
    required: true,
    options: propertyOptions,
    half: true,
  },
  { name: "role", label: "Role", type: "select", required: true, options: roleOptions },
  {
    name: "goals",
    label: "What are you looking to improve?",
    type: "textarea",
    placeholder: "e.g. guest messaging, repetitive questions, request routing, upsells",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(fields: FormField[], values: Record<string, string>) {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const v = (values[f.name] || "").trim();
    if (f.required && !v) {
      errors[f.name] =
        f.type === "select" ? `Choose your ${f.label.toLowerCase()}.` : `Enter your ${f.label.toLowerCase()}.`;
    } else if (f.type === "email" && v && !EMAIL_RE.test(v)) {
      errors[f.name] = "Enter a valid work email, like name@hotel.com.";
    }
  }
  return errors;
}

type Provider = "mock" | "custom-api" | "hubspot";

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed with ${res.status}`);
}

/** Submit a lead to the configured provider. Throws on failure. */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const provider = (process.env.NEXT_PUBLIC_FORM_PROVIDER || "mock") as Provider;

  switch (provider) {
    case "custom-api": {
      // Your own endpoint (e.g. app/api/lead/route.ts) that forwards to
      // Resend, Salesforce, ActiveCampaign, etc. using server-side secrets.
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/lead";
      return postJson(endpoint, payload);
    }
    case "hubspot": {
      // HubSpot Forms API accepts public portal + form IDs (no secret key).
      const portal = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
      const form = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;
      if (!portal || !form) throw new Error("HubSpot portal/form ID missing");
      const { formId, ...values } = payload;
      return postJson(`https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${form}`, {
        fields: Object.entries(values).map(([name, value]) => ({ name, value })),
        context: { pageName: formId },
      });
    }
    default: {
      // Local mock submission — simulates network latency.
      await new Promise((r) => setTimeout(r, 900));
      if (process.env.NODE_ENV === "development") console.info("[mock lead submission]", payload);
    }
  }
}
