
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  category:
  | "Democracy & Civic AI"
  | "AI Ethics & Audits"
  | "Creative Tech & Interfaces"
  | "Cultural Data";
  tags: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  metrics?: string;
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: "lebanese-official-gazette",
    title: "Rebuilding the Lebanese Official Gazette",
    tagline:
      "Reclaiming public access to Lebanon's legal and institutional memory",
    description:
      "An independent civic technology initiative to reconstruct Lebanon's Official Gazette, the state's authoritative record of laws, decrees, and administrative decisions. Despite its public importance, the archive remains constrained by paywalls, fragmented digital infrastructure, and largely unsearchable Arabic-language documents. The project uses AI-assisted development, web scraping, Arabic OCR, and multilingual semantic search to transform scanned legal records into accessible, searchable public information. Initially developed as the empirical foundation of my Master's thesis at the University of Amsterdam, the project also investigates the structural dependencies of AI-driven civic technology, including corporate infrastructure, linguistic sovereignty, and democratic agency. The initial research prototype demonstrated key technical capabilities, while the broader public-facing platform remains under development.",
    year: "2026 — Present",
    category: "Democracy & Civic AI",
    tags: [
      "Civic Technology",
      "Public Information",
      "AI Ethics",
      "Arabic OCR",
      "Semantic Search",
      "Digital Sovereignty",
      "Python",
      "Supabase",
    ],
    demo: "https://gazette-reader.vercel.app/",
    featured: true,
    metrics: "816 archival issues · 14.52 GB research corpus",
    highlights: [
      "Collected a research corpus covering 2014–2025, comprising 816 Gazette issues and 149,094 scanned images.",
      "Developed an experimental pipeline for extracting, processing, and searching Arabic legal documents, with testing focused on a 2025 subset.",
      "Designed a citizen-oriented interface to make legislation and administrative records more accessible to journalists, researchers, civil society, and the Lebanese public.",
      "Investigated how commercial AI dependencies, algorithmic opacity, and Arabic-language limitations constrain technological and civic agency.",
      "Explored the geopolitical trade-offs of relying on Western AI providers versus regional, including GCC-backed, models, particularly regarding sovereignty, surveillance, and accountability.",
      "The linked research reader documents the project; the full civic platform remains a work in progress.",
    ],
  },

  {
    id: "dotfocus",
    title: "DotFocus",
    tagline:
      "A privacy-first approach to training attention in an age of distraction",
    description:
      "DotFocus is an independent web application exploring how digital technology can help people strengthen their attention rather than compete for it. Built around visual fixation exercises, gaze tracking, and minimalist interactions, the application enables users to practice sustained concentration and explore their focus patterns over time. Combining browser-based computer vision with a privacy-conscious design philosophy, DotFocus challenges the conventions of productivity software and the attention economy. The project brings together experimental human-computer interaction, creative technology, behavioral self-observation, and independent product development.",
    year: "2025 — Present",
    category: "Creative Tech & Interfaces",
    tags: [
      "Creative Technology",
      "Attention Training",
      "Computer Vision",
      "Eye Tracking",
      "Human-Computer Interaction",
      "Privacy-by-Design",
      "React",
      "TypeScript",
    ],
    demo: "https://dotfocus.app/",
    featured: true,
    metrics: "Live web application",
    highlights: [
      "Designed visual fixation and eye-movement exercises to help users practice sustained attention.",
      "Implemented browser-based face and gaze tracking to generate session-level focus metrics.",
      "Developed a Focus Score combining gaze dispersion, blink behavior, attention breaks, and head movement.",
      "Explored feedback mechanisms that encourage consistent practice without relying on conventional attention-capturing design patterns.",
      "Prioritized minimal interfaces, privacy-conscious processing, and user control over personal attention data.",
      "Independently designed, developed, and deployed the application as an ongoing experimental product.",
    ],
  },

  {
    id: "manaratan",
    title: "Manaratan",
    tagline:
      "Connecting civil society's digital presence to its real-world impact",
    description:
      "Manaratan is a civic intelligence and impact-monitoring platform under development for civil society organizations, independent media, and public-interest initiatives. The project aims to bridge the gap between online visibility and meaningful societal change by combining social media listening, organizational monitoring, and structured impact documentation. Beyond tracking conversations, campaigns, and public engagement, Manaratan is designed to help organizations examine how their work relates to real-world developments, including legislative changes, policy discussions, institutional responses, public awareness, and civic mobilization. By organizing evidence of activities and outcomes, the platform also aims to support impact reporting, institutional accountability, grant applications, and donor communications. The underlying premise is that reach and engagement alone are insufficient measures of public-interest impact.",
    year: "2026 — Present",
    category: "Democracy & Civic AI",
    tags: [
      "Civic Intelligence",
      "Social Media Listening",
      "Impact Measurement",
      "Civil Society",
      "Media Monitoring",
      "Policy Tracking",
      "Grant Reporting",
      "Data Analytics",
    ],
    featured: true,
    metrics: "In development · Civic impact intelligence",
    highlights: [
      "Developing social listening capabilities to track public conversations, media coverage, and campaign visibility across digital platforms.",
      "Designing an impact-tracking framework that connects organizational activities with documented policy, legislative, and institutional developments.",
      "Exploring methods for identifying the influence of journalism, advocacy, and civil society initiatives beyond conventional engagement metrics.",
      "Envisioning evidence-based impact timelines linking publications, campaigns, institutional responses, and subsequent public developments.",
      "Planning reporting tools that help organizations document achievements, communicate outcomes to funders, and prepare grant applications.",
      "Distinguishing measurable engagement, documented contributions, and verified outcomes rather than treating correlation as proof of causal impact.",
      "Currently in development; proposed capabilities are not presented as completed or validated features.",
    ],

  },
];
