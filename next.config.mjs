/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "demo1.web678.com",
      },
    ],
    formats: ["image/webp"],
  },

  env: {
    ENV: process.env.ENV,
  },
};

export default nextConfig;
