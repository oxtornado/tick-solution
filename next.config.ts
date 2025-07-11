import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Normal config options here

  // 👇 This disables ESLint errors *during build*
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Example: you could also set React strict mode, swcMinify, etc.
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
