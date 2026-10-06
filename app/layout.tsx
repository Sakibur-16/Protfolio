import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import { buildMetadata, personJsonLd } from "@/lib/metadata";
import { ThemeProvider, themeInitScript } from "@/components/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IndexRail } from "@/components/layout/IndexRail";
import { CursorFX } from "@/components/layout/CursorFX";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Preloader } from "@/components/layout/Preloader";
import "./globals.css";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* Stamps data-theme on <html> before first paint to avoid a theme flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-bg text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
          >
            Skip to content
          </a>
          <Preloader />
          <GrainOverlay />
          <ScrollProgress />
          <CursorFX />
          <Header />
          <IndexRail />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
