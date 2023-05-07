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
  },
  images: {
    domains: ['promogate.s3.sa-east-1.amazonaws.com']
  }
}

module.exports = nextConfig
