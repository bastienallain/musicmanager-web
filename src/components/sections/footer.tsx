import { Wordmark } from "@/components/wordmark";
import { siteConfig } from "@/lib/config";

const LINE_W = 1200;
const LINE_H = 24;

// Forme d'onde fine et déterministe (somme de sinus), utilisée comme séparateur.
const waveformPath = (() => {
  const points = 240;
  const mid = LINE_H / 2;
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const x = Math.round(t * LINE_W * 10) / 10;
    const fade = Math.min(1, t * 6, (1 - t) * 6);
    const amp =
      (Math.abs(Math.sin(t * 61)) * 0.55 +
        Math.abs(Math.sin(t * 173 + 1.3)) * 0.3 +
        Math.abs(Math.sin(t * 409 + 0.7)) * 0.15) *
      fade *
      (mid - 1);
    const a = Math.round(Math.max(0.4, amp) * 10) / 10;
    top.push(`${x},${Math.round((mid - a) * 10) / 10}`);
    bottom.unshift(`${x},${Math.round((mid + a) * 10) / 10}`);
  }
  return `M${top.join(" L")} L${bottom.join(" L")} Z`;
})();

function WaveformDivider() {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${LINE_W} ${LINE_H}`}
      preserveAspectRatio="none"
      className="h-6 w-full"
    >
      <defs>
        <linearGradient id="footer-wave" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--band-low)" />
          <stop offset="50%" stopColor="var(--band-mid)" />
          <stop offset="100%" stopColor="var(--band-high)" />
        </linearGradient>
      </defs>
      <path d={waveformPath} fill="url(#footer-wave)" fillOpacity={0.55} />
      <line
        x1={0}
        x2={LINE_W}
        y1={LINE_H / 2}
        y2={LINE_H / 2}
        stroke="var(--border)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Footer() {
  const links = siteConfig.footer.flatMap((group) => group.menu);
  const year = new Date().getFullYear();

  return (
    <footer className="container mx-auto max-w-[var(--max-container-width)] px-4 pb-10 pt-6 sm:px-10">
      <WaveformDivider />

      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <a
            href="#"
            className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Wordmark className="text-xl text-foreground" />
          </a>
          <p className="mt-3 font-mono text-xs tracking-wide text-muted-foreground">
            {siteConfig.footerPlatform}
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:flex sm:flex-wrap sm:gap-x-6">
            {links.map((link) => (
              <li key={link.text}>
                <a
                  href={link.href}
                  className="text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mt-10 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground/80">
        © {year} {siteConfig.name}
      </p>
    </footer>
  );
}
