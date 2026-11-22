import { ogCard, ogSize, ogContentType } from "@/lib/og";
import { projects } from "@/data/projects";

export const alt = "Case studies by Louaï Mroueh";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    kicker: `Case studies · ${projects.filter((p) => p.featured).length}`,
    title: "Built",
    subtitle: "Problem, what I did, evidence, and the governance lesson.",
  });
}
