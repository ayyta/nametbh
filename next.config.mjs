/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/accountPages/login",
      },
      {
        source: "/register",
        destination: "/accountPages/register",
      },
    ];
  }
};

export default nextConfig;
