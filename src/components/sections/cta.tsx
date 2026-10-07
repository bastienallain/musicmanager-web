"use client";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const BARS = 120;
const VIEW_W = 1200;
const VIEW_H = 300;
const MID_Y = VIEW_H / 2;
const METER_SEGMENTS = 20;

// PRNG déterministe : même forme d'onde au rendu serveur et client.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Enveloppe d'un morceau : intro, montée, drop, break, second drop, outro.
function envelope(t: number) {
  if (t < 0.12) return 0.25 + t * 2;
  if (t < 0.3) return 0.5 + (t - 0.12) * 1.4;
  if (t < 0.52) return 0.95;
  if (t < 0.62) return 0.35;
  if (t < 0.88) return 1;
  return Math.max(0.2, 1 - (t - 0.88) * 6);
}

const round = (n: number) => Math.round(n * 10) / 10;

const waveform = (() => {
  const rand = mulberry32(7);
  const step = VIEW_W / BARS;
  return Array.from({ length: BARS }, (_, i) => {
    const env = envelope(i / BARS);
    const low = env * (0.55 + 0.45 * rand()) * (MID_Y - 16);
    const mid = low * (0.5 + 0.35 * rand());
    const high = mid * (0.45 + 0.4 * rand());
    return {
      x: round(i * step + 1.5),
      w: round(step - 3),
      low: round(low),
      mid: round(mid),
      high: round(high),
    };
  });
})();

const meterColor = (i: number) =>
  i >= METER_SEGMENTS - 2
    ? "bg-band-low"
    : i >= METER_SEGMENTS - 6
    ? "bg-deck-b"
    : "bg-band-mid";

const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export function CTA() {
  const copy = siteConfig.ctaSection;
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const energy = useRef(0);
  const frame = useRef<number | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [platforms, setPlatforms] = useState<string[]>(["macos"]);

  const togglePlatform = (id: string) => {
    setPlatforms((current) =>
      current.includes(id)
        ? current.filter((p) => p !== id)
        : [...current, id]
    );
    if (error) setError(null);
  };

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  // Chaque frappe injecte un peu de niveau, qui retombe comme un VU-mètre.
  const tick = () => {
    const panel = panelRef.current;
    if (!panel) return;
    energy.current *= 0.93;
    if (energy.current < 0.005) energy.current = 0;
    panel.style.setProperty("--lvl", String(energy.current * METER_SEGMENTS));
    panel.style.setProperty(
      "--amp",
      String(reduceMotion ? 1 : 0.78 + energy.current * 0.32)
    );
    frame.current =
      energy.current > 0 ? requestAnimationFrame(tick) : null;
  };

  const bump = () => {
    energy.current = Math.min(1, energy.current + 0.3);
    if (frame.current === null) frame.current = requestAnimationFrame(tick);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEmail(email)) {
      setError(copy.invalid);
      return;
    }
    if (platforms.length === 0) {
      setError(copy.noPlatform);
      return;
    }
    // TODO: brancher la liste d'attente (email + plateformes choisies)
    setError(null);
    setSubmitted(true);
    energy.current = 1;
    if (frame.current === null) frame.current = requestAnimationFrame(tick);
  };

  return (
    <section id="cta" className="scroll-mt-20">
      <style>{`
        @keyframes mm-cta-bar { from { transform: scaleY(0.82); } to { transform: scaleY(1); } }
        @keyframes mm-cta-head { from { transform: translateX(0); } to { transform: translateX(${VIEW_W}px); } }
        .mm-cta-bar { transform-box: fill-box; transform-origin: center; animation: mm-cta-bar 1.8s ease-in-out infinite alternate; }
        .mm-cta-head { animation: mm-cta-head 14s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .mm-cta-bar, .mm-cta-head { animation: none; }
        }
      `}</style>

      <div className="container mx-auto max-w-[var(--max-container-width)] px-4 py-12 sm:px-10 sm:py-20">
        <div
          ref={panelRef}
          style={{ ["--lvl" as string]: 0, ["--amp" as string]: reduceMotion ? 1 : 0.78 }}
          className="relative isolate overflow-hidden rounded-2xl border border-border bg-background px-4 py-16 sm:px-10 sm:py-24"
        >
          {/* Forme d'onde 3 bandes, comme dans l'app : graves rouges, médiums verts, aigus bleus. */}
          <svg
            aria-hidden
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 -z-10 h-full w-full opacity-70 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            style={{
              transform: "scaleY(var(--amp))",
              transformOrigin: "center",
            }}
          >
            {waveform.map((bar, i) => (
              <g
                key={i}
                className="mm-cta-bar"
                style={{ animationDelay: `${-((i * 0.137) % 1.8)}s` }}
              >
                <rect
                  x={bar.x}
                  y={MID_Y - bar.low}
                  width={bar.w}
                  height={bar.low * 2}
                  rx={1}
                  className="fill-band-low"
                  fillOpacity={0.75}
                />
                <rect
                  x={bar.x}
                  y={MID_Y - bar.mid}
                  width={bar.w}
                  height={bar.mid * 2}
                  rx={1}
                  className="fill-band-mid"
                  fillOpacity={0.85}
                />
                <rect
                  x={bar.x}
                  y={MID_Y - bar.high}
                  width={bar.w}
                  height={bar.high * 2}
                  rx={1}
                  className="fill-band-high"
                  fillOpacity={0.9}
                />
              </g>
            ))}
            <g className="mm-cta-head">
              <rect x={0} y={0} width={2} height={VIEW_H} className="fill-deck-a" />
              <rect
                x={-18}
                y={0}
                width={20}
                height={VIEW_H}
                className="fill-deck-a"
                fillOpacity={0.12}
              />
            </g>
          </svg>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(18,20,22,0.55),rgba(18,20,22,0.9)_75%)]"
          />

          <div
            aria-hidden
            className="absolute right-5 top-5 hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:flex"
          >
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-band-low" />
              Low
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-band-mid" />
              Mid
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-band-high" />
              High
            </span>
          </div>

          <div className="mx-auto max-w-xl rounded-xl border border-white/10 bg-surface/65 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:p-10">
            <p className="flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              <span
                aria-hidden
                className={cn(
                  "size-2 rounded-full",
                  submitted
                    ? "bg-band-mid shadow-[0_0_8px_2px_rgba(70,196,110,0.55)]"
                    : "bg-deck-a shadow-[0_0_8px_2px_rgba(74,141,255,0.5)] animate-pulse motion-reduce:animate-none"
                )}
              />
              {copy.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tighter text-foreground sm:text-5xl">
              {copy.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              {copy.description}
            </p>

            {submitted ? (
              <div
                role="status"
                className="mt-8 flex items-start gap-4 rounded-lg border border-band-mid/30 bg-band-mid/5 p-4"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-band-mid/15 text-band-mid">
                  <CheckIcon aria-hidden className="size-4" />
                </span>
                <div>
                  <p className="font-medium text-foreground">{copy.success}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {copy.successDetail}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-8">
                <label htmlFor="waitlist-email" className="sr-only">
                  {copy.inputLabel}
                </label>
                <fieldset className="mb-4">
                  <legend className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {copy.platformsLabel}
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {copy.platforms.map((platform) => {
                      const checked = platforms.includes(platform.id);
                      return (
                        <label
                          key={platform.id}
                          className={cn(
                            "flex cursor-pointer select-none items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors",
                            "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                            checked
                              ? "border-deck-a/50 bg-deck-a/10 text-foreground"
                              : "border-border bg-background/60 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={checked}
                            onChange={() => togglePlatform(platform.id)}
                          />
                          <span
                            aria-hidden
                            className={cn(
                              "size-1.5 rounded-full",
                              checked
                                ? "bg-deck-a shadow-[0_0_6px_1px_rgba(74,141,255,0.6)]"
                                : "bg-raised ring-1 ring-white/10"
                            )}
                          />
                          {platform.label}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="waitlist-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={email}
                    placeholder={copy.placeholder}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "waitlist-error" : "waitlist-fineprint"}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                      bump();
                    }}
                    className={cn(
                      "h-11 min-w-0 flex-1 rounded-lg border bg-background/80 px-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/60",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                      error ? "border-band-low/70" : "border-border"
                    )}
                  />
                  <button
                    type="submit"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-11 rounded-lg px-6 focus-visible:ring-offset-surface"
                    )}
                  >
                    {siteConfig.cta}
                  </button>
                </div>

                {/* Crête-mètre d'entrée : réagit à la frappe. */}
                <div aria-hidden className="mt-4 flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    In
                  </span>
                  <div className="flex flex-1 gap-[3px]">
                    {Array.from({ length: METER_SEGMENTS }, (_, i) => (
                      <span
                        key={i}
                        className={cn("h-1.5 flex-1 rounded-[1px]", meterColor(i))}
                        style={{
                          opacity: `clamp(0.14, calc((var(--lvl) - ${i}) * 3), 1)`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <p
                  id={error ? "waitlist-error" : "waitlist-fineprint"}
                  aria-live="polite"
                  className={cn(
                    "mt-4 text-sm",
                    error ? "text-band-low" : "text-muted-foreground/80"
                  )}
                >
                  {error ?? copy.fineprint}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
