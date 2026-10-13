export interface Note {
  id: string;
  title: string;
  date: string;
  category: "Reading" | "Idea" | "Code" | "Epistemology";
  tags: string[];
  content: string;
}

export const notes: Note[] = [
  {
    id: "n-08",
    title: "Latent space as a territorial map",
    date: "2025-03-01",
    category: "Epistemology",
    tags: ["representation", "cartography", "ai"],
    content:
      "Borges' 1:1 map that covers the empire was impossible physically, but latent space is its inverted contemporary equivalent: an ungraspable coordinate cloud that claims to contain the entirety of human symbolic output within a 4096-dimensional tensor.",
  },
  {
    id: "n-07",
    title: "CIDOC-CRM vs Neo4j property graphs",
    date: "2025-02-14",
    category: "Code",
    tags: ["rdf", "knowledge-graphs", "ontologies"],
    content:
      "RDF triples feel verbose until you need to express temporal uncertainty and multiple conflicting attributions of ownership. Graph databases simplify querying, but CIDOC-CRM remains unbeatable for capturing philosophical nuance in historical provenance.",
  },
  {
    id: "n-06",
    title: "Reading Hartman on critical fabulation",
    date: "2025-01-20",
    category: "Reading",
    tags: ["archives", "theory", "literature"],
    content:
      "Saidiya Hartman's concept of 'critical fabulation'—writing into the silence of the archive without pretending the void can be smoothly resolved. Generative AI attempts the opposite: it smooths every void into a plausible statistical average.",
  },
  {
    id: "n-05",
    title: "Why typography is 90% of user interface",
    date: "2024-12-18",
    category: "Idea",
    tags: ["design", "typography", "minimalism"],
    content:
      "If the rhythm of lines, the optical weight of headers, and the breathing room between paragraphs are right, you need almost no borders, shadows, or decorative background tints. Good type carries the entire emotional weight of the screen.",
  },
  {
    id: "n-04",
    title: "UMAP reproducibility caveats",
    date: "2024-11-29",
    category: "Code",
    tags: ["python", "umap", "data-viz"],
    content:
      "Always set random_state and n_neighbors cautiously when visualizing cultural embeddings for non-technical audiences. A cluster that looks tight on a 2D scatter plot can easily be an artifact of metric projection rather than cultural kinship.",
  },
  {
    id: "n-03",
    title: "Flusser on the technical image",
    date: "2024-10-05",
    category: "Reading",
    tags: ["flusser", "media-theory", "photography"],
    content:
      "Vilém Flusser's 'Towards a Philosophy of Photography': images produced by apparatuses do not depict the world; they signify program concepts. Every AI image generation prompt is the logical culmination of Flusser's programmed imagination.",
  },
];
