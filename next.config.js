// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com'], // Add more domains if hosting images externally
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
