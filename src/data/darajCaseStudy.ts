import type { CaseStudy } from "./projects";

// Daraj Media: the strongest professional evidence, shown on the homepage.
export const darajCaseStudy: {
  role: string;
  organization: string;
  location: string;
  period: string;
} & CaseStudy = {
  role: "Lead, AI Integration & Research",
  organization: "Daraj Media",
  location: "Beirut",
  period: "March 2024 – August 2025",
  problem:
    "An independent Arabic-language newsroom wanted to use AI without putting sources, editorial standards or Arabic-language quality at risk.",
  whatIDid:
    "Led AI research and adoption across the organisation: designed and tested workflows for research, document analysis, data extraction, content production and audience analytics with journalists, editors and developers, and set out how data privacy, source protection and reliance on proprietary models would be handled.",
  evidence: [
    "Rolled out to a team of about 20 people",
    "Most of the workflows were adopted and are still in use",
  ],
  lesson:
    "Responsible adoption is mostly an organisational question: deciding which material may go into which model, and keeping people accountable for the output, matters more than which model you choose.",
};
