"use client";

import Image from "next/image";
import { useRef, useState, type ComponentType } from "react";
import { useInView } from "framer-motion";
import { dashboardScreens, type ScreenKey } from "@/lib/screenshots";
import { cn } from "@/lib/cn";
import { BrowserFrame, DeviceFrame } from "./Frames";
import { ScaledCanvas } from "./ScaledCanvas";
import { ConciergeMock } from "./mockups/ConciergeMock";
import { RequestsMock } from "./mockups/RequestsMock";
import {
  AnalyticsMock,
  ConversationsMock,
  IntegrationsMock,
  OverviewMock,
  ProfileMock,
  SettingsMock,
} from "./mockups/StaticMocks";

const mocks: Record<ScreenKey, ComponentType> = {
  overview: OverviewMock,
  concierge: ConciergeMock,
  conversations: ConversationsMock,
  requests: RequestsMock,
  profile: ProfileMock,
  analytics: AnalyticsMock,
  integrations: IntegrationsMock,
  settings: SettingsMock,
};

/**
 * Mounts a mockup only when it nears the viewport. Mockups are full React UIs,
 * so deferring them keeps the main thread free on load. The reserved box
 * matches the final aspect ratio, so nothing shifts when it mounts.
 */
function LazyMock({ Mock, eager }: { Mock: ComponentType; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { once: true, margin: "600px 0px" });
  const show = eager || near;
  return (
    <div ref={ref} aria-hidden inert>
      {show ? (
        <ScaledCanvas>
          <Mock />
        </ScaledCanvas>
      ) : (
        <div className="w-full bg-[#fbfaf8]" style={{ aspectRatio: "1280 / 800" }} />
      )}
    </div>
  );
}

type Props = {
  screen: ScreenKey;
  /**
   * Public path of the real screenshot, or null to render the React mockup.
   * Pages resolve this with getScreenAvailability() — see lib/screenshots.server.ts.
   */
  src: string | null;
  device?: "desktop" | "tablet" | "mobile";
  chrome?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/**
 * Displays a real SaraiOS screenshot when available; otherwise renders the
 * matching product mockup so the site works before screenshots are supplied.
 */
export function ProductScreenshot({
  screen,
  src,
  device = "desktop",
  chrome = true,
  priority,
  className,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}: Props) {
  const meta = dashboardScreens[screen];
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const Mock = mocks[screen];
  const useImage = src && !failed;

  const body = useImage ? (
    <div className="relative w-full bg-linen-2" style={{ aspectRatio: meta.aspect.replace("/", " / ") }}>
      {!loaded && <div aria-hidden className="absolute inset-0 animate-pulse bg-linen-2" />}
      <Image
        src={src}
        alt={meta.alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn("object-cover object-top transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0")}
      />
    </div>
  ) : (
    // PLACEHOLDER: replaced automatically when /public/images/dashboard/<file> exists.
    <div role="img" aria-label={`${meta.alt} (product mockup with demo data)`}>
      <LazyMock Mock={Mock} eager={priority} />
    </div>
  );

  if (device === "desktop") {
    return (
      <BrowserFrame chrome={chrome} className={className}>
        {body}
      </BrowserFrame>
    );
  }
  return (
    <DeviceFrame device={device} className={className}>
      {body}
    </DeviceFrame>
  );
}
