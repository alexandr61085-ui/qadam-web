import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Defense-in-depth: explicit Content-Type for AASA (WEB-03)
        // Route handler already sets this, but next.config.ts ensures it
        // even if caching layers strip route handler headers
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ]
  },
}

export default nextConfig
