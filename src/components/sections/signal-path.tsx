"use client";

import { easeOutCubic } from "@/lib/animation";
import { palette, siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AudioWaveformIcon,
  BluetoothIcon,
  CheckIcon,
  FileAudioIcon,
  InfoIcon,
  SpeakerIcon,
} from "lucide-react";
import { useState } from "react";

const { signalPath } = siteConfig;
type Mode = (typeof signalPath.modes)[number];
type Tone = Mode["tone"];

const toneStroke: Record<Tone, string> = {
  a: palette.deckA,
  b: palette.deckB,
  muted: palette.textMuted,
};

const toneText: Record<Tone, string> = {
  a: "text-deck-a",
  b: "text-deck-b",
  muted: "text-muted-foreground",
};

const toneBorder: Record<Tone, string> = {
  a: "border-deck-a/40 bg-deck-a/[0.06]",
  b: "border-deck-b/40 bg-deck-b/[0.06]",
  muted: "border-white/15 bg-white/[0.03]",
};

// Câble entre deux étages : un trait fixe et des « paquets » qui défilent.
function Wire({ tone, sparse = false }: { tone: Tone; sparse?: boolean }) {
  const reduce = useReducedMotion();
  const color = toneStroke[tone];
  const dash = sparse ? "3 14" : "10 6";
  const flow = (vertical: boolean) => (
    <svg
      aria-hidden
      viewBox={vertical ? "0 0 8 48" : "0 0 96 8"}
      preserveAspectRatio="none"
      className={vertical ? "h-12 w-2" : "h-2 w-full"}
    >
      <line
        x1={vertical ? 4 : 0}
        y1={vertical ? 0 : 4}
        x2={vertical ? 4 : 96}
        y2={vertical ? 48 : 4}
        stroke={color}
        strokeOpacity={0.18}
        strokeWidth={2}
      />
      <motion.line
        x1={vertical ? 4 : 0}
        y1={vertical ? 0 : 4}
        x2={vertical ? 4 : 96}
        y2={vertical ? 48 : 4}
        stroke={color}
        strokeWidth={2}
        strokeDasharray={dash}
        strokeLinecap="round"
        animate={reduce ? undefined : { strokeDashoffset: [0, -32] }}
        transition={{ duration: sparse ? 1.6 : 0.8, ease: "linear", repeat: Infinity }}
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  );

  return (
    <div className="flex items-center justify-center md:min-w-16 lg:min-w-24">
      <div className="md:hidden">{flow(true)}</div>
      <div className="hidden w-full md:block">{flow(false)}</div>
    </div>
  );
}

function StageLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
      {children}
    </p>
  );
}

function Swap({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: easeOutCubic }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function SignalPath() {
  const [modeId, setModeId] = useState<string>(signalPath.modes[0].id);
  const mode = signalPath.modes.find((m) => m.id === modeId) ?? signalPath.modes[0];
  const OutputIcon = mode.id === "bluetooth" ? BluetoothIcon : SpeakerIcon;
  const StepIcon = mode.tone === "a" ? CheckIcon : InfoIcon;

  return (
    <section id="signal-path" className="relative scroll-mt-16">
      <div className="container mx-auto px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
            {signalPath.eyebrow}
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
            {signalPath.title}
          </h2>
          <p className="mt-5 text-balance text-base leading-7 text-muted-foreground sm:text-lg">
            {signalPath.description}
          </p>
        </div>

        {/* Façade d'appareil : sélecteur de mode, chaîne, afficheur d'état. */}
        <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-white/[0.08] bg-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_80px_-30px_rgba(0,0,0,0.9)]">
          <div className="flex flex-col gap-3 border-b border-white/[0.06] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-2" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 rounded-full bg-white/10" />
              ))}
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                Output mode
              </span>
            </div>
            <div
              role="radiogroup"
              aria-label="Output mode"
              className="grid grid-cols-3 gap-1 rounded-lg bg-background/70 p-1 ring-1 ring-white/[0.06]"
            >
              {signalPath.modes.map((m) => {
                const active = m.id === mode.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setModeId(m.id)}
                    className={cn(
                      "relative rounded-md px-3 py-1.5 font-mono text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active ? toneText[m.tone] : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="signal-mode"
                        className="absolute inset-0 rounded-md bg-raised ring-1 ring-white/10"
                        transition={{ duration: 0.25, ease: easeOutCubic }}
                      />
                    )}
                    <span className="relative">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-stretch px-4 py-8 sm:px-6 md:grid md:grid-cols-[1fr_auto_1.5fr_auto_1fr] md:items-center md:py-12">
            {/* Fichier */}
            <div className="rounded-xl border border-white/[0.08] bg-background/60 p-4">
              <StageLabel>{signalPath.stages.source}</StageLabel>
              <div className="mt-3 flex items-center gap-3">
                <FileAudioIcon className="size-5 shrink-0 text-muted-foreground" />
                <Swap id={`src-${mode.id}`}>
                  <p className="font-mono text-sm text-foreground">{mode.source}</p>
                </Swap>
              </div>
            </div>

            <Wire tone={mode.tone} />

            {/* Moteur */}
            <div
              className={cn(
                "rounded-xl border p-4 transition-colors duration-300 sm:p-5",
                toneBorder[mode.tone]
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <StageLabel>{signalPath.stages.engine}</StageLabel>
                <AudioWaveformIcon className={cn("size-4", toneText[mode.tone])} />
              </div>
              <Swap id={`eng-${mode.id}`}>
                <ul className="mt-3 space-y-2">
                  {mode.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2.5 text-sm text-foreground/90">
                      <StepIcon
                        className={cn("mt-0.5 size-4 shrink-0", toneText[mode.tone])}
                      />
                      {step}
                    </li>
                  ))}
                </ul>
              </Swap>
            </div>

            <Wire tone={mode.tone} sparse={mode.id === "bluetooth"} />

            {/* Sortie */}
            <div className="rounded-xl border border-white/[0.08] bg-background/60 p-4">
              <StageLabel>{signalPath.stages.output}</StageLabel>
              <div className="mt-3 flex items-center gap-3">
                <OutputIcon className="size-5 shrink-0 text-muted-foreground" />
                <Swap id={`out-${mode.id}`}>
                  <p className="text-sm font-medium text-foreground">{mode.output.name}</p>
                  <p className="font-mono text-xs text-muted-foreground">{mode.output.detail}</p>
                </Swap>
              </div>
            </div>
          </div>

          {/* Afficheur d'état, comme l'en-tête de l'app. */}
          <div className="flex flex-col gap-3 border-t border-white/[0.06] bg-background/40 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
            <div
              className={cn(
                "inline-flex w-max items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-xs font-semibold transition-colors duration-300",
                toneBorder[mode.tone],
                toneText[mode.tone]
              )}
              aria-live="polite"
            >
              <span
                className="size-1.5 rounded-full"
                style={{ backgroundColor: toneStroke[mode.tone] }}
                aria-hidden
              />
              {mode.status}
            </div>
            <Swap id={`note-${mode.id}`}>
              <p className="text-sm text-muted-foreground">{mode.note}</p>
            </Swap>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-5xl px-1 text-center font-mono text-[11px] text-muted-foreground/70">
          {signalPath.footnote}
        </p>
      </div>
    </section>
  );
}
