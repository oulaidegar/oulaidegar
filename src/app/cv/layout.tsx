import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description:
    "CV of Louaï Mroueh: responsible AI and digital policy. Led AI integration at Daraj Media; MA Media Studies (Cultural Data & AI), University of Amsterdam. Brussels from February 2027.",
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return children;
}
