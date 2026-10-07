import { WaitlistPanel } from "@/components/sections/cta-waitlist";
import { cn } from "@/lib/utils";

const BARS = 120;
const VIEW_W = 1200;
const VIEW_H = 300;
const MID_Y = VIEW_H / 2;

// PRNG déterministe : la forme d'onde est la même à chaque rendu.
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

const BANDS = [
  { label: "Low", dot: "bg-band-low" },
  { label: "Mid", dot: "bg-band-mid" },
  { label: "High", dot: "bg-band-high" },
];

const CTA_STYLES = `
  @keyframes mm-cta-bar { from { transform: scaleY(0.82); } to { transform: scaleY(1); } }
  @keyframes mm-cta-head { from { transform: translateX(0); } to { transform: translateX(${VIEW_W}px); } }
  .mm-cta-bar { transform-box: fill-box; transform-origin: center; animation: mm-cta-bar 1.8s ease-in-out infinite alternate; }
  .mm-cta-head { animation: mm-cta-head 14s linear infinite; }
  @media (prefers-reduced-motion: reduce) {
    .mm-cta-bar, .mm-cta-head { animation: none; }
  }
`;

// Fond statique, rendu côté serveur : seul le formulaire est un composant client.
const backdrop = (
  <>
    {/* Forme d'onde 3 bandes, comme dans l'app : graves rouges, médiums verts, aigus bleus. */}
    <svg
      aria-hidden
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      className="absolute inset-0 -z-10 h-full w-full origin-center opacity-70 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [transform:scaleY(var(--amp))] motion-reduce:[transform:none]"
    >
      {waveform.map((bar, i) => (
        <g
          key={i}
          className="mm-cta-bar"
          style={{ animationDelay: `${-round((i * 0.137) % 1.8)}s` }}
        >
          <rect
            x={bar.x}
            y={round(MID_Y - bar.low)}
            width={bar.w}
            height={round(bar.low * 2)}
            rx={1}
            className="fill-band-low"
            fillOpacity={0.75}
          />
          <rect
            x={bar.x}
            y={round(MID_Y - bar.mid)}
            width={bar.w}
            height={round(bar.mid * 2)}
            rx={1}
            className="fill-band-mid"
            fillOpacity={0.85}
          />
          <rect
            x={bar.x}
            y={round(MID_Y - bar.high)}
            width={bar.w}
            height={round(bar.high * 2)}
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
      {BANDS.map(({ label, dot }) => (
        <span key={label} className="flex items-center gap-1.5">
          <span className={cn("size-1.5 rounded-full", dot)} />
          {label}
        </span>
      ))}
    </div>
  </>
);

export function CTA() {
  return (
    <section id="cta" className="scroll-mt-20">
      <style>{CTA_STYLES}</style>
      <div className="container mx-auto max-w-[var(--max-container-width)] px-4 py-12 sm:px-10 sm:py-20">
        <WaitlistPanel backdrop={backdrop} />
      </div>
    </section>
  );
}
