/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["better-sqlite3"],
    typedRoutes: true,
  },
};

module.exports = nextConfig;
