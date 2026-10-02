import { cn } from "@/lib/utils";

// Marque : un disque vu de face dont le sillon devient une forme d'onde.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("size-7", className)}
    >
      <rect width="32" height="32" rx="8" fill="#1A1D20" />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="7.5"
        stroke="#35B2C4"
        strokeOpacity="0.35"
      />
      <circle cx="16" cy="16" r="10" stroke="#35B2C4" strokeOpacity="0.25" />
      <path
        d="M6 16h3l1.5-4 2 9 2-12 2 14 2-10 1.5 6 1.5-3H26"
        stroke="#35B2C4"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
