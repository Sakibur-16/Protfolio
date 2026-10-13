import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The round "N" badge only exists in dev; hiding it keeps the side rail clear.
  devIndicators: false,
};

export default nextConfig;
