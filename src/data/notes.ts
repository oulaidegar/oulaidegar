export interface Note {
  id: string;
  title: string;
  date: string;
  category: "Democracy" | "AI Ethics" | "Creative Tech" | "Cultural Data";
  tags: string[];
  content: string;
}

export const notes: Note[] = [
  {
    id: "n-09",
    title: "Deliberation vs. Sentiment Aggregation",
    date: "2025-03-05",
    category: "Democracy",
    tags: ["deliberation", "civic-ai", "democracy"],
    content:
      "Most commercial AI tools treat democratic voice as mere 'sentiment analysis' to be averaged. But real democracy is about transformation through discourse: citizen assemblies change minds when participants hear perspectives they had never encountered. AI must facilitate encounter, not calculate a mathematical mean.",
  },
  {
    id: "n-08",
    title: "Latent space as a territorial map",
    date: "2025-03-01",
    category: "Cultural Data",
    tags: ["representation", "cartography", "ai-ethics"],
    content:
      "Borges' 1:1 map that covers the empire was impossible physically, but latent space is its inverted contemporary equivalent: an ungraspable coordinate cloud that claims to contain the entirety of human symbolic output within a 4096-dimensional tensor.",
  },
  {
    id: "n-07",
    title: "The fallacy of the neutral civic algorithm",
    date: "2025-02-18",
    category: "AI Ethics",
    tags: ["algorithmic-bias", "governance", "ethics"],
    content:
      "Whenever a technologist claims their AI algorithm is 'unbiased because it just computes math,' they are concealing a political choice inside an optimization loss function. Optimization functions always have a beneficiary.",
  },
  {
    id: "n-06",
    title: "Speculative interfaces as democratic instruments",
    date: "2025-01-24",
    category: "Creative Tech",
    tags: ["speculative-design", "ui", "public-space"],
    content:
      "Creative technology is most potent when it acts as an ontological provocation: showing the public how an algorithm thinks so they realize it is not magic, but human-made mechanics that can be challenged, regulated, and redesigned.",
  },
  {
    id: "n-05",
    title: "CIDOC-CRM vs corporate property graphs",
    date: "2024-12-14",
    category: "Cultural Data",
    tags: ["rdf", "knowledge-graphs", "ontologies"],
    content:
      "RDF triples feel verbose until you need to express historical uncertainty, disputed custody, and community attribution. CIDOC-CRM remains essential for capturing philosophical nuance in cultural provenance against commercial oversimplification.",
  },
  {
    id: "n-04",
    title: "Why typography is 90% of civic software",
    date: "2024-11-20",
    category: "Creative Tech",
    tags: ["design", "typography", "minimalism"],
    content:
      "If the rhythm of lines, the optical weight of headers, and the breathing room between paragraphs are right, you need almost no manipulative UI tricks. Good type honors the citizen's cognitive autonomy.",
  },
];
