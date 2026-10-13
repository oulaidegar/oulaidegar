export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  category: "AI & Data" | "Web & Tools" | "Cultural & Creative" | "Research";
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  metrics?: string;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: "latent-archive",
    title: "Latent Archive Explorer",
    tagline: "High-dimensional visual navigator for museum collections",
    description:
      "An open-source interactive interface exploring over 100,000 digitized historical artifacts mapped in high-dimensional CLIP space. Allows researchers to discover topological affinities between disparate artistic traditions.",
    year: "2025",
    category: "AI & Data",
    tags: ["Next.js", "WebGL", "PyTorch", "CLIP", "Vector DB"],
    github: "https://github.com/oulaidegar/latent-archive",
    demo: "https://latent-archive.demo.com",
    featured: true,
    metrics: "120k vectors indexed",
    highlights: [
      "Custom UMAP projection pipeline run in WebWorker",
      "Sub-20ms cosine similarity search across multi-institutional catalogs",
      "Exportable citation bundles for academic research",
    ],
  },
  {
    id: "cultural-drift",
    title: "Archival Drift Auditor",
    tagline: "Statistical auditor for representational skew in vision-language models",
    description:
      "A Python toolkit that computes representational entropy and semantic drift across non-Western archival imagery when passed through foundational vision models. Designed as part of Master's thesis research.",
    year: "2025",
    category: "Research",
    tags: ["Python", "PyTorch", "Hugging Face", "Statistics", "CLI"],
    github: "https://github.com/oulaidegar/archival-drift",
    featured: true,
    metrics: "94% correlation with manual expert annotation",
    highlights: [
      "Zero-shot classification entropy metric",
      "Interactive SVG reporting dashboards",
      "Pre-configured loaders for Europeana and Rijksmuseum APIs",
    ],
  },
  {
    id: "monolith-reader",
    title: "Monolith Reader",
    tagline: "Hyper-minimalist distraction-free typography reader",
    description:
      "A browser-based reading environment stripped of all decorations, built for long-form critical theory papers, PDFs, and EPUBs with automated margin note synchronizations and keyboard navigation.",
    year: "2024",
    category: "Web & Tools",
    tags: ["TypeScript", "Tailwind CSS", "IndexedDB", "Web Workers"],
    github: "https://github.com/oulaidegar/monolith-reader",
    demo: "https://monolith-reader.demo.com",
    featured: true,
    highlights: [
      "Zero network requests after initial load",
      "Export highlights straight to Markdown / Obsidian vault",
      "Adaptive contrast engine matching ambient lighting",
    ],
  },
  {
    id: "provenance-graph",
    title: "Provenance Graph Visualizer",
    tagline: "Linked open data network explorer for historical provenance",
    description:
      "Graph exploration tool built on top of CIDOC-CRM RDF metadata to trace the custody transfers, auction catalogs, and historical migrations of looted or repatriated cultural heritage.",
    year: "2024",
    category: "Cultural & Creative",
    tags: ["React", "D3.js", "SPARQL", "Graphology", "RDF"],
    github: "https://github.com/oulaidegar/provenance-graph",
    demo: "https://provenance-graph.demo.com",
    featured: false,
    highlights: [
      "Direct SPARQL query builder with syntax highlighting",
      "Force-directed physical simulation running on GPU canvas",
      "Temporal timeline slider from 1600 to present",
    ],
  },
  {
    id: "marginalia-cli",
    title: "marginalia",
    tagline: "Command-line tool to extract and synthesize academic PDF annotations",
    description:
      "Lightweight terminal utility written in Rust and Python that parses PDF highlight streams, extracts bibliographic references, and generates clean daily Markdown digests for personal knowledge management.",
    year: "2023",
    category: "Web & Tools",
    tags: ["Rust", "Python", "CLI", "Markdown"],
    github: "https://github.com/oulaidegar/marginalia",
    featured: false,
    highlights: [
      "Instant PDF stream parsing with zero bloated dependencies",
      "Automatic DOI resolution against Crossref API",
    ],
  },
];
