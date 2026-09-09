import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INFO_SOURCES } from "@/data/sources";
import type { InfoSource } from "@/types";

function SourceGrid({ region }: { region: InfoSource["region"] }) {
  const items = INFO_SOURCES.filter((s) => s.region === region);
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((s) => (
        <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">
          <Card className="h-full transition-colors hover:border-primary/40 hover:bg-card/60">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[15px] font-medium">{s.name}</span>
                <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
              </div>
              <Badge variant="secondary" className="mt-1.5 text-[11px]">
                {s.category}
              </Badge>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {s.note}
              </p>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}

export default function FontesPage() {
  return (
    <div>
      <PageHeader
        title="Fontes"
        description="Curadoria de imprensa, pesquisa de mercado e comunidades, Brasil e internacional."
      />
      <div className="px-6 py-6 md:px-10">
        <Tabs defaultValue="internacional">
          <TabsList>
            <TabsTrigger value="internacional" className="text-[15px]">Internacional</TabsTrigger>
            <TabsTrigger value="brasil" className="text-[15px]">Brasil</TabsTrigger>
          </TabsList>
          <TabsContent value="internacional" className="mt-6">
            <SourceGrid region="internacional" />
          </TabsContent>
          <TabsContent value="brasil" className="mt-6">
            <SourceGrid region="brasil" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
