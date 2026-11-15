import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify serves this app through the official Next.js runtime, so the
  // default server output is kept. Do not add `output: "export"` here.
  //
  // `images.unoptimized` keeps Unsplash and local assets rendering on Netlify
  // without image-optimization quotas or remote-host domain errors.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Removes the `X-Powered-By: Next.js` response header.
  poweredByHeader: false,

  // Next.js 16 compatibility notes:
  // - No `eslint` block: ESLint configuration is handled by eslint.config.mjs.
  // - No `typescript.ignoreBuildErrors`: type checking is clean (`tsc --noEmit`
  //   passes), so real broken imports or syntax errors should fail the build.
};

export default nextConfig;
