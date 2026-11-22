
export interface CVEducation {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string[];
  thesisTopic?: string;
}

export const cvData = {
  name: "Louaï Mroueh",
  title:
    "Responsible AI & Digital Policy | Researcher & Creative Technologist",
  email: "oulaidegar@gmail.com",
  website: "https://oulaidegar.com",
  github: "https://github.com/oulaidegar",
  linkedin: "https://www.linkedin.com/in/louai-m-24664b1b7",
  location: "Brussels from February 2027 · French citizen (EU)",

  summary:
    "Researcher in responsible AI and digital policy, with hands-on experience putting AI into practice. I led AI integration at Daraj Media, an independent Arabic-language newsroom, where the workflows I introduced to a team of about 20 were largely adopted and remain in use. My MA thesis (University of Amsterdam) examined how dependence on commercial AI infrastructure limits access to public information, through a reconstruction of Lebanon's Official Gazette. I work on AI governance, data governance and digital rights, and build public-interest tools that test these questions in practice.",

  education: [
    {
      degree: "Master of Arts in Cultural Data & Artificial Intelligence",
      institution: "University of Amsterdam (UvA), Faculty of Humanities",
      location: "Amsterdam, Netherlands",
      period: "2025 — 2026",
      thesisTopic:
        "402 Payment Required: Agency, Dependency, and the Lebanese Official Gazette — A practice-based investigation into AI-driven democratic empowerment, technological and epistemic agency, commercial dependency, and linguistic sovereignty through the reconstruction of Lebanon's official legal archive.",
      details: [
        "Interdisciplinary research combining artificial intelligence, digital humanities, critical data studies, and philosophy of technology.",
        "Developed a practice-based autoethnographic methodology to examine the relationship between human agency, agentic AI systems, and infrastructural constraints.",
        "Investigated the political economy of AI, algorithmic colonialism, linguistic inequality, and the implications of Western and GCC-backed AI infrastructure for digital sovereignty.",
        "Built and evaluated an experimental Arabic-language civic information platform using OCR, multilingual semantic search, and AI-assisted software development.",
      ],
    },
    {
      degree: "Bachelor of Arts in Literary & Cultural Analysis",
      institution: "University of Amsterdam (UvA)",
      location: "Amsterdam, Netherlands",
      period: "2018 — 2021",
      details: [
        "Studied literary and cultural theory, philosophy, comparative literature, narrative theory, and visual and media analysis.",
        "Developed competencies in discourse analysis, semiotics, qualitative research, and critical interpretation of political and cultural systems.",
        "Focused on the relationship between cultural production, ideology, representation, and structures of power.",
      ],
    },
    {
      degree: "French Baccalauréat — Literary Track (Série L)",
      institution: "Lycée Français International de Dubaï",
      location: "Dubai, United Arab Emirates",
      period: "2014 — 2018",
      details: [
        "Completed the French Baccalauréat in the literary stream, with a focus on philosophy, literature, languages, and history.",
        "Developed foundations in critical reasoning, textual analysis, philosophical argumentation, and intercultural communication.",
      ],
    },
  ] as CVEducation[],

  experience: [
    {
      role: "Lead AI Integration & Research",
      organization: "Daraj Media",
      location: "Beirut, Lebanon",
      period: "March 2024 — August 2025",
      highlights: [
        "Led AI research and integration across an independent digital media organization, aligning technical initiatives with editorial, operational, and strategic objectives.",
        "Introduced AI workflows to a team of about 20 people; most were adopted and remain in use.",
        "Developed and evaluated AI-assisted workflows for research, document analysis, data extraction, content production, and audience analytics.",
        "Worked with journalists, editors, and developers to identify and implement tools supporting investigative reporting and newsroom efficiency.",
        "Addressed ethical and operational challenges involving data privacy, source protection, Arabic-language processing, and the use of proprietary AI models in journalism.",
        "Researched emerging developments in AI, particularly their implications for journalism, civil society, and the Middle East.",
        "Supported responsible AI adoption through technical experimentation, workflow design, and cross-disciplinary collaboration.",
      ],
    },
    {
      role: "Operational & Creative Consultant",
      organization: "FR Agency",
      location: "Amsterdam, Netherlands",
      period: "November 2021 — June 2023",
      highlights: [
        "Coordinated 6–7 live events and about 10 shoots (studio sessions and music videos) for musical artists.",
        "Managed logistics across production crews, locations, technical equipment, accommodation, and artist schedules.",
        "Developed brand partnerships and product-seeding initiatives connecting artists with fashion and lifestyle companies.",
      ],
    },
    {
      role: "Podcast Head — Development",
      organization: "The Next Cartel",
      location: "Amsterdam, Netherlands",
      period: "2022",
      highlights: [
        "Developed a podcast concept, including research, editorial planning, and production coordination.",
      ],
    },
    {
      role: "Studio Assistant",
      organization: "Westerpark Studios",
      location: "Amsterdam, Netherlands",
      period: "September — December 2022",
      highlights: [
        "Supported photography and audiovisual productions: studio preparation, equipment, and technical setup.",
      ],
    },
    {
      role: "Young Journalist Award Participant",
      organization: "Dubai International Film Festival",
      location: "Dubai, United Arab Emirates",
      period: "December 2017",
      highlights: [
        "Selected as a finalist; produced film reviews, interviews, and cultural reporting under editorial deadlines.",
      ],
    },
  ],

  projects: [
    {
      title: "Tech in MENA",
      type: "Regional Tech Events Directory",
      period: "2026",
      link: "https://techinmena.org/",
      description:
        "An open, account-free directory of technology events across the Middle East and North Africa, built as a regional public utility. Curates meetups, workshops, hackathons and conferences across major hubs, links every listing directly to its organizer, and publishes iCalendar feeds per city and category. No trackers, ticketing fees or registration walls; English, Arabic and French.",
      technologies: [
        "Public Utility",
        "iCalendar (RFC 5545)",
        "Accessibility (WCAG 2.2 AA)",
        "Privacy-by-Design",
        "Multilingual",
        "MENA",
      ],
    },
    {
      title: "MATLAA | مَطْلَع",
      type: "Public-Interest Tech Directory & Knowledge Graph",
      period: "October 2026",
      link: "https://matlaa.org/",
      description:
        "An open-access directory and intelligence knowledge graph cataloging digital tools, crisis datasets, and satellite monitoring platforms for journalists, researchers, and civil society across 12 MENA countries. Features structured threat assessments evaluating security posture, privacy risks, censorship resilience, and Arabic localization.",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Civic Tech",
        "Threat Modeling",
        "OSINT",
        "MENA Data",
      ],
    },
    {
      title: "Lebanese Official Gazette Reconstruction",
      type: "Civic Technology & AI Research",
      period: "2026",
      link: "https://gazette-reader.vercel.app/",
      description:
        "A practice-based civic technology project developed alongside my master's thesis at the University of Amsterdam. Attempted to reconstruct Lebanon's paywalled and largely unsearchable legal archive using AI-assisted web scraping, Arabic OCR, and multilingual semantic search. The project involved a collection of 816 Gazette issues, 149,094 images, and approximately 14.52 GB of archival material, with technical experimentation focused on a smaller 2025 corpus. The resulting prototype became an empirical case study of how commercial infrastructure, algorithmic opacity, and linguistic inequalities constrain AI-driven democratic empowerment. The research also examined the geopolitical risks of substituting Western AI providers with regional, including GCC-backed, alternatives.",
      technologies: [
        "Python",
        "Arabic OCR",
        "Multilingual NLP",
        "Cohere",
        "Supabase",
        "Gemini",
        "AI-Assisted Development",
      ],
    },
    {
      title: "DotFocus",
      type: "Independent Web Application",
      period: "2025 — Present",
      link: "https://dotfocus.app/",
      description:
        "An independently developed web application for attention training through visual fixation and gaze-based exercises. Face and gaze tracking run entirely on the device: no video leaves the browser. The project combines experimental human-computer interaction, web development, and product design, exploring how technology can support concentration rather than compete for attention.",
      technologies: [
        "TypeScript",
        "React",
        "Supabase",
        "Web-Based Computer Vision",
        "Privacy-by-Design",
      ],
    },
  ],

  publications: [
    {
      title:
        "402 Payment Required: Agency, Dependency, and the Lebanese Official Gazette",
      venue: "University of Amsterdam — Master's Thesis",
      year: "2026",
      type: "Academic Thesis",
    },
    {
      title: "The Government Doesn't Have to Build Everything",
      venue: "oulaidegar.com/notes",
      year: "2026",
      type: "Essay",
      link: "https://oulaidegar.com/notes",
    },
  ],

  // Ordered by relevance to responsible AI and digital policy roles.
  certifications: [
    {
      title: "AI and Digital Transformation in Government",
      issuer: "Saïd Business School, University of Oxford, with UNESCO",
      date: "November 2026",
    },
    {
      title: "AI, Justice, and the Rule of Law",
      issuer: "Saïd Business School, University of Oxford, with UNESCO",
      date: "November 2026",
    },
    {
      title: "Ethics of AI (2 ECTS)",
      issuer: "University of Helsinki",
      date: "September 2026",
      link: "https://certificates.mooc.fi/validate/lt2vd3vzj1",
    },
    {
      title: "EU AI Act Fundamentals",
      issuer: "DataCamp",
      date: "December 2025",
    },
    {
      title: "Data Governance Fundamentals",
      issuer: "DataCamp",
      date: "December 2025",
    },
    {
      title: "Google Project Management Professional Certificate",
      issuer: "Google, via Coursera",
      date: "August 2026",
      link: "https://www.credly.com/go/xhgfl2zI",
    },
    {
      title: "AI Engineer for Data Scientists Associate; Associate Data Scientist; Associate Data Analyst; AI Fundamentals",
      issuer: "DataCamp certifications",
      date: "December 2025 – February 2026",
    },
  ] as { title: string; issuer: string; date: string; link?: string }[],

  talks: [] as { title: string; event: string; location: string; year: string }[],

  skills: {
    democraticCivicAI: [
      "Civic Technology & Public-Interest Computing",
      "Digital Sovereignty & Information Access",
      "AI-Assisted Public Infrastructure",
      "Democratic & Epistemic Agency",
      "Responsible AI in Journalism",
      "Privacy-by-Design",
    ],

    aiEthicsAuditing: [
      "AI Ethics & Governance",
      "Algorithmic Accountability",
      "Critical AI Studies",
      "AI Policy Research",
      "Algorithmic Colonialism",
      "Commercial AI Dependency Analysis",
      "Linguistic Sovereignty & Arabic NLP",
      "Data Privacy & Source Protection",
    ],

    creativeTechnology: [
      "Creative Technology & Prototyping",
      "Web Application Development",
      "React / Next.js / TypeScript",
      "Interactive Data Visualization",
      "AI-Assisted Software Development",
      "Digital Product Design",
      "Photography & Visual Storytelling",
      "Podcast & Multimedia Production",
    ],

    culturalDataStandards: [
      "Cultural Data Analysis",
      "Digital Humanities",
      "Archival Research & Digitization",
      "Optical Character Recognition (OCR)",
      "Metadata & Archiving",
      "Text Mining & Document Processing",
      "Qualitative Research & Discourse Analysis",
      "Multilingual Information Retrieval",
    ],

    engineeringStack: [
      "Python",
      "TypeScript / JavaScript",
      "React / Next.js",
      "SQL",
      "Supabase / PostgreSQL",
      "REST APIs & API Integration",
      "Web Scraping & Automation",
      "Multilingual Semantic Search",
      "Cohere / Gemini",
      "Make.com",
      "Git / GitHub",
    ],

    languages: [
      "French (Native)",
      "English (Fluent)",
      "Arabic (B2, spoken)",
      "Spanish (B1)",
    ],
  },
};
