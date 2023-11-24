/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'cloudflare-ipfs.com' }],
  },
};

module.exports = nextConfig;
