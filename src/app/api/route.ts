import { siteConfig } from "@/data/siteConfig";

export const dynamic = "force-static";

export function GET() {
  const base = `https://${siteConfig.domain}`;
  return Response.json({
    name: siteConfig.name,
    description: siteConfig.intro,
    license: "Content © oulaidegar. Free to read, link and build on; please credit.",
    endpoints: {
      projects: `${base}/api/projects`,
      notes: `${base}/api/notes`,
      thesis: `${base}/api/thesis`,
      gazette: `${base}/api/gazette`,
      cv: `${base}/api/cv`,
    },
  });
}
