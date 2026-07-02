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
};

export default nextConfig;
