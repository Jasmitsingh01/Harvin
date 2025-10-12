// @ts-nocheck
const { i18n } = require('./next-i18next.config.js');
// You can remove the following 2 lines when integrating our example.
const { loadCustomBuildParams } = require('./next-utils.config');
const { esmExternals = false, tsconfigPath } = loadCustomBuildParams();
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals, // https://nextjs.org/blog/next-11-1#es-modules-support
  },

  i18n,
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      'https://harvin.foodnextdoor.shop',
      'harvin.foodnextdoor.shop',
      'harvin.foodnextdoor.shop',
      'another-domain.com',
      'example.com',
      'harvin.indapoint.org',
      'https://harvin.indapoint.org',
      'https://harvin.theclosedoor.com',
      'https://api.harvinchairs.com',
      'api.harvinchairs.com',
      'images.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname:"*"
      },
      
    ],
    unoptimized: true, // Disable image optimization to avoid API timeout issues
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    tsconfigPath,
  },
  webpack(config) {
    // Add styled-components and babel-plugin-styled-components configurations
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    return config;
  },
};

module.exports = withPWA(nextConfig);
