export interface SiteConfig {
  name: string;
  domain: string;
  title: string;
  description: string;
  bio: string;
  email: string;
  github: string;
  twitter: string;
  scholar?: string;
  location: string;
  status: string;
  navLinks: { name: string; href: string }[];
}

export const siteConfig: SiteConfig = {
  name: "oulaidegar",
  domain: "oulaidegar.com",
  title: "oulaidegar — Cultural Data, AI & Research",
  description:
    "Personal site, portfolio, thesis research in Cultural Data & AI, writings, field notes, and visual archive.",
  bio: "Master's candidate in Cultural Data and AI. Exploring computational hermeneutics, archival machine learning, and the intersections of human cultural heritage with generative systems.",
  email: "hello@oulaidegar.com",
  github: "https://github.com",
  twitter: "https://x.com",
  location: "Paris / Remote",
  status: "Writing Master's Thesis & building open cultural tooling",
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
