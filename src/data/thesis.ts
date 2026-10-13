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
  degree: "Master of Science / Research Master",
  field: "Cultural Data and Artificial Intelligence",
  institution: "Faculty of Humanities & Computational Sciences",
  expectedYear: "2025 – 2026",
  workingTitle: "Latent Archives: Generative Models, Cultural Bias, and the Algorithmic Curation of Collective Memory",
  subtitle: "Examining how foundational multi-modal models interpret, distort, and synthesize institutional cultural heritage collections",
  status: "In Progress",
  abstract: `
This thesis investigates the epistemological consequences of applying modern generative artificial intelligence models to digitized cultural heritage archives. As museums, national libraries, and cultural institutions digitize millions of historical artifacts, machine learning algorithms increasingly serve as the intermediaries through which public memory is indexed, retrieved, and generated.

Focusing on the tension between institutional archival taxonomy and latent vector representations, this research interrogates whether foundational vision-language models capture cultural nuances or flatten historical pluralism into algorithmic consensus. Through a combination of computational analysis (embedding probing, semantic drift quantification) and critical data studies, the project develops an open-source audit framework to evaluate cultural representation in foundational datasets.
  `.trim(),
  coreQuestions: [
    "How do vision-language models (e.g., CLIP, SigLIP, multi-modal LLMs) project non-Western and marginalized cultural artifacts within continuous embedding spaces?",
    "Can unsupervised semantic clustering reveal latent archival topologies that traditional hierarchical cataloging overlooks without reinforcing historical biases?",
    "What are the ethical and technical parameters for an interactive 'speculative archive' that transparently communicates algorithmic hallucination to researchers and the public?",
  ],
  methodologies: [
    {
      title: "Embedding Space Analysis & Probing",
      description:
        "Geometric analysis of multi-modal embeddings across cross-cultural archival artifacts to quantify semantic clustering, dispersion, and western-centric bias.",
      tools: ["Python", "PyTorch", "Hugging Face", "UMAP / t-SNE", "SciPy"],
    },
    {
      title: "Archival Metadata & Knowledge Graphs",
      description:
        "Extracting structured entity relationships from institutional catalog metadata (CIDOC-CRM, Dublin Core) to compare against AI-generated semantic captions.",
      tools: ["RDF / SPARQL", "NetworkX", "spaCy", "Neo4j"],
    },
    {
      title: "Critical Hermeneutics & Cultural Studies",
      description:
        "Contextualizing computational metrics within post-colonial archival theory, data provenance, and ethical AI frameworks.",
      tools: ["Qualitative Coding", "Archival Close-Reading", "Provenance Tracing"],
    },
  ],
  datasets: [
    {
      name: "Rijksmuseum Open Cultural Data Collection",
      description: "Over 700k high-resolution art objects, detailed historical provenance, and multilingual annotations.",
      size: "~720,000 items",
      type: "Image & Structured Metadata",
    },
    {
      name: "Europeana Aggregated Cultural Heritage",
      description: "Pan-European open dataset spanning manuscripts, textiles, cartography, and photographic records.",
      size: "Sample of 150,000 items",
      type: "Multi-institutional Heritage",
    },
    {
      name: "Custom Curated Cross-Cultural Benchmark",
      description: "Hand-annotated subset of indigenous and regional archival artifacts tested against state-of-the-art vision models.",
      size: "2,500 curated pairings",
      type: "Benchmark & Evaluation",
    },
  ],
  theoreticalFramework: [
    "Critical Data Studies (Dalton, Thatcher, Noble)",
    "Archival Silences & Power (Michel-Rolph Trouillot, Saidiya Hartman)",
    "Algorithmic Governmentality & Epistemology (Rouvroy, Berns)",
    "Computational Hermeneutics & Digital Humanities (Moretti, Jockers)",
  ],
  keyReadings: [
    {
      title: "Algorithms of Oppression: How Search Engines Reinforce Racism",
      author: "Safiya Umoja Noble",
      year: "2018",
      note: "Foundational perspective on algorithmic ordering of knowledge.",
    },
    {
      title: "Silencing the Past: Power and the Production of History",
      author: "Michel-Rolph Trouillot",
      year: "1995",
      note: "Framework for analyzing gaps and silences in archival institutions.",
    },
    {
      title: "Data Feminism",
      author: "Catherine D'Ignazio & Lauren F. Klein",
      year: "2020",
      note: "Direct guide for ethical and reflexively situated data science.",
    },
  ],
  artifacts: [
    {
      title: "Archival Drift Auditor (Codebase)",
      type: "Python CLI & Library",
      link: "https://github.com/oulaidegar/archival-drift",
      description: "Tool to measure representational skew in multimodal embeddings of museum collections.",
    },
    {
      title: "Interactive Latent Explorer",
      type: "Web Application",
      link: "/work",
      description: "Three-dimensional semantic exploration interface for cultural collection embeddings.",
    },
    {
      title: "Working Thesis Draft (PDF)",
      type: "Academic Manuscript",
      description: "Regularly updated chapters, available upon request or for committee review.",
    },
  ],
};
