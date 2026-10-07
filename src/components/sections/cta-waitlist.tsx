"use client";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import {
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const copy = siteConfig.ctaSection;
const METER_SEGMENTS = 20;
const IDLE_AMP = 0.78;

const PANEL_STYLE = { "--lvl": 0, "--amp": IDLE_AMP } as CSSProperties;

const meterColor = (i: number) =>
  i >= METER_SEGMENTS - 2
    ? "bg-band-low"
    : i >= METER_SEGMENTS - 6
    ? "bg-deck-b"
    : "bg-band-mid";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isEmail = (value: string) => EMAIL_RE.test(value.trim());

// Crête-mètre d'entrée : chaque segment s'allume selon --lvl, posé sur le panneau.
const meter = (
  <div aria-hidden className="mt-4 flex items-center gap-3">
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      In
    </span>
    <div className="flex flex-1 gap-[3px]">
      {Array.from({ length: METER_SEGMENTS }, (_, i) => (
        <span
          key={i}
          className={cn("h-1.5 flex-1 rounded-[1px]", meterColor(i))}
          style={{ opacity: `clamp(0.14, calc((var(--lvl) - ${i}) * 3), 1)` }}
        />
      ))}
    </div>
  </div>
);

const success = (
  <div
    role="status"
    className="mt-8 flex items-start gap-4 rounded-lg border border-band-mid/30 bg-band-mid/5 p-4"
  >
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-band-mid/15 text-band-mid">
      <CheckIcon aria-hidden className="size-4" />
    </span>
    <div>
      <p className="font-medium text-foreground">{copy.success}</p>
      <p className="mt-1 text-sm text-muted-foreground">{copy.successDetail}</p>
    </div>
  </div>
);

// Panneau de la liste d'attente : `backdrop` (forme d'onde, rendue côté serveur)
// lit --amp, que la frappe fait monter comme un VU-mètre.
export function WaitlistPanel({ backdrop }: { backdrop: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const energy = useRef(0);
  const frame = useRef<number | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [platforms, setPlatforms] = useState<string[]>(["macos"]);

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const tick = () => {
    const panel = panelRef.current;
    if (!panel) return;
    energy.current *= 0.93;
    if (energy.current < 0.005) energy.current = 0;
    panel.style.setProperty("--lvl", String(energy.current * METER_SEGMENTS));
    panel.style.setProperty("--amp", String(IDLE_AMP + energy.current * 0.32));
    frame.current = energy.current > 0 ? requestAnimationFrame(tick) : null;
  };

  const pump = (amount: number) => {
    energy.current = Math.min(1, energy.current + amount);
    if (frame.current === null) frame.current = requestAnimationFrame(tick);
  };

  const togglePlatform = (id: string) => {
    setPlatforms((current) =>
      current.includes(id) ? current.filter((p) => p !== id) : [...current, id]
    );
    setError(null);
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
    pump(1);
  };

  const messageId = error ? "waitlist-error" : "waitlist-fineprint";

  return (
    <div
      ref={panelRef}
      style={PANEL_STYLE}
      className="relative isolate overflow-hidden rounded-2xl border border-border bg-background px-4 py-16 sm:px-10 sm:py-24"
    >
      {backdrop}

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
          success
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-8">
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
                        name="platforms"
                        value={platform.id}
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
            <label htmlFor="waitlist-email" className="sr-only">
              {copy.inputLabel}
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="waitlist-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                required
                value={email}
                placeholder={copy.placeholder}
                aria-invalid={error === copy.invalid ? true : undefined}
                aria-describedby={messageId}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                  pump(0.3);
                }}
                className={cn(
                  "h-11 min-w-0 flex-1 rounded-lg border bg-background/80 px-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/60",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  error === copy.invalid ? "border-band-low/70" : "border-border"
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

            {meter}

            <p
              id={messageId}
              aria-live="polite"
              className={cn(
                "mt-4 text-sm",
                error ? "text-band-low" : "text-muted-foreground"
              )}
            >
              {error ?? copy.fineprint}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
