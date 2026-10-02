import {
  AudioWaveformIcon,
  CastIcon,
  Disc3Icon,
  LibraryIcon,
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
  bg: "#121416",
  surface: "#1A1D20",
  raised: "#24282C",
  text: "#E6E9EB",
  textMuted: "#98A1A7",
  deckA: "#35B2C4",
  deckB: "#D08B6C",
  low: "#E5484D",
  mid: "#46C46E",
  high: "#3E8BFF",
} as const;

export const siteConfig = {
  name: "MusicManager",
  tagline: "Your music, exactly as it was recorded.",
  description:
    "The music library for DJs and audiophiles on Mac: bit-perfect sound, a clean collection and a DJ mixer, in one app.",
  cta: "Notify me at launch",
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
    "DSD DoP Mac",
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
  // macOS au lancement ; Windows et Linux annoncés, sans date.
  platforms: [
    { name: "macOS", detail: "Apple Silicon", status: "available" as const },
    { name: "Windows", detail: "Coming soon", status: "soon" as const },
    { name: "Linux", detail: "Coming soon", status: "soon" as const },
  ],
  hero: {
    eyebrow: "macOS first · Windows & Linux coming soon",
    title: "Your music, exactly as it was recorded.",
    subtitle:
      "Library, bit-perfect playback and a two-deck DJ mixer in one app, built for the Mac first. From 16-bit FLAC to 24-bit / 384 kHz and DSD, untouched.",
    secondaryCta: { href: "#features", label: "See the features" },
    image: "/screens/library-playing.png",
    imageAlt:
      "MusicManager library view with the color waveform player and VU meter",
    status: { mode: "Bit-perfect", detail: "FLAC 24/192 → USB DAC" },
  },
  // Section « chaîne du signal » : un mode par état affiché dans l'en-tête de l'app.
  signalPath: {
    eyebrow: "Signal path",
    title: "Nothing between the file and your DAC.",
    description:
      "MusicManager shows what actually reaches your speakers. When the chain is clean, it says so. When it isn't, it tells you why.",
    stages: { source: "File", engine: "MusicManager", output: "Output" },
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
    "DSF",
    "DFF",
    "up to 768 kHz",
    "DSD64 → DSD256 (DoP)",
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
        "Artwork, BPM, Camelot key and one-click loading onto deck A or B, on every row.",
      image: "/screens/library-playing.png",
      imageAlt: "Library view with the track list, BPM and deck A / B buttons",
      width: 2548,
      height: 1590,
    },
    {
      title: "Player",
      description:
        "A large color waveform, a real VU meter and the actual output quality, always in view.",
      image: "/screens/player.png",
      imageAlt: "Player with waveform, transport controls and output level meter",
      width: 1920,
      height: 1200,
    },
    {
      title: "DJ Mixer",
      description:
        "Two decks, a center mixer and stacked waveforms with beat grid, hot cues and loops.",
      image: "/screens/dj-mixer.png",
      imageAlt: "DJ Mixer with two loaded decks and stacked color waveforms",
      width: 1920,
      height: 1200,
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
      image: "/screens/library-playing.png",
      imageAlt: "Library view playing S.O.T.E at 0:09",
      width: 2548,
      height: 1590,
    },
    mix: {
      label: "DJ Mixer",
      image: "/screens/dj-mixer-relay.png",
      imageAlt: "DJ Mixer with the same track continuing on deck A",
      width: 2554,
      height: 1594,
    },
    nowPlaying: { title: "S.O.T.E", artist: "EAZYBAKED", bpm: "160.0" },
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
      name: "DSD",
      description:
        "DSF and DFF playback, DSD64 to DSD256 over DoP to compatible DACs, and high-quality PCM conversion for the others.",
      icon: <Disc3Icon className="h-6 w-6" />,
    },
    {
      name: "DLNA / OpenHome streaming",
      description:
        "Files go to your streamer untouched, up to 24/384 and DSD256, with gapless playback. OpenHome devices receive the whole queue.",
      icon: <CastIcon className="h-6 w-6" />,
    },
    {
      name: "DJ Mixer",
      description:
        "Two decks with SYNC, keylock, 8 hot cues, grid-locked loops, a 3-band EQ with KILL and headphone cueing on a second output.",
      icon: <SlidersHorizontalIcon className="h-6 w-6" />,
    },
    {
      name: "Analysis & tags",
      description:
        "BPM, beat grid and Camelot key computed in the background. Tags completed from MusicBrainz and Discogs, artwork up to 1200 px.",
      icon: <TagsIcon className="h-6 w-6" />,
    },
    {
      name: "Library",
      description:
        "50,000 tracks open in about 100 ms. Renamed or moved files keep their favorites, ratings, hot cues and playlists.",
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
    { icon: "history", name: "History & new tracks", detail: "Every play logged, recent additions in one place." },
    { icon: "stats", name: "Statistics", detail: "Genres, BPM by tempo, formats and the lossless share, years, top tracks." },
    { icon: "duplicates", name: "Duplicates", detail: "Found, then checked before anything is removed." },
    { icon: "cleanup", name: "Library cleanup", detail: "Low-bitrate or incomplete files, listed for review before anything is deleted." },
    { icon: "convert", name: "Format conversion", detail: "Bit-exact to WAV, AIFF and FLAC, hi-res included, plus MP3 and Ogg." },
    { icon: "export", name: "DJ export", detail: "Rekordbox XML, WAV files or a CSV sheet, for the whole library, a genre or a playlist." },
    { icon: "gain", name: "ReplayGain", detail: "EBU R128 at −14 LUFS, 0.3 s per track, within 0.01 dB of reference tools." },
    { icon: "import", name: "Auto-import", detail: "New downloads move into the library on their own." },
    { icon: "watch", name: "Folder watching", detail: "Unplugging a drive never empties your library." },
    { icon: "exclusive", name: "Exclusive mode (macOS)", detail: "On external DACs, no other app mixes into the sound." },
    { icon: "device", name: "Per-device profiles", detail: "Mac speakers, headphones, HDMI, USB DAC or Bluetooth, each remembered." },
    { icon: "keyboard", name: "Keyboard shortcuts (macOS)", detail: "Space to play, arrows to seek 10 s (30 s with Shift), Cmd + arrows for tracks and volume." },
    { icon: "media", name: "Media keys & Now Playing (macOS)", detail: "Keyboard media keys and the Control Center widget." },
    { icon: "tags", name: "Tag editing", detail: "Serato, Rekordbox and Traktor data left untouched." },
    { icon: "headphones", name: "Headphone cueing", detail: "On a second output, with the delay between the two cards compensated." },
  ],
  moreFeaturesLabel: "Everything else",
  moreViewsLabel: "More views",
  moreViews: [
    { title: "Statistics", image: "/screens/stats.png" },
    { title: "Smart Playlists", image: "/screens/smart-playlist.png" },
    { title: "Artwork", image: "/screens/covers.png" },
    { title: "History", image: "/screens/history.png" },
    { title: "Musical styles", image: "/screens/styles.png" },
    { title: "Favorites", image: "/screens/favorites.png" },
  ],
  featureHighlight: [
    {
      id: "hi-fi",
      eyebrow: "Hi-fi",
      title: "Bit-perfect, and verified.",
      description:
        "The app sets your sound card to each track's sample rate and sends the samples as they are: no conversion, no software volume. The mode is always shown: Bit-perfect, Resampled 192 → 96 kHz, or Bluetooth (compressed). Nothing is hidden.",
      imageSrc: "/screens/player.png",
      imageAlt: "Player with output quality indicator and VU meter",
      imageWidth: 1920,
      imageHeight: 1200,
      direction: "rtl" as const,
      // Panneau de specs dessiné en SVG à côté de la capture.
      specs: [
        { label: "Files played", value: "16/44.1 → 32/768", unit: "bit / kHz" },
        { label: "Fallback resampler noise", value: "−141", unit: "dB" },
        { label: "Integer output on macOS", value: "24", unit: "effective bits" },
        { label: "DSD", value: "DSD64 → 256", unit: "DoP" },
      ],
      modes: ["Bit-perfect", "Resampled 192 → 96 kHz", "Bluetooth (compressed)"],
    },
    {
      id: "dj",
      eyebrow: "DJ",
      title: "A real mixer.",
      description:
        "Two decks with tempo and phase SYNC, keylock, 8 hot cues, 1 to 16-beat loops locked to the grid, a 3-band EQ with KILL, and headphone cueing on a second output. Tracks stay at 24-bit with dither.",
      imageSrc: "/screens/dj-mixer.png",
      imageAlt: "DJ Mixer with two decks and stacked color waveforms",
      imageWidth: 1920,
      imageHeight: 1200,
      direction: "ltr" as const,
      stats: [
        { value: "8", label: "hot cues per deck" },
        { value: "1–16", label: "beat loops on the grid" },
        { value: "11 ms", label: "from press to sound" },
        { value: "3-band", label: "EQ with KILL" },
      ],
    },
    {
      id: "collection",
      eyebrow: "Collection",
      title: "A collection that stays clean.",
      description:
        "BPM, beat grid and Camelot key analyzed automatically. Tags completed from MusicBrainz and Discogs, keeping only the artist's official album, never a random compilation. High-resolution artwork.",
      imageSrc: "/screens/bpm.png",
      imageAlt: "BPM analysis view with tempo and Camelot key for each track",
      imageWidth: 1920,
      imageHeight: 1200,
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
        "Lows in red, mids in green, highs in blue: read a track's structure at a glance.",
      imageSrc: "/screens/waveform-color.png",
      imageAlt:
        "Color waveform of a track, with the overview, the zoomed view with hot cues and the full-track strip",
      fullWidth: true,
      chips: ["Low", "Mid", "High"],
      note: "Click anywhere on the waveform to jump there.",
    },
    {
      title: "Hi-fi streaming over DLNA / OpenHome",
      content:
        "The file reaches your streamer untouched, up to 24/384 and DSD, with gapless playback.",
      imageSrc: "/screens/cast.png",
      imageAlt:
        "Play on a network streamer dialog showing Bit-perfect, 24-bit / 192 kHz, FLAC",
      fullWidth: false,
      chips: ["DLNA / UPnP", "OpenHome", "Gapless"],
      note: "OpenHome devices (Linn, Naim, Audiolab, Cambridge…) receive the whole queue.",
    },
    {
      title: "DSD",
      content:
        "DSF and DFF playback, DoP to compatible DACs, high-quality PCM conversion for the rest.",
      imageSrc: "/screens/vu-meter.png",
      imageAlt: "VU meter states",
      fullWidth: false,
      chips: ["DSF", "DFF", "DoP v1.1", "DSD64–256"],
      note: "PCM conversion keeps in-band noise at −123 dB.",
    },
    {
      title: "Harmonic mixing",
      content:
        "The Camelot wheel suggests the tracks that fit the one you're playing.",
      imageSrc: "/screens/harmonic-mix.png",
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
      image: "/screens/player.png",
      // Zone affichée dans la capture, en pixels source : [x, y, largeur].
      size: [1920, 1200],
      crop: [960, 20, 960],
    },
    {
      id: 2,
      text: "Go from listening to mixing without stopping the music.",
      detail:
        "The track carries on on deck A or B, at the same position. It works the other way too.",
      image: "/screens/dj-mixer-relay.png",
      size: [2554, 1594],
      crop: [0, 168, 1500],
    },
    {
      id: 3,
      text: "Find any track among 50,000 in an instant.",
      detail:
        "The library opens in about 100 ms. Filter by genre, format, key and BPM range.",
      image: "/screens/library-idle.png",
      size: [2558, 1602],
      crop: [330, 610, 1700],
    },
    {
      id: 4,
      text: "Keep your cues and notes when you rename a file.",
      detail:
        "Renamed or moved files keep their favorites, ratings, BPM, hot cues, playlists and history.",
      image: "",
      size: [0, 0],
      crop: [0, 0, 0],
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
  pricingNote: "Prices are indicative until launch.",
  pricing: [
    {
      name: "Trial",
      href: "#cta",
      price: "Free",
      period: "14 days",
      yearlyPrice: "Free",
      features: [
        "Every feature unlocked",
        "Bit-perfect playback and DSD",
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
      buttonText: "Notify me at launch",
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
        "Waitlist-only launch price",
        "Early builds before release",
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
          kHz, plus DSD as DSF and DFF. On macOS, 32-bit files play with 24
          effective bits, and the app says so. Opus and WMA are not supported
          yet.
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
          Any DLNA / UPnP streamer is. Those that support OpenHome (Linn, Naim,
          Audiolab, Cambridge…) receive the full queue.
        </span>
      ),
    },
    {
      question: "Can I DJ with it?",
      answer: (
        <span>
          Yes: two decks, SYNC, keylock, hot cues, loops, EQ and headphone
          cueing. Hardware DJ controllers are not supported.
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
          macOS on Apple Silicon at launch. Windows and Linux versions are on
          the way: join the waitlist to hear when they’re ready.
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
    successDetail: "One email at launch. Nothing else.",
    fineprint: "Used only to tell you about the launch. Never shared.",
    platformsLabel: "Tell me when it's on…",
    platforms: [
      { id: "macos", label: "macOS" },
      { id: "windows", label: "Windows" },
      { id: "linux", label: "Linux" },
    ],
    noPlatform: "Pick at least one platform.",
  },
  footerPlatform: "macOS · Windows & Linux coming soon",
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
