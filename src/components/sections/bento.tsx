"use client";

import { Section } from "@/components/section";
import { palette, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type BentoItem = (typeof siteConfig.bento)[number];
type Loop = { stop: () => void };

const round1 = (n: number) => Math.round(n * 10) / 10;

// Lance des animations en boucle seulement quand l'élément est visible ; hors écran
// ou avec le mouvement réduit, elles sont arrêtées et les valeurs gardent leur image fixe.
function useVisibleLoop(ref: RefObject<Element | null>, start: () => Loop[]) {
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !inView) return;
    const loops = start();
    return () => loops.forEach((l) => l.stop());
  }, [inView, reduce, start]);
}

export function BentoGrid() {
  const [waveform, streaming, dsd, harmonic] = siteConfig.bento;
  const { title, subtitle, description } = siteConfig.bentoSection;

  return (
    <Section
      id="bento"
      title={title}
      subtitle={subtitle}
      description={description}
      align="center"
      className="mx-auto max-w-screen-lg px-4 sm:px-6"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card index={0} className="md:col-span-2">
          <WaveformCard item={waveform} />
        </Card>
        <Card index={1}>
          <StreamingCard item={streaming} />
        </Card>
        <Card index={2}>
          <DsdCard item={dsd} />
        </Card>
        <Card index={3} className="md:col-span-2">
          <HarmonicCard item={harmonic} />
        </Card>
      </div>
    </Section>
  );
}

function Card({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, delay: (index % 2) * 0.08, ease: "easeOut" }}
      className={cn(
        "relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-surface",
        className
      )}
    >
      {/* Barre de vumètre : filet supérieur et numéro de voie. */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>CH {String(index + 1).padStart(2, "0")}</span>
        <span aria-hidden className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-deck-a shadow-[0_0_6px] shadow-deck-a" />
          <span className="size-1.5 rounded-full bg-white/10" />
        </span>
      </div>
      {children}
    </motion.article>
  );
}

function CardText({ item, className }: { item: BentoItem; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {item.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        {item.content}
      </p>
    </div>
  );
}

function Chips({ chips, colors }: { chips: string[]; colors?: string[] }) {
  if (!chips.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((chip, i) => (
        <li
          key={chip}
          className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-background/60 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground/80"
        >
          {colors?.[i] && (
            <span
              aria-hidden
              className="size-2 rounded-[2px]"
              style={{ backgroundColor: colors[i] }}
            />
          )}
          {chip}
        </li>
      ))}
    </ul>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · Forme d'onde couleur                                           */
/* ------------------------------------------------------------------ */

// Générateur pseudo-aléatoire déterministe : même rendu serveur et client.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const BARS = 180;
const BAR_W = 8;
const WAVE_H = 160;
const WAVE_C = WAVE_H / 2;

function makeWaveformBars() {
  const rand = seeded(7);
  return Array.from({ length: BARS }, (_, i) => {
    const t = i / BARS;
    const n = () => rand() * 0.18;
    let low = 0.15,
      mid = 0.25,
      high = 0.15;
    if (t < 0.12) {
      mid = 0.22 + n();
      high = 0.18 + n();
      low = 0.08 + n() * 0.5;
    } else if (t < 0.3) {
      low = i % 8 < 2 ? 0.8 : 0.3 + n();
      mid = 0.35 + t + n();
      high = 0.25 + n();
    } else if (t < 0.4) {
      low = 0.1 + n() * 0.4;
      mid = 0.45 + n();
      high = 0.5 + n();
    } else if (t < 0.82) {
      low = i % 8 < 2 ? 0.95 : 0.35 + n();
      mid = 0.55 + n();
      high = i % 2 === 0 ? 0.45 + n() : 0.3 + n();
    } else {
      const fade = 1 - (t - 0.82) / 0.18;
      low = (i % 8 < 2 ? 0.6 : 0.2) * fade + n() * 0.3;
      mid = 0.45 * fade + n() * 0.5;
      high = 0.3 * fade + n() * 0.4;
    }
    return { low: Math.min(low, 1), mid: Math.min(mid, 0.85), high: Math.min(high, 0.7) };
  });
}

// Couleur d'une barre : teinte interpolée rouge → vert → bleu selon l'énergie de chaque bande, comme dans l'app.
function barColor(weights: number[], light: number) {
  const [low, mid, high] = weights;
  const sum = low + mid + high || 1;
  const hue = (mid * 128 + high * 214) / sum;
  return `hsl(${Math.round(hue)} 78% ${light}%)`;
}

// SVG statique (360 rectangles), rendu deux fois : on le construit une seule fois.
const WAVEFORM_SVG = (
  <svg
    viewBox={`0 0 ${BARS * BAR_W} ${WAVE_H}`}
    preserveAspectRatio="none"
    className="absolute inset-0 h-full w-full"
    aria-hidden
  >
    {makeWaveformBars().map((b, i) => {
      // Les graves dominent la couleur sur les temps forts, comme une grosse caisse.
      const weights = [b.low ** 4 * 8, b.mid ** 2, b.high ** 2 * 0.8];
      const amp = Math.max(b.low, b.mid * 0.9, b.high * 0.8);
      const core = amp * 0.55;
      return (
        <g key={i}>
          <rect
            x={i * BAR_W}
            y={round1(WAVE_C - amp * WAVE_C)}
            width={BAR_W - 1.5}
            height={round1(amp * WAVE_H)}
            fill={barColor(weights, 50)}
            opacity={0.8}
          />
          <rect
            x={i * BAR_W}
            y={round1(WAVE_C - core * WAVE_C)}
            width={BAR_W - 1.5}
            height={round1(core * WAVE_H)}
            fill={barColor(weights, 72)}
          />
        </g>
      );
    })}
  </svg>
);

function WaveformCard({ item }: { item: BentoItem }) {
  const ref = useRef<HTMLDivElement>(null);
  // Position de la tête de lecture (0 → 1) ; 38 % en image fixe.
  const progress = useMotionValue(0.38);
  const clipPath = useTransform(progress, (v) => `inset(0% ${round1((1 - v) * 100)}% 0% 0%)`);
  const headX = useTransform(progress, (v) => `${round1(v * 100)}%`);

  useVisibleLoop(
    ref,
    useCallback(
      () => [animate(progress, [0, 1], { duration: 16, ease: "linear", repeat: Infinity })],
      [progress]
    )
  );

  return (
    <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-center">
      <div className="space-y-5">
        <CardText item={item} />
        <Chips chips={item.chips} colors={[palette.low, palette.mid, palette.high]} />
      </div>

      <div
        ref={ref}
        className="relative h-36 overflow-hidden rounded-lg bg-background ring-1 ring-white/[0.06] sm:h-44"
      >
        {/* Partie non lue, atténuée. */}
        <div className="absolute inset-0 opacity-35 saturate-50">{WAVEFORM_SVG}</div>
        {/* Partie lue, révélée par la tête de lecture. */}
        <motion.div className="absolute inset-0" style={{ clipPath }}>
          {WAVEFORM_SVG}
        </motion.div>
        {/* La tête de lecture glisse en transform (pas de recalcul de mise en page). */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ x: headX }}>
          <div className="absolute inset-y-0 left-0 w-px bg-foreground shadow-[0_0_8px_rgba(230,233,235,0.8)]" />
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/10" />
      </div>

      <figure className="space-y-2 md:col-span-2">
        <div className="overflow-hidden rounded-lg ring-1 ring-white/[0.06]">
          {item.imageSrc && (
            <Image
              src={item.imageSrc}
              alt={item.imageAlt ?? ""}
              quality={85}
              placeholder="blur"
              sizes="(min-width: 1024px) 920px, calc(100vw - 4rem)"
              className="block h-auto w-full"
            />
          )}
        </div>
        <figcaption>
          <Note>{item.note}</Note>
        </figcaption>
      </figure>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · Streaming DLNA / OpenHome                                      */
/* ------------------------------------------------------------------ */

const PACKETS = [0, 1, 2, 3];
const PACKET_CYCLE = 2.4; // secondes pour traverser la liaison
const PACKET_GAP = 0.6; // décalage entre deux paquets
const PACKET_STILL = 2.1; // horloge de l'image fixe : quatre paquets répartis sur la liaison

// Un paquet suit l'horloge commune avec son propre décalage de phase.
function Packet({ clock, index }: { clock: MotionValue<number>; index: number }) {
  const phase = useTransform(clock, (c) => {
    const p = ((c - index * PACKET_GAP) / PACKET_CYCLE) % 1;
    return p < 0 ? p + 1 : p;
  });
  const x = useTransform(phase, (p) => 104 + p * 122);
  const opacity = useTransform(phase, [0, 1 / 3, 2 / 3, 1], [0, 1, 1, 0]);
  return <motion.rect y="53" width="10" height="6" rx="1.5" fill={palette.deckA} style={{ x, opacity }} />;
}

function StreamDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const clock = useMotionValue(PACKET_STILL);

  useVisibleLoop(
    ref,
    useCallback(
      () => [
        animate(clock, [PACKET_STILL, PACKET_STILL + PACKET_CYCLE], {
          duration: PACKET_CYCLE,
          ease: "linear",
          repeat: Infinity,
        }),
      ],
      [clock]
    )
  );

  return (
    <svg ref={ref} viewBox="0 0 360 120" className="h-auto w-full" role="img" aria-label="Mac sending a file to a network streamer">
      {/* Mac portable */}
      <rect x="12" y="28" width="78" height="50" rx="4" fill={palette.raised} stroke="rgba(255,255,255,0.12)" />
      <rect x="18" y="34" width="66" height="38" rx="1.5" fill={palette.bg} />
      <rect x="24" y="40" width="36" height="3" rx="1" fill={palette.deckA} opacity="0.9" />
      <rect x="24" y="47" width="50" height="2" rx="1" fill={palette.textMuted} opacity="0.4" />
      <rect x="24" y="52" width="44" height="2" rx="1" fill={palette.textMuted} opacity="0.4" />
      <rect x="24" y="57" width="48" height="2" rx="1" fill={palette.textMuted} opacity="0.4" />
      <path d="M4 80 h94 l-6 6 h-82 z" fill={palette.raised} stroke="rgba(255,255,255,0.12)" />
      <text x="51" y="104" textAnchor="middle" className="font-mono" fontSize="9" fill={palette.textMuted} letterSpacing="1.5">
        MAC
      </text>

      {/* Liaison réseau */}
      <line x1="104" y1="56" x2="236" y2="56" stroke="rgba(255,255,255,0.14)" strokeDasharray="2 4" />
      {PACKETS.map((p) => (
        <Packet key={p} clock={clock} index={p} />
      ))}
      <text x="170" y="44" textAnchor="middle" className="font-mono" fontSize="8.5" fill={palette.textMuted} letterSpacing="1">
        FILE · AS IS
      </text>

      {/* Streamer réseau */}
      <rect x="242" y="38" width="108" height="38" rx="4" fill={palette.raised} stroke="rgba(255,255,255,0.12)" />
      <rect x="250" y="46" width="62" height="22" rx="2" fill="#0B0D0E" />
      <text x="281" y="61" textAnchor="middle" className="font-mono" fontSize="9" fill={palette.deckA}>
        24/192 FLAC
      </text>
      <circle cx="333" cy="57" r="9" fill={palette.surface} stroke="rgba(255,255,255,0.18)" />
      <line x1="333" y1="57" x2="333" y2="50" stroke={palette.text} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="250" y="80" width="6" height="4" fill="#0B0D0E" />
      <rect x="336" y="80" width="6" height="4" fill="#0B0D0E" />
      <text x="296" y="104" textAnchor="middle" className="font-mono" fontSize="9" fill={palette.textMuted} letterSpacing="1.5">
        STREAMER
      </text>
    </svg>
  );
}

function StreamingCard({ item }: { item: BentoItem }) {
  return (
    <div className="flex flex-1 flex-col gap-5 p-5 sm:p-7">
      <CardText item={item} />
      <div className="rounded-lg bg-background/60 px-3 py-4 ring-1 ring-white/[0.06]">
        <StreamDiagram />
      </div>
      <Chips chips={item.chips} />
      <figure className="mt-auto space-y-2">
        <div className="relative h-32 overflow-hidden rounded-lg ring-1 ring-white/[0.06]">
          {item.imageSrc && (
            <Image
              src={item.imageSrc}
              alt={item.imageAlt ?? ""}
              fill
              quality={85}
              placeholder="blur"
              sizes="(min-width: 1024px) 430px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "0% 90%" }}
            />
          )}
        </div>
        <figcaption>
          <Note>{item.note}</Note>
        </figcaption>
      </figure>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · DSD : modulation 1 bit                                         */
/* ------------------------------------------------------------------ */

const PDM_PER_PERIOD = 48;
const PDM_STEP = 4; // largeur d'un échantillon : une période = 192 unités, deux périodes visibles

// Modulateur sigma-delta du premier ordre sur une sinusoïde ; on jette la première période (régime transitoire).
function makePdm() {
  const total = PDM_PER_PERIOD * 4;
  let acc = 0;
  let prev = 0;
  const bits: number[] = [];
  for (let i = 0; i < total; i++) {
    const x = 0.82 * Math.sin((2 * Math.PI * i) / PDM_PER_PERIOD);
    acc += x - prev;
    const y = acc >= 0 ? 1 : -1;
    prev = y;
    bits.push(y > 0 ? 1 : 0);
  }
  return bits.slice(PDM_PER_PERIOD);
}

const PDM_PERIOD = PDM_PER_PERIOD * PDM_STEP;
const PDM_SINE = Array.from({ length: PDM_PER_PERIOD * 3 + 1 }, (_, i) => {
  const x = i * PDM_STEP;
  const y = 32 - 22 * Math.sin((2 * Math.PI * i) / PDM_PER_PERIOD);
  return `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`;
}).join(" ");

// Signal statique (sinusoïde + 144 impulsions) : seul le groupe qui le contient défile.
const PDM_SIGNAL = (
  <>
    <path d={PDM_SINE} fill="none" stroke={palette.textMuted} strokeWidth="1.5" opacity="0.7" />
    {makePdm().map((b, i) =>
      b ? (
        <rect key={i} x={round1(i * PDM_STEP + 0.6)} y={70} width={PDM_STEP - 1.2} height={40} rx={0.6} fill={palette.deckA} />
      ) : (
        <rect key={i} x={round1(i * PDM_STEP + 0.6)} y={108} width={PDM_STEP - 1.2} height={2} fill={palette.textMuted} opacity={0.5} />
      )
    )}
  </>
);

function DsdVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const x = useMotionValue(0);

  useVisibleLoop(
    ref,
    useCallback(
      () => [animate(x, [0, -PDM_PERIOD], { duration: 7, ease: "linear", repeat: Infinity })],
      [x]
    )
  );

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${PDM_PERIOD * 2} 132`}
      className="h-auto w-full"
      role="img"
      aria-label="An analog sine wave above its 1-bit pulse-density stream"
    >
      <motion.g style={{ x }}>{PDM_SIGNAL}</motion.g>
      <text x="0" y="128" className="font-mono" fontSize="9" fill={palette.textMuted} letterSpacing="1.5">
        1-BIT · PULSE DENSITY
      </text>
    </svg>
  );
}

const DSD_RATES = [
  ["DSD64", "2.8224 MHz"],
  ["DSD128", "5.6448 MHz"],
  ["DSD256", "11.2896 MHz"],
] as const;

function DsdCard({ item }: { item: BentoItem }) {
  return (
    <div className="flex flex-1 flex-col gap-5 p-5 sm:p-7">
      <CardText item={item} />
      <div className="overflow-hidden rounded-lg bg-background/60 px-3 pb-2 pt-4 ring-1 ring-white/[0.06]">
        <DsdVisual />
      </div>
      <Chips chips={item.chips} />
      <dl className="mt-auto divide-y divide-white/[0.06] rounded-lg ring-1 ring-white/[0.06]">
        {DSD_RATES.map(([name, rate]) => (
          <div key={name} className="flex items-center justify-between px-3 py-2 font-mono text-xs">
            <dt className="text-muted-foreground">{name}</dt>
            <dd className="tabular-nums text-foreground">{rate}</dd>
          </div>
        ))}
      </dl>
      <Note>{item.note}</Note>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · Roue de Camelot                                                */
/* ------------------------------------------------------------------ */

const KEYS: Record<string, string> = {
  "1A": "A♭ minor", "1B": "B major",
  "2A": "E♭ minor", "2B": "F♯ major",
  "3A": "B♭ minor", "3B": "D♭ major",
  "4A": "F minor", "4B": "A♭ major",
  "5A": "C minor", "5B": "E♭ major",
  "6A": "G minor", "6B": "B♭ major",
  "7A": "D minor", "7B": "F major",
  "8A": "A minor", "8B": "C major",
  "9A": "E minor", "9B": "G major",
  "10A": "B minor", "10B": "D major",
  "11A": "F♯ minor", "11B": "A major",
  "12A": "D♭ minor", "12B": "E major",
};

type Camelot = { n: number; ring: "A" | "B" };
const code = (k: Camelot) => `${k.n}${k.ring}`;
const wrap = (n: number) => ((n + 11) % 12) + 1;

function compatible(k: Camelot) {
  return [
    { key: k, relation: "Same key" },
    { key: { n: wrap(k.n - 1), ring: k.ring }, relation: "One step down" },
    { key: { n: wrap(k.n + 1), ring: k.ring }, relation: "One step up" },
    {
      key: { n: k.n, ring: k.ring === "A" ? "B" : "A" } as Camelot,
      relation: k.ring === "A" ? "Relative major" : "Relative minor",
    },
  ];
}

// Teintes proches de la roue de l'app : 1 vert d'eau, 5 olive, 7 brique, 9 violet, 11 indigo.
const hue = (n: number) => (170 - (n - 1) * 30 + 360) % 360;

function sector(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const p = (r: number, a: number) => {
    const rad = (a * Math.PI) / 180;
    return `${round1(cx + r * Math.cos(rad))} ${round1(cy + r * Math.sin(rad))}`;
  };
  return `M${p(r1, a0)} A${r1} ${r1} 0 0 1 ${p(r1, a1)} L${p(r0, a1)} A${r0} ${r0} 0 0 0 ${p(r0, a0)} Z`;
}

const WHEEL_C = 160;
const RINGS = { A: [104, 154], B: [58, 104] } as const;

// Géométrie des 24 secteurs, indépendante de la sélection : calculée une fois.
const SEGMENTS = (["A", "B"] as const).flatMap((ring) =>
  Array.from({ length: 12 }, (_, i) => {
    const key: Camelot = { n: i + 1, ring };
    const mid = -90 + i * 30;
    const [r0, r1] = RINGS[ring];
    const rad = (mid * Math.PI) / 180;
    const lr = (r0 + r1) / 2;
    return {
      key,
      id: code(key),
      d: sector(WHEEL_C, WHEEL_C, r0, r1, mid - 15, mid + 15),
      labelX: round1(WHEEL_C + lr * Math.cos(rad)),
      labelY: round1(WHEEL_C + lr * Math.sin(rad)),
      hue: hue(key.n),
    };
  })
);

function CamelotWheel({
  selected,
  onSelect,
}: {
  selected: Camelot;
  onSelect: (k: Camelot) => void;
}) {
  const [hover, setHover] = useState<Camelot | null>(null);
  const active = hover ?? selected;
  const activeId = code(active);
  const selectedId = code(selected);
  const matches = new Set(compatible(active).map((c) => code(c.key)));
  const C = WHEEL_C;

  return (
    <svg
      viewBox="0 0 320 320"
      className="mx-auto h-auto w-full max-w-[340px]"
      role="group"
      aria-label="Camelot wheel"
      onMouseLeave={() => setHover(null)}
    >
      {SEGMENTS.map(({ key: k, id, d, labelX, labelY, hue: h }) => {
        const ring = k.ring;
        const isActive = id === activeId;
        const isMatch = matches.has(id);
        const fill = isActive
          ? palette.deckA
          : `hsl(${h} ${ring === "A" ? 32 : 26}% ${isMatch ? (ring === "A" ? 40 : 34) : ring === "A" ? 24 : 19}%)`;
        return (
          <g
            key={id}
            role="button"
            tabIndex={0}
            aria-pressed={id === selectedId}
            aria-label={`${id}, ${KEYS[id]}`}
            className="cursor-pointer outline-none [&:focus-visible>path]:stroke-foreground"
            onMouseEnter={() => setHover(k)}
            onFocus={() => setHover(k)}
            onBlur={() => setHover(null)}
            onClick={() => onSelect(k)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(k);
              }
            }}
          >
            <path
              d={d}
              fill={fill}
              stroke={isMatch ? palette.deckA : palette.bg}
              strokeWidth={isMatch && !isActive ? 1.5 : 2}
              opacity={isMatch ? 1 : 0.55}
              style={{ transition: "fill 200ms, opacity 200ms" }}
            />
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="central"
              className="pointer-events-none select-none font-mono"
              fontSize={ring === "A" ? 12 : 10.5}
              fontWeight={isActive ? 700 : 500}
              fill={isActive ? palette.bg : isMatch ? palette.text : palette.textMuted}
            >
              {id}
            </text>
          </g>
        );
      })}
      <circle cx={C} cy={C} r={54} fill={palette.bg} stroke="rgba(255,255,255,0.08)" />
      <text x={C} y={C - 8} textAnchor="middle" className="font-mono" fontSize="22" fontWeight="600" fill={palette.text}>
        {activeId}
      </text>
      <text x={C} y={C + 14} textAnchor="middle" fontSize="10" fill={palette.textMuted}>
        {KEYS[activeId]}
      </text>
    </svg>
  );
}

function HarmonicCard({ item }: { item: BentoItem }) {
  const [selected, setSelected] = useState<Camelot>({ n: 8, ring: "A" });
  const list = compatible(selected);

  return (
    <div className="grid gap-8 p-5 sm:p-7 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center">
      <CamelotWheel selected={selected} onSelect={setSelected} />

      <div className="min-w-0 space-y-6">
        <CardText item={item} />
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Mixes with {code(selected)}
          </p>
          <ul className="grid grid-cols-2 gap-2" aria-live="polite">
            {list.map(({ key, relation }) => (
              <li
                key={relation}
                className="rounded-lg bg-background/60 px-3 py-2 ring-1 ring-white/[0.06]"
              >
                <span className="block font-mono text-base font-semibold text-foreground">
                  {code(key)}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {KEYS[code(key)]}
                  </span>
                </span>
                <span className="text-xs text-deck-a">{relation}</span>
              </li>
            ))}
          </ul>
        </div>
        <Note>{item.note}</Note>
        {/* Roue de l'app, recadrée en WebP dans la capture Harmonic Mix. */}
        <div className="overflow-hidden rounded-lg ring-1 ring-white/[0.06]">
          {item.imageSrc && (
            <Image
              src={item.imageSrc}
              alt={item.imageAlt ?? ""}
              quality={85}
              placeholder="blur"
              sizes="(min-width: 1024px) 484px, (min-width: 768px) 55vw, calc(100vw - 4rem)"
              className="block h-auto w-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}
