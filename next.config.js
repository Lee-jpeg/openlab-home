/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  distDir: "out",
  images: { unoptimized: true },
  basePath: "/openlab-home",
  assetPrefix: "/openlab-home/",
  trailingSlash: true,
}
module.exports = nextConfig
