import data from "@/data/gazette-issues.json";

export const dynamic = "force-static";

export function GET() {
  const issues = data.issues.map(([year, issue, pages, state]) => ({ year, issue, pages, state }));
  return Response.json({
    source: "Lebanese Official Gazette, 2014–2025, as collected for the thesis '402 Payment Required'",
    states: {
      searchable: "OCR'd, embedded and searchable in the research prototype",
      ocr: "Text extracted, not yet loaded into search",
      image: "Scanned images only",
    },
    count: issues.length,
    issues,
  });
}
