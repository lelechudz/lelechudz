import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { MotionPrefsProvider } from "@/components/providers/MotionPrefsProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-instrument-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Lei Maboloc — Mobile Developer · Flutter · Dart",
  description:
    "Portfolio of Lei Christian Maboloc — Computer Engineering student and mobile developer shipping production Flutter apps with on-device ML, real-time Firebase systems, and native audio integrations.",
  metadataBase: new URL("https://leimaboloc.com"),
  openGraph: {
    title: "Lei Maboloc — Mobile Developer",
    description: "4 shipped apps. Flutter, Dart, 3D & Shaders.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body className="bg-bg-base text-text-primary antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10000] focus:rounded focus:bg-accent-amber focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-bg-base"
        >
          Skip to main content
        </a>
        <MotionPrefsProvider>
          <Cursor />
          <ScrollProgressBar />
          <LenisProvider>{children}</LenisProvider>
        </MotionPrefsProvider>
      </body>
    </html>
  );
}
