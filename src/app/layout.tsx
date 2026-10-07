import { TailwindIndicator } from "@/components/tailwind-indicator";
import { siteConfig } from "@/lib/config";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn, constructMetadata } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = constructMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
});

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07080A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Le site est toujours sombre : la classe `dark` est posée en dur, sans next-themes.
  return (
    <html
      lang="en"
      className={cn("dark", fontSans.variable, fontMono.variable)}
    >
      <body className="min-h-screen bg-background antialiased w-full mx-auto font-sans">
        {children}
        {process.env.NODE_ENV === "development" && <TailwindIndicator />}
      </body>
    </html>
  );
}
