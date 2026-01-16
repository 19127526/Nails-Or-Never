/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'jsx'],
  // Temporarily disable console removal to avoid build issues
  // compiler: {
  //   removeConsole: true
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nails.shoedog.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'w20.wocmarketing.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'houseofpolishnailsandspa.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'server.nailsornever.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'server.nailsornever.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
