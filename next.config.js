/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // 1) Disable persistent cache (no CssDependency warnings)
      config.cache = false;

      // 2) Only show error‑level infra logs (hide warnings)
      config.infrastructureLogging = { level: 'error' };

      // 3) Don’t print warnings in stats
      config.stats = { warnings: false };
    }
    return config;
  },
};

module.exports = nextConfig;
