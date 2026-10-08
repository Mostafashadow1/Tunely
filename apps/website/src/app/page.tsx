'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Soundboard } from '@/components/Soundboard';
import { AIPromptsHub } from '@/components/AIPromptsHub';
import { CodeDemos } from '@/components/CodeDemos';
import { ComparisonTable } from '@/components/ComparisonTable';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#06090e] text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-600/15 via-teal-500/10 to-amber-500/5 blur-[140px]" />
        <div className="absolute top-[600px] -left-40 h-[450px] w-[600px] rounded-full bg-cyan-900/10 blur-[130px]" />
      </div>

      {/* Modular Header with Install Toggle and NPM/GitHub Icons */}
      <Header />

      {/* Main Content Sections */}
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-24">
        {/* 1. Hero Section with Instant Audio Buttons */}
        <Hero />

        {/* 2. Interactive Soundboard Playground */}
        <Soundboard />

        {/* 3. AI Prompts Hub for Cursor, Claude, v0 */}
        <AIPromptsHub />

        {/* 4. Senior Multi-Framework Code Integration Demos */}
        <CodeDemos />

        {/* 5. Web Audio vs MP3 Assets Benchmark */}
        <ComparisonTable />

        {/* 6. Call to Action & Footer */}
        <Footer />
      </main>
    </div>
  );
}
