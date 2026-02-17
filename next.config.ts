import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https", 
        port: "",
      }, 
      {
        protocol: "https",
        hostname: "different-caterpillar-974.convex.cloud",
        port: "",
      },
    ]
  }
};

export default nextConfig;
