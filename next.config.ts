import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:5000",
        "127.0.0.1:5000",
      ],
    },
  },

  reactStrictMode: false,
};

export default nextConfig;