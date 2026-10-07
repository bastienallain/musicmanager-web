"use client";

import { Wordmark } from "@/components/wordmark";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/config";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger
        aria-label="Open menu"
        className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <MenuIcon className="size-5" />
      </DrawerTrigger>
      <DrawerContent className="border-white/10 bg-surface">
        <DrawerHeader className="px-6 text-left">
          <DrawerTitle className="flex items-center gap-2.5">
            <Wordmark className="text-lg" />
          </DrawerTitle>
        </DrawerHeader>
        <nav aria-label="Mobile" className="px-6">
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <DrawerClose asChild>
                  <Link
                    href={item.href}
                    className="flex h-12 items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                    <span aria-hidden className="text-deck-a/60">
                      →
                    </span>
                  </Link>
                </DrawerClose>
              </li>
            ))}
          </ul>
        </nav>
        <DrawerFooter className="px-6 pb-8">
          <DrawerClose asChild>
            <Link
              href="#cta"
              className="inline-flex h-11 items-center justify-center rounded-full bg-deck-a text-sm font-semibold text-background transition-colors hover:bg-deck-a/90"
            >
              {siteConfig.cta}
            </Link>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
