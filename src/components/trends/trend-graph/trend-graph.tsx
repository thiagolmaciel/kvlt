"use client";

import { useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./trend-graph.css";
import { TrendNode, type TrendNodeData } from "./trend-node";
import { ZoneLabelNode, ZoneDividerNode, AxisNode, YearTickNode } from "./guide-nodes";
import { TrendPreviewDialog } from "./trend-preview-dialog";
import type { RelevanceLevel, TrendTopic } from "@/types";

const POSITIONS: Record<string, { x: number; y: number }> = {
  "ia-agentica": { x: 40, y: 40 },
  "ia-nativa-desenvolvimento": { x: 220, y: 260 },
  "talento-remoto-nearshoring": { x: 20, y: 480 },
  "seguranca-fraude-ia": { x: 300, y: 20 },
  "pix-infraestrutura-financeira": { x: 260, y: 540 },
  "ia-vertical-saas": { x: 560, y: 60 },
  "governanca-regulacao-ia": { x: 660, y: 300 },
  "upskilling-corporativo-ia": { x: 540, y: 520 },
  "edge-ai-modelos-pequenos": { x: 920, y: 180 },
  "energia-datacenters-ia": { x: 980, y: 440 },
};

const LINKS: [string, string][] = [
  ["ia-agentica", "ia-nativa-desenvolvimento"],
  ["ia-nativa-desenvolvimento", "talento-remoto-nearshoring"],
  ["seguranca-fraude-ia", "pix-infraestrutura-financeira"],
  ["ia-vertical-saas", "governanca-regulacao-ia"],
  ["edge-ai-modelos-pequenos", "energia-datacenters-ia"],
  ["talento-remoto-nearshoring", "upskilling-corporativo-ia"],
];

const CANVAS_TOP = -70;
const CANVAS_BOTTOM = 620;
const AXIS_Y = 660;

const ZONES = [
  { x: 0, label: "CURTO PRAZO", years: "já em curso – 2027" },
  { x: 480, label: "MÉDIO PRAZO", years: "2027 – 2030" },
  { x: 840, label: "LONGO PRAZO", years: "2030 – 2036" },
];

const DIVIDERS = [460, 800];

const YEAR_TICKS = [
  { x: 0, year: "2026" },
  { x: 160, year: "2027" },
  { x: 460, year: "2028" },
  { x: 620, year: "2029" },
  { x: 800, year: "2031" },
  { x: 920, year: "2033" },
  { x: 1060, year: "2036" },
];

function combinedLevel(t: TrendTopic): RelevanceLevel {
  const order: RelevanceLevel[] = ["baixa", "media", "alta", "critica"];
  const a = order.indexOf(t.relevanceInternational.level);
  const b = order.indexOf(t.relevanceBrazil.level);
  return order[Math.max(a, b)];
}

const nodeTypes = {
  trend: TrendNode,
  zoneLabel: ZoneLabelNode,
  zoneDivider: ZoneDividerNode,
  axis: AxisNode,
  yearTick: YearTickNode,
};

export function TrendGraph({
  trends,
  className,
}: {
  trends: TrendTopic[];
  className?: string;
}) {
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);
  const previewTrend = trends.find((t) => t.slug === previewSlug) ?? null;

  const nodes: Node[] = useMemo(() => {
    const guideNodes: Node[] = [
      {
        id: "axis-line",
        type: "axis",
        position: { x: 0, y: AXIS_Y },
        data: { width: 1090 },
        draggable: false,
        selectable: false,
        zIndex: -1,
      },
      ...YEAR_TICKS.map((t) => ({
        id: `tick-${t.year}`,
        type: "yearTick",
        position: { x: t.x, y: AXIS_Y },
        data: { year: t.year },
        draggable: false,
        selectable: false,
        zIndex: -1,
      })),
      ...DIVIDERS.map((x) => ({
        id: `divider-${x}`,
        type: "zoneDivider",
        position: { x, y: CANVAS_TOP },
        data: { height: CANVAS_BOTTOM - CANVAS_TOP },
        draggable: false,
        selectable: false,
        zIndex: -1,
      })),
      ...ZONES.map((z) => ({
        id: `zone-${z.label}`,
        type: "zoneLabel",
        position: { x: z.x, y: CANVAS_TOP },
        data: { label: z.label, years: z.years },
        draggable: false,
        selectable: false,
        zIndex: -1,
      })),
    ];

    const trendNodes: Node<TrendNodeData>[] = trends.map((t) => ({
      id: t.slug,
      type: "trend",
      position: POSITIONS[t.slug] ?? { x: 0, y: 0 },
      data: { label: t.title.split(" (")[0], icon: t.icon, level: combinedLevel(t) },
      draggable: false,
    }));

    return [...guideNodes, ...trendNodes];
  }, [trends]);

  const edges: Edge[] = useMemo(
    () =>
      LINKS.filter(([a, b]) => POSITIONS[a] && POSITIONS[b]).map(([a, b]) => ({
        id: `${a}-${b}`,
        source: a,
        target: b,
        type: "straight",
        style: { stroke: "var(--border)", strokeWidth: 1 },
      })),
    []
  );

  return (
    <>
      <div className={className}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => {
            if (node.type === "trend") setPreviewSlug(node.id);
          }}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.4}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
          nodesConnectable={false}
          elementsSelectable
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1} className="opacity-40" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      <TrendPreviewDialog
        trend={previewTrend}
        onOpenChange={(open) => !open && setPreviewSlug(null)}
      />
    </>
  );
}
