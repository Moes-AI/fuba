/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  experimental: {
    turbo: {
      rules: {
        // Configure loaders to use Turbopack
        '*.js': ['swc-loader'],
        '*.ts': ['swc-loader'],
        '*.tsx': ['swc-loader'],
      },
    },
    optimizePackageImports: ['@/components', '@/lib'],
  },
};

module.exports = nextConfig;