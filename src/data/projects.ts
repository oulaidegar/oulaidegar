export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  category: "Democracy & Civic AI" | "AI Ethics & Audits" | "Creative Tech & Interfaces" | "Cultural Data";
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  metrics?: string;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: "agora-deliberate",
    title: "Agora Deliberate",
    tagline: "AI-assisted deliberative mapping for citizen assemblies",
    description:
      "An open-source deliberative intelligence platform designed for municipal citizen councils. Uses transparent, non-optimizing language models to cluster thousands of civic submissions into nuanced thematic consensus maps while actively preserving and highlighting minority dissensus.",
    year: "2025",
    category: "Democracy & Civic AI",
    tags: ["Civic Tech", "Deliberative AI", "Next.js", "Python", "Local LLMs"],
    github: "https://github.com/oulaidegar/agora-deliberate",
    demo: "https://agora-deliberate.demo.com",
    featured: true,
    metrics: "Piloted with 3 participatory assemblies",
    highlights: [
      "Explicitly optimized against algorithmic polarization and echo chambers",
      "Explainable topic clustering with verbatim quotation traceability",
      "Runs fully on-device / self-hosted with open models to safeguard citizen privacy",
    ],
  },
  {
    id: "archival-drift",
    title: "Archival Drift Auditor",
    tagline: "Empirical bias and representational audit framework for multimodal AI",
    description:
      "A Python evaluation library that computes statistical semantic skew and epistemic erasure across non-Western archival imagery in foundational vision-language models (CLIP, SigLIP). Built as core empirical research for my Master's thesis.",
    year: "2025",
    category: "AI Ethics & Audits",
    tags: ["AI Ethics", "PyTorch", "Hugging Face", "Statistics", "Open Source"],
    github: "https://github.com/oulaidegar/archival-drift",
    featured: true,
    metrics: "Audited across 200k+ archival artifacts",
    highlights: [
      "Zero-shot classification entropy metric quantifying cultural homogenization",
      "Interactive SVG auditing reports for institutional museum curators",
      "Plug-and-play connectors for Rijksmuseum, Europeana, and Smithsonian APIs",
    ],
  },
  {
    id: "latent-archive",
    title: "Latent Assembly Explorer",
    tagline: "Speculative 3D interface for probing algorithmic collective memory",
    description:
      "A creative technology installation and web application mapping 100,000+ historical artifacts in continuous high-dimensional vector space. Allows the public to visually discover how machine learning categorizes human culture, revealing topological biases and algorithmic hallucinations.",
    year: "2025",
    category: "Creative Tech & Interfaces",
    tags: ["WebGL", "Three.js", "Creative Coding", "Vector DB", "Embeddings"],
    github: "https://github.com/oulaidegar/latent-archive",
    demo: "https://latent-archive.demo.com",
    featured: true,
    metrics: "Sub-20ms spatial search over 100k vectors",
    highlights: [
      "GPU-accelerated dimensionality reduction running directly in WebWorker",
      "Contestable classification mode letting users challenge algorithmic labels",
      "Exhibited in digital arts and computational culture symposia",
    ],
  },
  {
    id: "civic-provenance",
    title: "Civic Provenance Graph",
    tagline: "Open linked-data network for cultural restitution & historical transparency",
    description:
      "An open-access interactive knowledge graph tracing historical ownership migrations, colonial transfers, and museum restitution claims using CIDOC-CRM RDF metadata. Democratizes access to provenance documentation usually locked behind institutional walls.",
    year: "2024",
    category: "Cultural Data",
    tags: ["SPARQL", "RDF", "D3.js", "Graphology", "Civic Data"],
    github: "https://github.com/oulaidegar/civic-provenance",
    demo: "https://provenance.demo.com",
    featured: false,
    highlights: [
      "Interactive force-directed graph with chronological custody sliders",
      "Direct SPARQL query editor with guided prompts for public researchers",
      "Verified against UNESCO and open heritage repositories",
    ],
  },
  {
    id: "monolith-reader",
    title: "Monolith Reader",
    tagline: "Surveillance-free minimal reader for civic and theoretical texts",
    description:
      "A distraction-free web reader built for democratic theory, academic papers, and public domain texts. Completely stripped of tracking scripts, telemetry, and manipulative UX patterns, emphasizing deep contemplation over dopamine stimulation.",
    year: "2024",
    category: "Creative Tech & Interfaces",
    tags: ["TypeScript", "Tailwind CSS", "Local-First", "Privacy"],
    github: "https://github.com/oulaidegar/monolith-reader",
    demo: "https://monolith-reader.demo.com",
    featured: false,
    highlights: [
      "Zero network calls after initial load (100% offline-ready)",
      "Instant export of marginalia annotations to Markdown and Obsidian",
    ],
  },
];
