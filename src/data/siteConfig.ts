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
  title: "oulaidegar — Creative Technologist & AI Ethics Researcher",
  role: "Creative Technologist & Researcher",
  description:
    "Building open systems at the intersection of AI ethics, cultural data, and democratic public infrastructure. Exploring creative technology and algorithmic accountability.",
  bio: "Creative technologist and researcher working across AI ethics, cultural data, and democratic technologies. Exploring how computational models shape public memory, algorithmic governance, and collective agency.",
  statement:
    "We cannot surrender our public spheres to black-box corporate monopolies. I build speculative interfaces, algorithmic auditing tools, and open civic systems to ensure artificial intelligence serves democratic deliberation and pluralistic human culture.",
  email: "hello@oulaidegar.com",
  github: "https://github.com",
  twitter: "https://x.com",
  location: "Paris / Remote",
  status: "Designing AI for democratic deliberation & writing M.Sc. thesis in Cultural Data & AI",
  focusAreas: [
    "Building for Democracy",
    "AI Ethics & Algorithmic Accountability",
    "Cultural Data & Digital Heritage",
    "Creative Technology & Speculative UI",
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
