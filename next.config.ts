import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/journal',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/story-health-check',
        destination: '/story-teardown',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#story-teardown',
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
