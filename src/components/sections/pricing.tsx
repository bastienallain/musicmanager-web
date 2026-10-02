"use client";

import { Section } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { CheckIcon } from "lucide-react";

// Vis de façade aux quatre coins, comme sur un panneau de rack.
function Screws() {
  const corners = [
    "left-2.5 top-2.5",
    "right-2.5 top-2.5",
    "left-2.5 bottom-2.5",
    "right-2.5 bottom-2.5",
  ];
  return (
    <>
      {corners.map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={cn(
            "absolute size-1.5 rounded-full bg-raised shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-black/40",
            pos
          )}
        />
      ))}
    </>
  );
}

// Règle graduée fine, en guise de séparateur.
function Scale({ lit }: { lit: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "my-6 h-2 w-full",
        lit ? "text-deck-a/50" : "text-muted-foreground/25"
      )}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, currentColor 0 1px, transparent 1px 8px), repeating-linear-gradient(to right, currentColor 0 1px, transparent 1px 40px)",
        backgroundSize: "100% 4px, 100% 8px",
        backgroundPosition: "0 100%, 0 100%",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

export function Pricing() {
  const reduceMotion = useReducedMotion();
  const { title, subtitle, description } = siteConfig.pricingSection;

  return (
    <Section
      id="pricing"
      title={title}
      subtitle={subtitle}
      description={description}
      className="container mx-auto max-w-[var(--max-container-width)] px-4 sm:px-10"
    >
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:items-stretch">
        {siteConfig.pricing.map((plan, index) => {
          const featured = plan.isPopular;
          return (
            <motion.article
              key={plan.name}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className={cn(
                "relative flex flex-col rounded-xl border bg-surface p-6 pt-5 sm:p-7 sm:pt-6",
                "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.035),transparent_120px)]",
                featured
                  ? "border-deck-a/50 shadow-[0_0_0_1px_rgba(53,178,196,0.25),0_24px_70px_-24px_rgba(53,178,196,0.45)] md:-translate-y-3"
                  : "border-border"
              )}
            >
              <Screws />

              <header className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className={cn(
                      "size-2 rounded-full",
                      featured
                        ? "bg-deck-a shadow-[0_0_8px_2px_rgba(53,178,196,0.6)] animate-pulse motion-reduce:animate-none"
                        : "bg-raised ring-1 ring-white/5"
                    )}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    CH {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                {featured && (
                  <span className="rounded-full border border-deck-a/40 bg-deck-a/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-deck-a">
                    Recommended
                  </span>
                )}
              </header>

              <h3 className="mt-6 text-lg font-medium text-foreground">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline gap-2 font-mono">
                <span
                  className={cn(
                    "text-5xl font-medium tracking-tight tabular-nums",
                    featured ? "text-foreground" : "text-foreground/90"
                  )}
                >
                  {plan.price}
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  / {plan.period}
                </span>
              </div>

              <Scale lit={featured} />

              <ul className="flex-1 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon
                      aria-hidden
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        featured ? "text-deck-a" : "text-muted-foreground"
                      )}
                    />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={cn(
                  buttonVariants({
                    variant: featured ? "default" : "outline",
                  }),
                  "mt-8 w-full rounded-lg",
                  !featured && "bg-transparent hover:border-deck-a/40"
                )}
              >
                {plan.buttonText}
              </a>
            </motion.article>
          );
        })}
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center font-mono text-xs leading-6 text-muted-foreground">
        {siteConfig.pricingNote}
      </p>
    </Section>
  );
}
