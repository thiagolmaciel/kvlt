"use client";

import { useRef, useState } from "react";
import { ExternalLink, GitBranch, Languages, Loader2, Newspaper } from "lucide-react";
import type { AiNewsItem, NewsImportance } from "@/types";
import { TRENDS } from "@/data/trends";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import aiNewsRaw from "@/data/ai-news.json";

const aiNews = aiNewsRaw as { generatedAt: string | null; items: AiNewsItem[] };

const IMPORTANCE_ORDER: Record<NewsImportance, number> = { alta: 0, media: 1, baixa: 2 };
const IMPORTANCE_CONFIG: Record<NewsImportance, { label: string; className: string }> = {
  alta: { label: "Alta", className: "bg-primary/15 text-accent-vivid border-primary/30" },
  media: { label: "Média", className: "bg-secondary text-secondary-foreground border-transparent" },
  baixa: { label: "Baixa", className: "bg-muted text-muted-foreground border-transparent" },
};

const SORTED_NEWS = [...aiNews.items].sort(
  (a, b) => IMPORTANCE_ORDER[a.importance] - IMPORTANCE_ORDER[b.importance]
);

function ImportanceBadge({ importance }: { importance: NewsImportance }) {
  const cfg = IMPORTANCE_CONFIG[importance];
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center rounded-full border px-1.5 py-0.5 text-[10px] font-medium leading-none",
        cfg.className
      )}
    >
      {cfg.label}
    </span>
  );
}

function NewsCard({ item, onOpen }: { item: AiNewsItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-full w-72 shrink-0 flex-col justify-between gap-2 rounded-lg bg-card px-4 py-3 text-left ring-1 ring-foreground/10 transition-colors hover:border-primary/40 hover:bg-card/80"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="line-clamp-2 text-[13px] font-medium leading-snug">
          {item.title}
        </div>
        <ImportanceBadge importance={item.importance} />
      </div>
      <div className="text-[11px] text-muted-foreground">{item.source}</div>
    </button>
  );
}

type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; data: T }
  | { status: "error"; message: string };

function TranslateButton({ text }: { text: string }) {
  const [state, setState] = useState<FetchState<string>>({ status: "idle" });
  const [showTranslated, setShowTranslated] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (state.status === "done") {
      setShowTranslated((v) => !v);
      return;
    }
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Falha ao traduzir.");
      setState({ status: "done", data: data.translated });
      setShowTranslated(true);
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Falha ao traduzir.",
      });
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-accent-vivid"
      >
        {state.status === "loading" ? (
          <Loader2 className="size-3 animate-spin" />
        ) : (
          <Languages className="size-3" />
        )}
        {state.status === "done" ? (showTranslated ? "Original" : "Traduzir") : "Traduzir"}
      </button>
      {state.status === "done" && showTranslated && (
        <p className="mt-1 text-[13px] leading-relaxed text-foreground/90">{state.data}</p>
      )}
      {state.status === "error" && (
        <p className="mt-1 text-[12px] text-destructive">{state.message}</p>
      )}
    </>
  );
}

function RelevanceSkeleton() {
  return (
    <div className="flex flex-col gap-1.5 py-1">
      <div className="h-3 w-full animate-pulse rounded bg-muted" />
      <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
    </div>
  );
}

interface Relevance {
  trendSlug: string;
  relevance: string;
}

function NewsListItem({ item }: { item: AiNewsItem }) {
  const [relevance, setRelevance] = useState<FetchState<Relevance>>({ status: "idle" });
  const [incorporate, setIncorporate] = useState<FetchState<true>>({ status: "idle" });
  const fetchedRef = useRef(false);

  function handleTriggerClick() {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setRelevance({ status: "loading" });
    fetch("/api/news-relevance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: item.title, summary: item.summary }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Falha ao gerar análise.");
        setRelevance({ status: "done", data: { trendSlug: data.trendSlug, relevance: data.relevance } });
      })
      .catch((err) => {
        fetchedRef.current = false;
        setRelevance({
          status: "error",
          message: err instanceof Error ? err.message : "Falha ao gerar análise.",
        });
      });
  }

  async function handleIncorporate() {
    if (relevance.status !== "done") return;
    setIncorporate({ status: "loading" });
    try {
      const res = await fetch("/api/trend-signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trendSlug: relevance.data.trendSlug,
          newsTitle: item.title,
          newsUrl: item.url,
          source: item.source,
          relevance: relevance.data.relevance,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Falha ao incorporar.");
      setIncorporate({ status: "done", data: true });
    } catch (err) {
      setIncorporate({
        status: "error",
        message: err instanceof Error ? err.message : "Falha ao incorporar.",
      });
    }
  }

  return (
    <AccordionItem value={item.url}>
      <AccordionTrigger onClick={handleTriggerClick}>
        <span className="flex flex-1 items-start justify-between gap-2 pr-2">
          <span className="flex flex-col gap-0.5">
            <span className="text-[14px] font-medium leading-snug">{item.title}</span>
            <span className="text-[11px] text-muted-foreground">{item.source}</span>
          </span>
          <ImportanceBadge importance={item.importance} />
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[13px] leading-relaxed text-muted-foreground">{item.summary}</p>
            <TranslateButton text={`${item.title}. ${item.summary}`} />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-[11px] text-muted-foreground">
              Interessante para o projeto
            </Label>
            {relevance.status === "loading" && <RelevanceSkeleton />}
            {relevance.status === "done" && (
              <p className="text-[13px] leading-relaxed">{relevance.data.relevance}</p>
            )}
            {relevance.status === "error" && (
              <p className="text-[12px] text-destructive">{relevance.message}</p>
            )}
          </div>

          {relevance.status === "done" && (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <span className="inline-flex items-center justify-center rounded-lg border border-primary/30 bg-primary/10 px-2 py-1.5 text-center text-[12px] font-medium leading-tight text-accent-vivid">
                  {TRENDS.find((t) => t.slug === relevance.data.trendSlug)?.title ?? relevance.data.trendSlug}
                </span>
                <Button
                  onClick={handleIncorporate}
                  disabled={incorporate.status === "loading" || incorporate.status === "done"}
                >
                  {incorporate.status === "loading" ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <GitBranch className="size-3.5" />
                  )}
                  Incorporar
                </Button>
              </div>
              <Button
                variant="outline"
                nativeButton={false}
                className="w-full no-underline!"
                render={<a href={item.url} target="_blank" rel="noreferrer" />}
              >
                Acessar notícia
                <ExternalLink className="size-3.5" />
              </Button>
            </div>
          )}
          {incorporate.status === "done" && (
            <p className="text-[12px] text-accent-vivid">Incorporado.</p>
          )}
          {incorporate.status === "error" && (
            <p className="text-[12px] text-destructive">{incorporate.message}</p>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export function AiNewsBand() {
  const [open, setOpen] = useState(false);

  if (aiNews.items.length === 0) return null;

  const loop = [...aiNews.items, ...aiNews.items];

  return (
    <>
      <section className="relative -mx-6 flex h-28 w-[calc(100%+3rem)] flex-col gap-2 overflow-hidden py-1 md:-mx-10 md:w-[calc(100%+5rem)]">
        <div className="flex items-center gap-1.5 px-6 md:px-10">
          <Newspaper className="size-3.5 text-accent-vivid" />
          <h2 className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            IA hoje, últimas 24h
          </h2>
        </div>
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="animate-marquee absolute flex h-full gap-3 px-6 group-hover:[animation-play-state:paused] md:px-10">
            {loop.map((item, i) => (
              <NewsCard key={`${item.url}-${i}`} item={item} onOpen={() => setOpen(true)} />
            ))}
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>IA hoje, mais importante primeiro</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            <Accordion>
              {SORTED_NEWS.map((item) => (
                <NewsListItem key={item.url} item={item} />
              ))}
            </Accordion>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
