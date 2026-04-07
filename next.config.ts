import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      {
        source: '/studio',
        destination: 'https://protagonistink.sanity.studio/',
        permanent: false,
      },
      {
        source: '/studio/:path*',
        destination: 'https://protagonistink.sanity.studio/',
        permanent: false,
      },
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
