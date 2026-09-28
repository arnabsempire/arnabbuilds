/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * Static export.
   *
   * Nothing on this site needs a server. There are no route handlers, no
   * middleware and no server actions; robots.ts and sitemap.ts are both
   * `force-static`; and the contact section is three links rather than a POST.
   * So the build emits a plain `out/` directory of HTML, CSS, JS and images
   * that any static host serves directly.
   *
   * That is not only cheaper to host — it removes a class of failure. There is
   * no function to cold-start, no framework adapter to mis-detect, and no
   * server handler that can go missing from a deploy and break every route.
   */
  output: 'export',

  /**
   * The Next.js image optimiser is itself a server route, which a static export
   * has no way to run, so images are served from /public exactly as authored.
   *
   * This costs nothing here: there is one raster image on the whole site, a
   * ~116 KB portrait. The `formats: ['image/avif', 'image/webp']` list that
   * used to sit here went with the optimiser, because nothing remains to do the
   * converting. If more photography arrives later, convert it at author time
   * rather than reaching back for a server.
   */
  images: { unoptimized: true },

  // Security and caching headers are static-host configuration rather than Next
  // configuration, so they live in public/_headers (Cloudflare, copied into the
  // export as-is) and netlify.toml (Netlify). Both carry the same rules.
};

export default nextConfig;
