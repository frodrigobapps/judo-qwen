/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placehold.co', 'your-supabase-project.supabase.co'],
  },
};

module.exports = nextConfig;
