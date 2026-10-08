import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["tonely"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
