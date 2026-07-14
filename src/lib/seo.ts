import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/brand/banzai-hero.png"
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
} = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description ?? siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: siteConfig.name,
      title: metaTitle,
      description: metaDescription,
      images: [{ url: image, width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [image]
    }
  };
}
