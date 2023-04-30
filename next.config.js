/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites () {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.promogate.app/:path*',
      }
    ]
  }
}

module.exports = nextConfig
