
export interface SiteConfig {
  /** Online handle and domain name. */
  name: string;
  /** Real name, used wherever a recruiter would look. */
  fullName: string;
  /** Secondary line under the role. */
  secondaryRole: string;
  /** Where and when you are available, shown in the hero and on the CV. */
  availability: string;
  /** Kinds of roles you're open to. */
  openTo: string;
  linkedin?: string;
  domain: string;
  title: string;
  role: string;
  description: string;
  bio: string;
  statement: string;
  email: string;
  substack: string;
  spotify: string;
  github?: string;
  twitter?: string;
  scholar?: string;
  location: string;
  status: string;
  focusAreas: string[];
  /** One-line thesis of the whole site, shown as the homepage hero. */
  headline: string;
  /** Short plain-language intro shown under the headline. */
  intro: string;
  /** What you are working on right now. Update freely. */
  now: string[];
  navLinks: { name: string; href: string }[];
  secondaryLinks: { name: string; href: string }[];
}

export const siteConfig: SiteConfig = {
  name: "oulaidegar",
  fullName: "Louaï Mroueh",
  domain: "oulaidegar.com",

  title: "Louaï Mroueh — Responsible AI & Digital Policy",

  role: "Responsible AI & Digital Policy",

  secondaryRole: "Researcher · Creative technologist",

  availability: "Brussels from February 2027 · French citizen (EU)",

  openTo: "Open to roles in responsible AI, digital policy and data governance",

  description:
    "Researching, building, and experimenting at the intersection of artificial intelligence, civic technology, digital culture, and journalism. Interested in how technology shapes human agency, public knowledge, and political power.",

  bio:
    "I'm a French-Lebanese researcher working on responsible AI, data governance and digital rights, with a background in cultural analysis, journalism, and software development. I completed an MA in Media Studies (Cultural Data & AI) at the University of Amsterdam's Faculty of Humanities (2025–2026), where my thesis examined the relationship between AI, democratic agency, and infrastructural dependency through the reconstruction of the Lebanese Official Gazette. My research interests extend to AI governance, digital rights, technological sovereignty, and the political economy of emerging technologies, particularly in the Middle East and North Africa. Previously, I led AI integration and research at Daraj Media, working on the practical and ethical implications of AI in independent journalism. Alongside my research, I build independent digital projects, from civic information and impact-monitoring platforms to experimental tools for attention and human-computer interaction.",

  statement:
    "Technology changes what we are capable of doing, but not necessarily who holds power. AI may make building easier, yet the infrastructures we depend on remain shaped by governments, corporations, economic interests, and unequal access to information. I'm interested in examining those relationships while building things that make knowledge more accessible, give people greater agency, and allow communities to create on their own terms. I believe public infrastructure should enable people to build upon it, rather than simply determine what they are allowed to access.",

  email: "oulaidegar@gmail.com",

  substack:
    "https://substack.com/@oulaidegar",

  spotify:
    "https://open.spotify.com/show/5XDjy78JWpnpbEgSOln3Qj",

  location: "Brussels from February 2027",

  github: "https://github.com/oulaidegar",

  linkedin: "https://www.linkedin.com/in/louai-m-24664b1b7",

  status:
    "Building independent tools & civic infrastructure · Researching AI governance and digital rights",

  focusAreas: [
    "AI, Human Agency & Technological Power",
    "Civic Technology & Public Infrastructure",
    "MENA Digital Rights & AI Governance",
    "Creative Technology, Media & Journalism",
  ],

  headline:
    "Democratizing the capacity to build software is not the same as democratizing the infrastructures societies depend on.",

  intro:
    "I'm a French-Lebanese researcher working on responsible AI, data governance and digital rights. I led AI adoption at an independent newsroom, wrote my MA thesis on AI dependency and access to public records, and build public-interest tools for the Middle East.",

  now: [
    "Moving to Brussels in February 2027",
    "Building the MENA AI Observatory, a comparative atlas of AI governance, digital rights and data protection law across the region",
    "Developing Manaratan, impact monitoring for civil society organisations",
  ],

  navLinks: [
    { name: "Built", href: "/work" },
    { name: "Thesis", href: "/thesis" },
    { name: "Notes", href: "/notes" },
    { name: "CV", href: "/cv" },
  ],

  secondaryLinks: [
    { name: "Visuals", href: "/visuals" },
    { name: "Recommendations", href: "/recommendations" },
    { name: "Pong", href: "/play" },
    { name: "Data", href: "/data" },
  ],
};

