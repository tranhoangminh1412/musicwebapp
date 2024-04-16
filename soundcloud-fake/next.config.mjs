/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "3000",
      },
    ],
    domains: ['lh3.googleusercontent.com'],
  },
  env: {
    AUTH_SECRET : process.env.AUTH_SECRET
  },
};

export default nextConfig;