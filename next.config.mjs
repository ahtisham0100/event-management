/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://prefatory-herbaceously-rachell.ngrok-free.dev/api/:path*',
      },
    ]
  },
}

export default nextConfig
