"use client";

import React from "react";
import Image from "next/image";
import { Zap, CheckCircle2, XCircle, Wine, Sparkles } from "lucide-react";
import { tunely, type SoundName } from "tunely";
import { InstallTabs } from "./InstallTabs";

export function Hero() {
  const playSound = (name: SoundName) => {
    tunely.play(name, { volume: 0.8 });
  };

  return (
    <section className="text-center pt-8 sm:pt-14">
      {/* Metric Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-medium text-cyan-300 backdrop-blur-sm">
        <Zap className="h-3.5 w-3.5 text-cyan-400" />
        <span>
          Procedural Web Audio API • 0 KB Audio Assets • &lt; 1.5 KB JS
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
        Give Your Web UI a Voice.{" "}
        <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
          Without Shipping a Single MP3.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
        Modern SaaS apps deserve rich tactile feedback. Tunely synthesizes
        clean, pleasant micro-interactions at runtime with{" "}
        <strong>zero external audio files</strong>,{" "}
        <strong>zero HTTP requests</strong>, and{" "}
        <strong>zero network latency</strong>.
      </p>

      {/* Quick Test Buttons */}
      <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => playSound("success")}
          className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-300 shadow-lg shadow-emerald-950/50 transition hover:scale-105 hover:bg-emerald-900/40 active:scale-95 cursor-pointer"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Test Success (200 OK)</span>
        </button>
        <button
          onClick={() => playSound("error")}
          className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-950/40 px-4 py-2.5 text-xs sm:text-sm font-semibold text-rose-300 shadow-lg shadow-rose-950/50 transition hover:scale-105 hover:bg-rose-900/40 active:scale-95 cursor-pointer"
        >
          <XCircle className="h-4 w-4 text-rose-400" />
          <span>Test Error (500)</span>
        </button>
        <button
          onClick={() => playSound("glass")}
          className="flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-4 py-2.5 text-xs sm:text-sm font-semibold text-cyan-300 shadow-lg shadow-cyan-950/50 transition hover:scale-105 hover:bg-cyan-900/40 active:scale-95 cursor-pointer"
        >
          <Wine className="h-4 w-4 text-cyan-400" />
          <span>Glass Chime</span>
        </button>
        <button
          onClick={() => playSound("pop")}
          className="flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-950/40 px-4 py-2.5 text-xs sm:text-sm font-semibold text-purple-300 shadow-lg shadow-purple-950/50 transition hover:scale-105 hover:bg-purple-900/40 active:scale-95 cursor-pointer"
        >
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span>Bubble Pop</span>
        </button>
      </div>

      {/* Package Manager Installation Strip */}
      <div className="mt-8">
        <InstallTabs />
      </div>
    </section>
  );
}

export default Hero;
