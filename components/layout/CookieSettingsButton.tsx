"use client";

import { OPEN_SETTINGS_EVENT } from "@/lib/cookieConsent";

/** Lets visitors change their cookie choice later. Opens the banner again. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))} className={className}>
      Cookie settings
    </button>
  );
}
