import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig, StatsOptions, InfrastructureLogging } from 'webpack';

// next.config.js
/** @type {import('next').NextConfig} */
interface CustomWebpackOptions {
  dev: boolean;
}

interface CustomWebpackConfig extends WebpackConfig {
  cache?: boolean;
  infrastructureLogging?: InfrastructureLogging;
  stats?: StatsOptions & { warnings?: boolean };
}

const nextConfig: NextConfig = {
  webpack: (config: CustomWebpackConfig, options: CustomWebpackOptions): CustomWebpackConfig => {
    if (options.dev) {
      // 1) Disable caching (stops cache‑dependency logs):
      config.cache = false;

      // 2) Silence infrastructure‑level logs (warnings → errors only):
      //    (requires Next.js 12.1+ / Webpack 5)
      config.infrastructureLogging = {
        level: 'error',    // only show error‐level messages
      };

      // 3) Optionally hide warnings in stats:
      config.stats = {
        warnings: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
