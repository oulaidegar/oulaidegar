import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "oulaidegar: creative technologist and researcher, Beirut";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    kicker: "Beirut / Remote",
    title: "oulaidegar",
    subtitle: "Democratizing the capacity to build software is not the same as democratizing the infrastructures societies depend on.",
  });
}
