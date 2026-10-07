"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { easeInOutCubic } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

const WHITESPACE = /\s+/g;
const reveal = { ease: easeInOutCubic };

export function Section({
  id,
  title,
  subtitle,
  description,
  children,
  className,
  align,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();

  const sectionId = title ? title.toLowerCase().replace(WHITESPACE, "-") : id;
  const alignmentClass =
    align === "left"
      ? "text-left"
      : align === "right"
      ? "text-right"
      : "text-center";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.1], [0, 0, 1], reveal);
  const y = useTransform(scrollYProgress, [0, 0.05, 0.1], [30, 30, 0], reveal);
  const style = { opacity, y: reduce ? 0 : y };

  return (
    <section id={id || sectionId} ref={ref} className="relative">
      <div className={cn("sm:py-20 py-12", className)}>
        {(title || subtitle || description) && (
          <div className={cn(alignmentClass, "space-y-4 pb-10 mx-auto")}>
            {title && (
              <motion.h2
                className="text-xs text-primary text-balance font-mono font-semibold tracking-wider uppercase"
                style={style}
              >
                {title}
              </motion.h2>
            )}

            {subtitle && (
              <motion.h3
                className={cn(
                  "mx-0 mt-4 max-w-lg text-5xl text-balance font-bold sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tighter text-foreground",
                  align !== "left" && align !== "right"
                    ? "mx-auto"
                    : align === "right"
                    ? "ml-auto"
                    : ""
                )}
                style={style}
              >
                {subtitle}
              </motion.h3>
            )}
            {description && (
              <motion.p
                className={cn(
                  "mt-6 text-lg leading-8 text-muted-foreground text-balance max-w-2xl",
                  align !== "left" && align !== "right"
                    ? "mx-auto"
                    : align === "right"
                    ? "ml-auto"
                    : ""
                )}
                style={style}
              >
                {description}
              </motion.p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
