
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
  title:
    "Creative Technologist & Researcher | AI Ethics, Civic Technology & Digital Media",
  email: "oulaidegar@gmail.com",
  website: "https://oulaidegar.com",
  github: "https://github.com",
  location: "Beirut / Remote",

  summary:
    "Creative technologist and researcher working at the intersection of artificial intelligence, digital humanities, journalism, and democratic systems. With a background in literary and cultural analysis, AI integration, and multimedia production, I combine technical development with critical inquiry into how technologies shape human agency, public knowledge, and institutional power. My work spans AI-assisted civic infrastructure, privacy-first applications, newsroom automation, and independent research into algorithmic accountability, digital sovereignty, and the political economy of AI. I am particularly interested in building public-interest technologies that address information inequality and the infrastructural challenges facing the Middle East.",

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
        "Coordinated creative productions, studio sessions, music video shoots, and live events for musical artists.",
        "Managed logistics involving production crews, locations, technical equipment, accommodations, and artist schedules.",
        "Developed brand partnerships and product-seeding initiatives connecting artists with fashion and lifestyle companies.",
        "Worked with creative teams, artists, vendors, and venues to execute productions and commercial projects.",
        "Combined production planning, client communication, and creative direction across multidisciplinary assignments.",
      ],
    },
    {
      role: "Podcast Head — Development",
      organization: "The Next Cartel",
      location: "Amsterdam, Netherlands",
      period: "2022",
      highlights: [
        "Contributed to the development of a podcast concept, including research, editorial planning, and creative coordination.",
        "Collaborated with the team on production planning and the program's editorial direction.",
      ],
    },
    {
      role: "Studio Assistant",
      organization: "Westerpark Studios",
      location: "Amsterdam, Netherlands",
      period: "September — December 2022",
      highlights: [
        "Supported photography and audiovisual productions through studio preparation, equipment management, and technical setup.",
        "Coordinated with clients and creative teams to ensure smooth production operations.",
        "Contributed to the organization and maintenance of studio facilities and equipment.",
      ],
    },
    {
      role: "Young Journalist Award Participant",
      organization: "Dubai International Film Festival",
      location: "Dubai, United Arab Emirates",
      period: "December 2017",
      highlights: [
        "Selected as a finalist and participant in the festival's Young Journalist Award program.",
        "Produced film reviews, interviews, and cultural reporting under editorial deadlines.",
        "Gained practical experience in journalism, film criticism, interviewing, and arts reporting.",
      ],
    },
    {
      role: "Commercial Photographer",
      organization: "The Good Life",
      location: "Dubai, United Arab Emirates",
      period: "April 2016 — June 2017",
      highlights: [
        "Produced photography and visual assets for the company's website, social media, and brand communications.",
        "Covered events and commercial activations, combining photography with guest interaction and visual storytelling.",
        "Worked with the creative team to maintain consistency across the company's visual identity.",
      ],
    },
  ],

  projects: [
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
        "An independently developed, privacy-first web application for attention training through visual fixation and gaze-based exercises. Designed around minimalist interaction, client-side visual processing, and privacy-conscious data practices. The project combines experimental human-computer interaction, web development, and product design, exploring how technology can support concentration rather than compete for attention.",
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
  ],

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
      "Arabic (Conversational)",
      "Spanish (B1)",
    ],
  },
};
