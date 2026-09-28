"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders children at a fixed design size and scales them to fit the parent
 * width — so mockups behave exactly like a screenshot at any viewport.
 */
export function ScaledCanvas({
  width = 1280,
  height = 800,
  children,
}: {
  width?: number;
  height?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }}>
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width, height, transform: `scale(${scale})`, visibility: scale ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </div>
  );
}
