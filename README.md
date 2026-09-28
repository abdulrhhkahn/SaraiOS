# SaraiOS — Marketing Website

The marketing site for **SaraiOS**, an AI-native guest experience platform for hotels, resorts and hospitality groups.

Built with Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion and Lucide icons. Every page is statically prerendered.

---

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

| Command             | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start the development server      |
| `npm run build`     | Create a production build         |
| `npm run start`     | Serve the production build        |
| `npm run lint`      | Run ESLint                        |
| `npm run typecheck` | Run the TypeScript compiler       |
| `npm run format`    | Format the codebase with Prettier |

## Pages

| Route                | File                                               |
| -------------------- | -------------------------------------------------- |
| `/`                  | `app/page.tsx`                                     |
| `/features`          | `app/features/page.tsx`                            |
| `/industries`        | `app/industries/page.tsx`                          |
| `/pricing`           | `app/pricing/page.tsx`                             |
| `/contact`           | `app/contact/page.tsx`                             |
| `/demo`              | `app/demo/page.tsx`                                |
| `/blog`              | `app/blog/page.tsx`                                |
| `/blog/[slug]`       | `app/blog/[slug]/page.tsx`                         |
| `/faq`               | `app/faq/page.tsx`                                 |
| `/terms`, `/privacy` | `app/terms/page.tsx`, `app/privacy/page.tsx`       |
| 404                  | `app/not-found.tsx` (served for every unknown URL) |

SEO files: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/icon.svg`. Page metadata is created with `pageMetadata()` in `lib/seo.ts`, which also holds the JSON-LD helpers (Organization, SoftwareApplication, FAQPage, BlogPosting, BreadcrumbList — no review or rating schema).

## Project structure

```
app/                 Routes, layout, global styles, SEO files
components/
  animations/        Motion variants, <Reveal>, reduced-motion + media-query hooks
  blog/              Cards, covers, article body, reading progress
  dashboard/         Product screenshot system + React mockups
  faq/               Accessible accordion
  features/          Sticky feature story, request workflow demo, product tour
  forms/             Config-driven lead form
  hero/              Home hero + animated conversation console
  home/              Home page sections
  industries/        Industry sections
  layout/            Footer, logo, JSON-LD
  navigation/        Header + mobile menu
  pricing/           Plan cards, comparison table
  ui/                Primitives (buttons, headings), page hero, legal layout
lib/                 All editable content and configuration
public/images/       dashboard/, blog/, industries/, hero/, icons/
```

Content lives in `lib/`, not in JSX — edit the data files and the pages update.

---

## Common edits

### Replace dashboard screenshots

The site ships with React mockups of the product (all fictional demo data). To show real screenshots:

1. Export screenshots at **16:10** (e.g. 2880×1800), light UI, with **no real guest data**.
2. Save them in `public/images/dashboard/` with these exact names:
   `dashboard-overview.png`, `ai-concierge.png`, `guest-conversations.png`, `guest-requests.png`, `guest-profile.png`, `analytics.png`, `integrations.png`, `settings.png`.
3. Restart `npm run dev` (or rebuild). Each file that exists replaces its mockup automatically.

How it works: `lib/screenshots.ts` lists the files; `lib/screenshots.server.ts` checks which exist at build time; `components/dashboard/ProductScreenshot.tsx` renders the image (in a browser frame, with a loading placeholder and an error fallback) or the matching mockup from `components/dashboard/mockups/`.

### Change brand colors

All colors are CSS variables at the top of `app/globals.css` (`--linen`, `--ink`, `--stone`, `--brass`, `--iris`, `--night`, …) and are exposed to Tailwind as `bg-linen`, `text-ink`, `text-iris-ink`, etc. Change a value once and it updates everywhere. Keep the `-ink` variants dark enough for 4.5:1 text contrast.

Fonts (Manrope + Instrument Serif) are loaded in `app/layout.tsx`.

### Edit navigation

`lib/navigation.ts` — `mainNav` (desktop header), `mobileNav` (mobile menu), `footerNav` (footer columns) and the primary/secondary CTAs.

Social links in the footer stay inactive until you set `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_X_URL` and `NEXT_PUBLIC_INSTAGRAM_URL`.

### Add a blog article

Add an object to the `posts` array in `lib/blog.ts`:

```ts
{
  slug: "my-new-article",
  title: "My new article",
  excerpt: "One or two sentences.",
  category: "Guest Experience",          // or "Operations" | "AI in Hospitality" | "Product"
  date: "2026-10-01",
  author: { name: "SaraiOS Team", role: "Editorial" },
  image: "/images/blog/my-new-article.jpg", // optional — generated cover art is used if the file is missing
  readingMinutes: 5,
  placeholder: false,
  content: [
    { type: "paragraph", text: "…" },
    { type: "heading", text: "…" },
    { type: "list", items: ["…", "…"] },
    { type: "quote", text: "…" },
  ],
}
```

The route, sitemap entry, metadata and BlogPosting schema are generated automatically. Content is stored as typed blocks so it can be moved to a headless CMS later — map the CMS response to the `BlogPost` type and keep the components unchanged.

> The five included articles are **placeholder content** (`placeholder: true`) and are labelled as such on the site.

### Edit FAQs

`lib/faq.ts` — categories and questions. Mark up to five questions `featured: true` to show them on the home page. The FAQ page emits FAQPage structured data automatically.

### Add or edit industries

`lib/industries.ts` — each entry becomes a section on `/industries` and a card on the home page. Choose an icon key (`hotel`, `palm`, `key`, `gem`, `building`, `layers`) and which dashboard screen to show.

### Features, workflows, pricing, integrations

- Features: `lib/features.ts`
- "AI takes action" workflows: `lib/workflows.ts`
- Pricing plans + comparison: `lib/pricing.ts` (no numeric prices by design)
- Integration categories + status labels: `lib/content.ts`

### Connect the demo and contact forms

Both forms are defined in `lib/forms.ts` (fields, validation, submission). By default they use a **local mock submission** — nothing is sent anywhere.

Set `NEXT_PUBLIC_FORM_PROVIDER` in `.env.local`:

| Provider         | Setup                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mock` (default) | No setup. Simulates a successful submission.                                                                                                                  |
| `hubspot`        | Set `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` and `NEXT_PUBLIC_HUBSPOT_FORM_ID` (public IDs). Make sure HubSpot form field names match the `name`s in `lib/forms.ts`.   |
| `custom-api`     | Posts JSON to `NEXT_PUBLIC_FORM_ENDPOINT` (default `/api/lead`). Use this for **Resend, Salesforce, ActiveCampaign** or any provider that needs a secret key. |

For secret-key providers, create `app/api/lead/route.ts` and keep the key in a server-only env var (no `NEXT_PUBLIC_` prefix):

```ts
// app/api/lead/route.ts
export async function POST(req: Request) {
  const lead = await req.json();
  // e.g. Resend: await resend.emails.send({ … }) using process.env.RESEND_API_KEY
  // e.g. Salesforce / ActiveCampaign: call their REST API with a server-side token
  return Response.json({ ok: true });
}
```

Never put private API keys in `NEXT_PUBLIC_*` variables — those are exposed to the browser.

---

## Content guardrails

This site intentionally avoids unverified claims. Before adding content, keep to these rules:

- No testimonials, reviews, customer logos or rating schema until real, approved ones exist.
- No customer counts, ROI, conversion rates, accuracy figures, response times or language counts.
- No named integrations, certifications or compliance claims unless verified.
- Product mockup metrics are labelled **Demo data**.
- `/terms` and `/privacy` are **placeholders that require legal review** before production.

## Accessibility and motion

- Semantic landmarks, skip link, visible focus rings, labelled icon buttons.
- Accordions, tabs, the mobile menu (Escape to close, body scroll lock) and forms (inline errors, `aria-invalid`, focus on the first invalid field) are keyboard accessible.
- `prefers-reduced-motion` is respected: Framer Motion runs with `reducedMotion="user"`, CSS animations are disabled, and scripted sequences (hero chat, request demos) jump to their final state.

## Environment variables

See `.env.example`. `NEXT_PUBLIC_SITE_URL` must be set to the production URL so canonical URLs, the sitemap and Open Graph tags are correct.
