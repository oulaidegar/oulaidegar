import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Share cards (Open Graph / Twitter) in the site's masthead style.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const BG = "#faf8f5";
const INK = "#1c1917";
const MUTED = "#78716c";
const ACCENT = "#b42318";

const fontDir = join(process.cwd(), "node_modules/@fontsource");

async function loadFonts() {
  const [serif, serifItalic, mono] = await Promise.all([
    readFile(join(fontDir, "newsreader/files/newsreader-latin-400-normal.woff")),
    readFile(join(fontDir, "newsreader/files/newsreader-latin-400-italic.woff")),
    readFile(join(fontDir, "ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff")),
  ]);
  return [
    { name: "Newsreader", data: serif, style: "normal" as const, weight: 400 as const },
    { name: "Newsreader", data: serifItalic, style: "italic" as const, weight: 400 as const },
    { name: "Plex Mono", data: mono, style: "normal" as const, weight: 400 as const },
  ];
}

type CardProps = {
  /** Small uppercase label, top left. */
  kicker: string;
  /** Big serif title. A leading "402" is drawn in the accent colour. */
  title: string;
  /** Italic line under the rule. */
  subtitle?: string;
  /** Optional extra content between rule and footer. */
  children?: React.ReactNode;
};

export async function ogCard({ kicker, title, subtitle, children }: CardProps) {
  const accentPrefix = title.startsWith("402 ") ? "402" : null;
  const rest = accentPrefix ? title.slice(4) : title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          color: INK,
          padding: "64px 80px",
          fontFamily: "Newsreader",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Plex Mono",
            fontSize: 20,
            letterSpacing: 2,
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          <span>{kicker}</span>
          <span>oulaidegar.com</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginTop: 40,
            fontSize: rest.length > 28 ? 72 : 96,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          {accentPrefix && (
            <span style={{ fontFamily: "Plex Mono", color: ACCENT, marginRight: 24, letterSpacing: -4 }}>
              {accentPrefix}
            </span>
          )}
          <span>{rest}</span>
        </div>

        {/* Double rule */}
        <div
          style={{
            display: "flex",
            marginTop: 32,
            height: 8,
            borderTop: `2px solid ${INK}`,
            borderBottom: `2px solid ${INK}`,
          }}
        />

        {subtitle && (
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 36,
              fontStyle: "italic",
              color: "#44403c",
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        )}

        <div style={{ display: "flex", flex: 1, padding: children ? "32px 0 28px" : 0 }}>{children}</div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Plex Mono",
            fontSize: 20,
            color: MUTED,
          }}
        >
          <span>Responsible AI · Digital policy · Data governance</span>
          <span style={{ display: "flex", width: 14, height: 14, background: ACCENT }} />
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() }
  );
}

export const ogColors = { BG, INK, MUTED, ACCENT };
