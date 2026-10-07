import { siteConfig } from "@/lib/config";
import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = "/og",
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: title }];

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      template: "%s | " + siteConfig.name,
      default: title,
    },
    description,
    keywords: siteConfig.keywords,
    applicationName: siteConfig.name,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: siteConfig.name,
      images,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    robots: { index: true, follow: true },
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    ...props,
  };
}
