/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/assets/**",
      },
    ],
    domains: ["nokenpanel.gotravpapua.com", "gotravpapua.com"],
  },
};

module.exports = nextConfig;
