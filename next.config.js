/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'banner-access.krl.co.id',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
