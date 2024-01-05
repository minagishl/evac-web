import utwm from 'unplugin-tailwindcss-mangle/webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,

  webpack: (config, { dev }) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // delay before rebuilding
      ignored: ['node_modules'],
    };

    config.infrastructureLogging = {
      // Must be checked before deploying
      level: 'error',
    };

    if (!dev) {
      config.plugins.push(
        utwm({
          classGenerator: {
            classPrefix: '',
            newClassSize: 6,
          },
        })
      );
    }

    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
