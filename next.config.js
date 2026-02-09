/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  // Suppress font warnings
  experimental: {
    optimizeCss: false,
  },
}
module.exports = nextConfig
