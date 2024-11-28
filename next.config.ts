import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["flagcdn.com"], // Allow images from flagcdn.com
  },
};

export default nextConfig;
