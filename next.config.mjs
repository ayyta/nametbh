/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['name-tbd.s3.us-west-1.amazonaws.com'], // Add your S3 bucket domain here
  },
  // Uncomment this section if you want to use rewrites as well
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
