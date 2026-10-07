import { Benefits } from "@/components/sections/benefits";
import { BentoGrid } from "@/components/sections/bento";
import { CTA } from "@/components/sections/cta";
import { DeckRelay } from "@/components/sections/deck-relay";
import { FAQ } from "@/components/sections/faq";
import { FeatureHighlight } from "@/components/sections/feature-highlight";
import { FeatureScroll } from "@/components/sections/feature-scroll";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { SignalPath } from "@/components/sections/signal-path";
import { siteConfig } from "@/lib/config";

// Données structurées de l'app, sans prix ni date de sortie (rien n'est encore promis).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "macOS",
};

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <Hero />
      <FeatureScroll />
      <SignalPath />
      <FeatureHighlight />
      <DeckRelay />
      <BentoGrid />
      <Benefits />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
