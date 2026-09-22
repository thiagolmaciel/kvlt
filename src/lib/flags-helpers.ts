import { ROADMAP_THIAGO, ROADMAP_RODRIGO } from "@/data/roadmaps";
import { WAREHOUSE_ITEMS } from "@/data/warehouse";
import { TRENDS } from "@/data/trends";
import { getAllTrendSignals } from "@/lib/trend-signals";

export type Founder = "thiago" | "rodrigo";

export const ROADMAPS: Record<Founder, typeof ROADMAP_THIAGO> = {
  thiago: ROADMAP_THIAGO,
  rodrigo: ROADMAP_RODRIGO,
};

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function countRoadmapPending(founder: Founder, flags: Record<string, unknown>) {
  let n = 0;
  ROADMAPS[founder].milestones.forEach((m, mi) =>
    m.tracks.forEach((t, ti) =>
      t.items.forEach((_, ii) => {
        if (!flags[`roadmap:${founder}:${mi}:${ti}:${ii}`]) n++;
      })
    )
  );
  return n;
}

export function countWarehousePending(flags: Record<string, unknown>) {
  return WAREHOUSE_ITEMS.filter((w) => w.status === "pendente" || w.status === "esboço").filter(
    (w) => !flags[`warehouse:${slugify(w.title)}`]
  ).length;
}

export function countSignalsPending(flags: Record<string, unknown>) {
  return getAllTrendSignals().filter((s) => !flags[`signal:${s.id}:seen`]).length;
}

export function countIdeasPending(flags: Record<string, unknown>) {
  return TRENDS.flatMap((t) => t.suggestedIdeas.map((_, i) => `idea:${t.slug}:${i}`)).filter(
    (key) => !flags[key]
  ).length;
}

export type FocusSource = "tarefa" | "guia";

export interface FocusCandidate {
  key: string;
  label: string;
  link?: string;
  provider?: string;
  source: FocusSource;
  defaultDays: number;
}

export interface FocusEntry {
  label: string;
  link?: string;
  provider?: string;
  source: FocusSource;
  startedAt: string;
  deadlineDays: number;
}

export function focusFlagKey(founder: Founder, itemKey: string) {
  return `focus:${founder}:${itemKey}`;
}

export function getFocusCandidates(founder: Founder): FocusCandidate[] {
  const milestone = ROADMAPS[founder].milestones[0];
  const candidates: FocusCandidate[] = [];

  milestone.tracks.forEach((t, ti) =>
    t.items.forEach((item, ii) => {
      candidates.push({
        key: `task:0:${ti}:${ii}`,
        label: item,
        source: "tarefa",
        defaultDays: 3,
      });
    })
  );

  milestone.resources.forEach((r, ri) => {
    candidates.push({
      key: `guide:0:${ri}`,
      label: r.title,
      link: r.url,
      provider: r.provider,
      source: "guia",
      defaultDays: 7,
    });
  });

  return candidates;
}

export function daysLeft(entry: FocusEntry) {
  const started = new Date(entry.startedAt).getTime();
  const elapsedDays = (Date.now() - started) / (24 * 60 * 60 * 1000);
  return Math.ceil(entry.deadlineDays - elapsedDays);
}
