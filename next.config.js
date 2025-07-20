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
      'https://harvin.foodnextdoor.shop',
      'harvin.foodnextdoor.shop',
      'harvin.foodnextdoor.shop',
      'another-domain.com',
      'example.com',
      'harvin.indapoint.org',
      'https://harvin.indapoint.org',
      'https://harvin.theclosedoor.com',
      'https://api.harvinchairs.com',
      'api.harvinchairs.com'
    ],
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
