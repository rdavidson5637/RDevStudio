/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  async redirects() {
    return [
      {
        source: "/coming-soon",
        destination: "/games",
        permanent: true,
      },
      {
        source: "/hire/rudi",
        destination: "/hire?rudi",
        permanent: true,
      },
      {
        source: "/bored",
        destination: "/games",
        permanent: true,
      },
      {
        source: "/bored/:path*",
        destination: "/games",
        permanent: true,
      },
      {
        source: "/work/carrick-plumbing",
        destination: "/work/concept-builds",
        permanent: true,
      },
      {
        source: "/work/carrick-plumbing-co",
        destination: "/work/concept-builds",
        permanent: true,
      },
      {
        source: "/work/anchor-restaurant",
        destination: "/work/concept-builds",
        permanent: true,
      },
      {
        source: "/work/the-anchor-restaurant",
        destination: "/work/concept-builds",
        permanent: true,
      },
      {
        source: "/work/harbour-hair",
        destination: "/work/concept-builds",
        permanent: true,
      },
      {
        source: "/work/harbour-hair-studio",
        destination: "/work/concept-builds",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://*.pusher.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.pusher.com wss://*.pusher.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self' https://formspree.io",
              "object-src 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
