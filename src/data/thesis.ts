
export interface ThesisData {
  degree: string;
  field: string;
  institution: string;
  expectedYear: string;
  workingTitle: string;
  subtitle: string;
  status: "In Progress" | "Completed" | "Under Review";
  abstract: string;
  coreQuestions: string[];
  pillars: {
    title: string;
    description: string;
  }[];
  methodologies: {
    title: string;
    description: string;
    tools: string[];
  }[];
  datasets: {
    name: string;
    description: string;
    size: string;
    type: string;
  }[];
  theoreticalFramework: string[];
  keyReadings: {
    title: string;
    author: string;
    year: string;
    note: string;
  }[];
  artifacts: {
    title: string;
    type: string;
    link?: string;
    description: string;
  }[];
}

export const thesisData: ThesisData = {
  degree: "Master of Arts in Cultural Data & Artificial Intelligence",
  field: "AI Ethics, Civic Technology & Democratic Epistemology",
  institution: "University of Amsterdam (UvA) · Faculty of Humanities",
  expectedYear: "2025 – 2026",
  workingTitle:
    "402 Payment Required: Agency, Dependency, and the Lebanese Official Gazette",
  subtitle:
    "Investigating AI-driven democratic empowerment, linguistic sovereignty, and the structural dependencies of civic technology in the Global South",
  status: "Completed",

  abstract: `
Can artificial intelligence genuinely democratize access to knowledge and civic participation, or does it reproduce the very dependencies it promises to overcome?

This thesis examines the relationship between artificial intelligence, human agency, and democratic empowerment through a practice-based reconstruction of the Lebanese Official Gazette, the state's authoritative record of laws, decrees, and regulations. Despite its civic importance, the Gazette remains constrained by paywalled access, fragmented digital infrastructure, and largely unsearchable Arabic-language documents.

Using AI-assisted development, web scraping, optical character recognition (OCR), and multilingual semantic search, I attempted to reconstruct this inaccessible archive as a public-facing civic information platform. Rather than evaluating AI exclusively through its outputs, the research examines the act of building with AI itself. Through a practice-based autoethnographic methodology, I documented technical failures, architectural compromises, commercial dependencies, linguistic limitations, and moments of human intervention throughout development.

The research challenges the prevailing technological narrative that lowering barriers to software development necessarily produces democratic empowerment. While generative AI substantially expands an individual's technical capabilities, its civic potential remains constrained by financial resources, institutional infrastructure, algorithmic opacity, and corporate control. A particularly revealing failure occurred when a commercial API billing threshold interrupted Arabic semantic search, demonstrating how economic dependency can directly undermine linguistic accessibility.

The thesis also interrogates the geopolitical dimensions of AI sovereignty. Dependence on Western technology corporations risks perpetuating existing technological and epistemic hierarchies. Yet turning to emerging Arabic-first models developed or supported by Gulf Cooperation Council (GCC) states does not automatically resolve this dependency. It may instead introduce new forms of state-linked infrastructural dependence, alongside concerns about government access to data, surveillance, censorship, and the protection of journalists and civil society. In political environments where independent expression faces restrictions, the possibility of undisclosed access mechanisms, compelled disclosure, or insufficiently auditable systems raises significant governance questions. These are risks requiring scrutiny, rather than evidence of backdoors in any particular model.

Drawing on relational theories of agency, critical AI studies, and the political economy of digital infrastructure, the thesis argues that technological, epistemic, and civic agency are neither automatically granted by AI nor entirely foreclosed by it. They emerge through ongoing negotiation between human intention, algorithmic systems, institutional structures, and geopolitical power.

Ultimately, democratizing the capacity to build software is not the same as democratizing the infrastructures on which societies depend.
  `.trim(),

  coreQuestions: [
    "Agency and Democratic Empowerment: How does rebuilding the Lebanese Official Gazette with AI reshape our understanding of human and algorithmic agency, and what does this reveal about the material and structural constraints of developing civic infrastructure in a fragile digital landscape?",

    "Corporate Dependency and Linguistic Sovereignty: To what extent can resource-constrained civic initiatives achieve meaningful technological and epistemic independence when they rely on proprietary AI models, commercial APIs, and infrastructure optimized for dominant languages?",

    "Geopolitics of AI Sovereignty: Does shifting from Western commercial AI providers toward regional, including GCC-backed, models genuinely reduce technological dependency, or does it relocate control to infrastructures governed by different political interests, surveillance capabilities, and accountability regimes?",
  ],

  pillars: [
    {
      title: "Democratic & Epistemic Agency",
      description:
        "Distinguishing technological agency, the ability to build and use AI systems, from epistemic agency, the ability to access and interpret knowledge, and civic agency, the capacity to participate in public life and hold institutions accountable. The research challenges the assumption that expanding technical capabilities automatically produces democratic empowerment.",
    },
    {
      title: "Corporate Dependency & Linguistic Sovereignty",
      description:
        "Examining how commercial APIs, cloud infrastructure, billing thresholds, and Western-centric language models constrain public-interest technology. The research demonstrates how financial dependencies can directly affect the accessibility and accuracy of Arabic-language civic information, turning infrastructural vulnerability into linguistic vulnerability.",
    },
    {
      title: "Geopolitical Sovereignty & Digital Rights",
      description:
        "Questioning whether moving from Western AI providers to GCC-backed regional models constitutes genuine technological sovereignty or merely substitutes one concentration of power for another. While regional models may improve Arabic-language representation, their governance must be examined against risks of state surveillance, censorship, compelled data access, and insufficient independent oversight. Particular attention is given to the safety of journalists, dissidents, and civil society. This is a governance analysis, not an empirical security audit of individual GCC models.",
    },
  ],

  methodologies: [
    {
      title: "Practice-Based Autoethnography & the Oscillating Method",
      description:
        "Developing a reflective methodology that alternates between the developer seeking to execute technical tasks and the critical researcher interpreting the resulting friction. Timestamped development logs, AI conversations, billing failures, and architectural decisions become qualitative research material for investigating agency, accountability, and infrastructural dependency.",
      tools: [
        "Analytical Autoethnography",
        "Reflective Practice",
        "Qualitative Coding",
        "IDE & Terminal Logs",
        "AI Conversation Analysis",
      ],
    },
    {
      title: "AI-Assisted Civic Infrastructure Reconstruction",
      description:
        "Building an experimental pipeline to retrieve, process, and search Lebanon's official legal records. The technical work involved navigating restrictive archival interfaces, extracting Arabic text from scanned documents, developing multilingual semantic retrieval, and constructing a citizen-oriented interface. The prototype also served as an empirical test of the practical and financial limits of AI-assisted development.",
      tools: [
        "Python",
        "Web Scraping",
        "Arabic OCR",
        "Multilingual Semantic Search",
        "Cohere",
        "Supabase",
        "Gemini",
        "Google Antigravity",
      ],
    },
    {
      title: "Critical AI Studies & Sociotechnical Analysis",
      description:
        "Analyzing the development process through relational agency, technological mediation, algorithmic colonialism, and the political economy of AI. An analytical rubric evaluates four interconnected dimensions: accountability and oversight, linguistic sovereignty, market dependency versus public value, and information asymmetry mitigation. The analysis also considers the distinct geopolitical risks of substituting Western AI dependencies with state-linked regional alternatives.",
      tools: [
        "Critical Data Studies",
        "Relational Agency Theory",
        "Political Economy of AI",
        "Digital Sovereignty Analysis",
        "AI Ethics",
        "Qualitative Thematic Analysis",
      ],
    },
  ],

  datasets: [
    {
      name: "Lebanese Official Gazette Archive (2014–2025)",
      description:
        "The primary archival collection comprising scanned editions of Lebanon's authoritative legal publication. The corpus contains laws, decrees, administrative decisions, and official notices. Its largely image-based Arabic documents required extensive extraction and processing before they could become searchable.",
      size: "816 issues · 149,094 images · 14.52 GB",
      type: "Arabic Legal Archive & Scanned Documents",
    },
    {
      name: "2025 Gazette Experimental Corpus",
      description:
        "A bounded subset of the larger Gazette archive used to develop and test the OCR and multilingual search pipeline. The corpus was restricted to one year because processing the entire archive exceeded the project's financial and infrastructural resources, limiting longitudinal analysis and full-scale deployment.",
      size: "2025 · Single-year research subset",
      type: "OCR & Semantic Retrieval Corpus",
    },
    {
      name: "AI Development & Infrastructure Records",
      description:
        "A qualitative research collection consisting of timestamped AI coding conversations, IDE execution logs, debugging traces, billing events, OCR comparison outputs, and architectural revisions. These materials document the practical relationship between human oversight, agentic AI systems, and commercial infrastructure.",
      size: "January – April 2026",
      type: "Autoethnographic & Technical Research Records",
    },
  ],

  theoreticalFramework: [
    "Relational Assemblage Agency & Actor-Network Theory (Mark Coeckelbergh, Peter-Paul Verbeek)",

    "Democracy, Epistemic Agency & AI (Mark Coeckelbergh)",

    "The Reflective Practitioner & Reflection-in-Action (Donald Schön)",

    "Algorithmic Accountability & Responsibility Gaps (Novelli, Taddeo & Floridi; De Sio & Mecacci)",

    "Decolonial AI, Algorithmic Colonialism & Epistemic Inequality (Mohamed, Png & Isaac; Hssaini)",

    "Linguistic Representation & the Arabic NLP Divide (Helm et al.; Keleg, Goldwater & Magdy)",

    "Corporate Infrastructure, Market Dependency & Digital Sovereignty",

    "Geopolitical AI Governance, State Surveillance & Civic Freedoms",
  ],

  keyReadings: [
    {
      title:
        "Democracy, Epistemic Agency, and AI: Political Epistemology in Times of Artificial Intelligence",
      author: "Mark Coeckelbergh",
      year: "2022",
      note:
        "A central theoretical foundation for examining how AI systems restructure the conditions under which citizens acquire, interpret, and act on political knowledge.",
    },
    {
      title:
        "The Reflective Practitioner: How Professionals Think in Action",
      author: "Donald A. Schön",
      year: "1983",
      note:
        "The methodological foundation of the oscillating approach, treating unexpected technical failures and interruptions as opportunities for reflection and knowledge production.",
    },
    {
      title:
        "Decolonial AI: Decolonial Theory as Sociotechnical Foresight in Artificial Intelligence",
      author: "Shakir Mohamed, Marie-Therese Png & William Isaac",
      year: "2020",
      note:
        "Situates AI within historical and contemporary power asymmetries, providing a framework for examining technological dependency and epistemic domination beyond Western contexts.",
    },
    {
      title:
        "Accountability in Artificial Intelligence: What It Is and How It Works",
      author: "Claudio Novelli, Mariarosaria Taddeo & Luciano Floridi",
      year: "2023",
      note:
        "Develops the conceptual basis for assessing accountability, answerability, and meaningful human oversight in increasingly autonomous AI systems.",
    },
    {
      title:
        "Revisiting Common Assumptions about Arabic Dialects in NLP",
      author: "Amr Keleg, Sharon Goldwater & Walid Magdy",
      year: "2025",
      note:
        "Challenges oversimplified assumptions about Arabic linguistic variation and informs the research's treatment of language representation, semantic retrieval, and linguistic sovereignty.",
    },
  ],

  artifacts: [
    {
      title: "Lebanese Official Gazette — Civic Platform Prototype",
      type: "AI-Assisted Civic Technology · Proof of Concept",
      description:
        "An experimental reconstruction of Lebanon's official legal archive, combining document retrieval, Arabic OCR, multilingual semantic search, and an interface designed around equal civic access. Selected technical capabilities were demonstrated, but the deployment remained incomplete and the platform had not undergone real-world citizen testing.",
    },
    {
      title: "Gazette Research Reader",
      type: "Interactive Research Documentation",
      link: "https://gazette-reader.vercel.app/",
      description:
        "An interactive companion to the research, documenting the development process and providing access to supporting materials, technical decisions, and conversations used during the reconstruction of the Lebanese Official Gazette.",
    },
    {
      title: "402 Payment Required — Master's Thesis",
      type: "Academic Research Manuscript",
      description:
        "A practice-based study of technological, epistemic, and civic agency through the reconstruction of a public legal archive. The thesis develops the oscillating methodological approach and identifies how commercial dependency, linguistic accessibility, and infrastructural constraints interact in AI-assisted civic technology.",
    },
  ],
};
