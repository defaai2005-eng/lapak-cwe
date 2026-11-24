/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['172.27.89.155', '*.devtunnels.ms'],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;