/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['actions.ts', 'constraints.ts', 'reducer.ts', 'pages/gift-card', 'tsx', 'ts', 'index.actions.ts'],
}
module.exports = {
  pageExtensions: ['actions.ts', 'constraints.ts', 'reducer.ts', 'gift-card', 'ts', 'tsx', 'index.actions.ts'],
  experimental: {
    nextScriptWorkers: true,
  },
}
// check
module.exports = nextConfig
