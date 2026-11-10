"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { CONSENT_EVENT, OPEN_SETTINGS_EVENT, getConsent, setConsent } from "@/lib/cookieConsent";
import { buttonClass } from "@/components/ui/primitives";

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** "unset" until the visitor picks, "server" while rendering on the server (so nothing flashes on load). */
const read = () => getConsent() ?? "unset";
const readOnServer = () => "server";

export function CookieBanner() {
  const saved = useSyncExternalStore(subscribe, read, readOnServer);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  if (saved === "server" || (saved !== "unset" && !reopened)) return null;

  const choose = (choice: "all" | "essential") => {
    setConsent(choice);
    setReopened(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie settings"
      aria-describedby="cookie-banner-text"
      className="fixed inset-x-4 bottom-4 z-50 rounded-2xl bg-card p-5 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.28)] ring-1 ring-line-strong sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-[420px]"
    >
      <p className="font-semibold text-ink">Cookies</p>
      <p id="cookie-banner-text" className="mt-1.5 text-sm leading-relaxed text-ink/70">
        This site only uses what it needs to work. We do not use analytics or advertising cookies at the moment. Tell
        us if we may use optional ones in future, and read more in our{" "}
        <Link href="/cookies" className="font-medium text-cta underline underline-offset-2">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose("all")} className={buttonClass("primary", "sm")}>
          Accept all
        </button>
        <button type="button" onClick={() => choose("essential")} className={buttonClass("secondary", "sm")}>
          Essential only
        </button>
      </div>
    </div>
  );
}
