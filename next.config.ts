import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Environment variables
  env: {
    BASE_BACKEND_URL: process.env.BASE_BACKEND_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },

  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/cars",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "2684054.fs1.hubspotusercontent-na1.net",
      },

      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};
export default nextConfig;
