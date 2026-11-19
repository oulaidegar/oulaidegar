
export interface SiteConfig {
  name: string;
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
  domain: "oulaidegar.com",

  title: "oulaidegar — Creative Technologist & Researcher",

  role: "Creative Technologist & Researcher",

  description:
    "Researching, building, and experimenting at the intersection of artificial intelligence, civic technology, digital culture, and journalism. Interested in how technology shapes human agency, public knowledge, and political power.",

  bio:
    "I'm a French-Lebanese creative technologist and researcher with a background in cultural analysis, journalism, and software development. I studied Cultural Data & Artificial Intelligence at the University of Amsterdam (MA, 2025–2026), where my thesis examined the relationship between AI, democratic agency, and infrastructural dependency through the reconstruction of the Lebanese Official Gazette. My research interests extend to AI governance, digital rights, technological sovereignty, and the political economy of emerging technologies, particularly in the Middle East and North Africa. Previously, I led AI integration and research at Daraj Media, working on the practical and ethical implications of AI in independent journalism. Alongside my research, I build independent digital projects, from civic information and impact-monitoring platforms to experimental tools for attention and human-computer interaction.",

  statement:
    "Technology changes what we are capable of doing, but not necessarily who holds power. AI may make building easier, yet the infrastructures we depend on remain shaped by governments, corporations, economic interests, and unequal access to information. I'm interested in examining those relationships while building things that make knowledge more accessible, give people greater agency, and allow communities to create on their own terms. I believe public infrastructure should enable people to build upon it, rather than simply determine what they are allowed to access.",

  email: "oulaidegar@gmail.com",

  substack:
    "https://substack.com/@oulaidegar",

  spotify:
    "https://open.spotify.com/show/5XDjy78JWpnpbEgSOln3Qj",

  location: "Beirut / Remote",

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
    "I'm a French-Lebanese creative technologist and researcher. I build civic tools for the Middle East and study who actually holds power when AI makes building easier.",

  now: [
    "Running MATLAA, a public-interest tech directory for MENA",
    "Building Manaratan, impact monitoring for civil society",
    "Mapping AI governance across the region for the MENA AI Observatory",
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
  ],
};

