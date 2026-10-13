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
    slug: "on-cultural-embeddings-and-archival-erasure",
    title: "On Cultural Embeddings and Archival Erasure",
    date: "2025-02-18",
    readingTime: "6 min read",
    summary:
      "When continuous vector spaces become the primary retrieval substrate for cultural memory, what nuances get flattened, and how can we design counter-embeddings?",
    tags: ["Cultural AI", "Embeddings", "Digital Humanities"],
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

\`\`\`
Traditional Archive: Item -> Physical Provenance -> Community Ownership -> Living Practice
Latent Space:       Item -> Pixel Matrix -> Dimension Reduction -> Nearest Dot Product
\`\`\`

### Constructing Counter-Embeddings

Is the solution to abandon computational curation entirely? I argue not. The answer lies in designing *situated computational models*—what Donna Haraway called situated knowledges applied to machine learning:

- **Pluralistic Coordinate Systems:** Rather than projecting all human material culture into a single global manifold, we can construct local, federated embedding spaces that prioritize regional semantic axes.
- **Explicit Uncertainty Metrics:** Surfacing semantic ambiguity rather than suppressing it. When a model is unsure of cultural provenance, it should render an expansive probability distribution rather than collapsing into nearest-neighbor classification.
- **Open-source Auditing Frameworks:** Providing researchers and archivists with verifiable statistical metrics to measure how their collections drift when ingested into modern foundation models.

As we digitize the remaining physical memory of the 19th and 20th centuries, we must decide whether artificial intelligence will serve as a monoculture flattening our archives or as an instrument capable of illuminating their irreducible complexity.
    `.trim(),
  },
  {
    slug: "the-monastic-web-against-infinite-feeds",
    title: "The Monastic Web: An Argument Against Infinite Feeds",
    date: "2024-11-04",
    readingTime: "4 min read",
    summary:
      "Why personal websites should feel like stone rooms rather than Las Vegas casinos: speed, silence, and the discipline of deliberate publishing.",
    tags: ["Web Design", "Philosophy", "Minimalism"],
    content: `
### Silence as a Design Primitive

The modern internet is engineered around kinetic exhaustion. Infinite scroll, notification badges in cadmium red, algorithmic feeds that rearrange the order of reality every eight seconds. Everything screams for attention; nothing invites contemplation.

A personal website should be the antithesis of the platform. It is a piece of sovereign digital architecture.

When you walk into a quiet room or a library with high stone ceilings, your breathing changes. Your attention stabilizes. The architecture communicates what kind of thought is permissible here. The web can do this too.

### Principles of the Monastic Interface

1. **Static and Predictable:** A page does not move unless the reader wills it. No popups, no consent walls that take ten clicks to reject, no layout shift as ads load asynchronously.
2. **Durable Typography:** A carefully chosen serif or grotesque font with sensible line heights and generous margins is superior to dynamic UI widgets.
3. **Hypertext Over Algorithms:** Links are deliberate invitations. You click because you want to follow a line of thought, not because a machine decided to optimize your dopamine baseline.
4. **Permanent Addresses:** URLs should outlive the frameworks that render them. A blog post written in 2024 should still be legible at the exact same location in 2044.

Building in this manner is not nostalgia; it is resistance. By crafting websites that refuse to shout, we preserve a sanctuary where nuanced ideas have room to breathe.
    `.trim(),
  },
  {
    slug: "notes-on-curating-cultural-datasets",
    title: "Notes on Curating Cultural Datasets for Machine Learning",
    date: "2024-08-12",
    readingTime: "5 min read",
    summary:
      "Practical lessons learned from compiling, cleaning, and validating 100,000+ digitized historical objects for multi-modal evaluation.",
    tags: ["Data Science", "Cultural Data", "Research"],
    content: `
### Data Cleaning as Interpretive Labor

In computer science curricula, "data cleaning" is frequently presented as a tedious mechanical chore—stripping null values, normalizing character encodings, resizing bounding boxes.

In cultural data, however, cleaning is fundamentally *interpretive hermeneutics*. Every transformation is an ontological choice.

### Key Observations

#### 1. Inconsistent Date Taxonomies
Historical dates rarely fit into ISO 8601 timestamps:
- \`"circa 1450-1475"\`
- \`"Late Ming Dynasty (reign of Wanli)"\`
- \`"Undated, probable 3rd century CE"\`

Collapsing these into an integer like \`1462\` discards the scholarly uncertainty that is vital to historical accuracy. We developed an interval representation that preserves both lower bounds, upper bounds, and confidence flags.

#### 2. Multilingual Catalog Drift
Institutions frequently translate titles to English using legacy rules that impose modern terms onto historical realities. Tracking the original accession language alongside translations is essential for training models without linguistic homogenization.

#### 3. Image Reproduction Integrity
Different cultural institutions apply varying color profiles, background removals, and crop ratios. When running unsupervised contrastive learning, models often latch onto the institutional photographer's background tone rather than the artifact itself—a classic case of shortcut learning.

Careful data curation is not the prelude to research; it is the research itself.
    `.trim(),
  },
];
