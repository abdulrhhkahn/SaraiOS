import "server-only";
import fs from "node:fs";
import path from "node:path";
import { dashboardScreens, screenPath, type ScreenKey } from "./screenshots";

export type ScreenAvailability = Record<ScreenKey, string | null>;

/**
 * Checks /public/images/dashboard at build/render time and returns the public
 * path for every screenshot that exists (or null → render the mockup).
 */
export function getScreenAvailability(): ScreenAvailability {
  const dir = path.join(process.cwd(), "public", "images", "dashboard");
  const result = {} as ScreenAvailability;
  for (const key of Object.keys(dashboardScreens) as ScreenKey[]) {
    const exists = fs.existsSync(path.join(dir, dashboardScreens[key].file));
    result[key] = exists ? screenPath(key) : null;
  }
  return result;
}

/** Generic helper for optional local images (blog covers, industry art). */
export function publicFileExists(publicPath: string | undefined) {
  if (!publicPath) return false;
  return fs.existsSync(path.join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}
