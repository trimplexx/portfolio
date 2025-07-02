import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Twoje opcje konfiguracyjne Next.js
};

export default withNextIntl(nextConfig);
