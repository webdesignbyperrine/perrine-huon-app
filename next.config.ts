import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iuqljcfianyoffoaaqjb.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // A single modern format: with both AVIF and WebP, every image/width pair
    // could be transformed twice (once per format negotiated by the browser),
    // doubling the Vercel "Image Optimization - Transformations" usage.
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Keep optimized images cached for 31 days instead of 60 seconds so the
    // same image is not re-transformed after every expiry. Uploaded images
    // get new URLs, so content updates are not delayed by this cache.
    minimumCacheTTL: 2678400,
  },
  
  async headers() {
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin'
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()'
      },
    ];

    if (!isDev) {
      securityHeaders.push({
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://va.vercel-scripts.com https://assets.calendly.com blob:",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: blob: https: http:",
          "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.openai.com https://va.vercel-scripts.com https://lottie.host https://*.lottiefiles.com https://cdn.jsdelivr.net https://unpkg.com blob:",
          "frame-src 'self' https://calendly.com",
          "frame-ancestors 'self'",
          "worker-src 'self' blob:",
          "child-src 'self' blob:",
        ].join('; ')
      });
    }

    return [
      {
        source: '/animations/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/logo_vert_perrine_huon.webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  // Permanent (301) redirect from the bare apex domain to www.
  // Vercel's edge already redirects (307) at the domain level, but declaring it
  // here as 301 makes the canonicalisation explicit, idempotent across hosts,
  // and safer for SEO (search engines treat 301 as the strong canonical signal).
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'perrinehuon.com',
          },
        ],
        destination: 'https://www.perrinehuon.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
