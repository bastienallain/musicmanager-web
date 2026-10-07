"use client";

import { BandWaveform } from "@/components/band-waveform";
import { MacWindow } from "@/components/mac-window";
import Marquee from "@/components/ui/marquee";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { easeOutCubic } from "@/lib/animation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const { hero } = siteConfig;


function StatusPill() {
  return (
    <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-surface/90 px-3.5 py-1.5 font-mono text-[11px] shadow-[0_8px_30px_-8px_rgba(0,0,0,0.8)] backdrop-blur sm:text-xs">
      <span className="relative flex size-2 shrink-0" aria-hidden>
        <span className="absolute inline-flex size-full rounded-full bg-deck-a opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex size-2 rounded-full bg-deck-a" />
      </span>
      <span className="font-semibold text-deck-a">{hero.status.mode}</span>
      <span className="text-white/20" aria-hidden>
        ·
      </span>
      <span className="truncate text-muted-foreground">{hero.status.detail}</span>
    </div>
  );
}

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 420], [16, 0]);
  const scale = useTransform(scrollY, [0, 420], [0.94, 1]);
  const waveY = useTransform(scrollY, [0, 420], [0, -40]);

  return (
    // reducedMotion="user" : les translations d'entrée sont coupées si l'OS le demande.
    <MotionConfig reducedMotion="user">
      <section id="hero" className="relative w-full overflow-hidden">
        {/* Grille de fond façon panneau d'appareil, estompée vers le bas. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-12rem] -z-10 h-[28rem] w-[min(60rem,140vw)] -translate-x-1/2 rounded-[50%] bg-deck-a/10 blur-3xl"
        />

        <div className="container mx-auto px-4 pt-16 text-center sm:pt-24">
          <p
            className="motion-safe:animate-fade-up inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="h-px w-6 bg-deck-a/60" aria-hidden />
            {hero.eyebrow}
            <span className="h-px w-6 bg-deck-a/60" aria-hidden />
          </p>

          <h1
            className="motion-safe:animate-fade-up [animation-delay:80ms] mx-auto mt-6 max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-7xl"
          >
            {hero.title}
          </h1>

          <p
            className="motion-safe:animate-fade-up [animation-delay:160ms] mx-auto mt-6 max-w-2xl text-balance text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          >
            {hero.subtitle}
          </p>

          <div
            className="motion-safe:animate-fade-up [animation-delay:240ms] mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5"
          >
            <Link
              href="#cta"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-deck-a px-6 text-sm font-semibold text-background shadow-[0_0_0_1px_rgba(74,141,255,0.4),0_10px_40px_-10px_rgba(74,141,255,0.7)] transition-colors hover:bg-deck-a/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {siteConfig.cta}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="group inline-flex h-11 items-center gap-1.5 rounded-full px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {hero.secondaryCta.label}
              <ArrowRightIcon
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <ul
            aria-label="Platforms"
            className="motion-safe:animate-fade-up [animation-delay:320ms] mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            {siteConfig.platforms.map((p) => {
              const available = p.status === "available";
              return (
                <li
                  key={p.name}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[11px]",
                    available
                      ? "border-deck-a/35 bg-deck-a/[0.07] text-foreground"
                      : "border-dashed border-white/10 text-muted-foreground"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-1.5 rounded-full",
                      available ? "bg-deck-a" : "border border-white/25"
                    )}
                  />
                  <span className={available ? "font-semibold" : undefined}>
                    {p.name}
                  </span>
                  <span className={available ? "text-deck-a" : undefined}>
                    {p.detail}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Visuel : forme d'onde trois bandes derrière une vraie capture de l'app. */}
        <div className="relative mx-auto mt-14 max-w-6xl px-4 sm:mt-20">
          <motion.div
            aria-hidden
            style={{ y: reduce ? 0 : waveY }}
            className="motion-safe:animate-fade-in [animation-delay:400ms] pointer-events-none absolute inset-x-[-10%] top-[-3rem] -z-10 h-40 opacity-70 [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] sm:top-[-4rem] sm:h-56"
          >
            <BandWaveform bars={260} />
          </motion.div>

          <div className="[perspective:1600px]">
            <motion.div
              style={{
                rotateX: reduce ? 0 : rotateX,
                scale: reduce ? 1 : scale,
                transformOrigin: "50% 0%",
              }}
              // Pas de fondu d'opacité : la capture est l'élément LCP, elle doit
              // être peinte dès le HTML serveur, sans attendre l'hydratation.
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: easeOutCubic }}
              className="relative"
            >
              <div className="absolute left-1/2 top-0 z-10 w-max max-w-[calc(100%-1rem)] -translate-x-1/2 -translate-y-1/2">
                <StatusPill />
              </div>
              <MacWindow
                src={hero.image}
                alt={hero.imageAlt}
                preload
                sizes="(min-width: 1152px) 1120px, calc(100vw - 2rem)"
              />
            </motion.div>
          </div>
          {/* Fondu du bas de la fenêtre dans la page. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent"
          />
        </div>

        <div className="relative mx-auto max-w-5xl pb-16 pt-6 sm:pb-24">
          <p className="sr-only">Supported formats: {siteConfig.formats.join(", ")}</p>
          <Marquee
            aria-hidden
            pauseOnHover
            className={cn(
              "[--duration:45s] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
              "motion-reduce:[&>div]:animate-none"
            )}
          >
            {siteConfig.formats.map((format) => (
              <span
                key={format}
                className="whitespace-nowrap rounded-md border border-white/[0.08] bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground"
              >
                {format}
              </span>
            ))}
          </Marquee>
        </div>
      </section>
    </MotionConfig>
  );
}
