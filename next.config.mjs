/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['media4.giphy.com', 'media3.giphy.com', 'media2.giphy.com', 'media1.giphy.com', 'media0.giphy.com', 'name-tbd.s3.us-west-1.amazonaws.com'],
  }
  // async rewrites() {
  //   return [
  //     {
  //       source: "/login",
  //       destination: "/accountPages/login",
  //     },
  //     {
  //       source: "/register",
  //       destination: "/accountPages/register",
  //     },
  //   ];
  // }
};

export default nextConfig;
