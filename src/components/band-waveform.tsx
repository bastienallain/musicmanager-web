"use client";

import { palette } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
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
  const reduce = useReducedMotion();
  const clipId = useId();
  const step = 4;
  const width = bars * step;

  const data = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: bars }, (_, i) => {
      const env = envelope(i / bars);
      const beat = i % 4 === 0 ? 1 : 0.78;
      const low = Math.min(1, env * beat * (0.7 + rand() * 0.3));
      const mid = low * (0.55 + rand() * 0.3);
      const high = mid * (0.45 + rand() * 0.35);
      return { low: round(low * 48), mid: round(mid * 48), high: round(high * 48) };
    });
  }, [bars, seed]);

  const bands = (opacity: number) =>
    data.map((b, i) => {
      const x = i * step;
      return (
        <g key={i} opacity={opacity}>
          <rect x={x} y={50 - b.low} width={step - 1.2} height={b.low * 2} fill={palette.low} />
          <rect x={x} y={50 - b.mid} width={step - 1.2} height={b.mid * 2} fill={palette.mid} />
          <rect x={x} y={50 - b.high} width={step - 1.2} height={b.high * 2} fill={palette.high} />
        </g>
      );
    });

  const still = width * 0.38;

  return (
    <svg
      viewBox={`0 0 ${width} 100`}
      preserveAspectRatio="none"
      aria-hidden
      className={cn("block h-full w-full", className)}
    >
      <defs>
        <clipPath id={clipId}>
          {reduce ? (
            <rect x={0} y={0} width={still} height={100} />
          ) : (
            <motion.rect
              x={0}
              y={0}
              height={100}
              initial={{ width: 0 }}
              animate={{ width }}
              transition={{ duration, ease: "linear", repeat: Infinity }}
            />
          )}
        </clipPath>
      </defs>
      {bands(0.22)}
      <g clipPath={`url(#${clipId})`}>{bands(0.95)}</g>
      {reduce ? (
        <rect x={still} y={0} width={1.5} height={100} fill={palette.text} />
      ) : (
        <motion.rect
          y={0}
          width={1.5}
          height={100}
          fill={palette.text}
          initial={{ x: 0 }}
          animate={{ x: width }}
          transition={{ duration, ease: "linear", repeat: Infinity }}
        />
      )}
    </svg>
  );
}
