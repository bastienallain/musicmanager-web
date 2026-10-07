"use client";

import { Section } from "@/components/section";
import { siteConfig } from "@/lib/config";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { motion } from "framer-motion";
import { ArrowDownIcon, CheckIcon } from "lucide-react";
import Image from "next/image";

type Benefit = (typeof siteConfig.benefits)[number];

export function Benefits() {
  const { title, subtitle } = siteConfig.benefitsSection;
  const reduce = usePrefersReducedMotion();

  return (
    <div className="border-y border-white/[0.06] bg-surface/40">
      <Section
        id="benefits"
        title={title}
        subtitle={subtitle}
        align="center"
        className="mx-auto max-w-screen-lg px-4 sm:px-6"
      >
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {siteConfig.benefits.map((benefit, index) => (
            <motion.li
              key={benefit.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.6, delay: (index % 2) * 0.08, ease: "easeOut" }
              }
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-background"
            >
              <div className="space-y-3 p-5 sm:p-7">
                <span className="font-mono text-[11px] tracking-[0.18em] text-deck-a">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-[1.65rem]">
                  {benefit.text}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {benefit.detail}
                </p>
              </div>
              <div className="relative mt-auto aspect-[15/8] overflow-hidden border-t border-white/[0.06]">
                {benefit.rename ? (
                  <RenameVisual rename={benefit.rename} />
                ) : (
                  <>
                    <CroppedShot benefit={benefit} />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
                  </>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

const ASPECT = 8 / 15;

// Agrandit une zone de la capture : à pleine largeur, le texte de l'app serait illisible.
function CroppedShot({ benefit }: { benefit: Benefit }) {
  const [srcW, srcH] = benefit.size;
  const [x, y, w] = benefit.crop;
  // L'image est agrandie de `zoom` par rapport à la carte (≈ 480px en 2 colonnes).
  const zoom = srcW / w;
  const sizes = `(min-width: 1024px) ${Math.ceil(480 * zoom)}px, (min-width: 768px) ${Math.ceil(50 * zoom)}vw, ${Math.ceil(100 * zoom)}vw`;
  return (
    <Image
      src={benefit.image}
      alt={benefit.text}
      width={srcW}
      height={srcH}
      sizes={sizes}
      className="absolute h-auto max-w-none"
      style={{
        width: `${(srcW / w) * 100}%`,
        left: `${(-x / w) * 100}%`,
        top: `${(-y / (w * ASPECT)) * 100}%`,
      }}
    />
  );
}

// Pas de capture qui montre un renommage : on dessine le chemin avant/après et ce qui suit le fichier.
function RenameVisual({ rename }: { rename: NonNullable<Benefit["rename"]> }) {
  return (
    <div className="flex h-full flex-col justify-center gap-4 bg-surface/60 px-5 py-6 font-mono text-xs sm:px-7">
      <div className="space-y-2">
        <p className="truncate text-muted-foreground line-through decoration-white/30">
          {rename.from}
        </p>
        <ArrowDownIcon aria-hidden className="size-3.5 text-deck-a" />
        <p className="truncate text-foreground">{rename.to}</p>
      </div>
      <ul className="flex flex-wrap gap-2" aria-label="Kept with the track">
        {rename.kept.map((item) => (
          <li
            key={item}
            className="flex items-center gap-1.5 rounded-md bg-deck-a/10 px-2 py-1 text-deck-a ring-1 ring-deck-a/25"
          >
            <CheckIcon aria-hidden className="size-3" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
