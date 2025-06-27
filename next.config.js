// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack(config, { dev }) {
    if (dev) {
      config.cache = false
      config.infrastructureLogging = { level: 'error' }
      config.stats = { warnings: false }
    }
    return config
  },
})
