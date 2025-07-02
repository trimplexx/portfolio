import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["next-intl", "react-icons", "react-hook-form"],
  },
  compress: true,
  productionBrowserSourceMaps: false,
};

const withNextIntl = createNextIntlPlugin("./src/i18/request.ts");
export default withNextIntl(nextConfig);
