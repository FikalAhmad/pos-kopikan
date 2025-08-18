/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kopikan.vercel.app",
      },
      {
        protocol: "https",
        hostname: "api.sandbox.midtrans.com",
      },
    ],
  },
};

export default nextConfig;
