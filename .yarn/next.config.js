/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: {
      exclude: ['error']
    }
  },
    images: {
    domains: ["pbs.twimg.com", "images.unsplash.com"],
  },
  transpilePackages: ["antd"],
};

module.exports = nextConfig;
