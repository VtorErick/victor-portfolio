import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
