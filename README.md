# Devosound — website

Landing page for **Devosound**, a music library app for DJs and audiophiles: bit-perfect playback, DSD, DLNA / OpenHome streaming and a two-deck DJ mixer in one app. macOS (Apple Silicon) first, Windows and Linux coming soon.

This is a first draft. The app is not released yet, prices shown on the page are indicative, and the waitlist form is not connected.

## Stack

- Next.js 15 (App Router), React 19
- Tailwind CSS v4, shadcn/ui, framer-motion
- lucide-react icons
- bun

## Development

```bash
bun install
bun dev            # http://localhost:3000
bun run build
bun run lint
bunx tsc --noEmit
```

## Where things live

- `src/lib/config.tsx` — all the copy (hero, features, pricing, FAQ…) and the app palette. Edit text here, not in components.
- `src/app/page.tsx` — section order.
- `src/components/sections/` — one file per section.
- `src/components/mac-window.tsx` — macOS window frame for screenshots.
- `public/screens/` — real screenshots of the app.
- `src/app/og/route.tsx` — generated Open Graph image.

## Palette

| Role | Color |
| --- | --- |
| Backgrounds | `#121416` · `#1A1D20` · `#24282C` |
| Text | `#E6E9EB` · `#98A1A7` |
| Deck A (accent) | `#35B2C4` |
| Deck B | `#D08B6C` |
| Waveform bands | low `#E5484D` · mid `#46C46E` · high `#3E8BFF` |
