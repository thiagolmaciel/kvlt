"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
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
import { STAGES } from "@/types";

const CURRENT_STAGE = STAGES[0];

export function AppTopbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border/60 px-4 md:px-6">
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
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-[15px]",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-sidebar-accent/60"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <Link
        href="/dashboard"
        className="text-[13px] font-medium text-muted-foreground hover:text-foreground md:hidden"
      >
        KVLT
      </Link>

      <div className="ml-auto hidden items-center gap-2 text-[13px] text-muted-foreground md:flex">
        <span className="size-1.5 rounded-full bg-accent-vivid" />
        Estágio atual: <span className="text-foreground">{CURRENT_STAGE.label}</span>
      </div>
    </div>
  );
}
