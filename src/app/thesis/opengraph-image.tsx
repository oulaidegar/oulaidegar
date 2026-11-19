import { ogCard, ogSize, ogContentType, ogColors } from "@/lib/og";
import data from "@/data/gazette-issues.json";

export const alt =
  "402 Payment Required: 816 issues of the Lebanese Official Gazette, with the searchable ones highlighted";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const byYear = new Map<number, string[]>();
  for (const [year, , , state] of data.issues as [number, number, number, string][]) {
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(state);
  }
  const rows = [...byYear.entries()].sort((a, b) => b[0] - a[0]);
  const color = (s: string) =>
    s === "searchable" ? ogColors.ACCENT : s === "ocr" ? "#e3a59c" : "#d6d3d1";

  return ogCard({
    kicker: "MA thesis · University of Amsterdam",
    title: "402 Payment Required",
    subtitle: "Agency, Dependency, and the Lebanese Official Gazette",
    children: (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 4, flex: 1 }}>
        {rows.map(([year, states]) => (
          <div key={year} style={{ display: "flex", gap: 3 }}>
            {states.map((s, i) => (
              <div key={i} style={{ display: "flex", width: 9, height: 10, background: color(s) }} />
            ))}
          </div>
        ))}
      </div>
    ),
  });
}
