/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mysql2"],
    typedRoutes: true,
  },
};

module.exports = nextConfig;
