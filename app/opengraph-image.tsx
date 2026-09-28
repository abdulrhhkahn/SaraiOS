import { ImageResponse } from "next/og";

export const alt = "SaraiOS — AI-Native Guest Experience Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card. Used for Open Graph and Twitter unless a route overrides it. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#f7f6f2",
        color: "#171717",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg width="56" height="56" viewBox="0 0 32 32">
          <path d="M24.5 9.5A11 11 0 1 0 27 16" fill="none" stroke="#171717" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="3.4" fill="#7c7cff" />
          <circle cx="26.2" cy="11.2" r="2.6" fill="#d6b47a" />
        </svg>
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.5 }}>SaraiOS</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Hospitality, with an AI</div>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05 }}>that never sleeps.</div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#6f706d" }}>
          AI-native guest experience for modern hospitality.
        </div>
      </div>
    </div>,
    size,
  );
}
