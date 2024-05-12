import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.resolve.alias['@/pages'] = path.resolve(__dirname, 'src/pages');
    config.resolve.alias['@/components'] = path.resolve(__dirname, 'src/components'); 
    config.resolve.alias['@/images'] = path.resolve(__dirname, 'src/images');
    return config;
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;