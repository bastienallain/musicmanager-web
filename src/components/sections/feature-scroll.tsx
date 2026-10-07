"use client";

import { Section } from "@/components/section";
import { MacWindow } from "@/components/mac-window";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const steps = siteConfig.featureScroll;
const pad = (n: number) => String(n).padStart(2, "0");

// Grand écran : scène collante pilotée par le scroll, la capture change à chaque étape.
function StickyTour() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const progress = reduceMotion ? scrollYProgress : smooth;

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length))));
  });

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const span = track.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + span * ((index + 0.5) / steps.length),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div
      ref={trackRef}
      className="relative hidden lg:block"
      style={{ height: `${steps.length * 90 + 10}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full grid-cols-[minmax(0,5fr)_minmax(0,12fr)] items-center gap-12">
          <ol className="relative pl-8">
            {/* Rail gradué, comme une échelle de VU-mètre */}
            <div
              aria-hidden
              className="absolute left-0 top-1 bottom-1 w-px bg-white/10"
            >
              <motion.div
                className="absolute inset-x-0 top-0 h-full origin-top bg-deck-a shadow-[0_0_12px_var(--color-deck-a)]"
                style={{ scaleY: progress }}
              />
              {Array.from({ length: 21 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "absolute -left-1 h-px bg-white/15",
                    i % 10 === 0 ? "w-2.5" : "w-1.5"
                  )}
                  style={{ top: `${i * 5}%` }}
                />
              ))}
            </div>

            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <li key={step.title} className="py-5">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={isActive ? "step" : undefined}
                    className="group block w-full rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span
                      className={cn(
                        "font-mono text-xs tracking-widest transition-colors duration-300",
                        isActive ? "text-deck-a" : "text-muted-foreground/60"
                      )}
                    >
                      {pad(i + 1)} / {pad(steps.length)}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block text-2xl font-semibold tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground/50 group-hover:text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                    <span
                      className={cn(
                        "grid transition-all duration-500 ease-out",
                        isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-2 text-base leading-relaxed text-muted-foreground">
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-[8%] -inset-y-[12%] -z-10 rounded-[50%] bg-deck-a/40 opacity-40 blur-3xl"
            />
            <div
              className="relative overflow-hidden rounded-xl border border-white/10 bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-black/60"
              style={{ aspectRatio: "2560 / 1720" }}
            >
              {steps.map((step, i) => (
                <motion.div
                  key={step.image}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: i === active ? 1 : 0,
                    scale: reduceMotion || i === active ? 1 : 1.02,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
                  aria-hidden={i !== active}
                >
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    width={step.width}
                    height={step.height}
                    sizes="(min-width: 1280px) 820px, 66vw"
                    className="h-full w-full object-cover object-top"
                  />
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span>{steps[active].title}</span>
              <span className="flex gap-1.5" aria-hidden>
                {steps.map((step, i) => (
                  <span
                    key={step.title}
                    className={cn(
                      "h-1 w-6 rounded-full transition-colors duration-300",
                      i <= active ? "bg-deck-a" : "bg-white/10"
                    )}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile et tablette : liste empilée, sans scène collante.
function StackedTour() {
  return (
    <ol className="space-y-14 lg:hidden">
      {steps.map((step, i) => (
        <li key={step.title}>
          <p className="font-mono text-xs tracking-widest text-deck-a">
            {pad(i + 1)} / {pad(steps.length)}
          </p>
          <h4 className="mt-1 text-2xl font-semibold tracking-tight">
            {step.title}
          </h4>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {step.description}
          </p>
          <MacWindow
            src={step.image}
            alt={step.imageAlt}
            width={step.width}
            height={step.height}
            sizes="100vw"
            glow={i === 2 ? "b" : "a"}
            className="mt-6"
          />
        </li>
      ))}
    </ol>
  );
}

export function FeatureScroll() {
  const { eyebrow, title, description } = siteConfig.tour;
  return (
    <Section
      id="tour"
      title={eyebrow}
      subtitle={title}
      description={description}
      className="container mx-auto max-w-[var(--max-container-width)] px-4 sm:px-10"
    >
      <StackedTour />
      <StickyTour />
    </Section>
  );
}
