/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/public/:first/:path",
      destination: "/:first/:path",
    },
  ],
  images: {
    domains: ['promogate.s3.sa-east-1.amazonaws.com']
  }
}

module.exports = nextConfig
