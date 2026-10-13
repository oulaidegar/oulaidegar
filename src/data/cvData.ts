export interface CVEducation {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string[];
  thesisTopic?: string;
}

export const cvData = {
  name: "oulaidegar",
  title: "Researcher & Computational Practitioner in Cultural Data & AI",
  email: "hello@oulaidegar.com",
  website: "https://oulaidegar.com",
  github: "https://github.com",
  location: "Paris / Remote",
  summary:
    "Interdisciplinary researcher working at the nexus of artificial intelligence, cultural heritage archives, and computational linguistics. Specializing in the analysis of multi-modal foundation models, semantic embeddings, and open-source tooling for cultural data.",

  education: [
    {
      degree: "Master of Science in Cultural Data and Artificial Intelligence",
      institution: "Faculty of Humanities & Computational Sciences",
      location: "Paris, France",
      period: "2024 — Present (Expected 2026)",
      thesisTopic:
        "Thesis: 'Latent Archives: Generative Models, Cultural Bias, and the Algorithmic Curation of Collective Memory' — computational evaluation of multimodal embeddings across digitized museum collections.",
      details: [
        "Core coursework: Multimodal Machine Learning, Archival Epistemology, Knowledge Representation & Ontologies (CIDOC-CRM), Critical Data Studies, Natural Language Processing.",
        "Recipient of Graduate Research Fellowship in Digital Humanities.",
      ],
    },
    {
      degree: "Bachelor of Science in Computer Science & Humanities",
      institution: "Department of Computer Science",
      location: "Paris, France",
      period: "2020 — 2024",
      details: [
        "Graduated with First Class Honors.",
        "Focus on algorithms, distributed data structures, and philosophy of technology.",
        "Capstone project: Interactive semantic search engine for digitized manuscript fragments.",
      ],
    },
  ],

  experience: [
    {
      role: "Graduate Research Assistant",
      organization: "Laboratory for Computational Culture & AI",
      location: "Paris, France",
      period: "2024 — Present",
      highlights: [
        "Developing computational benchmarks for vision-language models evaluated against digitized museum archives (over 200,000 artifacts).",
        "Formulated the Archival Drift metric to assess non-Western representational distortion in CLIP and SigLIP latent manifolds.",
        "Authored open-source Python auditing pipelines utilized by affiliated institutional researchers.",
      ],
    },
    {
      role: "Software Engineer / Data Specialist",
      organization: "Digital Heritage Institute",
      location: "Remote / Europe",
      period: "2023 — 2024",
      highlights: [
        "Engineered linked open data pipelines transforming heterogeneous XML/JSON catalogs into validated RDF/SPARQL knowledge graphs.",
        "Implemented GPU-accelerated WebGL vector visualization tooling allowing non-technical curators to inspect high-dimensional semantic spaces.",
        "Reduced query latency by 65% through optimized vector indexing and caching strategies.",
      ],
    },
    {
      role: "Research Intern",
      organization: "Center for Media Epistemology & Archives",
      location: "Berlin, Germany",
      period: "Summer 2023",
      highlights: [
        "Conducted close-reading audits of training datasets for generative text-to-image models.",
        "Co-authored institutional report on cultural bias in generative synthesis.",
      ],
    },
  ],

  publications: [
    {
      title:
        "Probing the Latent Archive: Representational Skew in Multimodal Embeddings of Non-Western Cultural Artifacts",
      venue: "Working Paper / In Preparation for Digital Humanities 2026",
      year: "2025",
      type: "Preprint",
    },
    {
      title: "Beyond the Search Bar: Exploratory Topologies for Cultural Collections",
      venue: "International Conference on Cultural Informatics & Memory Institutions",
      year: "2024",
      type: "Conference Paper",
    },
  ],

  talks: [
    {
      title: "Algorithmic Taxonomies: What Machine Learning Sees in the Museum",
      event: "Symposium on AI and Cultural Heritage",
      location: "Paris",
      year: "2025",
    },
    {
      title: "Minimalist Tooling for High-Dimensional Data",
      event: "Digital Humanities Workshop Series",
      location: "Online",
      year: "2024",
    },
  ],

  skills: {
    programming: ["Python", "TypeScript / JavaScript", "Rust (intermediate)", "SQL", "SPARQL", "HTML / CSS"],
    machineLearning: [
      "PyTorch",
      "Hugging Face Transformers",
      "CLIP / SigLIP",
      "Vector Databases (Milvus, Qdrant)",
      "UMAP / t-SNE",
      "scikit-learn",
    ],
    culturalData: [
      "CIDOC-CRM",
      "Dublin Core",
      "RDF / OWL",
      "IIIF (International Image Interoperability Framework)",
      "Linked Open Data (LOD)",
    ],
    webEngineering: ["Next.js", "React", "Tailwind CSS", "D3.js", "Node.js", "WebGL / Three.js"],
    languages: ["English (Fluent)", "French (Native/Fluent)", "Arabic (Conversational)"],
  },
};
