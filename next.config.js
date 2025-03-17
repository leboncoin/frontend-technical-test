/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15 enables App Router by default, we don't need to specify it explicitly
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
