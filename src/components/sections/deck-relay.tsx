"use client";

import { Section } from "@/components/section";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { HeadphonesIcon, SlidersHorizontalIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const relay = siteConfig.deckRelay;
const TRACK_SECONDS = 182; // S.O.T.E dure 3:02
const START_SECONDS = 9;

const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// Forme d'onde décorative aux couleurs des bandes (graves rouges, médiums verts, aigus bleus).
function makeBars(count: number) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: count }, (_, i) => {
    const section = Math.sin(i / 9) * 0.25 + 0.65;
    const h = Math.max(0.12, Math.min(1, section * (0.55 + rand() * 0.6)));
    const r = rand();
    const color = r < 0.55 ? "#E5484D" : r < 0.82 ? "#46C46E" : "#3E8BFF";
    return { h, color };
  });
}

function useBars(count: number) {
  return useMemo(() => makeBars(count), [count]);
}

function Waveform({ progress }: { progress: number }) {
  const bars = useBars(120);
  const w = 600;
  const h = 48;
  const step = w / bars.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-12 w-full" aria-hidden>
      {bars.map((b, i) => {
        const played = i / bars.length < progress;
        const bh = b.h * h;
        return (
          <rect
            key={i}
            x={i * step + 0.6}
            y={(h - bh) / 2}
            width={step - 1.2}
            height={bh}
            rx="1"
            fill={b.color}
            opacity={played ? 0.95 : 0.3}
          />
        );
      })}
      <line x1={progress * w} x2={progress * w} y1="0" y2={h} stroke="#E6E9EB" strokeWidth="1.5" />
    </svg>
  );
}

export function DeckRelay() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [mix, setMix] = useState(false);
  const [auto, setAuto] = useState(true);
  const [elapsed, setElapsed] = useState(START_SECONDS);

  // Bascule automatique, douce, tant que l'utilisateur n'a pas cliqué.
  useEffect(() => {
    if (!auto || reduceMotion || !inView) return;
    const id = setInterval(() => setMix((m) => !m), 4500);
    return () => clearInterval(id);
  }, [auto, reduceMotion, inView]);

  // La lecture avance quel que soit le mode : c'est tout le propos.
  useEffect(() => {
    if (reduceMotion || !inView) return;
    const id = setInterval(
      () => setElapsed((s) => (s + 0.25 >= TRACK_SECONDS ? START_SECONDS : s + 0.25)),
      250
    );
    return () => clearInterval(id);
  }, [reduceMotion, inView]);

  const choose = (next: boolean) => {
    setAuto(false);
    setMix(next);
  };

  const shots = [relay.listen, relay.mix];
  const progress = elapsed / TRACK_SECONDS;

  return (
    <Section
      id="relay"
      title={relay.eyebrow}
      subtitle={relay.title}
      description={relay.description}
      className="container mx-auto max-w-[var(--max-container-width)] px-4 sm:px-10"
    >
      <div ref={ref} className="mx-auto max-w-5xl">
        {/* Interrupteur Listen ⇄ Mix */}
        <div className="flex justify-center">
          <div
            role="group"
            aria-label="View"
            className="relative grid grid-cols-2 rounded-full border border-white/10 bg-surface p-1"
          >
            <motion.span
              aria-hidden
              className={cn(
                "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full",
                mix ? "bg-deck-b/20 ring-1 ring-deck-b/50" : "bg-deck-a/20 ring-1 ring-deck-a/50"
              )}
              animate={{ x: mix ? "100%" : "0%" }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
            />
            {[false, true].map((value) => {
              const selected = mix === value;
              const Icon = value ? SlidersHorizontalIcon : HeadphonesIcon;
              return (
                <button
                  key={String(value)}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => choose(value)}
                  className={cn(
                    "relative z-10 flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-7",
                    selected ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                  {value ? relay.toggle.mix : relay.toggle.listen}
                </button>
              );
            })}
          </div>
        </div>

        {/* Les deux vues superposées */}
        <div className="relative mt-10">
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -inset-x-[8%] -inset-y-[12%] -z-10 rounded-[50%] opacity-40 blur-3xl transition-colors duration-700",
              mix ? "bg-deck-b/40" : "bg-deck-a/40"
            )}
          />
          <div
            className="relative overflow-hidden rounded-xl border border-white/10 bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-black/60"
            style={{ aspectRatio: "1.6" }}
          >
            {shots.map((shot, i) => {
              const visible = (i === 1) === mix;
              return (
                <motion.div
                  key={shot.image}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: visible ? 1 : 0,
                    scale: reduceMotion || visible ? 1 : 0.985,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeInOut" }}
                  aria-hidden={!visible}
                >
                  <Image
                    src={shot.image}
                    alt={shot.imageAlt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="h-full w-full object-cover object-top"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bande de transport : la lecture continue d'une vue à l'autre */}
        <div className="mt-8 rounded-xl border border-white/10 bg-surface p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="min-w-0 text-sm">
              <span className="font-semibold text-foreground">{relay.nowPlaying.title}</span>
              <span className="text-muted-foreground"> · {relay.nowPlaying.artist}</span>
              <span className="ml-2 font-mono text-xs tabular-nums text-muted-foreground">
                {relay.nowPlaying.bpm} BPM
              </span>
            </p>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 uppercase tracking-wider transition-colors duration-500",
                  mix ? "bg-deck-a/15 text-deck-a" : "bg-white/5 text-muted-foreground"
                )}
              >
                {mix ? `${relay.mix.label} · Deck A` : relay.listen.label}
              </span>
              <span className="tabular-nums text-foreground" aria-hidden>
                {formatTime(elapsed)}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <Waveform progress={progress} />
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex size-2" aria-hidden>
              {!reduceMotion && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-band-mid opacity-60" />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-band-mid" />
            </span>
            {relay.note}
          </p>
        </div>
      </div>
    </Section>
  );
}
