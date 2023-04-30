/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://coupon-website-api-production.up.railway.app/',
      }
    ]
  }
}

module.exports = nextConfig
