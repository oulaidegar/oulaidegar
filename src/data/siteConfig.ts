
export interface SiteConfig {
  name: string;
  domain: string;
  title: string;
  role: string;
  description: string;
  bio: string;
  statement: string;
  email: string;
  github: string;
  twitter: string;
  scholar?: string;
  location: string;
  status: string;
  focusAreas: string[];
  navLinks: { name: string; href: string }[];
}

export const siteConfig: SiteConfig = {
  name: "oulaidegar",
  domain: "oulaidegar.com",

  title:
    "oulaidegar — Creative Technologist & Researcher",

  role: "Creative Technologist & Researcher",

  description:
    "Exploring the intersection of artificial intelligence, creative technology, journalism, and democratic systems. Building digital tools and investigating how technology shapes knowledge, agency, and power.",

  bio:
    "I'm a creative technologist and researcher with a Master of Arts in Cultural Data & Artificial Intelligence from the University of Amsterdam. My work brings together technical development, critical research, and creative practice, with particular interests in civic technology, digital sovereignty, journalism, and the political economy of AI. My master's thesis examined the promises and structural limitations of AI-driven democratic empowerment through the reconstruction of the Lebanese Official Gazette. Previously, I led AI integration and research at Daraj Media, working at the intersection of emerging technologies and independent journalism. Alongside my research, I develop independent digital products, including DotFocus, a privacy-first attention-training application.",

  statement:
    "Access to technology is not the same as access to power. Artificial intelligence may lower the barriers to building, but the systems we depend on remain shaped by corporate interests, political institutions, and unequal access to resources. I'm interested in what technology makes possible, what it quietly constrains, and how we can build tools that expand human agency rather than reproduce existing dependencies.",

  email: "hello@oulaidegar.com",

  // Add verified personal profile URLs when available.
  github: "",
  twitter: "",

  location: "Paris / Remote",

  status:
    "Building independent digital tools · Researching AI, agency & digital sovereignty",

  focusAreas: [
    "Civic Technology & Public Knowledge",
    "AI Ethics, Agency & Digital Sovereignty",
    "Journalism, Automation & Arabic NLP",
    "Creative Technology & Privacy-First Tools",
  ],

  navLinks: [
    { name: "About", href: "/" },
    { name: "Thesis", href: "/thesis" },
    { name: "Built", href: "/work" },
    { name: "Writing", href: "/writing" },
    { name: "Notes", href: "/notes" },
    { name: "Visuals", href: "/visuals" },
    { name: "CV", href: "/cv" },
  ],
};
