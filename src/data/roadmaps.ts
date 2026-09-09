import type { FounderRoadmap } from "@/types";

export const ROADMAP_THIAGO: FounderRoadmap = {
  name: "Thiago",
  role: "Backend-lead / Full Stack",
  currentSnapshot:
    "Backend Trainee Developer na VM2 desde junho de 2026. Passagem por dois projetos institucionais no IFSP (aMEI e Visite a Região Vulcânica) com C#/.NET, Node.js, React, Next.js, PHP/MVC, PostgreSQL/MySQL/Supabase. Cursando Análise e Desenvolvimento de Sistemas na Anhembi Morumbi, 2026 a 2028. Inglês avançado.",
  philosophy:
    "Sair de trainee que executa tarefas para engenheiro que decide arquitetura antes do primeiro ano da empresa terminar. A velocidade dessa transição é o maior fator de risco do lado técnico.",
  milestones: [
    {
      period: "2026 até meados de 2027",
      level: "fundacao",
      title: "Fechar a base: backend sólido e fluência real em IA aplicada ao código",
      goal: "Eliminar qualquer lacuna de fundamentos (algoritmos, banco de dados, APIs) e migrar de usar autocomplete de IA para dirigir um assistente de IA com julgamento técnico.",
      tracks: [
        {
          label: "Técnico",
          icon: "code-2",
          items: [
            "Fechar lacunas de algoritmos e estrutura de dados que o dia a dia do trainee não cobre.",
            "Percorrer o roadmap.sh de Backend do início ao fim, sem pular etapas.",
            "Construir uma API própria em produção, com autenticação, testes automatizados e CI, fora do escopo do trabalho, como prova de propriedade técnica.",
          ],
        },
        {
          label: "IA aplicada",
          icon: "brain",
          items: [
            "Completar a trilha Developer da Anthropic Academy.",
            "Documentar os próprios padrões de uso de IA no código (quando revisar linha a linha, quando confiar) para virar processo, não hábito individual.",
          ],
        },
        {
          label: "Rede",
          icon: "users",
          items: [
            "Par técnico semanal com Rodrigo para alinhar padrões de arquitetura entre os dois.",
          ],
        },
      ],
      resources: [
        { title: "CS50x — Introduction to Computer Science", provider: "Harvard (via edX)", url: "https://cs50.harvard.edu/x/", format: "Curso gratuito + certificado", note: "Só as partes de algoritmos e estruturas de dados que ainda faltarem." },
        { title: "Backend Developer", provider: "roadmap.sh", url: "https://roadmap.sh/backend", format: "Roadmap interativo gratuito" },
        { title: "Developer Track", provider: "Anthropic Academy", url: "https://anthropic.skilljar.com", format: "Curso gratuito + certificado" },
      ],
    },
    {
      period: "Meados de 2027 até 2028",
      level: "consolidacao",
      title: "Arquitetura e sistemas distribuídos: virar dono técnico da fase Bootstrap",
      goal: "Ser capaz de tomar sozinho as decisões de arquitetura dos primeiros projetos e clientes da empresa, sem depender de supervisão.",
      tracks: [
        {
          label: "Técnico",
          icon: "code-2",
          items: [
            "Ler Designing Data-Intensive Applications (Kleppmann) por completo, com notas aplicadas a projetos reais.",
            "Certificação AWS Solutions Architect – Associate.",
          ],
        },
        {
          label: "Produto",
          icon: "briefcase",
          items: [
            "Construir um esqueleto de SaaS multi-tenant reutilizável (auth, billing, permissões) para acelerar os primeiros projetos da empresa.",
          ],
        },
        {
          label: "Rede",
          icon: "users",
          items: [
            "Trocar conhecimento com Rodrigo: absorver AWS, Docker e DevOps dele em troca de arquitetura .NET e backend estruturado.",
          ],
        },
      ],
      resources: [
        { title: "Designing Data-Intensive Applications", provider: "Martin Kleppmann / O'Reilly", url: "https://dataintensive.net", format: "Livro" },
        { title: "AWS Certified Solutions Architect – Associate", provider: "AWS", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/", format: "Certificação" },
        { title: "The System Design Primer", provider: "GitHub (comunidade)", url: "https://github.com/donnemartin/system-design-primer", format: "Guia gratuito" },
      ],
    },
    {
      period: "2028 até 2030",
      level: "maestria",
      title: "De consumidor a construtor de IA: RAG e agentes no produto da fase Scale-up",
      goal: "Sair de usar Copilot e Claude para construir features de IA em produção dentro do nicho vertical escolhido pela empresa.",
      tracks: [
        {
          label: "Técnico",
          icon: "code-2",
          items: [
            "Machine Learning Specialization (Andrew Ng / DeepLearning.AI), base formal de ML sem exigir doutorado em matemática.",
            "Aprofundar em MCP e construção de agentes de produção via Anthropic Academy.",
          ],
        },
        {
          label: "Produto",
          icon: "briefcase",
          items: [
            "Entregar uma feature de IA (RAG ou agente) em produção no produto vertical da empresa, com métricas de qualidade e custo monitoradas.",
          ],
        },
        {
          label: "Rede",
          icon: "users",
          items: [
            "Contribuir com um projeto open-source relevante no espaço de agentes ou RAG, construindo rede e credibilidade técnica externa.",
          ],
        },
      ],
      resources: [
        { title: "Machine Learning Specialization", provider: "DeepLearning.AI / Stanford Online", url: "https://www.deeplearning.ai/specializations/machine-learning", format: "Curso pago (certificado)" },
        { title: "Practical Deep Learning for Coders", provider: "fast.ai", url: "https://course.fast.ai", format: "Curso gratuito" },
        { title: "Documentação", provider: "Model Context Protocol (Anthropic)", url: "https://modelcontextprotocol.io", format: "Documentação técnica" },
      ],
    },
    {
      period: "2030 em diante",
      level: "lideranca",
      title: "CTO de fato: plataforma, contratação técnica e decisões de escala na fase Corporação",
      goal: "Operar como sócio-CTO: arquitetura multi-produto, decisões de build versus buy, montagem e liderança de um time de engenharia.",
      tracks: [
        {
          label: "Liderança",
          icon: "brain",
          items: [
            "Estudar liderança de engenharia formalmente, não só na prática.",
            "Formalizar arquitetura de plataforma, preparada para múltiplos produtos e mercados.",
          ],
        },
        {
          label: "Produto",
          icon: "briefcase",
          items: [
            "Desenhar processo de contratação técnica e onboarding para os primeiros engenheiros contratados.",
          ],
        },
      ],
      resources: [
        { title: "An Elegant Puzzle: Systems of Engineering Management", provider: "Will Larson", url: "https://www.elegantpuzzle.dev", format: "Livro" },
        { title: "The Manager's Path", provider: "Camille Fournier / O'Reilly", url: "https://www.oreilly.com/library/view/the-managers-path/9781491973882/", format: "Livro" },
      ],
    },
  ],
};

export const ROADMAP_RODRIGO: FounderRoadmap = {
  name: "Rodrigo",
  role: "Full Stack sênior / futuro CTO técnico-operacional",
  currentSnapshot:
    "Desenvolvedor Full Stack pleno com quatro vínculos simultâneos ou recentes (Groundzero, TSX Group, RR Soluções, NVGO) desde 2020, stack completa em React, Next.js, Node, Nest, TypeScript, Java, PHP, AWS, Docker, PostgreSQL, MySQL, MongoDB, Prisma, Sequelize e TypeORM. Formação formal começou tarde (UAM, Ciência da Computação e Administração, 2025 a 2029), mas a maturidade prática já é sênior.",
  philosophy:
    "Maturidade prática já resolvida. O roadmap não é sobre aprender a programar, é sobre converter experiência dispersa em quatro empregos para propriedade concentrada de um único produto, usando a Administração como alavanca de negócio, não só de engenharia.",
  milestones: [
    {
      period: "2026 até meados de 2027",
      level: "consolidacao",
      title: "Concentrar experiência dispersa em arquitetura própria na fase Bootstrap",
      goal: "Converter know-how acumulado em quatro empresas simultâneas num blueprint arquitetural único, reutilizável, para os primeiros projetos e clientes.",
      tracks: [
        {
          label: "Técnico",
          icon: "code-2",
          items: [
            "Documentar e padronizar as decisões técnicas já usadas no dia a dia (ORM, Docker, estrutura de API) num guia interno de arquitetura da empresa.",
            "Certificação AWS Solutions Architect – Associate, para validar externamente o que já usa na prática.",
          ],
        },
        {
          label: "IA aplicada",
          icon: "brain",
          items: [
            "Completar a trilha Developer da Anthropic Academy, para operar com agentes de IA desde o primeiro projeto da empresa.",
          ],
        },
      ],
      resources: [
        { title: "AWS Certified Solutions Architect – Associate", provider: "AWS", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/", format: "Certificação" },
        { title: "Developer Track", provider: "Anthropic Academy", url: "https://anthropic.skilljar.com", format: "Curso gratuito + certificado" },
      ],
    },
    {
      period: "Meados de 2027 até 2029",
      level: "maestria",
      title: "De full stack CRUD a arquiteto de IA vertical na fase Scale-up",
      goal: "Liderar tecnicamente a construção do produto vertical da empresa, saindo de entregar telas e APIs para projetar sistema de IA aplicada ao nicho escolhido.",
      tracks: [
        {
          label: "Técnico",
          icon: "code-2",
          items: [
            "Designing Data-Intensive Applications, para formalizar o conhecimento de banco de dados e escala já usado de forma intuitiva.",
            "Machine Learning Specialization (DeepLearning.AI), base de ML para dialogar tecnicamente sobre IA vertical.",
          ],
        },
        {
          label: "Produto",
          icon: "briefcase",
          items: [
            "Aplicar o playbook de IA vertical da Bessemer ao nicho escolhido pela empresa, com dados proprietários do domínio como diferencial.",
          ],
        },
      ],
      resources: [
        { title: "Designing Data-Intensive Applications", provider: "Martin Kleppmann / O'Reilly", url: "https://dataintensive.net", format: "Livro" },
        { title: "Building Vertical AI", provider: "Bessemer Venture Partners", url: "https://www.bvp.com/assets/uploads/2026/01/BUILDING-VERTICAL-AI_PDF_BESSEMER_VENTURE_PARTNERS_BOOK_JANUARY_2026.pdf", format: "Relatório gratuito" },
        { title: "Machine Learning Specialization", provider: "DeepLearning.AI / Stanford Online", url: "https://www.deeplearning.ai/specializations/machine-learning", format: "Curso pago (certificado)" },
      ],
    },
    {
      period: "2029 até 2031",
      level: "lideranca",
      title: "Unir Administração e Engenharia: estratégia de expansão na fase Corporação",
      goal: "Usar o Bacharelado em Administração (em andamento) somado à bagagem técnica para operar como o sócio que decide arquitetura e estratégia de expansão internacional.",
      tracks: [
        {
          label: "Negócio",
          icon: "briefcase",
          items: [
            "Y Combinator Startup School, playbook de crescimento e captação aplicado a uma empresa já com receita.",
            "Estudo dirigido de expansão internacional a partir do Brasil (o que Nubank e VTEX fizeram para sair do mercado doméstico).",
          ],
        },
        {
          label: "Liderança",
          icon: "brain",
          items: [
            "An Elegant Puzzle, liderança de engenharia para o momento de contratar o primeiro time técnico.",
          ],
        },
      ],
      resources: [
        { title: "Y Combinator Startup School", provider: "Y Combinator", url: "https://www.startupschool.org", format: "Curso gratuito + comunidade" },
        { title: "An Elegant Puzzle: Systems of Engineering Management", provider: "Will Larson", url: "https://www.elegantpuzzle.dev", format: "Livro" },
      ],
    },
    {
      period: "2031 em diante",
      level: "lideranca",
      title: "Horizonte Big Tech: organização técnica multi-produto",
      goal: "Atuar em nível de estratégia técnica de conselho e diretoria, com organização de engenharia madura sustentando múltiplos produtos.",
      tracks: [
        {
          label: "Liderança",
          icon: "brain",
          items: [
            "Absorver padrões de engenharia staff e principal (arquitetura de plataforma, não mais de produto único).",
            "Formalizar papel como sócio com responsabilidade técnica e de operação em nível de diretoria.",
          ],
        },
      ],
      resources: [
        { title: "Staff Engineer: Leadership Beyond the Management Track", provider: "Will Larson", url: "https://staffeng.com", format: "Livro" },
      ],
    },
  ],
};
