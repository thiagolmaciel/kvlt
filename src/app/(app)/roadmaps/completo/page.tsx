import { Suspense } from "react";
import { Route } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { RoadmapView } from "@/components/roadmap/roadmap-view";
import { ROADMAP_THIAGO, ROADMAP_RODRIGO } from "@/data/roadmaps";

export default function RoadmapCompletoPage() {
  return (
    <div>
      <PageHeader
        title="Roadmap completo"
        icon={Route}
        description="Rota individual, mais eficiente possível, até o nível de maestria técnica e de negócio exigido em cada estágio da empresa."
      />
      <div className="px-6 py-6 md:px-10">
        <Suspense fallback={null}>
          <RoadmapView thiago={ROADMAP_THIAGO} rodrigo={ROADMAP_RODRIGO} />
        </Suspense>
      </div>
    </div>
  );
}
