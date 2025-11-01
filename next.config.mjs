/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'pub-d8a73e1c5c024e809e7bea7ea94333f4.r2.dev',
      },
    ],
    // เพิ่ม unoptimized สำหรับ production ถ้ายังมีปัญหา
    unoptimized: process.env.NEXT_PUBLIC_DISABLE_IMAGE_OPTIMIZATION === 'true',
  },
};

export default nextConfig;

