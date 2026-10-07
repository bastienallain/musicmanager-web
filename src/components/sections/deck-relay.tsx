"use client";

import { Section } from "@/components/section";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { HeadphonesIcon, SlidersHorizontalIcon } from "lucide-react";
import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";

const relay = siteConfig.deckRelay;
const TRACK_SECONDS = 150; // Nuit Blanche (démo) dure 2:30
const START_SECONDS = 48;

const formatTime = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// Forme d'onde décorative aux couleurs des bandes (graves rouges, médiums verts, aigus bleus).
// Coordonnées arrondies au dixième : Math.sin peut différer au dernier bit entre moteurs JS,
// ce qui ferait diverger les attributs SVG entre le rendu serveur et l'hydratation.
const WAVE_W = 600;
const WAVE_H = 48;
const BAR_COUNT = 120;
const BAR_STEP = WAVE_W / BAR_COUNT;
const round1 = (n: number) => Math.round(n * 10) / 10;

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
    const bh = round1(h * WAVE_H);
    return { x: round1(i * BAR_STEP + 0.6), y: round1((WAVE_H - bh) / 2), h: bh, color };
  });
}

const BARS = makeBars(BAR_COUNT);

// Ne se redessine que lorsqu'une barre de plus est lue (environ une fois par seconde).
const WaveformBars = memo(function WaveformBars({ played }: { played: number }) {
  return BARS.map((b, i) => (
    <rect
      key={b.x}
      x={b.x}
      y={b.y}
      width={BAR_STEP - 1.2}
      height={b.h}
      rx="1"
      fill={b.color}
      opacity={i < played ? 0.95 : 0.3}
    />
  ));
});

function Waveform({ progress }: { progress: number }) {
  const x = round1(progress * WAVE_W);
  return (
    <svg viewBox={`0 0 ${WAVE_W} ${WAVE_H}`} preserveAspectRatio="none" className="h-12 w-full" aria-hidden>
      <WaveformBars played={Math.ceil(progress * BAR_COUNT)} />
      <line x1={x} x2={x} y1="0" y2={WAVE_H} stroke="#E6E9EB" strokeWidth="1.5" />
    </svg>
  );
}

// Bande de transport : seul composant qui suit le temps de lecture, pour ne pas
// redessiner les captures et l'interrupteur à chaque tic.
function Transport({ mix, active }: { mix: boolean; active: boolean }) {
  const [elapsed, setElapsed] = useState(START_SECONDS);

  // La lecture avance quel que soit le mode : c'est tout le propos.
  useEffect(() => {
    if (!active) return;
    const id = setInterval(
      () => setElapsed((s) => (s + 0.25 >= TRACK_SECONDS ? START_SECONDS : s + 0.25)),
      250
    );
    return () => clearInterval(id);
  }, [active]);

  return (
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
        <Waveform progress={elapsed / TRACK_SECONDS} />
      </div>
      <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="relative flex size-2" aria-hidden>
          <span className="absolute inline-flex size-full rounded-full bg-band-mid opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex size-2 rounded-full bg-band-mid" />
        </span>
        {relay.note}
      </p>
    </div>
  );
}

const SHOTS = [relay.listen, relay.mix];

export function DeckRelay() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const [mix, setMix] = useState(false);
  const [auto, setAuto] = useState(true);

  // Bascule automatique, douce, tant que l'utilisateur n'a pas cliqué.
  useEffect(() => {
    if (!auto || reduceMotion || !inView) return;
    const id = setInterval(() => setMix((m) => !m), 4500);
    return () => clearInterval(id);
  }, [auto, reduceMotion, inView]);

  const choose = (next: boolean) => {
    setAuto(false);
    setMix(next);
  };

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
            style={{ aspectRatio: "2560 / 1720" }}
          >
            {SHOTS.map((shot, i) => {
              const visible = (i === 1) === mix;
              return (
                <motion.div
                  key={shot.image}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: visible ? 1 : 0,
                    scale: visible ? 1 : 0.985,
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
        <Transport mix={mix} active={inView && !reduceMotion} />
      </div>
    </Section>
  );
}
