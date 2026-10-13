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
  degree: "Master of Science in Cultural Data and Artificial Intelligence",
  field: "Cultural Data, AI Ethics & Democratic Epistemology",
  institution: "Faculty of Humanities & Computational Sciences",
  expectedYear: "2024 – 2026",
  workingTitle: "Latent Assemblies: AI Ethics, Cultural Data, and the Democratic Politics of Collective Memory",
  subtitle: "Auditing representational skew, epistemic justice, and civic sovereignty in multimodal foundation models trained on digitized heritage",
  status: "In Progress",
  abstract: `
This thesis interrogates how foundational multi-modal artificial intelligence systems mediate and reshape democratic collective memory. As civic institutions and national archives digitize millions of cultural artifacts, proprietary AI models increasingly become the default epistemic gateways through which citizens discover, synthesize, and interact with human heritage.

By framing cultural data as a vital democratic commons, this research investigates the ethical hazards of corporate algorithmic enclosure—specifically how continuous latent vector spaces flatten regional pluralism into monocultural consensus. Combining computational probing (semantic drift quantification, zero-shot entropy audits) with democratic theory and critical data studies, this project develops an open-source civic audit framework. The ultimate aim is to propose technical and institutional safeguards that protect public knowledge, prevent synthetic disinformation from eroding cultural archives, and reimagine generative AI as an infrastructure for democratic pluralism.
  `.trim(),
  coreQuestions: [
    "Democratic Commons vs. Corporate Enclosure: How do proprietary foundation models extract value from public cultural heritage without returning transparent, democratically auditable mechanisms?",
    "Epistemic Bias in Latent Space: How do continuous multimodal embeddings (CLIP, SigLIP, VLM weights) systematically distort or marginalize non-Western civic and cultural expressions?",
    "Building for Democratic Deliberation: Can we construct participatory, pluralistic 'counter-embeddings' that support democratic discourse rather than algorithmic consensus manufacturing?",
  ],
  pillars: [
    {
      title: "Democratic Epistemology",
      description: "Treating archival memory not as static commodified training tokens, but as living public infrastructure essential for democratic discourse.",
    },
    {
      title: "Algorithmic Ethics & Auditability",
      description: "Developing empirical, reproducible metrics to hold vision-language models accountable for representational harm and cultural erasure.",
    },
    {
      title: "Creative Counter-Interfaces",
      description: "Designing speculative user interfaces that expose algorithmic uncertainties and empower citizens to contest machine-generated classifications.",
    },
  ],
  methodologies: [
    {
      title: "Algorithmic Auditing & Embedding Probing",
      description:
        "Developing statistical pipelines to measure representational skew and semantic drift across historical and regional artifacts passed through foundational vision models.",
      tools: ["Python", "PyTorch", "Hugging Face", "UMAP / t-SNE", "SciPy"],
    },
    {
      title: "Civic Knowledge Graphs & Linked Data",
      description:
        "Building verifiable provenance networks from institutional catalog metadata (CIDOC-CRM, Dublin Core) to cross-examine AI-generated synthetic captions.",
      tools: ["SPARQL / RDF", "NetworkX", "Graphology", "Neo4j"],
    },
    {
      title: "Critical Data Studies & Democratic Theory",
      description:
        "Contextualizing computational metrics within theories of agonistic pluralism, participatory democracy, and post-colonial archival theory.",
      tools: ["Close-Reading", "Participatory Workshop Design", "Policy Auditing"],
    },
  ],
  datasets: [
    {
      name: "Rijksmuseum Open Cultural Data Collection",
      description: "700,000+ open-access historical artifacts with detailed provenance records used to evaluate colonial artifact classifications.",
      size: "~720,000 items",
      type: "Image & Structured Metadata",
    },
    {
      name: "Europeana Aggregated Cultural Heritage",
      description: "Cross-border democratic cultural heritage repository spanning multilingual records across 2,000+ European institutions.",
      size: "150,000 sampled items",
      type: "Multi-institutional Heritage",
    },
    {
      name: "Cross-Cultural Pluralism Benchmark",
      description: "Hand-curated evaluation dataset assessing how state-of-the-art multimodal models respond to non-Western ceremonial and civic heritage.",
      size: "2,500 annotated pairings",
      type: "Benchmark & Ethical Evaluation",
    },
  ],
  theoreticalFramework: [
    "Agonistic Pluralism & The Public Sphere (Chantal Mouffe, Jürgen Habermas)",
    "Critical Data Studies & Data Feminism (Noble, D'Ignazio & Klein)",
    "Archival Silences & Epistemic Justice (Miranda Fricker, Michel-Rolph Trouillot)",
    "Algorithmic Governmentality & Commons (Antoinette Rouvroy, Elinor Ostrom)",
  ],
  keyReadings: [
    {
      title: "The Agonistic Public Sphere",
      author: "Chantal Mouffe",
      year: "2000",
      note: "Essential framework for why democratic AI must preserve dissensus rather than forced consensus.",
    },
    {
      title: "Algorithms of Oppression",
      author: "Safiya Umoja Noble",
      year: "2018",
      note: "Foundational audit of how commercial algorithmic search distorts public knowledge.",
    },
    {
      title: "Epistemic Injustice: Power and the Ethics of Knowing",
      author: "Miranda Fricker",
      year: "2007",
      note: "Philosophical foundation for understanding testimonial and hermeneutical erasure in AI training corpora.",
    },
  ],
  artifacts: [
    {
      title: "Archival Drift Auditor (Codebase)",
      type: "Open Source Python Library",
      link: "https://github.com/oulaidegar/archival-drift",
      description: "Ethical auditing toolkit to measure representational skew in foundation model embeddings.",
    },
    {
      title: "Interactive Latent Assembly Explorer",
      type: "Web Application & Speculative UI",
      link: "/work",
      description: "Creative interactive 3D tool revealing how multimodal algorithms cluster and categorize cultural history.",
    },
    {
      title: "Working Thesis Draft & Policy Memo",
      type: "Research Manuscript",
      description: "Available for peer review and public-interest researchers exploring AI in democratic memory institutions.",
    },
  ],
};
