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
    // Suppress specific @next/mdx warnings about dynamic imports
    config.ignoreWarnings = [
      {
        module: /node_modules\/@next\/mdx\/mdx-js-loader\.js/,
        message: /Parsing of .* for build dependencies failed at 'import\(require\.resolve\(plugin\[0\], { paths: \[projectRoot\] }\)\)'/,
      },
    ]
    return config
  },
})