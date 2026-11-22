import type { Metadata, Viewport } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./compiled.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConvexClientProvider from "@/components/ConvexClientProvider";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500"],
  variable: "--font-plex-arabic",
  display: "swap",
});

// Applies the saved (or OS) theme before first paint, so there is no flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#11100f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://oulaidegar.com"),
  openGraph: {
    siteName: "Louaï Mroueh",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
  title: {
    template: "%s | Louaï Mroueh",
    default: "Louaï Mroueh — Responsible AI & Digital Policy",
  },
  description:
    "Louaï Mroueh (oulaidegar): researcher in responsible AI, data governance and digital rights. Led AI integration at Daraj Media; MA Media Studies (Cultural Data & AI), University of Amsterdam. Brussels from February 2027.",
  authors: [{ name: "Louaï Mroueh", url: "https://oulaidegar.com" }],
  keywords: [
    "Louaï Mroueh",
    "Louai Mroueh",
    "Responsible AI",
    "Digital Policy",
    "Data Governance",
    "EU AI Act",
    "Civic Technology",
    "AI Governance",
    "Digital Rights",
    "MENA",
    "Lebanon",
    "Lebanese Official Gazette",
    "oulaidegar",
  ],
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable} ${plexArabic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col selection:bg-accent-soft selection:text-accent"
      >
        <ConvexClientProvider>
          <Header />
          <main className="flex-1 max-w-3xl w-full mx-auto px-5 sm:px-6 py-8 sm:py-12">
            {children}
          </main>
          <Footer />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
