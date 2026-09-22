"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Archive,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  Newspaper,
  Radar,
  Route,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WAREHOUSE_ITEMS } from "@/data/warehouse";
import { TRENDS } from "@/data/trends";
import { getAllTrendSignals } from "@/lib/trend-signals";
import { useFlags } from "@/lib/use-flags";
import {
  ROADMAPS,
  slugify,
  focusFlagKey,
  getFocusCandidates,
  daysLeft,
  type Founder,
  type FocusEntry,
} from "@/lib/flags-helpers";
import { cn } from "@/lib/utils";

function isFocusEntry(v: unknown): v is FocusEntry {
  return (
    typeof v === "object" &&
    v !== null &&
    "label" in v &&
    "startedAt" in v &&
    "deadlineDays" in v
  );
}

function CheckRow({
  done,
  onToggle,
  children,
}: {
  done: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left hover:bg-muted/60"
    >
      {done ? (
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-vivid" />
      ) : (
        <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      )}
      <span className={cn("text-[13px] leading-relaxed", done && "text-muted-foreground line-through")}>
        {children}
      </span>
    </button>
  );
}

function Section({
  icon: Icon,
  title,
  count,
  action,
  children,
}: {
  icon: React.ElementType;
  title: string;
  count?: number;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <Icon className="size-4 text-accent-vivid" />
          <h2 className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">
            {title}
          </h2>
          {typeof count === "number" && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
              {count}
            </span>
          )}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function RoadmapSection({
  founder,
  flags,
  setFlag,
}: {
  founder: Founder;
  flags: Record<string, unknown>;
  setFlag: (k: string, v: unknown) => void;
}) {
  const roadmap = ROADMAPS[founder];
  const pending = useMemo(() => {
    let n = 0;
    roadmap.milestones.forEach((m, mi) =>
      m.tracks.forEach((t, ti) =>
        t.items.forEach((_, ii) => {
          if (!flags[`roadmap:${founder}:${mi}:${ti}:${ii}`]) n++;
        })
      )
    );
    return n;
  }, [roadmap, flags, founder]);

  const currentMilestone = roadmap.milestones[0];

  return (
    <Section
      icon={Route}
      title="Roadmap"
      count={pending}
      action={
        <Button size="xs" variant="outline" nativeButton={false} render={<Link href="/roadmaps/completo" />}>
          Roadmap completo
          <ExternalLink className="size-3" />
        </Button>
      }
    >
      <Card>
        <CardContent className="p-4">
          <div className="mb-1.5 text-[13px] font-semibold">{currentMilestone.title}</div>
          <div className="flex flex-col gap-2">
            {currentMilestone.tracks.map((t, ti) => (
              <div key={ti}>
                <div className="mb-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                  {t.label}
                </div>
                {t.items.map((item, ii) => {
                  const key = `roadmap:${founder}:0:${ti}:${ii}`;
                  return (
                    <CheckRow
                      key={key}
                      done={Boolean(flags[key])}
                      onToggle={() => setFlag(key, !flags[key])}
                    >
                      {item}
                    </CheckRow>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}

function WarehouseSection({ flags, setFlag }: { flags: Record<string, unknown>; setFlag: (k: string, v: unknown) => void }) {
  const items = WAREHOUSE_ITEMS.filter((w) => w.status === "pendente" || w.status === "esboço");
  const open = items.filter((w) => !flags[`warehouse:${slugify(w.title)}`]);

  if (items.length === 0) return null;

  return (
    <Section icon={Archive} title="Armazém pendente" count={open.length}>
      <Card>
        <CardContent className="flex flex-col gap-0.5 p-2">
          {items.map((w) => {
            const key = `warehouse:${slugify(w.title)}`;
            return (
              <CheckRow key={key} done={Boolean(flags[key])} onToggle={() => setFlag(key, !flags[key])}>
                <span className="font-medium">{w.title}</span> — {w.description}
              </CheckRow>
            );
          })}
        </CardContent>
      </Card>
    </Section>
  );
}

function SignalsSection({ flags, setFlag }: { flags: Record<string, unknown>; setFlag: (k: string, v: unknown) => void }) {
  const unseen = getAllTrendSignals().filter((s) => !flags[`signal:${s.id}:seen`]);
  if (unseen.length === 0) return null;

  return (
    <Section icon={Radar} title="Sinais não vistos" count={unseen.length}>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {unseen.map((s) => {
          const trend = TRENDS.find((t) => t.slug === s.trendSlug);
          return (
            <Card key={s.id}>
              <CardContent className="p-3.5">
                <p className="text-[13px] leading-relaxed">{s.relevance}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <Link
                    href={`/tendencias/${s.trendSlug}`}
                    className="text-[11px] text-muted-foreground hover:text-accent-vivid"
                  >
                    {trend?.title ?? s.trendSlug}
                  </Link>
                  <Button size="xs" variant="outline" onClick={() => setFlag(`signal:${s.id}:seen`, true)}>
                    Marcar visto
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

function IdeasSection({ flags, setFlag }: { flags: Record<string, unknown>; setFlag: (k: string, v: unknown) => void }) {
  const ideas = TRENDS.flatMap((t) =>
    t.suggestedIdeas.map((idea, i) => ({ idea, index: i, trendSlug: t.slug, trendTitle: t.title }))
  ).filter((x) => !flags[`idea:${x.trendSlug}:${x.index}`]);

  if (ideas.length === 0) return null;

  return (
    <Section icon={Newspaper} title="Ideias a avaliar" count={ideas.length}>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {ideas.map((x) => {
          const key = `idea:${x.trendSlug}:${x.index}`;
          return (
            <Card key={key}>
              <CardContent className="p-3.5">
                <div className="text-[13px] font-semibold">{x.idea.title}</div>
                <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
                  {x.idea.description}
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <Link
                    href={`/tendencias/${x.trendSlug}`}
                    className="text-[11px] text-muted-foreground hover:text-accent-vivid"
                  >
                    {x.trendTitle}
                  </Link>
                  <div className="flex gap-1.5">
                    <Button size="xs" variant="outline" onClick={() => setFlag(key, "discarded")}>
                      Descartar
                    </Button>
                    <Button size="xs" onClick={() => setFlag(key, "accepted")}>
                      Aceitar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

function CandidateRow({
  candidate,
  onEmbrace,
}: {
  candidate: ReturnType<typeof getFocusCandidates>[number];
  onEmbrace: () => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/60">
      <span className="flex-1 truncate text-[13px]">{candidate.label}</span>
      <span className="text-[11px] text-muted-foreground">{candidate.defaultDays} dias</span>
      <Button size="xs" onClick={onEmbrace}>
        Abraçar
      </Button>
    </div>
  );
}

function FocusSection({
  founder,
  flags,
  setFlag,
}: {
  founder: Founder;
  flags: Record<string, unknown>;
  setFlag: (k: string, v: unknown) => void;
}) {
  const prefix = `focus:${founder}:`;
  const active = Object.entries(flags)
    .filter(([k, v]) => k.startsWith(prefix) && isFocusEntry(v))
    .map(([k, v]) => ({ itemKey: k.slice(prefix.length), entry: v as FocusEntry }));

  const activeKeys = new Set(active.map((a) => a.itemKey));
  const candidates = getFocusCandidates(founder).filter((c) => !activeKeys.has(c.key));

  function embrace(candidate: ReturnType<typeof getFocusCandidates>[number]) {
    const entry: FocusEntry = {
      label: candidate.label,
      link: candidate.link,
      provider: candidate.provider,
      source: candidate.source,
      startedAt: new Date().toISOString(),
      deadlineDays: candidate.defaultDays,
    };
    setFlag(focusFlagKey(founder, candidate.key), entry);
  }

  function conclude(itemKey: string, entry: FocusEntry) {
    setFlag(focusFlagKey(founder, itemKey), false);
    if (itemKey.startsWith("task:")) {
      const [, mi, ti, ii] = itemKey.split(":");
      setFlag(`roadmap:${founder}:${mi}:${ti}:${ii}`, true);
    }
    void entry;
  }

  const candidateGuides = candidates.filter((c) => c.source === "guia");
  const candidateTasks = candidates.filter((c) => c.source === "tarefa");

  return (
    <Section icon={Sparkles} title="Foco atual" count={active.length}>
      <div className="flex flex-col gap-4">
        {active.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {active.map(({ itemKey, entry }) => {
              const left = daysLeft(entry);
              return (
                <div key={itemKey} className="overflow-hidden rounded-lg border border-primary/25">
                  <div className="bg-primary/[0.06] p-3.5">
                    <div className="text-[13px] font-medium leading-snug">{entry.label}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Clock className="size-3" />
                      {left >= 0 ? `${left} dia(s) faltando` : `${-left} dia(s) atrasado`}
                    </div>
                  </div>
                  {entry.link && (
                    <a
                      href={entry.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between border-t border-primary/20 bg-card px-3.5 py-2 text-[12px] font-medium hover:bg-muted/60"
                    >
                      {entry.provider ?? "Abrir link"}
                      <ExternalLink className="size-3 text-muted-foreground" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => conclude(itemKey, entry)}
                    className="flex w-full items-center justify-center border-t border-primary/20 bg-card px-3.5 py-2 text-[12px] font-medium text-accent-vivid hover:bg-muted/60"
                  >
                    Concluir
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {candidateGuides.length > 0 && (
          <div>
            <div className="mb-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
              Guias rápidos
            </div>
            <Card>
              <CardContent className="flex flex-col gap-0.5 p-2">
                {candidateGuides.map((c) => (
                  <CandidateRow key={c.key} candidate={c} onEmbrace={() => embrace(c)} />
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {candidateTasks.length > 0 && (
          <div>
            <div className="mb-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
              Tarefas
            </div>
            <Card>
              <CardContent className="flex flex-col gap-0.5 p-2">
                {candidateTasks.map((c) => (
                  <CandidateRow key={c.key} candidate={c} onEmbrace={() => embrace(c)} />
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Section>
  );
}


export function PersonalHome() {
  const [founder, setFounder] = useState<Founder | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { flags, loading, error, setFlag } = useFlags();

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (data.founder === "thiago" || data.founder === "rodrigo") setFounder(data.founder);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  if (authLoading || loading) {
    return <p className="px-6 py-8 text-[13px] text-muted-foreground md:px-10">Carregando…</p>;
  }
  if (!founder) {
    return (
      <p className="px-6 py-8 text-[13px] text-destructive md:px-10">
        Sessão inválida. Recarregue a página.
      </p>
    );
  }
  if (error) {
    return <p className="px-6 py-8 text-[13px] text-destructive md:px-10">{error}</p>;
  }

  return (
    <div className="flex flex-col gap-9 px-6 py-8 md:px-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[13px] font-medium uppercase tracking-wide text-accent-vivid">
            Sua home
          </div>
          <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight">
            E aí, {ROADMAPS[founder].name}.
          </h1>
        </div>
        <Link href="/roadmaps/completo" className="flex shrink-0 flex-col items-center gap-1.5 group">
          <span className="flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-accent-vivid group-hover:bg-primary/15">
            <Route className="size-6" strokeWidth={1.75} />
          </span>
          <span className="text-[11px] text-muted-foreground group-hover:text-accent-vivid">
            Roadmap completo
          </span>
        </Link>
      </div>

      <FocusSection founder={founder} flags={flags} setFlag={setFlag} />
      <RoadmapSection founder={founder} flags={flags} setFlag={setFlag} />
      <WarehouseSection flags={flags} setFlag={setFlag} />
      <SignalsSection flags={flags} setFlag={setFlag} />
      <IdeasSection flags={flags} setFlag={setFlag} />
    </div>
  );
}
