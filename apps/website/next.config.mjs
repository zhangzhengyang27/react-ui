import createMdx from '@next/mdx';

const withMDX = createMdx({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    rehypePlugins: ['rehype-slug'],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'mdx'],
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: [
      '@react-ui/ui',
      '@react-ui/docs-demos',
      '@phosphor-icons/react',
      'lucide-react',
      'recharts',
    ],
  },
  transpilePackages: [
    '@react-ui/hooks',
    '@react-ui/carousel',
    '@react-ui/charts',
    '@react-ui/code-highlight',
    '@react-ui/colors-generator',
    '@react-ui/dates',
    '@react-ui/demo',
    '@react-ui/dev-icons',
    '@react-ui/docs-demos',
    '@react-ui/docs-styles-api',
    '@react-ui/dropzone',
    '@react-ui/emotion',
    '@react-ui/form',
    '@react-ui/mantine-header',
    '@react-ui/mantine-logo',
    '@react-ui/mantine-meta',
    '@react-ui/modals',
    '@react-ui/notifications',
    '@react-ui/nprogress',
    '@react-ui/schedule',
    '@react-ui/spotlight',
    '@react-ui/store',
    '@react-ui/tiptap',
  ],
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 10,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          child_process: false,
          fs: false,
          'builtin-modules': false,
          worker_threads: false,
        },
      };
    }

    return config;
  },
};

export default withMDX(nextConfig);
