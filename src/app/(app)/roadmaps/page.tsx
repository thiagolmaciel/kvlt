import { PageHeader } from "@/components/site/page-header";
import { RoadmapView } from "@/components/roadmap/roadmap-view";
import { ROADMAP_THIAGO, ROADMAP_RODRIGO } from "@/data/roadmaps";

export default function RoadmapsPage() {
  return (
    <div>
      <PageHeader
        title="Roadmaps"
        description="Rota individual, mais eficiente possível, até o nível de maestria técnica/negócio exigido em cada estágio da empresa."
      />
      <div className="px-6 py-6 md:px-8 max-w-3xl">
        <RoadmapView thiago={ROADMAP_THIAGO} rodrigo={ROADMAP_RODRIGO} />
      </div>
    </div>
  );
}
