import type { Panorama } from "@/types";

export const SCENARIO_OVERVIEW: { internacional: Panorama; brasil: Panorama } = {
  internacional: {
    paragraphs: [
      "O ciclo atual de investimento em tecnologia é dominado por IA agêntica e infraestrutura de computação. Gartner projeta 40% dos aplicativos corporativos com agentes de tarefa específica até o fim de 2026, e mais de 60% do batch 2026 da Y Combinator é de empresas de IA. O capital segue concentrado em quem constrói sobre modelos de fundação, não em quem os treina do zero.",
      "O gargalo deixou de ser algorítmico e virou físico: energia. PwC projeta US$ 31,6 trilhões em investimento cumulativo em data centers até 2050, com eletricidade como principal restrição em toda região, à frente de capital ou chips.",
      "Em paralelo, reguladores se movem: o EU AI Act já está em vigor e serve de referência para frameworks em elaboração em outras jurisdições, incluindo o Brasil. Proficiência em ferramentas de IA também virou pré-requisito de contratação, não diferencial, com 90% dos engenheiros de software corporativos projetados para usar assistentes de IA até 2028.",
    ],
    sources: [
      { title: "Gartner Predicts 40% of Enterprise Apps Will Feature Task-Specific AI Agents by 2026", url: "https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025", publisher: "Gartner" },
      { title: "PwC says $31.6T in AI capex hits one binding limit", url: "https://www.thestreet.com/technology/pwc-ai-data-center-capex-forecast-power-constraint", publisher: "TheStreet" },
      { title: "Building Vertical AI", url: "https://www.bvp.com/assets/uploads/2026/01/BUILDING-VERTICAL-AI_PDF_BESSEMER_VENTURE_PARTNERS_BOOK_JANUARY_2026.pdf", publisher: "Bessemer Venture Partners" },
    ],
  },
  brasil: {
    paragraphs: [
      "O cenário brasileiro é mais paradoxal do que um simples atraso. Em adoção de IA agêntica, o Brasil lidera a América Latina, com 18% de integração de agentes em fluxos de trabalho (ante 13% da média global). Em infraestrutura de pagamento instantâneo, o país está anos à frente: o Pix processa mais volume que o UPI indiano e deixa o FedNow americano muito para trás. Em geração de energia limpa para data centers, 88,2% da matriz elétrica já é renovável.",
      "Ao mesmo tempo, setores regulados como saúde, jurídico e contabilidade seguem presos a software legado décadas atrás do padrão internacional, e o Marco Legal da IA (PL 2338) ainda não foi sancionado, o que cria tanto risco quanto janela de oportunidade para quem se antecipar.",
      "O país também concentra dois problemas com urgência imediata e escala global: fraude com IA sobre o próprio sucesso do Pix (perdas projetadas em R$ 11 bilhões até 2028) e um mercado de talento técnico competitivo internacionalmente, com mais de 759 mil desenvolvedores e custo 60 a 65% abaixo do americano.",
    ],
    sources: [
      { title: "Mercado de IA agêntica deve crescer 25 vezes até 2030; Brasil lidera adoção na América Latina", url: "https://tiinside.com.br/28/04/2026/mercado-de-ia-agentica-deve-crescer-25-vezes-ate-2030-brasil-lidera-adocao-na-america-latina", publisher: "TI Inside" },
      { title: "Realizing Brazil's AI Ambition Through Future-Proof Regulation", url: "https://www.itic.org/news-events/techwonk-blog/realizing-brazils-ai-ambition-through-futureproof-regulation", publisher: "ITI" },
      { title: "How to Hire Software Developers Based in Brazil in 2026 | Salary Guide & Tips", url: "https://www.revelo.com/blog/hire-software-developers-in-brazil", publisher: "Revelo" },
    ],
  },
};
