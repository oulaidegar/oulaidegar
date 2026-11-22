import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "CV of Louaï Mroueh";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    kicker: "Curriculum vitae",
    title: "Louaï Mroueh",
    subtitle: "Responsible AI & digital policy · Brussels from February 2027 · French citizen (EU)",
  });
}
