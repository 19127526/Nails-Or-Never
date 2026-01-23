/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'jsx'],
  compiler: {
    removeConsole: true
  },
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
    minimumCacheTTL: 60,
  },
  // Optimize production builds
  swcMinify: true,
  compress: true,
  // Optimize font loading
  optimizeFonts: true,
  // Reduce JavaScript bundle size
  experimental: {
    optimizeCss: true,
  },
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
