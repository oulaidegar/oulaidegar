import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Notes by oulaidegar";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    kicker: "Field notes",
    title: "Notes",
    subtitle: "Thinking out loud about civic infrastructure, AI and power.",
  });
}
