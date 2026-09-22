"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFlags } from "@/lib/use-flags";
import {
  ROADMAPS,
  countRoadmapPending,
  countWarehousePending,
  countSignalsPending,
  countIdeasPending,
  type Founder,
} from "@/lib/flags-helpers";

export function FounderPanel() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [founder, setFounder] = useState<Founder | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { flags, loading } = useFlags();

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (data.founder === "thiago" || data.founder === "rodrigo") setFounder(data.founder);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const pendingTotal = useMemo(() => {
    if (!founder || loading) return 0;
    return (
      countRoadmapPending(founder, flags) +
      countWarehousePending(flags) +
      countSignalsPending(flags) +
      countIdeasPending(flags)
    );
  }, [founder, loading, flags]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="ghost" size="icon" className="relative" />}>
        <UserRound className="size-5" />
        {pendingTotal > 0 && (
          <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-accent-vivid text-[10px] font-medium leading-none text-primary-foreground">
            {pendingTotal > 99 ? "99+" : pendingTotal}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3">
        {authLoading && <p className="text-[13px] text-muted-foreground">Carregando…</p>}
        {!authLoading && !founder && (
          <p className="text-[13px] text-destructive">Sessão inválida. Recarregue a página.</p>
        )}
        {founder && (
          <>
            <p className="text-[13px] text-muted-foreground">
              Logado como <span className="font-medium text-foreground">{ROADMAPS[founder].name}</span>
            </p>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/roadmaps" onClick={() => setOpen(false)} />}
            >
              Ir para sua home
              {pendingTotal > 0 && (
                <span className="ml-1 rounded-full bg-secondary px-1.5 text-[11px] text-muted-foreground">
                  {pendingTotal}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
