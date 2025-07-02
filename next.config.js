// next.config.js
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack(config, { dev }) {
    if (dev) {
      config.cache = false
      config.infrastructureLogging = { level: 'error' }
      config.stats = { warnings: false }
    }

    // Suppress that specific MDX loader parsing warning
    config.ignoreWarnings = [
      {
        module: /@next\/mdx\/mdx-js-loader\.js/,
        message: /Parsing of .*mdx-js-loader\.js.*failed at 'import\(require\.resolve/,
      },
    ]

    return config
  },
})
