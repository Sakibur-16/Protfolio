import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The round "N" badge only exists in dev; hiding it keeps the side rail clear.
  devIndicators: false,
  // Project screenshots are text-heavy, so they are served at a higher quality.
  images: { qualities: [75, 95] },
};

export default nextConfig;
