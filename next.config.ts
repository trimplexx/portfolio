import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "selfcontainer.blob.core.windows.net",
        pathname: "/portfolio-images/**",
      },
    ],
    minimumCacheTTL: 60,
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compress: true,
  productionBrowserSourceMaps: false,
  async rewrites() {
    return [
      {
        source: "/logowanie",
        destination: "/login",
      },
      {
        source: "/admin/projekty/dodawanie",
        destination: "/admin/projects/add",
      },
      {
        source: "/admin/projekty/:id",
        destination: "/admin/projects/:id",
      },
      {
        source: "/admin/projekty",
        destination: "/admin/projects",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
