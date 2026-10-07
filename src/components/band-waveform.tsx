"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { palette } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useId, useMemo } from "react";

// Générateur pseudo-aléatoire à graine : mêmes barres côté serveur et client.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const step = 4;
const round = (n: number) => Math.round(n * 100) / 100;

// Enveloppe d'un morceau électronique : intro, montée, break, drop, outro.
function envelope(x: number) {
  if (x < 0.08) return 0.25 + x * 3;
  if (x < 0.38) return 0.85;
  if (x < 0.46) return 0.35;
  if (x < 0.82) return 0.95;
  if (x < 0.9) return 0.5;
  return 0.5 - (x - 0.9) * 3;
}

interface BandWaveformProps {
  bars?: number;
  seed?: number;
  className?: string;
  // Durée d'un passage de la tête de lecture, en secondes.
  duration?: number;
}

// Forme d'onde trois bandes, couleurs de l'app : graves rouges, médiums verts, aigus bleus.
export function BandWaveform({
  bars = 220,
  seed = 7,
  className,
  duration = 28,
}: BandWaveformProps) {
  const reduce = usePrefersReducedMotion();
  const clipId = useId();
  const width = bars * step;

  // Les barres ne dépendent que de la graine : calculées une fois, pas à chaque rendu.
  const [dim, lit] = useMemo(() => {
    const rand = mulberry32(seed);
    const data = Array.from({ length: bars }, (_, i) => {
      const env = envelope(i / bars);
      const beat = i % 4 === 0 ? 1 : 0.78;
      const low = Math.min(1, env * beat * (0.7 + rand() * 0.3));
      const mid = low * (0.55 + rand() * 0.3);
      const high = mid * (0.45 + rand() * 0.35);
      return { low: round(low * 48), mid: round(mid * 48), high: round(high * 48) };
    });
    const bands = (opacity: number) =>
      data.map((b, i) => {
        const x = i * step;
        return (
          <g key={i} opacity={opacity}>
            <rect x={x} y={round(50 - b.low)} width={step - 1.2} height={round(b.low * 2)} fill={palette.low} />
            <rect x={x} y={round(50 - b.mid)} width={step - 1.2} height={round(b.mid * 2)} fill={palette.mid} />
            <rect x={x} y={round(50 - b.high)} width={step - 1.2} height={round(b.high * 2)} fill={palette.high} />
          </g>
        );
      });
    return [bands(0.22), bands(0.95)];
  }, [bars, seed]);

  const still = width * 0.38;
  // Animation SMIL : le navigateur la joue seul, sans JavaScript à chaque frame.
  const sweep = (attributeName: "width" | "x") => (
    <animate
      attributeName={attributeName}
      from={0}
      to={width}
      dur={`${duration}s`}
      repeatCount="indefinite"
    />
  );

  return (
    <svg
      viewBox={`0 0 ${width} 100`}
      preserveAspectRatio="none"
      aria-hidden
      className={cn("block h-full w-full", className)}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={reduce ? still : 0} height={100}>
            {reduce ? null : sweep("width")}
          </rect>
        </clipPath>
      </defs>
      {dim}
      <g clipPath={`url(#${clipId})`}>{lit}</g>
      <rect x={reduce ? still : 0} y={0} width={1.5} height={100} fill={palette.text}>
        {reduce ? null : sweep("x")}
      </rect>
    </svg>
  );
}
