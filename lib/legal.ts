/**
 * PLACEHOLDER LEGAL CONTENT — requires legal review before production.
 * This text is a structural template only and is not legal advice.
 */
export type LegalSection = { id: string; title: string; body: string[] };
export type LegalDoc = { title: string; lastUpdated: string; intro: string; sections: LegalSection[] };

const reviewNote = "[Placeholder — to be completed by legal counsel.]";

export const terms: LegalDoc = {
  title: "Terms of Service",
  lastUpdated: "[Date to be confirmed]",
  intro:
    "These Terms of Service govern access to and use of the SaraiOS website and services. This document is a placeholder template and must be reviewed and completed by qualified legal counsel before production.",
  sections: [
    {
      id: "definitions",
      title: "Definitions",
      body: ["Defined terms such as “SaraiOS”, “Service”, “Customer” and “Guest” will be set out here.", reviewNote],
    },
    {
      id: "use-of-service",
      title: "Use of service",
      body: ["Describes the permitted use of the Service by customers and their authorised users.", reviewNote],
    },
    {
      id: "accounts",
      title: "Accounts",
      body: ["Describes account creation, credentials and customer responsibilities for authorised users.", reviewNote],
    },
    { id: "acceptable-use", title: "Acceptable use", body: ["Sets out prohibited uses of the Service.", reviewNote] },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      body: ["Describes ownership of the Service, customer content and feedback.", reviewNote],
    },
    {
      id: "third-party-services",
      title: "Third-party services",
      body: ["Describes how third-party systems connected to the Service are governed by their own terms.", reviewNote],
    },
    { id: "disclaimers", title: "Disclaimers", body: ["Warranty disclaimers to be drafted by counsel.", reviewNote] },
    {
      id: "limitation-of-liability",
      title: "Limitation of liability",
      body: ["Limitation of liability provisions to be drafted by counsel.", reviewNote],
    },
    {
      id: "termination",
      title: "Termination",
      body: ["Describes how either party may suspend or terminate use of the Service.", reviewNote],
    },
    {
      id: "changes",
      title: "Changes",
      body: ["Describes how updates to these terms will be communicated.", reviewNote],
    },
    {
      id: "contact",
      title: "Contact",
      body: ["Contact details for legal enquiries will be provided here.", reviewNote],
    },
  ],
};

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  lastUpdated: "[Date to be confirmed]",
  intro:
    "This Privacy Policy will describe how SaraiOS collects, uses and protects personal information. This document is a placeholder template and must be reviewed and completed by qualified legal counsel before production.",
  sections: [
    {
      id: "data-collection",
      title: "Data collection",
      body: ["Categories of personal information collected through the website and Service.", reviewNote],
    },
    {
      id: "guest-data",
      title: "Guest data",
      body: [
        "How guest information processed on behalf of hotel customers is handled, and the respective roles of SaraiOS and its customers.",
        reviewNote,
      ],
    },
    {
      id: "account-data",
      title: "Account data",
      body: ["Information collected about customer users and administrators.", reviewNote],
    },
    { id: "cookies", title: "Cookies", body: ["Use of cookies and similar technologies on this website.", reviewNote] },
    {
      id: "analytics",
      title: "Analytics",
      body: ["Any website or product analytics tools used and their purpose.", reviewNote],
    },
    {
      id: "third-party-services",
      title: "Third-party services",
      body: ["Categories of service providers that may process personal information.", reviewNote],
    },
    { id: "data-retention", title: "Data retention", body: ["How long personal information is retained.", reviewNote] },
    {
      id: "security",
      title: "Security",
      body: ["Summary of security practices. Do not list certifications unless verified.", reviewNote],
    },
    {
      id: "user-rights",
      title: "User rights",
      body: ["Rights individuals may have regarding their personal information and how to exercise them.", reviewNote],
    },
    {
      id: "international-transfers",
      title: "International transfers",
      body: ["How cross-border transfers of personal information are handled.", reviewNote],
    },
    {
      id: "contact",
      title: "Contact",
      body: ["Contact details for privacy enquiries will be provided here.", reviewNote],
    },
  ],
};
