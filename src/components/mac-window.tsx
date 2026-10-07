import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";

interface MacWindowProps {
  // Import statique : largeur, hauteur et aperçu flou fournis par le build.
  src: StaticImageData;
  alt: string;
  // Largeur réelle d'affichage, obligatoire : chaque section donne la sienne.
  sizes: string;
  className?: string;
  // Réservé à l'image LCP (hero) : précharge au lieu du chargement différé.
  preload?: boolean;
  // Lueur colorée derrière la fenêtre (deck A par défaut).
  glow?: "a" | "b" | "none";
  // Les captures de l'app ont déjà leurs feux tricolores : pas de barre ajoutée.
  chrome?: boolean;
}

export function MacWindow({
  src,
  alt,
  sizes,
  className,
  preload,
  glow = "a",
  chrome = false,
}: MacWindowProps) {
  return (
    <div className={cn("relative", className)}>
      {glow !== "none" && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-x-[8%] -inset-y-[12%] -z-10 rounded-[50%] opacity-40 blur-3xl",
            glow === "a" ? "bg-deck-a/40" : "bg-deck-b/40"
          )}
        />
      )}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-black/60">
        {chrome && (
          <div
            aria-hidden
            className="flex h-7 items-center gap-1.5 border-b border-white/5 bg-raised px-3"
          >
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          quality={85}
          // Pas de flou sur l'image LCP : elle doit être peinte nette tout de suite.
          placeholder={preload ? "empty" : "blur"}
          preload={preload}
          loading={preload ? "eager" : "lazy"}
          fetchPriority={preload ? "high" : "auto"}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
