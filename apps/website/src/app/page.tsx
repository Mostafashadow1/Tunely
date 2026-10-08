import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Soundboard } from "@/components/Soundboard";
import { AIPromptsHub } from "@/components/AIPromptsHub";
import { CodeDemos } from "@/components/CodeDemos";
import { ComparisonTable } from "@/components/ComparisonTable";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#06090e] text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* 1. Google-Compliant JSON-LD Structured Data */}
      <StructuredData />

      {/* 2. Background Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-600/15 via-teal-500/10 to-amber-500/5 blur-[140px]" />
        <div className="absolute top-[600px] -left-40 h-[450px] w-[600px] rounded-full bg-cyan-900/10 blur-[130px]" />
      </div>

      {/* 3. Accessible Site Header */}
      <Header />

      {/* 4. Primary Content Landmarks */}
      <main id="main-content" className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Hero Section with H1 and Quick Auditions */}
        <Hero />

        {/* Interactive Procedural Audio Studio */}
        <Soundboard />

        {/* AI Coding Agent Prompts Hub */}
        <AIPromptsHub />

        {/* Universal Multi-Framework Code Demos */}
        <CodeDemos />

        {/* Audio Synthesis Benchmark Table */}
        <ComparisonTable />

        {/* High-Intent Technical FAQ Section */}
        <FAQ />
      </main>

      {/* 5. Call-To-Action & Site Footer */}
      <Footer />
    </div>
  );
}
