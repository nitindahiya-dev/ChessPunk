import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig, StatsOptions } from 'webpack';

/** @type {import('next').NextConfig} */
interface CustomWebpackConfig extends WebpackConfig {
  infrastructureLogging?: object;
  stats?: StatsOptions | { warnings: boolean };
}

interface WebpackOptions {
  dev: boolean;
  isServer: boolean;
  webpack: typeof import('webpack');
  buildId: string;
  config: NextConfig;
  defaultLoaders: unknown;
  dir: string;
  totalPages: number | undefined;
  nextRuntime?: string;
  webpackVersion?: string;
}

const nextConfig: NextConfig = {
  webpack: (config: CustomWebpackConfig, { dev }: WebpackOptions) => {
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
