"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";
import { CommandPalette } from "@/components/site/command-palette";
import { ThemeToggle } from "@/components/site/theme-toggle";
import {
  LayoutDashboard,
  Radar,
  Route,
  Archive,
  Newspaper,
} from "lucide-react";

const NAV_ICONS = {
  "layout-dashboard": LayoutDashboard,
  radar: Radar,
  route: Route,
  archive: Archive,
  newspaper: Newspaper,
} as const;

function currentItem(pathname: string) {
  return NAV_ITEMS.find(
    (n) => pathname === n.href || pathname.startsWith(n.href + "/")
  );
}

export function AppTopbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const item = currentItem(pathname);
  const Icon = item ? NAV_ICONS[item.icon] : LayoutDashboard;

  return (
    <div className="relative flex h-14 shrink-0 items-center gap-3 border-b border-border/60 px-4 md:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={<Button variant="ghost" size="icon" className="md:hidden -ml-2" />}
        >
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 bg-sidebar">
          <SheetHeader className="px-5 h-14 flex items-center border-b border-sidebar-border">
            <SheetTitle className="text-base font-semibold tracking-widest">
              KVLT
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-3 py-4">
            {NAV_ITEMS.map((n) => {
              const active =
                pathname === n.href || pathname.startsWith(n.href + "/");
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-[15px]",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-sidebar-accent/60"
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="hidden items-center gap-1.5 text-[13px] text-muted-foreground md:flex">
        <Link href="/dashboard" className="hover:text-foreground">
          KVLT
        </Link>
        <ChevronRight className="size-3" />
        <span className="inline-flex items-center gap-1.5 text-foreground">
          <Icon className="size-3.5 text-accent-vivid" />
          {item?.label ?? "Visão Geral"}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <CommandPalette />
        <ThemeToggle />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}
