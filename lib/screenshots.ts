/**
 * Dashboard screenshot registry.
 *
 * Drop real SaraiOS screenshots into /public/images/dashboard/ using the
 * filenames below. Any file that exists is shown automatically; missing files
 * fall back to the matching React mockup in components/dashboard/mockups.
 *
 * Recommended export: 2880×1800 (16:10) PNG or WebP, light UI, no real guest data.
 */
export const dashboardScreens = {
  overview: { file: "dashboard-overview.png", alt: "SaraiOS dashboard overview", aspect: "16/10" },
  concierge: { file: "ai-concierge.png", alt: "SaraiOS AI Concierge conversation view", aspect: "16/10" },
  conversations: { file: "guest-conversations.png", alt: "SaraiOS guest conversations inbox", aspect: "16/10" },
  requests: { file: "guest-requests.png", alt: "SaraiOS guest requests board", aspect: "16/10" },
  profile: { file: "guest-profile.png", alt: "SaraiOS guest profile", aspect: "16/10" },
  analytics: { file: "analytics.png", alt: "SaraiOS analytics dashboard", aspect: "16/10" },
  integrations: { file: "integrations.png", alt: "SaraiOS integrations settings", aspect: "16/10" },
  settings: { file: "settings.png", alt: "SaraiOS property settings", aspect: "16/10" },
} as const;

export type ScreenKey = keyof typeof dashboardScreens;

export const screenPath = (key: ScreenKey) => `/images/dashboard/${dashboardScreens[key].file}`;
