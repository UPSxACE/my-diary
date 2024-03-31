/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  // ... rest of the configuration.
  output:
    process.env.NEXT_BUILD_STANDALONE === "true" ? "standalone" : undefined,
};

export default nextConfig;
