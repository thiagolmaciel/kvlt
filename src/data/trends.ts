import type { TrendTopic } from "@/types";

export const TRENDS: TrendTopic[] = [
  {
    slug: "ia-agentica",
    title: "IA Agêntica (Agentic AI)",
    pillar: "Automação & Agentes",
    icon: "bot",
    horizon: "curto",
    summary:
      "Agentes de IA que executam tarefas de múltiplos passos com autonomia, não só respondem, agem. Onda dominante de investimento em 2026, e o Brasil já lidera adoção na América Latina.",
    relevanceInternational: { level: "critica", note: "Maior categoria de investimento e contratação em IA no ciclo atual." },
    relevanceBrazil: { level: "critica", note: "Brasil lidera adoção de agentes na América Latina; a lacuna é de maturidade, não de uso." },
    brazilGapNote:
      "O Brasil não está atrás em adoção bruta de agentes, está à frente da América Latina. A lacuna real é de maturidade: só cerca de 30% das empresas confiam na própria medição de ROI. Quem resolve governança e mensuração, e não apenas implementação, captura a próxima onda.",
    panorama: {
      internacional: {
        paragraphs: [
          "O mercado de IA agêntica saiu de US$ 7,6 bi (2025) para uma projeção de US$ 10,8 bi em 2026. O segmento enterprise deve ir de US$ 3,67 bi (2025) a US$ 24,5 bi até 2030, CAGR de 46,2%.",
          "Gartner projeta que 40% dos aplicativos corporativos terão agentes de tarefa específica até o fim de 2026, ante menos de 5% em 2025. Metade das empresas com IA generativa deve rodar agentes autônomos em fluxos de trabalho até 2027.",
          "Há um contraponto importante: Gartner também estima que mais de 40% dos projetos de IA agêntica podem ser cancelados até 2027 por valor pouco claro, custo alto e governança fraca. A janela é real, mas exige execução disciplinada.",
        ],
        sources: [
          { title: "Gartner Predicts 40% of Enterprise Apps Will Feature Task-Specific AI Agents by 2026", url: "https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025", publisher: "Gartner" },
          { title: "Agentic AI Enterprise Trends 2026: Market Size, Adoption, Capabilities", url: "https://keyholesoftware.com/agentic-ai-enterprise-trends-2026/", publisher: "Keyhole Software" },
          { title: "Enterprise Agentic AI Market Size: 2026 Statistics, Growth, Adoption Data", url: "https://keyholesoftware.com/enterprise-agentic-ai-market-2026/", publisher: "Keyhole Software" },
        ],
      },
      brasil: {
        paragraphs: [
          "Segundo levantamento da BCG, apenas 13% das empresas ao redor do mundo integraram agentes de IA em seus fluxos de trabalho. O Brasil está acima disso, com 18% de adoção, liderando o ranking na América Latina. Outro estudo aponta adoção de IA agêntica em 66% das empresas brasileiras.",
          "25% das empresas brasileiras já têm IA em produção, mais que o dobro do ano anterior. O mercado de IA na América Latina deve saltar de US$ 22,9 bi (2026) para US$ 135,7 bi até 2031.",
          "O entrave está na maturidade: apenas cerca de 30% das empresas brasileiras se consideram confiantes para medir com precisão o ROI de projetos de IA, e 87% ainda não acompanham a transformação em profundidade. Desafios de integração e redesenho de processo travam o ganho de escala.",
        ],
        sources: [
          { title: "Mercado de IA agêntica deve crescer 25 vezes até 2030; Brasil lidera adoção na América Latina", url: "https://tiinside.com.br/28/04/2026/mercado-de-ia-agentica-deve-crescer-25-vezes-ate-2030-brasil-lidera-adocao-na-america-latina", publisher: "TI Inside" },
          { title: "Brasil lidera adoção de IA Agêntica, mas 87% das empresas ainda não acompanham a transformação", url: "https://www.segs.com.br/seguros/448780-brasil-lidera-adocao-de-ia-agentica-mas-87-das-empresas-ainda-nao-acompanham-a-transformacao", publisher: "SEGS" },
          { title: "Com 95% já usando IA, Brasil está entre líderes de ranking de adoção dessa tecnologia", url: "https://www.ey.com/pt_br/newsroom/2026/05/ia-brasil-esta-entre-lideres-ranking-adocao-tecnologia", publisher: "EY Brasil" },
        ],
      },
    },
    stageRelevance: [
      { stage: "money-maker", note: "Consultoria e implementação de agentes verticais para PMEs brasileiras (atendimento, cobrança, back-office). Ticket rápido, pouca concorrência local especializada em governança." },
      { stage: "enterprise", note: "Produto próprio de orquestração de agentes para um nicho definido, com governança e medição de ROI embutidas." },
    ],
    studyPath: [
      { title: "Developer Deep-Dives (agentes, MCP, tool use)", provider: "Anthropic Academy", url: "https://anthropic.skilljar.com", format: "Curso gratuito + certificado", note: "Direto da fonte que define o estado da arte em agentes com Claude." },
      { title: "Documentação e specs", provider: "Model Context Protocol (Anthropic)", url: "https://modelcontextprotocol.io", format: "Documentação técnica" },
      { title: "Designing Data-Intensive Applications (Martin Kleppmann)", provider: "O'Reilly", url: "https://dataintensive.net", format: "Livro", note: "Base de sistemas distribuídos para orquestrar agentes em produção com confiabilidade." },
    ],
    suggestedIdeas: [
      { title: "Painel de governança de agentes", description: "Camada de auditoria e observabilidade (custo, alucinação, taxa de erro) plugada sobre agentes já implantados. Ataca diretamente o motivo mais citado de cancelamento de projeto." },
      { title: "Agente de cobrança e conciliação para PME", description: "Agente vertical que negocia, cobra e concilia recebíveis via WhatsApp e Pix para pequenos negócios. Ciclo de venda curto, dor comum." },
      { title: "Pacote de implementação padronizado", description: "Agente de atendimento pronto por vertical (clínica, escritório, e-commerce), instalado em duas semanas. Motor de receita recorrente para a fase Bootstrap." },
      { title: "Localização PT-BR e LGPD de frameworks", description: "Camada de compliance e prompts localizados sobre frameworks internacionais para empresas brasileiras que não podem simplesmente importar a ferramenta americana." },
    ],
  },
  {
    slug: "ia-nativa-desenvolvimento",
    title: "Desenvolvimento de Software IA-Nativo",
    pillar: "Engenharia & Produtividade",
    icon: "code-2",
    horizon: "curto",
    summary:
      "O papel de quem programa muda de escrever linha a linha para arquitetar, revisar e julgar o que a IA produz. Combinado ao custo brasileiro, é a alavanca mais direta para competir globalmente.",
    relevanceInternational: { level: "critica", note: "Já é requisito de contratação padrão nas big techs e na maioria das vagas sênior." },
    relevanceBrazil: { level: "alta", note: "Adoção de ferramentas segue o mundo de perto; maturidade de uso ainda é rara localmente." },
    brazilGapNote:
      "Custo de mão de obra sênior no Brasil é uma fração do valor internacional. Combinado com alavancagem de IA, isso cria margem competitiva real em serviços remotos e exportação de software.",
    panorama: {
      internacional: {
        paragraphs: [
          "Ferramentas de IA já aumentam produtividade em tarefas rotineiras em 20 a 45%. Gartner projeta que 90% dos engenheiros de software corporativos usarão assistentes de IA até 2028, ante menos de 14% no início de 2024.",
          "GitHub Copilot passou de 20 milhões de usuários, crescendo 400% em um ano, e hoje gera em média 46% do código escrito por usuários ativos.",
          "68% dos gestores de contratação em tecnologia já tratam proficiência em ferramentas de IA como pré-requisito em avaliação técnica. As habilidades mais valorizadas são enquadrar problema, design de sistema, revisão de código e debugging: exatamente o que IA ainda faz mal sozinha.",
        ],
        sources: [
          { title: "Working with the Machine: How AI Is Reshaping Software Developer Careers in 2026", url: "https://www.devoteam.com/expert-view/ai-impact-software-developer-careers-2026/", publisher: "Devoteam" },
          { title: "AI Impact on Software Engineering Jobs 2026: Analysis of Job Postings", url: "https://aitoolranked.com/blog/ai-impact-on-software-engineering-jobs-analysis", publisher: "AI Tool Ranked" },
        ],
      },
      brasil: {
        paragraphs: [
          "O Brasil tem mais de 759 mil desenvolvedores, o 6º maior contingente do mundo, com 55 mil formandos por ano. 80% das empresas norte-americanas já exploram ativamente soluções de nearshore, decisão hoje tomada por CTOs e VPs de Engenharia.",
          "Salários de desenvolvedores sênior brasileiros rodam 60 a 65% abaixo dos valores americanos, na faixa de US$ 3.000 a 6.000 por mês via parceiro de nearshore, com forte alinhamento cultural e compatibilidade de fuso horário com os EUA.",
          "Um time brasileiro que já entrega com alavancagem de IA compete em dois eixos ao mesmo tempo contra equipes americanas maiores: velocidade de entrega e custo.",
        ],
        sources: [
          { title: "How to Hire Software Developers Based in Brazil in 2026 | Salary Guide & Tips", url: "https://www.revelo.com/blog/hire-software-developers-in-brazil", publisher: "Revelo" },
          { title: "Why Brazil's Software Talent is Booming in 2026", url: "https://www.geekhunter.com/en/post/brazil-software-engineering-talent-2026-booming", publisher: "GeekHunter" },
        ],
      },
    },
    stageRelevance: [
      { stage: "money-maker", note: "Entregar projetos de dev com equipe enxuta e IA no fluxo inteiro, não só autocomplete. Margem maior que a concorrência tradicional de bodyshop." },
    ],
    studyPath: [
      { title: "Claude Code & Developer Track", provider: "Anthropic Academy", url: "https://anthropic.skilljar.com", format: "Curso gratuito + certificado" },
      { title: "Backend & System Design roadmap", provider: "roadmap.sh", url: "https://roadmap.sh/backend", format: "Roadmap interativo gratuito" },
      { title: "The System Design Primer", provider: "GitHub (comunidade)", url: "https://github.com/donnemartin/system-design-primer", format: "Repositório/guia gratuito" },
    ],
    suggestedIdeas: [
      { title: "Squad de entrega \"IA-first\" para clientes dos EUA", description: "Time enxuto de 2 a 3 devs sênior operando com IA no fluxo inteiro, vendido como nearshore premium. Preço abaixo do mercado americano, velocidade acima do bodyshop tradicional." },
      { title: "Auditoria de código gerado por IA", description: "Revisão e hardening de código que empresas já produziram com Copilot ou Claude sem processo de revisão. Nicho que cresce junto com a adoção desenfreada de assistentes." },
      { title: "Boilerplate proprietário multi-tenant", description: "Esqueleto reutilizável de auth, billing e permissões, construído e mantido com IA, usado para entregar projetos de cliente em dias em vez de semanas." },
    ],
  },
  {
    slug: "seguranca-fraude-ia",
    title: "Fraude com IA & Defesa (Deepfake, Golpes Pix)",
    pillar: "Segurança & Confiança",
    icon: "shield-alert",
    horizon: "curto",
    summary:
      "Deepfake e clonagem de voz viraram ferramenta de golpe em massa, globalmente e no Brasil em particular, onde o crescimento do golpe supera a maioria dos países.",
    relevanceInternational: { level: "alta", note: "US$ 3,7 bi em perdas documentadas globalmente; mercados como EUA e UE já têm players de detecção mais maduros." },
    relevanceBrazil: { level: "critica", note: "Escala de golpe via Pix é fenômeno predominantemente nacional, com poucos players locais dedicados." },
    brazilGapNote:
      "Aqui o delay se inverte: o Brasil sofre o problema em escala maior e mais cedo que muitos países, justamente por causa do sucesso do Pix. Isso cria demanda local genuína antes da oferta internacional madura chegar.",
    panorama: {
      internacional: {
        paragraphs: [
          "Perdas globais documentadas com fraude via deepfake chegaram a pelo menos US$ 3,7 bilhões, 89% registrados entre 2025 e o primeiro semestre de 2026. Cerca de 8 milhões de deepfakes circulam online em 2026, ante 500 mil em 2023: alta de 16 vezes em dois anos.",
          "Deepfakes já respondem por 6,5% de todas as tentativas de fraude no mundo, ante 0,1% em 2022. Os EUA são o país mais visado, com US$ 712 milhões em perdas, 43% direcionados ao setor corporativo.",
          "O crescimento é desigual entre países: Coreia do Sul lidera com alta de 1.625% em fraude por deepfake, seguida por Bulgária (3.000%), Portugal (1.700%) e o próprio Brasil, com 822% de crescimento, já aparecendo nas estatísticas internacionais.",
        ],
        sources: [
          { title: "Global deepfake fraud reaches $2.19B — US leads in losses", url: "https://surfshark.com/research/chart/deepfake-fraud-countries", publisher: "Surfshark" },
          { title: "Deepfake Fraud in 2026: The $3.7B Problem and How to Defend", url: "https://brside.com/blog/deepfake-fraud-losses-2026", publisher: "Brightside AI" },
        ],
      },
      brasil: {
        paragraphs: [
          "No Brasil, a fatia de deepfakes em fraudes subiu de 0,1% em março de 2025 para 6,5% dos casos em 2026. IA aparece em 42,5% das ocorrências de fraude financeira, e fraudes com deepfake caseiro cresceram 400% no primeiro semestre de 2026.",
          "Mais de 28 milhões de brasileiros já foram vítimas de golpes via Pix. A projeção é que perdas cheguem a R$ 11 bilhões até 2028, o maior crescimento de fraude em pagamentos instantâneos do mundo.",
          "Ataques em 2026 já incluem clonagem de voz em tempo real e troca facial ao vivo para golpes de falso sequestro e fraude bancária, driblando biometria. A oferta de defesa dedicada, para bancos, fintechs e PMEs, ainda é pequena.",
        ],
        sources: [
          { title: "Fatia dos deepfakes em fraudes sobe de 0,1% para 6,5%", url: "https://www.infomoney.com.br/minhas-financas/fatia-dos-deepfakes-em-fraudes-sobe-de-01-para-65-e-inflama-desconfianca/", publisher: "InfoMoney" },
          { title: "A Taxonomy of Pix Fraud in Brazil: AI-Driven Amplification and Defensive Strategies", url: "https://arxiv.org/pdf/2511.20902", publisher: "arXiv" },
          { title: "Fraudes usando 'deepfake caseiro' aumentam 400% no Brasil", url: "https://sindpd.org.br/2026/08/26/fraudes-deepfake-caseiro-brasil/", publisher: "SindPD" },
        ],
      },
    },
    stageRelevance: [
      { stage: "money-maker", note: "Nicho com sinal de rentabilidade rápida no cenário brasileiro de 2026 a 2028: verificação anti-fraude (voz, vídeo, comportamento) vendida a fintechs, bancos digitais e PMEs que operam Pix em volume." },
      { stage: "enterprise", note: "Evoluir de camada de detecção para plataforma de confiança e identidade como serviço, com portfólio de clientes financeiros." },
    ],
    studyPath: [
      { title: "OWASP Top 10 for LLM Applications", provider: "OWASP", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", format: "Guia técnico gratuito" },
      { title: "Trust & Safety / Responsible Scaling Research", provider: "Anthropic", url: "https://www.anthropic.com/research", format: "Papers e relatórios" },
    ],
    suggestedIdeas: [
      { title: "API de verificação de voz anti-clonagem", description: "Camada plugável que bancos e fintechs chamam antes de autorizar transação de alto valor por telefone ou vídeo. Venda B2B direta, dor mensurável em reais." },
      { title: "Selo de verificação para PME que recebe Pix em volume", description: "Ferramenta simples que varre padrões de golpe conhecidos para pequenos negócios sem equipe de segurança própria." },
      { title: "Treinamento anti-deepfake para RH e financeiro", description: "Workshop e simulação de golpe de executivo fraudulento para equipes financeiras de empresas médias brasileiras." },
    ],
  },
  {
    slug: "pix-infraestrutura-financeira",
    title: "Pix & Open Finance como Infraestrutura Pública",
    pillar: "Fintech & Infraestrutura",
    icon: "banknote",
    horizon: "curto",
    summary:
      "Contraexemplo direto do delay brasileiro: o Pix processa mais volume que o UPI indiano e deixa o FedNow americano muito para trás. O país constrói produtos sobre a infraestrutura de pagamento mais avançada do mundo.",
    relevanceInternational: { level: "media", note: "Modelo Pix é estudado e replicado por outros bancos centrais; construir sobre ele é oportunidade primariamente doméstica." },
    relevanceBrazil: { level: "critica", note: "Infraestrutura já madura e de altíssima adoção, base pronta para produtos financeiros e agentes de IA." },
    brazilGapNote:
      "Aqui o Brasil está à frente. A lacuna a explorar não é alcançar o exterior, é exportar o modelo e construir camadas de produto (pagamentos agênticos, automação financeira B2B) que ainda não existem nem lá fora.",
    panorama: {
      internacional: {
        paragraphs: [
          "Comparado a Pix, UPI (Índia) e FedNow (EUA), a disparidade de adoção é grande. O Pix chegou a 93% da população adulta em cinco anos, mais de 180 milhões de usuários. O UPI processou 228,3 bilhões de transações em 2025, cerca de 743 milhões por dia, 300 milhões de usuários e 691 bancos participantes.",
          "O FedNow americano tinha mais de 1.500 instituições participantes, mas processou apenas 5,14 milhões de transações entre janeiro e agosto de 2025. A Índia processa mais transações em um único dia do que o FedNow processou em toda sua existência.",
          "A diferença é estrutural: Brasil e Índia tinham grandes populações desbancarizadas com alta penetração de smartphone, onde pagamento instantâneo pôde virar o método primário. EUA e Reino Unido já tinham redes de cartão entrincheiradas, o que tornou a adoção incremental. Os sistemas seguem isolados entre si: o Pix não fala com o UPI, e o UPI não fala com o FedNow.",
        ],
        sources: [
          { title: "FedNow vs. UPI: How They Compare and a Better Way", url: "https://www.lightspark.com/knowledge/fednow-vs-upi", publisher: "Lightspark" },
          { title: "Comparing RTP systems: Pix, UPI, and FedNow", url: "https://paymentscmi.com/insights/comparing-pix-upi-fednow/", publisher: "PaymentsCMI" },
          { title: "Real-time lessons for FedNow from Brazil, India", url: "https://www.paymentsdive.com/news/federal-reserve-real-time-payments-fednow-brazil-india/716767/", publisher: "Payments Dive" },
        ],
      },
      brasil: {
        paragraphs: [
          "O Pix ultrapassou 148 milhões de usuários e mais de 30 bilhões de transações nos primeiros três anos. Em 2023 o uso cresceu 74%, chegando a quase 42 bilhões de pagamentos e superando cartões de crédito e débito somados.",
          "O Banco Central tratou pagamentos como infraestrutura pública digital, não produto proprietário, um desenho que gerou escala, inclusão e interoperabilidade em nível nacional. Mais de 40% de todos os pagamentos no Brasil já passam pelo Pix, com liquidação instantânea 24 horas por dia e custo mínimo.",
          "Essa infraestrutura hoje inspira projetos de pagamento instantâneo em outros países. O Brasil não está copiando ninguém aqui.",
        ],
        sources: [
          { title: "How Brazil built Pix into a global payments success", url: "https://paymentexpert.com/2026/08/13/how-brazil-central-bank-built-pix/", publisher: "Payment Expert" },
          { title: "Pix at five years — how Brazil built one of the world's most advanced public payments infrastructures", url: "https://www.globalbankingandfinance.com/pix-at-five-years-how-brazil-built-one-of-the-world-s-most-advanced-public-payments-infrastructures-and-why-other-countries-are-paying-attention/", publisher: "Global Banking & Finance Review" },
        ],
      },
    },
    stageRelevance: [
      { stage: "enterprise", note: "Produto de automação financeira (conciliação, cobrança recorrente, pagamentos agênticos) usando Pix e Open Finance como rampa de dados e liquidação." },
      { stage: "entity", note: "Levar o know-how de infraestrutura de pagamento instantâneo brasileira para outros mercados emergentes que ainda não têm equivalente." },
    ],
    studyPath: [
      { title: "Documentação Open Finance Brasil", provider: "Banco Central do Brasil", url: "https://openfinancebrasil.org.br", format: "Documentação técnica oficial" },
      { title: "Manual de APIs do Pix (DICT, SPI)", provider: "Banco Central do Brasil", url: "https://www.bcb.gov.br/estabilidadefinanceira/pix", format: "Documentação técnica oficial" },
    ],
    suggestedIdeas: [
      { title: "Agente de conciliação financeira via Pix e Open Finance", description: "Agente que concilia recebíveis, identifica pagamentos órfãos e dispara cobrança automática para pequenas empresas." },
      { title: "Exportar o modelo Pix para mercado emergente", description: "Consultoria de arquitetura de pagamento instantâneo para bancos ou fintechs de outros países da América Latina que querem replicar o modelo brasileiro." },
      { title: "Pagamentos agênticos B2B", description: "Camada que permite um agente de IA autorizar e executar pagamentos recorrentes via Pix dentro de limites pré-definidos. Categoria de produto que ainda não existe nos EUA por falta de infraestrutura equivalente." },
    ],
  },
  {
    slug: "ia-vertical-saas",
    title: "IA Vertical substituindo SaaS Legado",
    pillar: "Produto & Mercado",
    icon: "layers",
    horizon: "medio",
    summary:
      "Startups pequenas com IA vertical estão superando fornecedores de SaaS legado em fluxos de trabalho específicos, movimento que a YC chama de SaaSpocalypse. No Brasil, o legado é ainda mais frágil.",
    relevanceInternational: { level: "critica", note: "Categoria dominante de investimento em startups de IA em 2026; mais de 60% do batch YC 2026 é de empresas de IA." },
    relevanceBrazil: { level: "alta", note: "Verticais locais (saúde, jurídico, contabilidade, agro) têm SaaS legado ainda mais fraco que o americano." },
    brazilGapNote:
      "Setores regulados brasileiros (saúde, jurídico, contábil) têm software legado décadas atrás do padrão internacional. É uma oportunidade de pular etapas direto para IA-nativo.",
    panorama: {
      internacional: {
        paragraphs: [
          "Mais de 60% do batch 2026 da Y Combinator é de empresas de IA, ante 40% em 2024. Parceiros da YC descrevem a SaaSpocalypse: uma startup de cinco pessoas consegue superar um fornecedor de SaaS legado em fluxos de trabalho específicos.",
          "A vantagem competitiva da IA vertical é estrutural: dados de treinamento específicos de domínio, expertise regulatória, integrações profundas e canais de distribuição do setor. Provedores de modelo de fundação não replicam isso da noite para o dia.",
          "Saúde é o vertical mais denso em todos os lotes recentes da YC. Veterinária e odontologia também aparecem como verticais atraentes, com alto volume, faturamento complexo, exigência regulatória e fornecedores legados mal avaliados.",
        ],
        sources: [
          { title: "Vertical AI Agents Are Eating Horizontal SaaS in 2026", url: "https://www.saasmag.com/vertical-ai-agents-eating-horizontal-saas/", publisher: "SaaSMag" },
          { title: "Building Vertical AI", url: "https://www.bvp.com/assets/uploads/2026/01/BUILDING-VERTICAL-AI_PDF_BESSEMER_VENTURE_PARTNERS_BOOK_JANUARY_2026.pdf", publisher: "Bessemer Venture Partners" },
        ],
      },
      brasil: {
        paragraphs: [
          "Vertical SaaS em setores como saúde, jurídico, agronegócio e financeiro no Brasil apresenta churn estruturalmente baixo, entre 2% e 5% ao ano, sinal de demanda represada por solução especializada que o software genérico não atende.",
          "LGPD e normas do Banco Central como Open Finance impõem rastreabilidade e auditoria que sistemas antigos raramente entregam sem reforma profunda. Profissionais especializados em tecnologias legadas como Cobol, Delphi 7, Visual Basic 6 e PowerBuilder estão cada vez mais raros, elevando o custo de manutenção a níveis insustentáveis.",
          "Empresas brasileiras nesses setores enfrentam pressão regulatória crescente e um fornecedor legado cada vez mais caro de manter ao mesmo tempo. A janela para substituição por IA vertical nacional é maior que nos EUA.",
        ],
        sources: [
          { title: "Modernização de Sistemas Legados: Guia 2026", url: "https://kxptech.com/modernizacao-de-sistemas-legados", publisher: "kxptech" },
        ],
      },
    },
    stageRelevance: [
      { stage: "enterprise", note: "Escolher um nicho aproximado (gestão de clínicas, escritórios contábeis ou agro) e construir portfólio vertical com dados proprietários do domínio." },
      { stage: "entity", note: "Expandir o vertical vencedor para outros mercados da América Latina com o mesmo gap de SaaS legado." },
    ],
    studyPath: [
      { title: "Y Combinator Startup School", provider: "Y Combinator", url: "https://www.startupschool.org", format: "Curso gratuito + comunidade" },
      { title: "The Mom Test (Rob Fitzpatrick)", provider: "Livro independente", url: "https://www.momtestbook.com", format: "Livro", note: "Como validar um nicho vertical falando com clientes reais sem se enganar." },
    ],
    suggestedIdeas: [
      { title: "IA vertical para clínicas de pequeno e médio porte", description: "Substituto de prontuário e agenda legado com IA de triagem e automação administrativa." },
      { title: "Compliance automatizado para escritórios contábeis", description: "Camada de IA que acompanha legislação contábil em mudança constante e atualiza regras de emissão de nota fiscal automaticamente." },
      { title: "Migração assistida de sistemas Delphi e Cobol", description: "Serviço de migração assistida por IA de sistemas legados descontinuados para stack moderna, mirando empresas que não encontram mais quem mantenha o sistema antigo." },
    ],
  },
  {
    slug: "governanca-regulacao-ia",
    title: "Governança & Regulação de IA (PL 2338, EU AI Act)",
    pillar: "Regulação & Risco",
    icon: "scale",
    horizon: "medio",
    summary:
      "O Brasil está desenhando seu próprio marco legal de IA agora. Quem entender a lei antes dela valer constrói a camada de compliance que todo mundo vai precisar.",
    relevanceInternational: { level: "alta", note: "EU AI Act já é referência global; regulação de IA é tema central de política tecnológica nos grandes mercados." },
    relevanceBrazil: { level: "alta", note: "Lei ainda não sancionada, janela para construir ferramenta de compliance antes da obrigatoriedade." },
    brazilGapNote:
      "Diferente de tendências puramente técnicas, aqui o timing é regulatório e nacional. A lei brasileira ainda não existe, e dá para construir a solução de compliance antes da demanda explodir.",
    panorama: {
      internacional: {
        paragraphs: [
          "O EU AI Act já é a referência regulatória global, com framework baseado em risco que outras jurisdições, incluindo o Brasil, parcialmente espelham. Regulação de IA virou tema central de política tecnológica em todos os grandes mercados, cada um com abordagem distinta.",
          "Empresas multinacionais já operam sob complexidade regulatória crescente entre jurisdições, o que cria demanda por ferramentas de compliance que funcionem através de fronteiras.",
        ],
        sources: [
          { title: "EU Artificial Intelligence Act (texto oficial)", url: "https://artificialintelligenceact.eu", publisher: "União Europeia" },
        ],
      },
      brasil: {
        paragraphs: [
          "O PL 2338/2023, Marco Legal da IA, já foi aprovado no Senado e em 2026 está na Câmara dos Deputados, com expectativa de votação antes do recesso de agosto. Propõe framework baseado em risco, com atenção a sistemas que afetam direitos fundamentais, acesso a serviços, segurança pública, saúde, educação, emprego e identificação biométrica.",
          "Fintechs, healthtechs, edtechs, insurtechs, plataformas de RH e empresas de tecnologia de consumo vão precisar revisar seus sistemas antes da lei entrar em vigor. Quem já tiver ferramenta de compliance pronta vende para todos eles ao mesmo tempo.",
          "O PL 2338 propõe exigência de remuneração a titulares de direitos autorais quando obras protegidas são usadas para treinar sistemas de IA comerciais, abordagem mais rígida que UE, Japão ou EUA. O resultado final vai sinalizar se o Brasil se posiciona como produtor de IA ou aceita o papel de consumidor.",
        ],
        sources: [
          { title: "Realizing Brazil's AI Ambition Through Future-Proof Regulation", url: "https://www.itic.org/news-events/techwonk-blog/realizing-brazils-ai-ambition-through-futureproof-regulation", publisher: "ITI" },
          { title: "PL 2338/2023: the impacts of regulating Artificial Intelligence in Brazil", url: "https://www.sidi.org.br/en/blog/the-impacts-of-regulating-artificial-intelligence-in-brazil", publisher: "SIDI" },
          { title: "Brazil AI Bill 2338: Mandatory Copyright Fees Risk $4.1B Investment", url: "https://www.riotimesonline.com/brazil-ai-copyright-regulation-pl-2338-investment/", publisher: "Rio Times" },
        ],
      },
    },
    stageRelevance: [
      { stage: "enterprise", note: "Produto de compliance e auditoria de sistemas de IA (documentação de risco, rastreabilidade de dados de treino) para os setores mais expostos pelo PL 2338." },
      { stage: "entity", note: "Se posicionar como referência de governança de IA no mercado brasileiro, com autoridade para expandir a serviços internacionais de compliance multi-jurisdição." },
    ],
    studyPath: [
      { title: "EU Artificial Intelligence Act (texto oficial)", provider: "União Europeia", url: "https://artificialintelligenceact.eu", format: "Texto legal + guias" },
      { title: "Acompanhamento do PL 2338", provider: "Regulations.ai", url: "https://regulations.ai/regulations/RAI-BR-NA-PDLN2XX-2023", format: "Tracking regulatório" },
    ],
    suggestedIdeas: [
      { title: "Kit de compliance PL 2338 antes da votação", description: "Documentação e ferramentas de rastreabilidade de dados de treino vendidas antes da lei valer, para empresas expostas não serem pegas de surpresa." },
      { title: "Auditoria de risco de IA como assinatura", description: "Auditoria automatizada recorrente de sistemas de IA em produção, mapeada contra o framework de risco do PL 2338 conforme ele evolui." },
    ],
  },
  {
    slug: "edge-ai-modelos-pequenos",
    title: "IA de Borda & Modelos Pequenos (Edge AI / SLMs)",
    pillar: "Infraestrutura & Hardware",
    icon: "cpu",
    horizon: "longo",
    summary:
      "Modelos de 3B a 30B parâmetros rodando localmente em celular, carro ou equipamento industrial, sem depender de nuvem. No Brasil, resolve custo cambial e conectividade rural ao mesmo tempo.",
    relevanceInternational: { level: "alta", note: "Big techs como Google, Meta e Apple já convergindo modelos e chips para essa arquitetura." },
    relevanceBrazil: { level: "media", note: "Resolve dois problemas estruturais brasileiros: conectividade instável e custo de infraestrutura em dólar." },
    brazilGapNote:
      "O resto do mundo otimiza edge AI por latência e privacidade. No Brasil o driver adicional é econômico: reduzir dependência de custo de nuvem cotado em dólar e de conectividade que ainda não chegou a boa parte do país.",
    panorama: {
      internacional: {
        paragraphs: [
          "O mercado de edge AI deve crescer de US$ 15,2 bi (2022) para US$ 143,6 bi até 2032, quase dez vezes em uma década, CAGR de 25,9%.",
          "A faixa entre 3B e 30B parâmetros já entrega capacidade útil de IA rodando localmente em smartphones, sistemas automotivos e equipamento industrial. Modelos como Llama 3.2 (1B/3B), Gemma 3 (270M+) e Phi-4 mini (3,8B) miram exatamente esse alvo.",
          "Os motores dessa migração são exigência de latência, mandatos de privacidade, pressão de custo e experiência do usuário: coisas que inferência inteiramente em nuvem não resolve bem.",
        ],
        sources: [
          { title: "On-Device LLMs in 2026: What Changed, What Matters, What's Next", url: "https://www.edge-ai-vision.com/2026/01/on-device-llms-in-2026-what-changed-what-matters-whats-next/", publisher: "Edge AI and Vision Alliance" },
          { title: "Small Language Models on Edge Devices: 2.6B Parameters Outperforming 671B Models", url: "https://renard-digital.fr/blog/en/small-language-models-edge-devices-2026/", publisher: "Renard Digital" },
        ],
      },
      brasil: {
        paragraphs: [
          "A maioria dos grandes provedores de nuvem fatura em dólar. Em janeiro de 2026 o dólar estava em R$ 6,20, em março caiu para R$ 5,80, volatilidade que vira risco de caixa direto para empresas com receita em real. O mesmo ambiente que custa R$ 2.299 numa cloud brasileira sai R$ 5.408 na AWS.",
          "Fora dos grandes centros, a lacuna de conectividade é estrutural: mais de 1.200 municípios ainda não têm backhaul de fibra óptica, apenas 14% das áreas não urbanas têm cobertura 4G, e cerca de 67% da área cultivada do país permanece sem conexão. São Paulo concentra a infraestrutura de datacenters, enquanto Norte, Centro-Oeste e parte do Nordeste seguem com latência alta.",
          "Para produtos de agro, logística e varejo fora do eixo Sul-Sudeste, IA que roda localmente no dispositivo não é otimização de latência. É a diferença entre funcionar ou não funcionar.",
        ],
        sources: [
          { title: "Quanto Custa Cloud no Brasil? Comparativo Real vs Dólar", url: "https://audaks.com.br/blog/quanto-custa-cloud-brasil-comparativo-real-dolar", publisher: "Audaks" },
          { title: "Conectividade no Brasil às portas de 2026", url: "https://theshift.info/hot/conectividade-no-brasil-as-portas-de-2026/", publisher: "The Shift" },
        ],
      },
    },
    stageRelevance: [
      { stage: "entity", note: "Produto proprietário com modelo pequeno embarcado (agro, logística, varejo físico) como diferencial de IP defensável." },
      { stage: "big-tech", note: "Horizonte de hardware e modelo próprio, só faz sentido com escala e capital já consolidados." },
    ],
    studyPath: [
      { title: "A Survey of Small Language Models", provider: "arXiv", url: "https://arxiv.org/pdf/2410.20011", format: "Paper acadêmico" },
      { title: "Practical Deep Learning for Coders", provider: "fast.ai", url: "https://course.fast.ai", format: "Curso gratuito", note: "Caminho prático top-down para quem já programa entrar em deep learning e otimização de modelos." },
    ],
    suggestedIdeas: [
      { title: "App de agro offline-first com modelo embarcado", description: "Diagnóstico de praga e safra via modelo pequeno rodando no celular do produtor rural, sem depender de 4G." },
      { title: "Gateway de IA local para reduzir custo de nuvem", description: "Camada que roda inferência localmente para clientes sensíveis a câmbio, só escalando para nuvem quando necessário." },
    ],
  },
  {
    slug: "talento-remoto-nearshoring",
    title: "Talento Remoto & Nearshoring Brasileiro",
    pillar: "Talento & Mercado Global",
    icon: "globe",
    horizon: "curto",
    summary:
      "O Brasil já é o destino nearshore preferido dos EUA para engenharia de software. A combinação de custo, fuso horário e qualidade técnica é, por si só, um modelo de negócio pronto.",
    relevanceInternational: { level: "alta", note: "80% das empresas norte-americanas exploram ativamente nearshore; Brasil é o destino de maior destaque da década." },
    relevanceBrazil: { level: "critica", note: "Vantagem estrutural direta e imediatamente monetizável para os próprios fundadores da empresa." },
    brazilGapNote:
      "Diferente das outras tendências, aqui não existe lacuna a fechar. A vantagem já é brasileira por natureza: fuso horário, custo e formação técnica. É a base mais imediata para o estágio Bootstrap da empresa.",
    panorama: {
      internacional: {
        paragraphs: [
          "80% das empresas norte-americanas exploram ativamente soluções de desenvolvimento nearshore, decisão hoje tomada por CTOs e VPs de Engenharia de organizações sofisticadas.",
          "A combinação de profundidade técnica, alinhamento cultural com empresas ocidentais, compatibilidade de fuso horário com os EUA e economia de custo real tornou o Brasil o mercado de engenharia nearshore em maior destaque da década de 2020.",
          "As habilidades mais demandadas são React/TypeScript, Python/ML e Java/Kotlin, o perfil que Thiago e Rodrigo já cobrem entre os dois.",
        ],
        sources: [
          { title: "How to Hire Software Developers Based in Brazil in 2026 | Salary Guide & Tips", url: "https://www.revelo.com/blog/hire-software-developers-in-brazil", publisher: "Revelo" },
          { title: "Nearshore Software Dev: Why Brazil?", url: "https://nextage.com.br/blog/en/nearshore-software-dev/", publisher: "Nextage" },
        ],
      },
      brasil: {
        paragraphs: [
          "O Brasil tem mais de 759 mil desenvolvedores profissionais, o 6º maior contingente global, com 55 mil formandos por ano.",
          "Salários sênior brasileiros rodam 60 a 65% abaixo dos americanos, entre US$ 3.000 e 6.000 por mês via nearshore. Vagas que exigem ao menos uma habilidade de IA já pagam 28% a mais no mercado local, chegando a 43% com duas competências.",
          "Um dev brasileiro sênior fluente em IA aplicada cobra uma fração do equivalente americano e ainda captura o prêmio salarial de IA local: a combinação que sustenta um modelo de serviço de exportação competitivo.",
        ],
        sources: [
          { title: "Why Brazil's Software Talent is Booming in 2026", url: "https://www.geekhunter.com/en/post/brazil-software-engineering-talent-2026-booming", publisher: "GeekHunter" },
          { title: "IA no trabalho: profissionais brasileiros querem treinamentos que vão além da teoria", url: "https://www.hardware.com.br/noticias/habilidades-ia-profissionais-brasileiros-2026/", publisher: "Hardware.com.br" },
        ],
      },
    },
    stageRelevance: [
      { stage: "money-maker", note: "Motor de receita mais direto do plano inteiro: vender capacidade de engenharia (Thiago, Rodrigo e IA) para clientes em dólar desde o início." },
    ],
    studyPath: [
      { title: "Developer Track", provider: "Anthropic Academy", url: "https://anthropic.skilljar.com", format: "Curso gratuito + certificado" },
      { title: "Y Combinator Startup School", provider: "Y Combinator", url: "https://www.startupschool.org", format: "Curso gratuito + comunidade" },
    ],
    suggestedIdeas: [
      { title: "Squad nearshore como primeira oferta comercial", description: "Antes de qualquer produto próprio, vender a própria dupla como squad de entrega remota para empresas dos EUA, para gerar capital de giro imediato." },
      { title: "Portfólio técnico em inglês como vitrine internacional", description: "Estudo de caso técnico dos projetos da empresa publicado em inglês para atrair leads de nearshore diretamente." },
    ],
  },
  {
    slug: "energia-datacenters-ia",
    title: "Energia & Data Centers para IA",
    pillar: "Infraestrutura & Capital",
    icon: "zap",
    horizon: "longo",
    summary:
      "O gargalo da IA não é mais chip, é energia. O Brasil, com 88% de matriz elétrica renovável, está numa posição rara para atrair investimento em capacidade computacional limpa.",
    relevanceInternational: { level: "critica", note: "Até US$ 31,6 tri em investimento cumulativo em data centers projetado até 2050; energia é o principal fator limitante em toda região." },
    relevanceBrazil: { level: "alta", note: "Brasil dobra capacidade de data center em 2026 (826MW para 1.746MW), puxado por matriz elétrica majoritariamente renovável." },
    brazilGapNote:
      "Enquanto o mundo trava em gargalo de energia para IA, o Brasil tem o que falta em outros lugares: energia limpa abundante. Isso pode transformar delay em vantagem de atração de investimento pesado, se a rede elétrica e o licenciamento acompanharem.",
    panorama: {
      internacional: {
        paragraphs: [
          "PwC projeta US$ 31,6 trilhões em investimento cumulativo em data centers até 2050. Goldman Sachs estima US$ 7,6 trilhões só entre 2026 e 2031 em computação, data centers e energia para IA. A restrição principal não é capital nem chip, é eletricidade.",
          "Data centers de IA devem dobrar a demanda global de eletricidade até 2030. Conectar um novo data center à rede elétrica pode levar de quatro a dez anos em muitas regiões, muito mais que os dois ou três anos necessários para construir a instalação em si.",
          "Goldman Sachs estima que a própria rede elétrica pode exigir cerca de US$ 720 bilhões em investimento até 2030 só para atender à demanda crescente dos data centers.",
        ],
        sources: [
          { title: "PwC says $31.6T in AI capex hits one binding limit", url: "https://www.thestreet.com/technology/pwc-ai-data-center-capex-forecast-power-constraint", publisher: "TheStreet" },
          { title: "Energy Markets Race to Solve the AI Power Bottleneck", url: "https://www.morganstanley.com/insights/articles/powering-ai-energy-market-outlook-2026", publisher: "Morgan Stanley" },
        ],
      },
      brasil: {
        paragraphs: [
          "O Brasil caminha para mais que dobrar sua capacidade instalada de data centers até o fim de 2026, saltando de 826 MW para 1.746 MW, puxado pela matriz energética majoritariamente renovável do país: 88,2% de fontes renováveis na geração elétrica em 2024, segundo o Balanço Energético Nacional.",
          "Um pipeline de US$ 20 bilhões em investimento está em jogo, mas depende de três desafios: absorção da demanda pela rede elétrica, aprovação do regime tributário Redata e agilidade no licenciamento ambiental de mega-empreendimentos.",
          "A Agência Internacional de Energia projeta consumo global de data centers chegando a 945 TWh até 2030, com IA respondendo por 40% do total. O Brasil pode capturar parte desse capex justamente onde o resto do mundo está travado, mas a corrida regulatória e de infraestrutura de rede está só começando.",
        ],
        sources: [
          { title: "Data centers no Brasil 2026: mapa de projetos e players", url: "https://news.griinstitute.org/pt/infraestrutura/data-centers-brasil-2026-mapa-projetos-players-capacidade-digital", publisher: "GRI Hub News" },
          { title: "Data centers podem transformar energia limpa do Brasil em exportação de serviços", url: "https://sitepd.org.br/2026/08/19/data-centers-podem-transformar-energia-limpa-do-brasil-em-exportacao-de-servicos/", publisher: "SITE PD" },
        ],
      },
    },
    stageRelevance: [
      { stage: "entity", note: "Diversificação possível: serviços de engenharia e consultoria para operadores de data center que chegam ao Brasil atrás de energia limpa." },
      { stage: "big-tech", note: "Só em escala de capital e relacionamento institucional já consolidados: participação direta na cadeia de infraestrutura de computação." },
    ],
    studyPath: [
      { title: "Key Questions on Energy and AI", provider: "International Energy Agency", url: "https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary", format: "Relatório gratuito" },
    ],
    suggestedIdeas: [
      { title: "Consultoria de licenciamento e conexão para operadores de DC", description: "Serviço que ajuda operadores internacionais a navegar licenciamento ambiental e conexão à rede elétrica brasileira." },
      { title: "Monitor do pipeline de investimento em data centers", description: "Painel ou newsletter especializado rastreando os projetos do pipeline de US$ 20 bi, posicionando a empresa como referência antes do tema explodir." },
    ],
  },
  {
    slug: "upskilling-corporativo-ia",
    title: "Upskilling Corporativo em IA",
    pillar: "Talento & Educação",
    icon: "graduation-cap",
    horizon: "medio",
    summary:
      "94% dos líderes reportam lacunas de competência em IA nas equipes, mas só 1 em 3 funcionários recebeu treinamento formal. O gap de formação é, ele mesmo, um mercado grande e crescente.",
    relevanceInternational: { level: "alta", note: "Mercado de treinamento corporativo com IA vale US$ 7,49 bi em 2026, projetado para US$ 18,19 bi até 2031." },
    relevanceBrazil: { level: "alta", note: "Busca de empresas brasileiras por profissionais com conhecimento em IA cresceu 306%, segundo a Gupy." },
    brazilGapNote:
      "Esta tendência é reflexiva: o próprio conteúdo desta plataforma (roadmaps, trajetos de estudo) já é prova de conceito de um produto vendável para o mercado brasileiro faminto por capacitação prática.",
    panorama: {
      internacional: {
        paragraphs: [
          "O mercado de treinamento corporativo com IA vale US$ 7,49 bilhões em 2026 e deve crescer 19,43% ao ano até US$ 18,19 bilhões em 2031. O World Economic Forum estima que o gap de competências custa US$ 8,5 trilhões por ano à economia global.",
          "94% dos líderes organizacionais reportam lacunas em competências relacionadas a IA nas suas equipes; em um a cada três casos, a lacuna atinge mais de 40% da força de trabalho.",
          "Apenas 1 em 3 trabalhadores recebeu treinamento formal em IA fornecido pelo empregador nos últimos seis meses. 46% já usam ferramentas de IA no trabalho sem treinamento formal, e 65% estudam por conta própria para se manterem competitivos.",
        ],
        sources: [
          { title: "AI-Powered Corporate Training Market Size, Share & 2031 Growth Trends Report", url: "https://www.mordorintelligence.com/industry-reports/ai-powered-corporate-training-market", publisher: "Mordor Intelligence" },
          { title: "AI Skills Gap 2026: $5.5T Statistics & How to Close It", url: "https://iternal.ai/ai-skills-gap", publisher: "Iternal.ai" },
        ],
      },
      brasil: {
        paragraphs: [
          "O Relatório de Empregabilidade da Gupy registrou aumento de 306% na busca das empresas brasileiras por profissionais com conhecimento em IA. As competências mais valorizadas são domínio de ferramentas específicas de IA (52%), análise de dados com IA (44,6%), engenharia de prompt (43%) e visão estratégica para orientar equipes no uso de IA (41,6%).",
          "Vagas que exigem ao menos uma habilidade em IA pagam em média 28% a mais que as demais no Brasil, chegando a 43% a mais quando o profissional domina duas competências, segundo dados da Lightcast.",
          "Mais da metade dos trabalhadores brasileiros quer capacitação aplicada diretamente à rotina corporativa, não slides teóricos. O país enfrenta ainda o desafio de formar mão de obra em ritmo suficiente para suprir a demanda.",
        ],
        sources: [
          { title: "Profissões ligadas à IA ganham espaço no Brasil em 2026", url: "https://dol.com.br/noticias/tecnologia/936465/profissoes-ligadas-a-ia-ganham-espaco-no-brasil-em-2026", publisher: "DOL" },
          { title: "IA no trabalho: profissionais brasileiros querem treinamentos que vão além da teoria em 2026", url: "https://www.hardware.com.br/noticias/habilidades-ia-profissionais-brasileiros-2026/", publisher: "Hardware.com.br" },
        ],
      },
    },
    stageRelevance: [
      { stage: "money-maker", note: "Produto lateral de baixo custo de produção: transformar os próprios roadmaps desta plataforma em curso ou mentoria vendável enquanto o produto principal amadurece." },
    ],
    studyPath: [
      { title: "AI Fluency Track", provider: "Anthropic Academy", url: "https://anthropic.skilljar.com", format: "Curso gratuito + certificado" },
    ],
    suggestedIdeas: [
      { title: "Trilha de upskilling aplicado para times técnicos", description: "Produto derivado do roadmap interno da própria KVLT, vendido como mentoria ou curso curto para outras pequenas empresas de tecnologia com o mesmo gap de formação." },
      { title: "Diagnóstico de maturidade em IA para PMEs", description: "Avaliação paga que mede o gap real de competência de IA de uma equipe e recomenda trilha de estudo." },
    ],
  },
];

export function getTrendBySlug(slug: string) {
  return TRENDS.find((t) => t.slug === slug);
}
