/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly enable the App Router
  experimental: {
    appDir: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Replace legacy i18n config with newer approach
  // (i18n is now handled in app/[locale] structure or middleware)
}

module.exports = nextConfig
