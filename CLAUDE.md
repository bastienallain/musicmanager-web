# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexte

Site vitrine (landing page one-page) de **Devosound** (ex-MusicManager), app Mac de bibliothèque musicale pour DJ et audiophiles : lecture bit-perfect, DSD, streaming DLNA/OpenHome, DJ Mixer. Le code part du template Magic UI « mobile » (nom npm `mobile-magicui`, contenu factice « Cal AI ») qu'on adapte à l'app.

**Source de vérité du contenu : `CONTENU-SITE.md`** (à la racine de ce dépôt). Il donne le texte de chaque section, l'inventaire des fonctionnalités, la FAQ, la palette et la liste de ce qu'il ne faut pas promettre. Le lire avant toute modification de contenu. Les captures `../Screenshot *.png` montrent l'interface réelle de l'app (thème sombre, accent cyan) ; s'en servir comme référence visuelle.

L'app elle-même vit dans un autre dépôt : `~/Github/MusicManager` (branche `dev` ; le dépôt et le paquet Python gardent le nom MusicManager). Ses captures sont dans `docs/captures/`, et `QT_SCALE_FACTOR=2 uv run python scripts/apercu_ui.py --sortie <dossier>` les régénère en 2× (Qt offscreen, base de démo isolée ; l'interface de l'app est en français).

## Commandes

Gestionnaire de paquets : **bun**. `pnpm-lock.yaml` est un reste du template.

```bash
bun install
bun dev              # http://localhost:3000
bun run build
bun run lint         # next lint (ESLint 8, next/core-web-vitals)
bunx tsc --noEmit    # vérification des types
```

Il n'y a pas de tests. Flow Git : branche `dev`, branches `feature/…` / `fix/…` / `docs/…` fusionnées en fast-forward.

## Architecture

- **Next.js 16 App Router, React 19, Tailwind CSS v4, shadcn/ui (style new-york), framer-motion.** Alias `@/*` → `src/*`.
- **Tout le contenu est dans `src/lib/config.tsx`** (`siteConfig` : `name`, `description`, `keywords`, `links`, `features`, `featureHighlight`, `bento`, `benefits`, `pricing`, `faqs`, `footer`, `testimonials`). Les sections lisent cet objet ; on change le texte dans la config, pas dans les composants. `siteConfig.name` (constante `APP_NAME`, « Devosound ») reste la seule source du nom de l'app.
- **`src/app/page.tsx`** assemble les sections de `src/components/sections/` dans l'ordre. Pour masquer une section, on la retire d'ici.
- **`src/components/section.tsx`** est le wrapper commun : titre, sous-titre et description avec un fondu au scroll. L'`id` d'ancre est dérivé du `title` (minuscules, tirets) s'il n'est pas passé, et les liens du header pointent dessus.
- **Métadonnées et SEO** : `constructMetadata()` dans `src/lib/utils.ts` construit le `Metadata` à partir de `siteConfig`. L'image OG est générée en edge par `src/app/og/route.tsx` (police `src/assets/fonts/Inter-SemiBold.ttf`, fond `public/og.png`). `src/app/sitemap.ts` utilise `NEXT_PUBLIC_APP_URL` (voir `.env.example`).
- **Thème** : les tokens shadcn sont des variables CSS dans `src/app/globals.css` (`@theme inline`, variante `dark` sur la classe `.dark`). Le site est toujours sombre (`forcedTheme="dark"`) : `:root` et `.dark` portent la palette de l'app, avec en plus les couleurs `deck-a`, `deck-b`, `band-low`, `band-mid`, `band-high`.
- **Visuels** : captures réelles dans `public/screens/` (copiées depuis `docs/captures/` de l'app et `../Screenshot *.png`), encadrées par `src/components/mac-window.tsx`. Quand une image manque, on la dessine en SVG. `next.config.mjs` n'autorise que `localhost` et `randomuser.me` comme hôtes d'images distantes.

## Règles de contenu (résumé de `CONTENU-SITE.md`)

- Site en **anglais** (décision du 3 octobre 2026, remplace « français d'abord »). Ton précis et sobre, sans superlatifs marketing.
- **macOS (Apple Silicon) au lancement ; Windows et Linux annoncés « coming soon »**, sans date ni fonctionnalité promise (`siteConfig.platforms`). Ne jamais promettre iPhone, le DSD natif (c'est du DoP ou une conversion PCM), le 32 bits bit-perfect (24 bits effectifs), Opus/WMA, les contrôleurs DJ matériels ou une date de sortie.
- **Pricing** : section affichée à la demande de l'utilisateur, avec des montants **indicatifs** (brouillon, à valider). **Testimonials** : aucun témoignage inventé.
- Pas de lien de téléchargement : CTA « Notify me at launch » (liste d'attente).
- Palette de l'app : fonds `#121416` / `#1A1D20` / `#24282C`, texte `#E6E9EB` / `#98A1A7`, accent deck A cyan `#35B2C4`, deck B terre cuite `#D08B6C`.
- Icônes : `lucide-react`, comme dans l'app.
