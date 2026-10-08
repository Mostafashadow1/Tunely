export const SITE_CONFIG = {
  name: "Tonely",
  legalName: "Tonely Audio System",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tone-ly.vercel.app",
  defaultTitle: "Tonely — Zero-Asset UI Sound Design for Modern Web",
  titleTemplate: "%s | Tonely",
  description:
    "Ultra-lightweight (<1.5 KB) procedural Web Audio API sound library for React, Next.js, and web apps. Zero MP3 assets, zero network latency, instant feedback.",
  author: {
    name: "Mostafa Mohamed Abdalla",
    url: "https://github.com/Mostafashadow1",
    github: "https://github.com/Mostafashadow1",
  },
  repoUrl: "https://github.com/Mostafashadow1/Tunely",
  npmUrl: "https://www.npmjs.com/package/tonely",
  keywords: [
    "UI sound effects",
    "web audio api",
    "procedural sound design",
    "react micro interactions",
    "nextjs audio library",
    "earcons for web",
    "tactile feedback web ui",
    "zero asset audio",
    "synthesized ui sounds",
    "frontend sound design",
    "react sound effects",
    "interactive sound design",
  ],
  ogImage: {
    url: "/og-image.webp",
    fallbackUrl: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Tonely — Zero-Asset Procedural UI Sound Design System for Modern Web Apps",
    type: "image/webp",
  },
  themeColor: "#06b6d4",
  backgroundColor: "#06090e",
} as const;

export type SiteConfig = typeof SITE_CONFIG;
