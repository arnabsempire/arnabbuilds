/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // next/image is served through the Netlify Image CDN automatically by the
  // Next.js adapter — no loader configuration is needed.
  images: { formats: ['image/avif', 'image/webp'] },
  // Security headers live in netlify.toml so the CDN applies them to every
  // asset, not only to routes that pass through Next.js.
};

export default nextConfig;
