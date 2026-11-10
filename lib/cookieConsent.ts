/**
 * Cookie choice, kept in the visitor's own browser (local storage). Nothing is sent to a server.
 * If analytics or other optional tools are added later, check getConsent() === "all" before loading them.
 */
export type CookieChoice = "all" | "essential";

export const CONSENT_KEY = "saraios-cookie-choice";
export const CONSENT_EVENT = "saraios:cookie-choice";
export const OPEN_SETTINGS_EVENT = "saraios:cookie-settings";

export function getConsent(): CookieChoice | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: CookieChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Storage blocked: the choice only lasts until the page is closed.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
