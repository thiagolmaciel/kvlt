"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { NAV_ITEMS } from "@/lib/nav";
import { TRENDS } from "@/data/trends";
import { TrendIcon } from "@/components/trends/trend-icon";
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

interface Entry {
  href: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (!next) setQuery("");
  }

  const entries = useMemo<Entry[]>(() => {
    const nav: Entry[] = NAV_ITEMS.map((n) => {
      const Icon = NAV_ICONS[n.icon];
      return { href: n.href, label: n.label, hint: "Seção", icon: <Icon className="size-4" /> };
    });
    const trends: Entry[] = TRENDS.map((t) => ({
      href: `/tendencias/${t.slug}`,
      label: t.title,
      hint: t.pillar,
      icon: <TrendIcon icon={t.icon} className="size-4" />,
    }));
    return [...nav, ...trends];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries.slice(0, 8);
    return entries
      .filter(
        (e) =>
          e.label.toLowerCase().includes(q) || e.hint.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [entries, query]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-border/70 bg-secondary/40 px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
      >
        <Search className="size-3.5" />
        <span className="hidden sm:inline">Buscar em KVLT</span>
        <kbd className="ml-1 hidden rounded border border-border/70 bg-background px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground sm:inline">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="top-[18%] max-w-2xl translate-y-0 gap-0 overflow-hidden p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Buscar</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2.5 border-b border-border/60 px-4 py-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) go(results[0].href);
              }}
              placeholder="Buscar seções, tendências..."
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-80 overflow-y-auto p-1.5">
            {results.length === 0 && (
              <div className="px-3 py-6 text-center text-[13px] text-muted-foreground">
                Nada encontrado.
              </div>
            )}
            {results.map((r) => (
              <button
                key={r.href}
                onClick={() => go(r.href)}
                className="group flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left hover:bg-secondary"
              >
                <span className="flex size-4 shrink-0 items-center justify-center text-accent-vivid">
                  {r.icon}
                </span>
                <span className="truncate text-[13.5px] font-medium">{r.label}</span>
                <span className="ml-auto shrink-0 truncate pl-3 text-[12px] text-muted-foreground">
                  {r.hint}
                </span>
                <CornerDownLeft className="size-3.5 shrink-0 text-muted-foreground opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
