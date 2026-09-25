import type { Metadata } from "next";
import { Sora, Caveat, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { profile, siteUrl, summary, toolkit } from "@/lib/content";
import MotionProvider from "@/components/ui/MotionProvider";
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

const TITLE = "Neeraj Kumar | Full Stack Developer (MERN), Karachi, Pakistan";
const DESCRIPTION =
  "Neeraj Kumar is a Full Stack Developer (MERN) in Karachi, Pakistan. He builds RBAC admin platforms, secure REST APIs and real-time dashboards with React, Node.js, Express and MongoDB at Pakistan Agriculture Research.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  keywords: [
    "Neeraj Kumar",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Karachi",
    "Pakistan",
    "RBAC",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  // Allow large image previews and full snippets in search results.
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "profile",
    url: "/",
    siteName: profile.name,
    locale: "en_US",
    firstName: "Neeraj",
    lastName: "Kumar",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const personId = `${siteUrl}/#person`;

// Linked schema graph (WebSite, ProfilePage, Person) so search engines and AI answer engines resolve one entity with facts, skills and profiles.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${profile.name} Portfolio`,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: TITLE,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": personId },
      dateModified: "2026-09-25",
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      givenName: "Neeraj",
      familyName: "Kumar",
      description: summary,
      jobTitle: "Full Stack Developer (MERN)",
      url: siteUrl,
      image: `${siteUrl}/neeraj.jpg`,
      email: profile.email,
      sameAs: [profile.github, profile.linkedin],
      knowsAbout: toolkit.flatMap((c) => c.tags),
      knowsLanguage: "en",
      worksFor: { "@type": "Organization", name: "Pakistan Agriculture Research", url: "https://par.com.pk" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "DHA Suffa University" },
      homeLocation: { "@type": "City", name: "Karachi" },
      address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
    },
  ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={`${sora.variable} ${caveat.variable} ${plexSans.variable} ${plexMono.variable}`}>
    <body className="bg-paper text-ink font-plex antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MotionProvider>{children}</MotionProvider>
    </body>
  </html>
);

export default RootLayout;
