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
  title: "Creative Technologist & Researcher | AI Ethics, Cultural Data & Democratic Systems",
  email: "hello@oulaidegar.com",
  website: "https://oulaidegar.com",
  github: "https://github.com",
  location: "Paris / Remote",
  summary:
    "Creative technologist and researcher working at the nexus of AI ethics, cultural data, and democratic systems. Dedicated to building open-source public-interest software, auditing algorithmic representation in foundational models, and designing speculative tools for citizen assemblies and collective deliberation.",

  education: [
    {
      degree: "Master of Science in Cultural Data and Artificial Intelligence",
      institution: "Faculty of Humanities & Computational Sciences",
      location: "Paris, France",
      period: "2024 — Present (Expected 2026)",
      thesisTopic:
        "Thesis: 'Latent Assemblies: AI Ethics, Cultural Data, and the Democratic Politics of Collective Memory' — auditing representational skew and epistemic justice in multimodal foundation models trained on digitized heritage.",
      details: [
        "Focus areas: AI Ethics, Democratic Epistemology, Multimodal Machine Learning, Archival Ontologies (CIDOC-CRM), Critical Data Studies.",
        "Awarded Graduate Research Fellowship in Public-Interest Computational Technology.",
      ],
    },
    {
      degree: "Bachelor of Science in Computer Science & Humanities",
      institution: "Department of Computer Science",
      location: "Paris, France",
      period: "2020 — 2024",
      details: [
        "Graduated with First Class Honors.",
        "Concentration on algorithms, civic networks, and philosophy of technology.",
        "Capstone project: Interactive semantic search engine for digitized manuscript fragments.",
      ],
    },
  ],

  experience: [
    {
      role: "Creative Technologist & Civic AI Researcher",
      organization: "Laboratory for Computational Culture & Democratic Systems",
      location: "Paris, France",
      period: "2024 — Present",
      highlights: [
        "Designed and prototyped Agora Deliberate, an open-source deliberative platform using local LLMs to cluster citizen assembly testimonies without partisan flattening.",
        "Formulated the Archival Drift evaluation suite to quantify representational erasure in foundational vision-language models across 200,000+ cultural artifacts.",
        "Collaborated with municipal civic bodies and digital humanities scholars on democratic technology guidelines.",
      ],
    },
    {
      role: "Software Engineer / Data Specialist",
      organization: "Digital Heritage & Public Commons Institute",
      location: "Remote / Europe",
      period: "2023 — 2024",
      highlights: [
        "Engineered linked open data pipelines converting proprietary museum databases into validated RDF/SPARQL knowledge graphs.",
        "Developed interactive WebGL vector visualization tooling allowing citizens and non-technical curators to inspect high-dimensional semantic spaces.",
        "Advocated for open data licensing and sovereign digital infrastructure across institutional partners.",
      ],
    },
    {
      role: "Research Fellow in Algorithmic Accountability",
      organization: "Center for Media Epistemology & Digital Rights",
      location: "Berlin, Germany",
      period: "Summer 2023",
      highlights: [
        "Audited training datasets of large commercial text-to-image models for non-Western representational stereotypes.",
        "Co-authored public-interest policy brief on cultural heritage enclosure by corporate AI labs.",
      ],
    },
  ],

  publications: [
    {
      title:
        "Building for Deliberation: Participatory AI Systems for Citizen Assemblies and Public Infrastructure",
      venue: "Working Paper / Journal of Public Interest Technology & Democracy",
      year: "2025",
      type: "Preprint",
    },
    {
      title:
        "Probing the Latent Archive: Representational Skew and Epistemic Injustice in Multimodal Foundation Models",
      venue: "Digital Humanities 2025 / Computational Culture Track",
      year: "2025",
      type: "Conference Paper",
    },
    {
      title: "Beyond the Search Bar: Exploratory Topologies for Cultural Collections and the Public Sphere",
      venue: "International Conference on Cultural Informatics & Memory Institutions",
      year: "2024",
      type: "Conference Paper",
    },
  ],

  talks: [
    {
      title: "Building for Democracy with AI: Designing Public Deliberation Beyond Corporate Enclosure",
      event: "Civic Tech & Democratic AI Summit",
      location: "Brussels",
      year: "2025",
    },
    {
      title: "Algorithmic Assemblies: What Machine Learning Sees in Cultural Memory",
      event: "Symposium on AI Ethics and Cultural Heritage",
      location: "Paris",
      year: "2025",
    },
    {
      title: "Creative Technology as Counter-Power: Speculative Interfaces for Civic Oversight",
      event: "Digital Arts & Technology Colloquium",
      location: "Online",
      year: "2024",
    },
  ],

  skills: {
    democraticCivicAI: [
      "Deliberative Intelligence Systems",
      "Participatory Design",
      "Public-Interest Computing",
      "Local-First & Privacy-Preserving AI",
    ],
    aiEthicsAuditing: [
      "Algorithmic Bias Auditing",
      "Zero-Shot Entropy Analysis",
      "Representation Probing",
      "Model Transparency & Red-Teaming",
    ],
    creativeTechnology: [
      "WebGL / Three.js",
      "Creative Coding & Speculative UI",
      "Interactive Data Visualization (D3.js)",
      "Next.js / React / TypeScript",
    ],
    culturalDataStandards: [
      "CIDOC-CRM",
      "RDF / SPARQL Knowledge Graphs",
      "IIIF Protocol",
      "Linked Open Data (LOD)",
      "Dublin Core",
    ],
    engineeringStack: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "TypeScript",
      "Tailwind CSS",
      "Rust (intermediate)",
      "SQL",
    ],
    languages: ["English (Fluent)", "French (Native/Fluent)", "Arabic (Conversational)"],
  },
};
