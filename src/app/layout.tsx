import type { Metadata, Viewport } from "next";
import "./compiled.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConvexClientProvider from "@/components/ConvexClientProvider";

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
  title: {
    template: "%s | oulaidegar",
    default: "oulaidegar — Cultural Data, AI & Engineering",
  },
  description:
    "Personal site, projects, thesis research in Cultural Data & AI, writings, notes, and visual archive by oulaidegar.",
  authors: [{ name: "oulaidegar" }],
  keywords: [
    "Cultural Data",
    "Artificial Intelligence",
    "Digital Humanities",
    "Machine Learning",
    "Research",
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
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col selection:bg-stone-200 selection:text-stone-900 dark:selection:bg-stone-800 dark:selection:text-stone-100"
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
