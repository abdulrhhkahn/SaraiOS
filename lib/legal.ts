/**
 * PLACEHOLDER LEGAL CONTENT — requires legal review before production.
 * This text is a structural template only and is not legal advice.
 */
export type LegalSection = { id: string; title: string; body: string[] };
export type LegalDoc = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  /** Replaces the default "placeholder" notice at the top of the page. */
  notice?: string;
};

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
    {
      id: "cookies",
      title: "Cookies",
      body: [
        "The cookies and similar technologies used on this website are described in our Cookie Policy at /cookies.",
        reviewNote,
      ],
    },
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

export const cookies: LegalDoc = {
  title: "Cookie Policy",
  lastUpdated: "22 October 2026",
  notice:
    "This policy describes how the website works today. Please have it checked by legal counsel before you rely on it, and update it whenever you add analytics, advertising or embedded third-party tools.",
  intro:
    "This policy explains what cookies and similar technologies the SaraiOS website (this marketing website, not the SaraiOS app that hotels use) uses, why, and how you can change your choice at any time.",
  sections: [
    {
      id: "what-are-cookies",
      title: "What cookies are",
      body: [
        "Cookies are small text files that a website stores in your browser. Similar technologies, such as your browser's local storage, do the same job. They can keep a setting between visits, or be used to measure and track how people use a site.",
      ],
    },
    {
      id: "what-we-use",
      title: "What this website uses",
      body: [
        "At the time of writing, this website does not set analytics, advertising or tracking cookies, and it does not load third-party tools that track visitors.",
        "The only thing it stores in your browser is your cookie choice (accept all, or essential only), kept in your browser's local storage under the name saraios-cookie-choice, so we do not ask you again on every page. This stays on your device and is not sent to us. It is strictly necessary for the cookie banner to work, so it is stored whichever option you pick.",
      ],
    },
    {
      id: "optional-cookies",
      title: "Optional cookies",
      body: [
        "If we add optional cookies in future, for example to measure how many people read a page, we will list them here first and only switch them on if you chose \u201cAccept all\u201d. If you chose \u201cEssential only\u201d, they stay off.",
      ],
    },
    {
      id: "third-parties",
      title: "Third-party content",
      body: [
        "We do not embed videos, maps, social feeds or advertising on this website. Links to other websites, such as our LinkedIn and Instagram pages, take you to services that have their own cookie policies.",
        "When you send us a form, such as a demo request, the details you enter are sent to us. That is covered by our Privacy Policy, not by this one.",
      ],
    },
    {
      id: "your-choices",
      title: "Your choices",
      body: [
        "You can change your choice at any time with the \u201cCookie settings\u201d link at the bottom of every page.",
        "You can also block or delete cookies and local storage in your browser settings. If you clear your browser data, we will ask for your choice again on your next visit. Blocking everything the website needs to work is unlikely to affect it today, because it uses almost nothing.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: [
        "If we change how the website uses cookies, we will update this page and the date at the top. If a change needs your consent, we will ask again.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      body: ["For questions about this policy, use the contact form at /contact."],
    },
  ],
};
