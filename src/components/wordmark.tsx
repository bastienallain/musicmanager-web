import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  const [first, second] = siteConfig.wordmark;
  return (
    <span className={cn("font-semibold tracking-tight", className)}>
      {first}
      <span className="text-deck-a">{second}</span>
    </span>
  );
}
