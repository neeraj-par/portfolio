import type { Metadata } from "next";
import { Sora, Caveat, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
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
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neeraj Kumar: Full Stack Developer",
  description:
    "Full Stack Developer (MERN) at Pakistan Agriculture Research. RBAC platforms, secure APIs, and dashboards, built in Karachi.",
  metadataBase: new URL("https://neerajkumar.dev"),
  openGraph: {
    title: "Neeraj Kumar: Full Stack Developer",
    description: "Full Stack Developer (MERN) at Pakistan Agriculture Research.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${caveat.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-paper text-ink font-plex antialiased">{children}</body>
    </html>
  );
}
