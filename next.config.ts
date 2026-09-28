import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (avoids picking up stray lockfiles in parent folders).
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
};

export default nextConfig;
