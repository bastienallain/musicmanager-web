import { siteConfig } from "@/lib/config";
import type { MetadataRoute } from "next";

// Une seule page : le sitemap est statique, généré au build à partir de l'URL du site.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
