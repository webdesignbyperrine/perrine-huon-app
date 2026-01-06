import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
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
  },
  
  // Headers de sécurité (désactivé en dev pour compatibilité Lottie WASM)
  async headers() {
    // Headers de base (toujours appliqués)
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

    // CSP uniquement en production
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
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
};

export default nextConfig;
