/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kopikan.vercel.app",
      },
    ],
  },
};

export default nextConfig;
