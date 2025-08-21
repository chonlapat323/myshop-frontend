import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // ปิด Next.js Image Optimization ชั่วคราว
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "apis.paodev.xyz",
        pathname: "/uploads/**",
      },
      // เพิ่ม pattern สำหรับกรณีที่ API_URL เป็น undefined หรือ null
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "/images/**",
      },
    ],
    // เพิ่ม domains สำหรับ fallback
    domains: ["localhost", "apis.paodev.xyz","localhost:3001"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
