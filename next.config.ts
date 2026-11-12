import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Self-contained server bundle (.next/standalone) for the Docker / Render deployment.
  output: 'standalone',
};

export default nextConfig;
