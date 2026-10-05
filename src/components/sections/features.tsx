import { Section } from "@/components/section";
import { siteConfig } from "@/lib/config";
import {
  ChartColumnIcon,
  CirclePlayIcon,
  CopyCheckIcon,
  EraserIcon,
  FileAudioIcon,
  FileSearchIcon,
  FolderInputIcon,
  GaugeIcon,
  HardDriveDownloadIcon,
  HeadphonesIcon,
  HistoryIcon,
  KeyboardIcon,
  ListFilterIcon,
  LockIcon,
  SpeakerIcon,
  TagsIcon,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

// Les icônes de `moreFeatures` sont des clés texte, résolues ici.
const moreIcons: Record<string, LucideIcon> = {
  smart: ListFilterIcon,
  history: HistoryIcon,
  stats: ChartColumnIcon,
  duplicates: CopyCheckIcon,
  cleanup: EraserIcon,
  convert: FileAudioIcon,
  export: HardDriveDownloadIcon,
  gain: GaugeIcon,
  import: FolderInputIcon,
  watch: FileSearchIcon,
  exclusive: LockIcon,
  device: SpeakerIcon,
  keyboard: KeyboardIcon,
  media: CirclePlayIcon,
  tags: TagsIcon,
  headphones: HeadphonesIcon,
};

export function Features() {
  const { title, subtitle, description } = siteConfig.featuresSection;
  const total = String(siteConfig.features.length).padStart(2, "0");

  return (
    <Section
      id="features"
      title={title}
      subtitle={subtitle}
      description={description}
      align="center"
      className="mx-auto max-w-screen-lg px-4 sm:px-6"
    >
      {/* Grille principale : cellules séparées par des filets, comme une façade d'appareil. */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.features.map(({ name, description, icon }, index) => (
          <div
            key={name}
            className="group flex flex-col gap-4 bg-background p-6 transition-colors duration-300 hover:bg-surface sm:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-lg bg-surface text-muted-foreground ring-1 ring-white/[0.08] transition-colors duration-300 group-hover:text-deck-a group-hover:ring-deck-a/40">
                {icon}
              </span>
              <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground/70">
                {String(index + 1).padStart(2, "0")} / {total}
              </span>
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {name}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {siteConfig.moreFeaturesLabel}
        </h3>
        <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.moreFeatures.map(({ icon, name, detail }) => {
            const Icon = moreIcons[icon] ?? ListFilterIcon;
            return (
              <li
                key={name}
                className="flex gap-3 border-t border-white/[0.06] py-4"
              >
                <Icon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-deck-a"
                  strokeWidth={1.75}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{name}</p>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
                    {detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-16">
        <h3 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {siteConfig.moreViewsLabel}
        </h3>
        <ul
          className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:scroll-px-6 [scrollbar-color:rgba(255,255,255,0.15)_transparent] [scrollbar-width:thin] sm:-mx-6 sm:px-6"
          tabIndex={0}
          aria-label={siteConfig.moreViewsLabel}
        >
          {siteConfig.moreViews.map(({ title, image }) => (
            <li key={title} className="w-[78vw] max-w-[380px] shrink-0 snap-start">
              <figure className="space-y-2">
                <div className="overflow-hidden rounded-lg ring-1 ring-white/[0.08]">
                  <Image
                    src={image}
                    alt={`${title} view`}
                    width={2560}
                    height={1720}
                    sizes="380px"
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {title}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
