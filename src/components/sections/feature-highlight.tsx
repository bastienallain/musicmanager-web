"use client";

import { MacWindow } from "@/components/mac-window";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Highlight = (typeof siteConfig.featureHighlight)[number];
type Spec = { label: string; value: string; unit: string };
type Stat = { value: string; label: string };
type TagFix = NonNullable<Highlight["tagFix"]>;

const LED_COLOR = [
  "bg-deck-a shadow-[0_0_8px_#4A8DFF]",
  "bg-[#E8B04A] shadow-[0_0_8px_#E8B04A]",
  "bg-deck-b shadow-[0_0_8px_#D08B6C]",
];
const SCREWS = ["left-2 top-2", "right-2 top-2", "left-2 bottom-2", "right-2 bottom-2"];
const DB_TICKS = [0, -20, -40, -60, -80, -100, -120, -140, -160];
const dbX = (db: number) => Math.round((8 + (-db / 160) * 284) * 10) / 10;
const NOISE_X = dbX(-141);

// Échelle en dB du panneau hi-fi : 0 à −160 dB, repère sur le bruit du rééchantillonneur.
// Entièrement statique : rendue une seule fois au chargement du module.
const NOISE_FLOOR_SCALE = (
  <svg viewBox="0 0 300 46" className="w-full" role="img" aria-label="Resampler noise at −141 dB on a 0 to −160 dB scale">
    <rect x="8" y="10" width="284" height="6" rx="3" fill="#24282C" />
    <defs>
      <linearGradient id="nf-fill" x1="0" x2="1">
        <stop offset="0" stopColor="#4A8DFF" stopOpacity="0.9" />
        <stop offset="1" stopColor="#4A8DFF" stopOpacity="0.15" />
      </linearGradient>
    </defs>
    <rect x="8" y="10" width={NOISE_X - 8} height="6" rx="3" fill="url(#nf-fill)" />
    <line x1={NOISE_X} x2={NOISE_X} y1="4" y2="22" stroke="#4A8DFF" strokeWidth="1.5" />
    {DB_TICKS.map((t) => (
      <g key={t}>
        <line x1={dbX(t)} x2={dbX(t)} y1="20" y2={t % 40 === 0 ? 27 : 24} stroke="#8A94A0" strokeOpacity="0.5" />
        {t % 40 === 0 && (
          <text x={dbX(t)} y="40" textAnchor="middle" fontSize="8" fill="#8A94A0" className="font-mono">
            {t === 0 ? "0" : `−${-t}`}
          </text>
        )}
      </g>
    ))}
  </svg>
);

// Façade de DAC : témoins de mode et specs en chiffres.
function SpecPanel({ specs, modes }: { specs: Spec[]; modes: string[] }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [mode, setMode] = useState(0);

  // Cycle des témoins, suspendu hors écran.
  useEffect(() => {
    if (reduceMotion || !inView) return;
    const id = setInterval(() => setMode((m) => (m + 1) % modes.length), 2800);
    return () => clearInterval(id);
  }, [modes.length, reduceMotion, inView]);

  return (
    <div ref={ref} className="relative mt-8 rounded-xl border border-white/10 bg-gradient-to-b from-raised to-surface p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      {/* vis de façade */}
      {SCREWS.map((p) => (
        <span key={p} aria-hidden className={cn("absolute size-1.5 rounded-full bg-white/10", p)} />
      ))}

      <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Output modes shown by the app">
        {modes.map((m, i) => (
          <li key={m} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
            <span
              aria-hidden
              className={cn(
                "size-1.5 rounded-full transition-all duration-500",
                i === mode
                  ? LED_COLOR[i % LED_COLOR.length]
                  : "bg-white/15"
              )}
            />
            <span className={cn("transition-colors duration-500", i === mode ? "text-foreground" : "text-muted-foreground")}>
              {m}
            </span>
          </li>
        ))}
      </ul>

      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/5">
        {specs.map((s) => (
          <div key={s.label} className="bg-surface/90 p-3">
            <dt className="text-[11px] leading-tight text-muted-foreground">{s.label}</dt>
            <dd className="mt-1.5 font-mono tabular-nums">
              <span className="text-lg text-foreground sm:text-xl">{s.value}</span>{" "}
              <span className="text-[11px] text-deck-a">{s.unit}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4">
        {NOISE_FLOOR_SCALE}
      </div>
    </div>
  );
}

// Rangée de chiffres du DJ Mixer, alternance platine A / platine B.
function DeckStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="mt-8">
      <div aria-hidden className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest">
        <span className="text-deck-a">Deck A</span>
        <span className="relative h-px flex-1 bg-gradient-to-r from-deck-a via-white/20 to-deck-b">
          <span className="absolute left-1/2 top-1/2 h-3 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-foreground" />
        </span>
        <span className="text-deck-b">Deck B</span>
      </div>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex flex-col-reverse rounded-lg border border-white/10 border-t-2 bg-surface p-3",
              i % 2 === 0 ? "border-t-deck-a" : "border-t-deck-b"
            )}
          >
            <dt className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dt>
            <dd className={cn("font-mono text-xl tabular-nums", i % 2 === 0 ? "text-deck-a" : "text-deck-b")}>
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// Carte avant / après : tags tirés d'un nom de fichier → tags MusicBrainz propres.
function TagFixCard({ tagFix }: { tagFix: TagFix }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [fixed, setFixed] = useState(false);
  const [auto, setAuto] = useState(true);

  // Bascule automatique, suspendue hors écran et dès que l'utilisateur a cliqué.
  useEffect(() => {
    if (reduceMotion || !auto || !inView) return;
    const id = setInterval(() => setFixed((f) => !f), 3200);
    return () => clearInterval(id);
  }, [reduceMotion, auto, inView]);

  const state = fixed ? tagFix.after : tagFix.before;
  const toggle = () => {
    setAuto(false);
    setFixed((f) => !f);
  };

  return (
    <div ref={ref} className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 bg-raised/60 px-4 py-2.5">
        <span className="min-w-0 truncate font-mono text-[11px] text-muted-foreground">
          {tagFix.before.file}
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={fixed}
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground transition-colors hover:border-deck-a/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className={fixed ? "text-muted-foreground" : "text-deck-b"}>{tagFix.before.label}</span>
          <ArrowRightIcon className="size-3 text-muted-foreground" aria-hidden />
          <span className={fixed ? "text-deck-a" : "text-muted-foreground"}>{tagFix.after.label}</span>
        </button>
      </div>

      <dl className="divide-y divide-white/5 px-4" aria-live={auto ? "off" : "polite"}>
        {state.fields.map((f, i) => (
          <div key={f.name} className="flex items-baseline gap-4 py-2.5">
            <dt className="w-14 shrink-0 text-xs text-muted-foreground">{f.name}</dt>
            <dd className="relative min-w-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={f.value}
                  initial={reduceMotion ? false : { opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, delay: reduceMotion ? 0 : i * 0.08 }}
                  className={cn(
                    "block truncate text-sm",
                    fixed ? "font-medium text-foreground" : "font-mono text-deck-b/90"
                  )}
                >
                  {f.value}
                </motion.span>
              </AnimatePresence>
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex min-h-12 flex-wrap items-center gap-2 border-t border-white/5 px-4 py-3">
        {fixed ? (
          <>
            <span className="inline-flex items-center gap-1 rounded-md bg-deck-a/15 px-2 py-0.5 font-mono text-xs text-deck-a">
              <CheckIcon className="size-3" aria-hidden />
              {tagFix.after.source}
            </span>
            <span className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-xs tabular-nums text-foreground">
              {tagFix.after.bpm} BPM
            </span>
            <span className="rounded-md bg-band-mid/15 px-2 py-0.5 font-mono text-xs text-band-mid">
              {tagFix.after.key}
            </span>
          </>
        ) : (
          <>
            <span className="rounded-md border border-dashed border-white/15 px-2 py-0.5 font-mono text-xs text-muted-foreground">
              — BPM
            </span>
            <span className="rounded-md border border-dashed border-white/15 px-2 py-0.5 font-mono text-xs text-muted-foreground">
              — key
            </span>
          </>
        )}
      </div>
    </div>
  );
}

function HighlightRow({ feature }: { feature: Highlight }) {
  const reduceMotion = useReducedMotion();
  const textFirst = feature.direction === "ltr";
  const isDj = feature.id === "dj";

  return (
    <section
      id={feature.id}
      aria-labelledby={`${feature.id}-title`}
      className="scroll-mt-20 py-16 sm:py-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <motion.div
          className={cn("lg:col-span-5", textFirst ? "lg:order-1" : "lg:order-2")}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
        >
          <p
            className={cn(
              "font-mono text-xs font-semibold uppercase tracking-wider",
              isDj ? "text-deck-b" : "text-primary"
            )}
          >
            {feature.eyebrow}
          </p>
          <h3
            id={`${feature.id}-title`}
            className="mt-3 text-balance text-4xl font-bold leading-[1.1] tracking-tighter sm:text-5xl"
          >
            {feature.title}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
            {feature.description}
          </p>
          {feature.specs && feature.modes && (
            <SpecPanel specs={feature.specs} modes={feature.modes} />
          )}
          {feature.stats && <DeckStats stats={feature.stats} />}
          {feature.tagFix && <TagFixCard tagFix={feature.tagFix} />}
        </motion.div>

        <motion.div
          className={cn("lg:col-span-7", textFirst ? "lg:order-2" : "lg:order-1")}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <MacWindow
            src={feature.imageSrc}
            alt={feature.imageAlt}
            width={feature.imageWidth}
            height={feature.imageHeight}
            glow={isDj ? "b" : "a"}
            sizes="(min-width: 1280px) 630px, (min-width: 1024px) 52vw, 100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}

export function FeatureHighlight() {
  return (
    <div className="container mx-auto max-w-[var(--max-container-width)] px-4 sm:px-10">
      {siteConfig.featureHighlight.map((feature) => (
        <HighlightRow key={feature.id} feature={feature} />
      ))}
    </div>
  );
}
