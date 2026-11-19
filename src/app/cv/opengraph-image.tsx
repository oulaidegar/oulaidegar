import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "CV of oulaidegar";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    kicker: "Curriculum vitae",
    title: "oulaidegar",
    subtitle: "Creative technologist and researcher. Civic tech, AI governance, MENA.",
  });
}
