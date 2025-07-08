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
  },
  async headers() {
    return [
      {
        source: "/_next/image",
        headers: [
          {
            key: "Accept",
            value: "image/webp,image/apng,image/*,*/*;q=0.8",
          },
          {
            key: "x-ms-version",
            value: "2020-04-08",
          },
        ],
      },
    ];
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
