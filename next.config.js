/** PostHog is proxied through our own domain (`/ingest`) so ad blockers that block
 *  `*.posthog.com` don't silently drop events. */
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
const posthogAssetsHost = posthogHost.replace(".i.posthog.com", "-assets.i.posthog.com");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // PostHog's API paths rely on trailing slashes; Next's redirect would break them.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/deck',
        destination: 'https://canva.link/1lw4pxds6m7jrbr',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: `${posthogAssetsHost}/static/:path*` },
      { source: '/ingest/array/:path*', destination: `${posthogAssetsHost}/array/:path*` },
      { source: '/ingest/:path*', destination: `${posthogHost}/:path*` },
    ];
  },
};
module.exports = nextConfig;
