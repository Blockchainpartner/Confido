/** @type {import('next').NextConfig} */

const nextConfig = {


  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
