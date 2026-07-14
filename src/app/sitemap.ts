import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/catalogo", "/carrinho", "/checkout", "/sobre", "/contato"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteConfig.url}/produto/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...productRoutes];
}
