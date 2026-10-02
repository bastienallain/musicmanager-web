"use client";

import { LogoMark } from "@/components/logo-mark";
import { MobileDrawer } from "@/components/mobile-drawer";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-white/[0.06] bg-background/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between gap-6 px-4">
        <Link
          href="/"
          aria-label={`${siteConfig.name}, home`}
          className="flex shrink-0 items-center gap-2.5"
        >
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="#cta"
            className="hidden h-8 items-center gap-2 rounded-full border border-deck-a/40 bg-deck-a/10 px-3.5 text-[13px] font-medium text-deck-a transition-colors hover:bg-deck-a/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
          >
            <span className="size-1.5 rounded-full bg-deck-a" aria-hidden />
            {siteConfig.cta}
          </Link>
          <div className="md:hidden">
            <MobileDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
