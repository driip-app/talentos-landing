/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/deck',
        destination: 'https://canva.link/1lw4pxds6m7jrbr',
        permanent: false,
      },
    ];
  },
};
module.exports = nextConfig;
