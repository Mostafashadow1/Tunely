"use client";

import React from "react";
import Image from "next/image";
import { Terminal, Github, ExternalLink } from "lucide-react";
import { tunely } from "tunely";

export function Footer() {
  const copyInstall = () => {
    navigator.clipboard.writeText("pnpm add tunely");
    tunely.pop({ volume: 0.4 });
  };

  return (
    <>
      {/* Call to Action Footer Strip */}
      <section className="mt-24 text-center">
        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-teal-950/30 p-8 sm:p-12">
          <h3 className="text-2xl font-black text-white sm:text-3xl">
            Ready to give your web applications tactile auditory polish?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
            Install the zero-dependency Tunely package now and start delighting
            your users with instant harmonic cues.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={copyInstall}
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 active:scale-95 cursor-pointer"
            >
              <Terminal className="h-4 w-4" />
              <span>pnpm add tunely</span>
            </button>
            <a
              href="https://github.com/Mostafashadow1/tunely"
              target="_blank"
              rel="noreferrer"
              onClick={() => tunely.click({ volume: 0.25 })}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white cursor-pointer"
            >
              <Github className="h-4 w-4" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 overflow-hidden rounded-md border border-cyan-500/30 bg-slate-900 p-0.5">
              <Image
                src="/logo.png"
                alt="Tunely"
                width={24}
                height={24}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="font-bold text-slate-300">TUNELY</span>
            <span>• MIT License</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://tunely-phi.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-cyan-400 transition"
            >
              <span>tunely.vercel.app</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span>•</span>
            <a
              href="https://www.npmjs.com/package/tunely"
              target="_blank"
              rel="noreferrer"
              className="hover:text-rose-400 transition"
            >
              npm
            </a>
            <span>•</span>
            <a
              href="https://github.com/Mostafashadow1/tunely"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition"
            >
              GitHub
            </a>
          </div>

          <p>
            Created by{" "}
            <a
              href="https://github.com/Mostafashadow1"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-cyan-400 hover:underline"
            >
              Mostafa Mohamed Abdalla
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
