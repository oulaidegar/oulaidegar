import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Louaï Mroueh: responsible AI and digital policy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    kicker: "Brussels from February 2027",
    title: "Louaï Mroueh",
    subtitle: "Responsible AI & digital policy. Led AI integration at Daraj Media; MA in Cultural Data & AI, University of Amsterdam.",
  });
}
