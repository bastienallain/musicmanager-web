import bpm from "@/assets/screens/bpm.webp";
import cast from "@/assets/screens/cast.webp";
import covers from "@/assets/screens/covers.webp";
import djMixer from "@/assets/screens/dj-mixer.webp";
import djMixerRelay from "@/assets/screens/dj-mixer-relay.webp";
import favorites from "@/assets/screens/favorites.webp";
import history from "@/assets/screens/history.webp";
import libraryPlaying from "@/assets/screens/library-playing.webp";
import player from "@/assets/screens/player.webp";
import smartPlaylist from "@/assets/screens/smart-playlist.webp";
import stats from "@/assets/screens/stats.webp";
import styles from "@/assets/screens/styles.webp";
import waveformColor from "@/assets/screens/waveform-color.webp";
import benefitHifi from "@/assets/screens/benefit-hifi.webp";
import benefitRelay from "@/assets/screens/benefit-relay.webp";
import benefitSearch from "@/assets/screens/benefit-search.webp";
import harmonicWheel from "@/assets/screens/harmonic-wheel.webp";
import type { StaticImageData } from "next/image";
import {
  AudioWaveformIcon,
  CastIcon,
  LibraryIcon,
  ListPlusIcon,
  SlidersHorizontalIcon,
  TagsIcon,
} from "lucide-react";

export const BLUR_FADE_DELAY = 0.15;

type PricingPlan = {
  name: string;
  href: string;
  price: string;
  period: string;
  yearlyPrice: string;
  features: string[];
  description: string;
  buttonText: string;
  isPopular: boolean;
};

type Testimonial = {
  id: number;
  text: string;
  name: string;
  role: string;
  image: string;
};

// Palette de l'app (musica v2), réutilisée par les visuels générés en code.
export const palette = {
  bg: "#07080A",
  surface: "#0D0F12",
  raised: "#15181D",
  text: "#E9EDF2",
  textMuted: "#8A94A0",
  deckA: "#4A8DFF",
  deckB: "#D08B6C",
  readout: "#30D26A",
  low: "#E5484D",
  mid: "#30D26A",
  high: "#3E8BFF",
} as const;

// Nom du produit : seule source, reprise partout dans les textes.
const APP_NAME = "Devosound";

export const siteConfig = {
  name: APP_NAME,
  // Logotype de l'app : « Devo » en blanc, « sound » en bleu.
  wordmark: ["Devo", "sound"] as const,
  tagline: "Your music, exactly as it was recorded.",
  description:
    "The music library for DJs and audiophiles on Mac: bit-perfect sound, a clean collection and a DJ mixer, in one app.",
  cta: "Join the waitlist",
  // Sur Vercel, retombe sur le domaine de production si NEXT_PUBLIC_APP_URL n'est pas défini.
  url:
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  keywords: [
    "bit-perfect audio player Mac",
    "DJ music library",
    "hi-res FLAC player macOS",
    "gapless music player Mac",
    "DLNA OpenHome player",
    "BPM key analysis Camelot",
    "DJ software Mac",
    "music collection manager",
    "MusicBrainz Discogs tagger",
  ],
  // Adresse de contact : dépend du nom de domaine, encore à choisir (issue #35).
  links: {},
  nav: [
    { href: "#features", label: "Features" },
    { href: "#hi-fi", label: "Hi-fi" },
    { href: "#dj", label: "DJ" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ],
  // Rien n'est sorti : macOS d'abord, puis Windows et Linux, sans date.
  platforms: [
    { name: "macOS", detail: "Apple Silicon · first", status: "first" as const },
    { name: "Windows", detail: "Coming soon", status: "soon" as const },
    { name: "Linux", detail: "Coming soon", status: "soon" as const },
  ],
  hero: {
    eyebrow: "Coming soon · Mac first, then Windows & Linux",
    title: "Your music, exactly as it was recorded.",
    subtitle:
      "Library, bit-perfect playback and a two-deck DJ mixer in one app, built for the Mac first. From 16-bit FLAC to 24-bit / 384 kHz, sent to your DAC untouched.",
    secondaryCta: { href: "#features", label: "See the features" },
    image: libraryPlaying,
    imageAlt:
      `${APP_NAME} library view with the cover gallery, the track list and the player bar`,
    status: { mode: "Bit-perfect", detail: "FLAC 24/192 → USB DAC" },
  },
  // Section « chaîne du signal » : un mode par état affiché dans l'en-tête de l'app.
  signalPath: {
    eyebrow: "Signal path",
    title: "Nothing between the file and your DAC.",
    description:
      `${APP_NAME} shows what actually reaches your speakers. When the chain is clean, it says so. When it isn't, it tells you why.`,
    stages: { source: "File", engine: APP_NAME, output: "Output" },
    modes: [
      {
        id: "bit-perfect",
        label: "Bit-perfect",
        status: "Bit-perfect ✓",
        tone: "a" as const,
        source: "FLAC 24/192",
        steps: [
          "Sample rate switched to 192 kHz",
          "No software volume",
          "Exclusive mode on the DAC",
        ],
        output: { name: "USB DAC", detail: "192 kHz · 24-bit" },
        note: "The DAC is set to the track's sample rate and receives the samples as integers, unchanged.",
      },
      {
        id: "resampled",
        label: "Resampled",
        status: "Resampled 192 → 96 kHz",
        tone: "b" as const,
        source: "FLAC 24/192",
        steps: [
          "Device accepts up to 96 kHz",
          "Same rate family: 192 → 96",
          "64-bit math with dither, −141 dB noise",
        ],
        output: { name: "DAC limited to 96 kHz", detail: "96 kHz · 24-bit" },
        note: "When the device can't take the file's rate, the app converts it as cleanly as it can and shows both rates.",
      },
      {
        id: "bluetooth",
        label: "Bluetooth",
        status: "Bluetooth (compressed)",
        tone: "muted" as const,
        source: "FLAC 16/44.1",
        steps: [
          "Bluetooth codec compresses the sound",
          "Shown in the header, every time",
        ],
        output: { name: "Bluetooth headphones", detail: "compressed codec" },
        note: "It works. It's just never presented as hi-fi.",
      },
    ],
    footnote:
      "On 32-bit integer output, macOS keeps 24 bits; the app shows “24-bit effective”.",
  },
  // Pastilles de format affichées sous le hero.
  formats: [
    "FLAC",
    "WAV",
    "AIFF",
    "ALAC",
    "MP3",
    "AAC",
    "Ogg Vorbis",
    "up to 768 kHz",
  ],
  // En-tête de la visite guidée (section #tour).
  tour: {
    eyebrow: "A tour",
    title: "One window, three ways to use it.",
    description:
      "Browse, listen, mix. The same library feeds all three, and nothing is copied or imported twice.",
  },
  featureScroll: [
    {
      title: "Library",
      description:
        "A cover gallery above the track list, BPM and Camelot key on every row, and an Up Next queue you reorder by dragging.",
      image: libraryPlaying,
      imageAlt: "Library view with the cover gallery, the track list, BPM, key and deck A / B buttons",
    },
    {
      title: "Player",
      description:
        "BPM and key in green readouts, a mini-waveform as the progress bar, shuffle and repeat, and the actual output quality always in the header.",
      image: player,
      imageAlt: "Player bar with artwork, shuffle and repeat, transport controls and the mini waveform",
    },
    {
      title: "DJ Mixer",
      description:
        "Two decks, a center mixer and color waveforms with beat grid, hot cues and loops, zoomable from ×1 to ×8.",
      image: djMixer,
      imageAlt: "DJ Mixer with two loaded decks and stacked color waveforms",
    },
  ],
  // Section #relay : passer de l'écoute au mix sans couper le son.
  deckRelay: {
    eyebrow: "Deck relay",
    title: "From listening to mixing, without a gap.",
    description:
      "Switch to the DJ Mixer while a track is playing. It keeps going on deck A or B, at the same position, and you pick the next one. The way back works too.",
    toggle: { listen: "Listen", mix: "Mix" },
    listen: {
      label: "Library",
      image: libraryPlaying,
      imageAlt: "Library view with Nuit Blanche by Léa Moreau in the player",
    },
    mix: {
      label: "DJ Mixer",
      image: djMixerRelay,
      imageAlt: "DJ Mixer with Nuit Blanche continuing on deck A",
    },
    nowPlaying: { title: "Nuit Blanche", artist: "Léa Moreau", bpm: "124.0" },
    note: "Same track, same position. No reload, no silence.",
  },
  features: [
    {
      name: "Bit-perfect hi-fi",
      description:
        "Your sound card is set to each track's sample rate and receives the samples as they are, from 16-bit / 44.1 kHz up to 768 kHz. The real output quality is always on screen.",
      icon: <AudioWaveformIcon className="h-6 w-6" />,
    },
    {
      name: "Up Next queue",
      description:
        "Play a track next or add it to the end, reorder by dragging, save the whole queue as a playlist. Played tracks stay in it, greyed, until you clear them.",
      icon: <ListPlusIcon className="h-6 w-6" />,
    },
    {
      name: "DLNA / OpenHome streaming",
      description:
        "Files go to your streamer untouched, up to 24/384, gapless when the streamer supports it. OpenHome devices receive the whole queue.",
      icon: <CastIcon className="h-6 w-6" />,
    },
    {
      name: "DJ Mixer",
      description:
        "Two decks with SYNC, keylock, 8 hot cues, grid-locked loops, a 3-band EQ with KILL and headphone cueing on a second output. Tracks already played are greyed in the track picker.",
      icon: <SlidersHorizontalIcon className="h-6 w-6" />,
    },
    {
      name: "Analysis & tags",
      description:
        "BPM and beat grid computed in the background, Camelot keys in one batch. Empty tags filled from MusicBrainz and Discogs, artwork up to 1200 px.",
      icon: <TagsIcon className="h-6 w-6" />,
    },
    {
      name: "Library",
      description:
        "50,000 tracks open in about 100 ms. Renamed or moved files keep their favorites, ratings, hot cues and playlists, and changes made while the app was closed are picked up when it opens.",
      icon: <LibraryIcon className="h-6 w-6" />,
    },
  ],
  featuresSection: {
    title: "Features",
    subtitle: "Everything in the app.",
    description:
      "Six families of features, then the smaller tools you'll use every week.",
  },
  // Clés d'icônes résolues dans components/sections/features.tsx.
  moreFeatures: [
    { icon: "smart", name: "Smart Playlists", detail: "Rule-based playlists that update themselves." },
    { icon: "history", name: "History & new tracks", detail: "Every play logged with your top tracks, recent additions in one place." },
    { icon: "stats", name: "Statistics", detail: "Genres, BPM by tempo, formats and the lossless share, years." },
    { icon: "duplicates", name: "Duplicates", detail: "Found, then checked before anything is removed." },
    { icon: "cleanup", name: "Library cleanup", detail: "Low-quality or incomplete files, listed for review. Deleted files go to the Mac's Trash unless you ask otherwise." },
    { icon: "convert", name: "Format conversion", detail: "Bit-exact to WAV, AIFF and FLAC, hi-res included, plus MP3 and Ogg." },
    { icon: "export", name: "DJ export", detail: "A Rekordbox XML track list, WAV files or a CSV sheet." },
    { icon: "gain", name: "ReplayGain", detail: "EBU R128 at −14 LUFS. Off by default in the player, and the header says when it's on." },
    { icon: "shuffle", name: "Shuffle & repeat", detail: "Shuffle plays the whole list once before repeating. Repeat the list or a single track." },
    { icon: "gallery", name: "Cover gallery", detail: "Artwork in perspective above the track list. It slides to the track that's playing." },
    { icon: "greyed", name: "Greyed, not hidden", detail: "Missing files stay in the list with their data, greyed. Low-quality tracks still play, flagged in amber, and can be hidden in Settings." },
    { icon: "watch", name: "Folder watching", detail: "Changes made while the app was closed are caught up when the app opens. Unplugging a drive never empties your library." },
    { icon: "playlists", name: "Playlists in the sidebar", detail: "Playlists and smart playlists one click away, under Explorer." },
    { icon: "exclusive", name: "Exclusive mode (macOS)", detail: "On external DACs, no other app mixes into the sound." },
    { icon: "device", name: "Per-device profiles", detail: "Mac speakers, HDMI, USB DAC or Bluetooth, each remembered." },
    { icon: "keyboard", name: "Keyboard shortcuts (macOS)", detail: "Space to play, arrows to seek 10 s (30 s with Shift), Cmd + arrows for tracks and volume, ⌘K to search." },
    { icon: "settings", name: "Settings (⌘,)", detail: "Waveform style, Discogs account, and whether the DJ Mixer opens once both decks are loaded." },
    { icon: "media", name: "Now Playing (macOS)", detail: "Title, artist and artwork in the Control Center widget." },
    { icon: "tags", name: "Tag editing", detail: "Serato, Rekordbox and Traktor data left untouched." },
    { icon: "headphones", name: "Headphone cueing", detail: "On a second output, with clock drift between the two cards compensated." },
  ],
  moreFeaturesLabel: "Everything else",
  moreViewsLabel: "More views",
  moreViews: [
    { title: "Statistics", image: stats },
    { title: "Smart Playlists", image: smartPlaylist },
    { title: "Artwork", image: covers },
    { title: "History", image: history },
    { title: "Musical styles", image: styles },
    { title: "Favorites", image: favorites },
  ],
  featureHighlight: [
    {
      id: "hi-fi",
      eyebrow: "Hi-fi",
      title: "Bit-perfect, and verified.",
      description:
        "The app sets your sound card to each track's sample rate and sends the samples as they are: no conversion, no software volume. The mode is always shown: Bit-perfect, Resampled 192 → 96 kHz, or Bluetooth (compressed). Nothing is hidden.",
      imageSrc: player,
      imageAlt: "Library with the player bar, the output menu and the track in progress",
      direction: "rtl" as const,
      // Façade de DAC : un témoin par mode, et pour chacun les mêmes quatre questions
      // avec leur réponse (oui / non) et le détail qui change. `noise` place le repère
      // sur l'échelle en dB (null : pas de repère, `scaleNote` explique pourquoi).
      modes: [
        {
          label: "Bit-perfect",
          checks: [
            { label: "Original sample rate", ok: true, value: "24/96 → 24/96", unit: "bit / kHz" },
            { label: "Samples untouched", ok: true, value: "As is", unit: "integers" },
            { label: "No added noise", ok: true, value: "None", unit: "no conversion" },
            { label: "Lossless link", ok: true, value: "USB", unit: "exclusive mode" },
          ],
          noise: null,
          scaleNote: "No conversion: nothing added to the signal",
        },
        {
          label: "Resampled 192 → 96 kHz",
          checks: [
            { label: "Original sample rate", ok: false, value: "24/192 → 24/96", unit: "bit / kHz" },
            { label: "Samples untouched", ok: false, value: "64-bit", unit: "with dither" },
            { label: "No added noise", ok: false, value: "−141", unit: "dB" },
            { label: "Lossless link", ok: true, value: "USB", unit: "DAC max 96 kHz" },
          ],
          noise: -141,
          scaleNote: "Fallback resampler noise, measured at −141 dB",
        },
        {
          label: "Bluetooth (compressed)",
          checks: [
            { label: "Original sample rate", ok: false, value: "Codec", unit: "rate set by Bluetooth" },
            { label: "Samples untouched", ok: false, value: "Re-encoded", unit: "lossy" },
            { label: "No added noise", ok: false, value: "Codec", unit: "not measured" },
            { label: "Lossless link", ok: false, value: "Bluetooth", unit: "compressed" },
          ],
          noise: null,
          scaleNote: "Compressed by Bluetooth: the app says so in the header",
        },
      ],
      facts: [
        "Files from 16/44.1 to 32/768",
        "24 effective bits on macOS",
        "10 output links detected",
      ],
    },
    {
      id: "dj",
      eyebrow: "DJ",
      title: "A real mixer.",
      description:
        "Two decks with tempo and phase SYNC, keylock, 8 hot cues, 1 to 16-beat loops locked to the grid, a 3-band EQ with KILL, and headphone cueing on a second output. Load a track on A or B from the library and it waits, paused. Click a deck's key and the other deck's track picker shows only compatible keys.",
      imageSrc: djMixer,
      imageAlt: "DJ Mixer with two decks and stacked color waveforms",
      direction: "ltr" as const,
      stats: [
        { value: "8", label: "hot cues per deck" },
        { value: "1–16", label: "beat loops on the grid" },
        { value: "11 ms", label: "from press to sound" },
        { value: "×1–×8", label: "waveform zoom" },
      ],
    },
    {
      id: "collection",
      eyebrow: "Collection",
      title: "A collection that stays clean.",
      description:
        "BPM and beat grid analyzed in the background, Camelot keys in one batch. Empty tags filled from MusicBrainz and Discogs, keeping only the artist's official album, never a random compilation. Artwork up to 1200 px.",
      imageSrc: bpm,
      imageAlt: "BPM analysis view with tempo and Camelot key for each track",
      direction: "rtl" as const,
      // Carte « avant / après » animée : tags d'un nom de fichier → tags MusicBrainz.
      tagFix: {
        before: {
          label: "Before",
          file: "03 - marcel_jules-soleil tardif (radio edit).mp3",
          fields: [
            { name: "Title", value: "soleil tardif (radio edit)" },
            { name: "Artist", value: "marcel_jules" },
            { name: "Album", value: "Summer Hits 2019 CD1" },
          ],
        },
        after: {
          label: "After",
          source: "MusicBrainz",
          fields: [
            { name: "Title", value: "Soleil Tardif" },
            { name: "Artist", value: "Marcel & Jules" },
            { name: "Album", value: "Marées · 2019" },
          ],
          bpm: "120.5",
          key: "4B",
        },
      },
    },
  ],
  bentoSection: {
    title: "In detail",
    subtitle: "Built around the signal.",
    description:
      "Four parts of the app that most players leave out, shown as they work.",
  },
  bento: [
    {
      title: "Color waveform",
      content:
        "Lows in red, mids in green, highs in blue: read a track's structure at a glance. Serato or VirtualDJ style, your choice in Settings.",
      imageSrc: waveformColor,
      imageAlt:
        "Color waveforms of two decks: full-track overviews above, zoomed views below",
      fullWidth: true,
      chips: ["Low", "Mid", "High"],
      note: "Click anywhere on the waveform to jump there. In the DJ Mixer, zoom from ×1 to ×8.",
    },
    {
      title: "Hi-fi streaming over DLNA / OpenHome",
      content:
        "The file reaches your streamer untouched, up to 24/384, gapless when the streamer supports it.",
      imageSrc: cast,
      imageAlt:
        "Play on a network streamer dialog showing Bit-perfect, 24-bit / 192 kHz, FLAC",
      fullWidth: false,
      chips: ["DLNA / UPnP", "OpenHome", "Gapless"],
      note: "OpenHome devices receive the whole queue. Not yet tried on specific brands.",
    },
    {
      title: "DSD, in the engine",
      content:
        "The audio engine plays DSF and DFF: DoP to compatible DACs, PCM conversion for the rest. DSD files can't be added to the library yet.",
      fullWidth: false,
      chips: ["DSF", "DFF", "DoP v1.1", "DSD64–256"],
      note: "PCM conversion keeps in-band noise at −123 dB.",
    },
    {
      title: "Harmonic mixing",
      content:
        "The Camelot wheel suggests the tracks that fit the one you're playing.",
      imageSrc: harmonicWheel,
      imageAlt: "Harmonic Mix view with the Camelot wheel",
      fullWidth: true,
      chips: [],
      note: "Pick a key: same number, one step either way, or its relative major / minor.",
    },
  ],
  benefitsSection: {
    title: "Day to day",
    subtitle: "What changes when you use it.",
  },
  benefits: [
    {
      id: 1,
      text: "Hear your hi-res files the way they were mastered.",
      detail:
        "The sound card follows each track's sample rate, and the header shows what you actually hear.",
      // Recadrage WebP de la capture « player » (zone de la barre de lecture).
      image: benefitHifi,
    },
    {
      id: 2,
      text: "Go from listening to mixing without stopping the music.",
      detail:
        "The track carries on on deck A or B, at the same position. It works the other way too.",
      image: benefitRelay,
    },
    {
      id: 3,
      text: "Find any track among 50,000 in an instant.",
      detail:
        "The library opens in about 100 ms. Search with ⌘K, filter by genre, format, key and BPM range.",
      image: benefitSearch,
    },
    {
      id: 4,
      text: "Keep your cues and notes when you rename a file.",
      detail:
        "Renamed or moved files keep their favorites, ratings, BPM, hot cues, playlists and history.",
      image: null,
      rename: {
        from: "~/Music/Incoming/track07.flac",
        to: "~/Music/House/Marcel & Jules - Soleil Tardif.flac",
        kept: ["★ Favorite", "120.5 BPM", "8 hot cues", "3 playlists", "12 plays"],
      },
    },
  ],
  // BROUILLON : aucun tarif n'est décidé. Montants indicatifs à valider avant mise en ligne.
  pricingSection: {
    title: "Pricing",
    subtitle: "One app. Pay once.",
    description:
      "Try everything for free, then keep it with a one-time license. No subscription.",
  },
  pricingNote: "Prices are indicative and not final yet.",
  pricing: [
    {
      name: "Trial",
      href: "#cta",
      price: "Free",
      period: "14 days",
      yearlyPrice: "Free",
      features: [
        "Every feature unlocked",
        "Bit-perfect playback",
        "Full DJ Mixer",
        "No account, no card",
      ],
      description: "Try it on your own library, with your own DAC.",
      buttonText: "Join the waitlist",
      isPopular: false,
    },
    {
      name: "Personal license",
      href: "#cta",
      price: "€59",
      period: "one-time",
      yearlyPrice: "€59",
      features: [
        "Lifetime license for 1.x",
        "Up to 2 Macs",
        "DLNA / OpenHome streaming",
        "MusicBrainz & Discogs tagging",
        "Free updates for 1.x",
      ],
      description: "Pay once. Your library stays yours.",
      buttonText: "Join the waitlist",
      isPopular: true,
    },
    {
      name: "Founding member",
      href: "#cta",
      price: "€39",
      period: "one-time",
      yearlyPrice: "€39",
      features: [
        "Everything in Personal",
        "Waitlist-only price",
        "Early builds before anyone else",
        "Your name in the credits",
      ],
      description: "For the first people on the waitlist.",
      buttonText: "Reserve my spot",
      isPopular: false,
    },
  ] as PricingPlan[],
  faqSection: {
    title: "FAQ",
    subtitle: "Questions, answered plainly.",
    description:
      "What the app does, what it doesn't, and what your setup needs. Anything missing? Ask us when you join the waitlist.",
  },
  faqs: [
    {
      question: "What does “bit-perfect” mean?",
      answer: (
        <span>
          The samples in your file reach the sound card unchanged: no
          resampling, no software volume, no effects. The app always shows
          whether that’s the case, and if not, why.
        </span>
      ),
    },
    {
      question: "Which formats can it play?",
      answer: (
        <span>
          FLAC, WAV, AIFF, ALAC, MP3, AAC and Ogg Vorbis up to 32-bit / 768
          kHz. On macOS, 32-bit files play with 24 effective bits, and the app
          says so. The audio engine handles DSD (DSF and DFF), but DSD files
          can’t be added to the library yet. Opus and WMA are not supported.
        </span>
      ),
    },
    {
      question: "Why are some tracks greyed out?",
      answer: (
        <span>
          A greyed track is missing from disk, or in a format the app doesn’t
          play (Opus, WMA). It keeps its cues, notes and history, and a
          tooltip gives the reason. Tracks below the quality bar (for example
          an MP3 under 320 kb/s) aren’t greyed: they play, with their format
          in amber, but stay out of analysis, the decks and exports. In the
          Up Next queue and the DJ track picker, grey also marks tracks
          you’ve already played.
        </span>
      ),
    },
    {
      question: "Can it delete my files?",
      answer: (
        <span>
          Only when you ask. Deleted files go to the Mac’s Trash, unless you
          choose to delete them permanently.
        </span>
      ),
    },
    {
      question: "Do I need a DAC?",
      answer: (
        <span>
          No. The app adapts to the Mac’s built-in output, a USB DAC, an HDMI
          device or a network streamer, and shows the quality you actually
          get.
        </span>
      ),
    },
    {
      question: "What about Bluetooth?",
      answer: (
        <span>
          It works, but Bluetooth always compresses the sound. The app says so
          plainly.
        </span>
      ),
    },
    {
      question: "Is my streamer compatible?",
      answer: (
        <span>
          The app speaks standard DLNA / UPnP, and streamers that support
          OpenHome receive the full queue. It has been tested against a
          simulated renderer, not yet on specific brands, so we can’t list
          compatible models.
        </span>
      ),
    },
    {
      question: "Can I DJ with it?",
      answer: (
        <span>
          Yes: two decks, SYNC, keylock, hot cues, loops, EQ and headphone
          cueing, with the mouse and keyboard. Hardware DJ controllers are not
          supported.
        </span>
      ),
    },
    {
      question: "Are my Serato, Rekordbox or Traktor cues kept?",
      answer: (
        <span>
          Yes. The app leaves other software’s data untouched when it writes
          tags.
        </span>
      ),
    },
    {
      question: "Which systems does it run on?",
      answer: (
        <span>
          None yet: the app isn’t out. The Mac version (Apple Silicon) comes
          first, then Windows and Linux. Join the waitlist to hear when each
          one is ready.
        </span>
      ),
    },
  ],
  ctaSection: {
    title: "Coming soon to Mac.",
    description: "Leave your email and we'll let you know when it's out.",
    eyebrow: "Waitlist",
    placeholder: "you@example.com",
    inputLabel: "Email address",
    invalid: "That address doesn't look complete.",
    success: "You're on the list.",
    successDetail: "One email when it's out. Nothing else.",
    fineprint: "Used only to tell you when it's out. Never shared.",
    platformsLabel: "Tell me when it's on…",
    platforms: [
      { id: "macos", label: "macOS" },
      { id: "windows", label: "Windows" },
      { id: "linux", label: "Linux" },
    ],
    noPlatform: "Pick at least one platform.",
  },
  footerPlatform: "Coming soon · macOS first, then Windows & Linux",
  footer: [
    {
      id: 1,
      menu: [
        { href: "#features", text: "Features" },
        { href: "#pricing", text: "Pricing" },
        { href: "#faq", text: "FAQ" },
        { href: "#", text: "Third-party licenses" },
        { href: "#", text: "Contact" },
      ],
    },
  ],
  // Uniquement de vraies citations, avec l'accord de leur auteur.
  testimonials: [] as Testimonial[],
};

export type SiteConfig = typeof siteConfig;
