"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Radar,
  Route,
  Archive,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";

const ICONS = {
  "layout-dashboard": LayoutDashboard,
  radar: Radar,
  route: Route,
  archive: Archive,
  newspaper: Newspaper,
} as const;

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center px-5 border-b border-sidebar-border">
        <span className="text-[15px] font-semibold tracking-widest">KVLT</span>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.icon];
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon
                className={cn("size-[18px]", active ? "text-accent-vivid" : "")}
                strokeWidth={2}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4 pt-2 border-t border-sidebar-border">
        <div className="rounded-lg bg-sidebar-accent/40 px-3 py-2.5 text-[13px] leading-relaxed text-muted-foreground">
          Uso exclusivo <span className="text-foreground">Th.</span> &{" "}
          <span className="text-foreground">Rd.</span>
          <br />
          Ambiente mutável por estágio.
        </div>
      </div>
    </aside>
  );
}
