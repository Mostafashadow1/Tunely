import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tonely.dev"),
  title: "Tonely — Zero-asset, Synthesized UI Sounds for Modern Web",
  description:
    "Ultra-lightweight (< 1.5 KB), procedural sound design system for Next.js, React, Vue, and Vanilla JS. Zero MP3s, zero network latency, 100% Web Audio API synthesis.",
  keywords: [
    "UI sound effects",
    "web audio api",
    "micro interactions",
    "sound design system",
    "earcon",
    "react sounds",
    "nextjs audio",
    "synthesized sound",
    "tonely",
  ],
  authors: [
    {
      name: "Mostafa Mohamed Abdalla",
      url: "https://github.com/Mostafashadow1",
    },
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Tonely — Zero-asset, Synthesized UI Sounds",
    description:
      "Ultra-lightweight procedural UI sound synthesis for modern web apps. Zero external audio assets, zero latency.",
    images: [
      { url: "/cover.jpeg", width: 1024, height: 571, alt: "Tonely Cover" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#06090e] text-[#f8fafc] antialiased">
        {children}
      </body>
    </html>
  );
}
