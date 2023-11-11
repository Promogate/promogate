/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/:first/:path",
      destination: "/api/:first/:path",
    },
  ],
  images: {
    domains: ['promogate.s3.sa-east-1.amazonaws.com']
  }
}

module.exports = nextConfig
