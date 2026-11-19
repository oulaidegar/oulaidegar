import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "This site is machine-readable";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    kicker: "Open by default",
    title: "This site is machine-readable",
    subtitle: "Every project, note and the full Gazette index, as JSON.",
  });
}
