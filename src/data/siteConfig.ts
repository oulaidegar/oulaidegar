
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
  navLinks: { name: string; href: string }[];
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

  location: "Paris / Remote",

  status:
    "Building independent tools & civic infrastructure · Researching AI governance and digital rights",

  focusAreas: [
    "AI, Human Agency & Technological Power",
    "Civic Technology & Public Infrastructure",
    "MENA Digital Rights & AI Governance",
    "Creative Technology, Media & Journalism",
  ],

  navLinks: [
    { name: "About", href: "/" },
    { name: "Thesis", href: "/thesis" },
    { name: "Built", href: "/work" },
    { name: "Writing", href: "/writing" },
    { name: "Notes", href: "/notes" },
    { name: "Visuals", href: "/visuals" },
    { name: "Recs", href: "/recommendations" },
    { name: "CV", href: "/cv" },
  ],
};

