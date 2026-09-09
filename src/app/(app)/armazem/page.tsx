import { HardDrive, Link2, StickyNote, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WAREHOUSE_ITEMS } from "@/data/warehouse";
import type { WarehouseItem } from "@/types";

const ICONS = {
  drive: HardDrive,
  link: Link2,
  nota: StickyNote,
} as const;

const STATUS_STYLE: Record<WarehouseItem["status"], string> = {
  ativo: "bg-primary/15 text-accent-vivid border-primary/30",
  esboço: "bg-secondary text-secondary-foreground border-transparent",
  pendente: "bg-muted text-muted-foreground border-transparent",
};

function Column({
  category,
  label,
}: {
  category: WarehouseItem["category"];
  label: string;
}) {
  const Icon = ICONS[category];
  const items = WAREHOUSE_ITEMS.filter((i) => i.category === category);
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-[15px] font-medium">
        <Icon className="size-4 text-accent-vivid" />
        {label}
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[15px] font-medium leading-snug">
                  {item.title}
                </span>
                <Badge
                  variant="outline"
                  className={`shrink-0 text-[11px] ${STATUS_STYLE[item.status]}`}
                >
                  {item.status}
                </Badge>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              {item.tags && item.tags.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1 text-[13px] text-accent-vivid hover:underline"
                >
                  Abrir <ExternalLink className="size-3" />
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ArmazemPage() {
  return (
    <div>
      <PageHeader
        title="Armazém"
        description="Drives, links de referência e anotações operacionais. Cresce conforme decisões concretas forem tomadas."
      />
      <div className="px-6 py-6 md:px-10 grid gap-8 md:grid-cols-3">
        <Column category="drive" label="Drives" />
        <Column category="link" label="Links" />
        <Column category="nota" label="Anotações" />
      </div>
    </div>
  );
}
