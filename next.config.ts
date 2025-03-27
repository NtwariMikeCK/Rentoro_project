import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Environment variables
  env: {
    BASE_BACKEND_URL: process.env.BASE_BACKEND_URL,
  },
};

export default nextConfig;
