import type { NextConfig } from "next";

const paidProductHtml = [
  "/products/01-prompty-samoterapiya.html",
  "/products/02-tetradi-detskie-obidy.html",
  "/products/03-nabor-dlya-roditeley.html",
  "/products/04-navigator.html",
  "/products/05-kartochki-voprosov.html",
  "/products/06-klub-samopomoshi.html",
  "/products/index.html",
];

const nextConfig: NextConfig = {
  async redirects() {
    return paidProductHtml.map((source) => ({
      source,
      destination: "/products",
      permanent: false,
    }));
  },
};

export default nextConfig;
