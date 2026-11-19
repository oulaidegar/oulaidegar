import { ogCard, ogSize, ogContentType } from "@/lib/og";
import { projects } from "@/data/projects";

export const alt = "Built: projects by oulaidegar";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    kicker: `Register · ${projects.length} entries`,
    title: "Built",
    subtitle: "Civic tools, public-interest platforms and experiments in attention for the Middle East.",
  });
}
