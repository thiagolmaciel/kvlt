export type Stage = "money-maker" | "enterprise" | "entity" | "big-tech";

export const STAGES: { id: Stage; label: string; years: string }[] = [
  { id: "money-maker", label: "Bootstrap", years: "1–2 anos" },
  { id: "enterprise", label: "Scale-up", years: "2–4 anos" },
  { id: "entity", label: "Corporação", years: "3–6 anos" },
  { id: "big-tech", label: "Big Tech", years: "6+ anos" },
];

export type Horizon = "curto" | "medio" | "longo";

export const HORIZONS: Record<Horizon, { label: string; years: string }> = {
  curto: { label: "Curto prazo", years: "já em curso – 2027" },
  medio: { label: "Médio prazo", years: "2027 – 2030" },
  longo: { label: "Longo prazo", years: "2030 – 2036" },
};

export type RelevanceLevel = "baixa" | "media" | "alta" | "critica";

export interface RelevanceScore {
  level: RelevanceLevel;
  note: string;
}

export interface Source {
  title: string;
  url: string;
  publisher?: string;
}

export interface StudyResource {
  title: string;
  provider: string;
  url: string;
  format: string;
  note?: string;
}

export interface StageRelevance {
  stage: Stage;
  note: string;
}

export type TrendIcon =
  | "bot"
  | "code-2"
  | "shield-alert"
  | "banknote"
  | "layers"
  | "scale"
  | "cpu"
  | "globe"
  | "zap"
  | "graduation-cap";

export interface Panorama {
  paragraphs: string[];
  sources: Source[];
}

export interface SuggestedIdea {
  title: string;
  description: string;
}

export interface TrendTopic {
  slug: string;
  title: string;
  pillar: string;
  icon: TrendIcon;
  horizon: Horizon;
  summary: string;
  relevanceInternational: RelevanceScore;
  relevanceBrazil: RelevanceScore;
  brazilGapNote: string;
  panorama: {
    internacional: Panorama;
    brasil: Panorama;
  };
  stageRelevance: StageRelevance[];
  studyPath: StudyResource[];
  suggestedIdeas: SuggestedIdea[];
}

export type RoadmapLevel = "fundacao" | "consolidacao" | "maestria" | "lideranca";

export interface RoadmapTrack {
  label: string;
  icon: "code-2" | "briefcase" | "users" | "brain";
  items: string[];
}

export interface RoadmapMilestone {
  period: string;
  level: RoadmapLevel;
  title: string;
  goal: string;
  tracks: RoadmapTrack[];
  resources: StudyResource[];
}

export interface FounderRoadmap {
  name: string;
  role: string;
  currentSnapshot: string;
  philosophy: string;
  milestones: RoadmapMilestone[];
}

export interface WarehouseItem {
  category: "drive" | "link" | "nota";
  title: string;
  description: string;
  url?: string;
  status: "esboço" | "ativo" | "pendente";
  tags?: string[];
}

export interface InfoSource {
  name: string;
  region: "brasil" | "internacional";
  category: string;
  url: string;
  note: string;
}
