export interface Post {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  summary: string;
  tags: string[];
  content: string;
}

export const posts: Post[] = [
  {
    slug: "building-for-democracy-with-ai",
    title: "Building for Democracy with AI: Beyond Corporate Enclosure",
    date: "2025-02-28",
    readingTime: "7 min read",
    summary:
      "Why artificial intelligence must not be ceded to private monopolies, and how creative technologists can build deliberative, open-source public infrastructures for democratic sovereignty.",
    tags: ["Democracy & AI", "Civic Tech", "AI Ethics", "Public Infrastructure"],
    content: `
### The Enclosure of the Democratic Public Sphere

Democracy does not run on code; it runs on deliberation, trust, and shared epistemic reality. Yet today, the digital spaces where citizens gather, deliberate, and consume knowledge are increasingly controlled by a handful of centralized, advertising-driven platforms.

Now, with the ascent of generative AI, we face an even more aggressive wave of enclosure: foundational models developed behind closed corporate walls becoming the authoritative intermediaries of human knowledge.

When a citizen asks an AI to summarize a ballot measure, explain historical legislation, or moderate a community forum, whose values govern the synthesis? If the underlying weights are proprietary black boxes optimized for corporate engagement and liability mitigation, the democratic public sphere is reduced to a commercial tenant on private computational land.

### What Does "Building for Democracy with AI" Actually Mean?

Building for democracy with AI is not about slapping a chatbot onto a municipal website. It is about fundamentally re-architecting technology around three democratic imperatives:

1. **Agonism Over Enforced Consensus:** Corporate AI defaults to bland, synthetic consensus that flattens legitimate disagreements. Democratic tools must surface legitimate pluralism—mapping points of tension clearly so human communities can negotiate them democratically.
2. **Local-First and Sovereign Infrastructure:** Civic deliberation tools must run locally or on public cloud commons. A citizen should never have to surrender their private reflections or political speech to a third-party corporate data warehouse.
3. **Traceability and Contestability:** Every synthesis made by an AI in a civic setting must be auditable down to verbatim human submissions. If an algorithm claims "the assembly leans towards option B," citizens must have the immediate ability to inspect the evidence and contest the classification.

\`\`\`
Corporate AI: Citizen -> Black-box Model -> Manufactured Consensus -> Commercial Capture
Democratic AI: Citizens -> Open Models -> Pluralistic Deliberative Map -> Human Civic Action
\`\`\`

### The Creative Technologist as Public-Interest Architect

As creative technologists and researchers, our role is not merely to optimize model loss or design slick interfaces for venture capital. Our duty is to build alternative civic realities.

We must build tools like **Agora Deliberate** that empower citizen assemblies, create algorithmic auditors that hold foundation models accountable, and build open knowledge graphs that preserve democratic history. AI can either accelerate the oligarchic erosion of democracy—or serve as the civic tooling that revitalizes it. The choice depends on who builds the infrastructure.
    `.trim(),
  },
  {
    slug: "on-cultural-embeddings-and-archival-erasure",
    title: "On Cultural Embeddings and Archival Erasure: AI Ethics in Heritage Data",
    date: "2025-01-18",
    readingTime: "6 min read",
    summary:
      "When continuous vector spaces become the primary retrieval substrate for cultural memory, what nuances get flattened, and how can we design ethical counter-embeddings?",
    tags: ["AI Ethics", "Cultural Data", "Representation", "Digital Humanities"],
    content: `
### The Compression of Heritage

In contemporary machine learning, knowledge is spatialized. Continuous vector spaces—whether produced by multi-modal encoders like CLIP or large language models—position cultural concepts as floating points in high-dimensional manifolds.

Distance in this space is equated with semantic affinity. If two artistic movements or ritual artifacts share nearby cosine values, the model posits a fundamental conceptual kinship.

Yet cultural history is rarely isotropic. A museum catalog is not merely a collection of items; it is a repository of institutional classifications, colonial acquisitions, regional taxonomies, and historical disputes. When a vision-language foundation model is trained on broad web-scraped corpora like LAION or WebLI, it does not inherit the neutral catalog: it inherits the dominant linguistic consensus of the contemporary Anglophone internet.

### What Vector Distance Forgets

Consider the classification of regional textile weaving traditions. In conventional museum archives, metadata records the specific geographic provenance, community elder names, raw material extraction dates, and ceremonial significance.

When compressed into a 768-dimensional latent vector:
1. **Contextual Particularity is Stripped:** The vector retains visual features (geometric symmetries, contrast, color saturation), but loses ontological significance.
2. **Margin to Center Gravitation:** Minority traditions are drawn inexorably toward the dominant visual centroids of their nearest colonial or commercial equivalents.
3. **The Hallucination of Consensus:** The model confidently classifies ritual objects into generic Western decorative arts taxonomy.

### Constructing Counter-Embeddings

The answer lies in designing *situated computational models*—applying Donna Haraway's concept of situated knowledges to machine learning:

- **Pluralistic Coordinate Systems:** Rather than projecting all human material culture into a single global manifold, we can construct local, federated embedding spaces that prioritize regional semantic axes.
- **Explicit Uncertainty Metrics:** Surfacing semantic ambiguity rather than suppressing it. When a model is unsure of cultural provenance, it should render an expansive probability distribution rather than collapsing into nearest-neighbor classification.
- **Open-source Auditing Frameworks:** Providing researchers and archivists with verifiable statistical metrics to measure how their collections drift when ingested into modern foundation models.
    `.trim(),
  },
  {
    slug: "the-monastic-web-against-infinite-feeds",
    title: "The Monastic Web: Interface Architecture Against Algorithmic Exhaustion",
    date: "2024-11-04",
    readingTime: "4 min read",
    summary:
      "Why personal websites and civic tools must feel like stone rooms rather than casino floors: speed, silence, and the discipline of deliberate publishing.",
    tags: ["Creative Tech", "Interface Design", "Philosophy", "Minimalism"],
    content: `
### Silence as an Ethical Design Primitive

The modern internet is engineered around kinetic exhaustion. Infinite scroll, notification badges in cadmium red, algorithmic feeds that rearrange the order of reality every eight seconds. Everything screams for attention; nothing invites contemplation.

A personal website should be the antithesis of the platform. It is a piece of sovereign digital architecture.

When you walk into a quiet room or a library with high stone ceilings, your breathing changes. Your attention stabilizes. The architecture communicates what kind of thought is permissible here. The web can do this too.

### Principles of the Monastic Interface

1. **Static and Predictable:** A page does not move unless the reader wills it. No popups, no consent walls that take ten clicks to reject, no layout shift as ads load asynchronously.
2. **Durable Typography:** A carefully chosen serif or grotesque font with sensible line heights and generous margins is superior to dynamic UI widgets.
3. **Hypertext Over Algorithms:** Links are deliberate invitations. You click because you want to follow a line of thought, not because a machine decided to optimize your dopamine baseline.
4. **Permanent Addresses:** URLs should outlive the frameworks that render them. A text written in 2024 should still be legible at the exact same location in 2044.

Building in this manner is not nostalgia; it is ethical resistance.
    `.trim(),
  },
];
