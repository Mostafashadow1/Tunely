"use client";

import React from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { InstallTabs } from "./InstallTabs";
import { tunely } from "tunely";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#06090e]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 h-16">
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={() => tunely.click({ volume: 0.25 })}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-900/90 p-1 shadow-lg shadow-cyan-500/10 transition group-hover:border-cyan-400">
              <Image
                src="/logo.png"
                alt="Tunely Logo"
                width={36}
                height={36}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white group-hover:text-cyan-300 transition">
                TUNELY
              </span>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-300">
                v0.1.0
              </span>
            </div>
          </a>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <a
            href="#soundboard"
            onClick={() => tunely.click({ volume: 0.25 })}
            className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition"
          >
            Soundboard
          </a>
          <a
            href="#prompts"
            onClick={() => tunely.click({ volume: 0.25 })}
            className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition"
          >
            AI Prompts
          </a>
          <a
            href="#code"
            onClick={() => tunely.click({ volume: 0.25 })}
            className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition"
          >
            Code Demos
          </a>
          <a
            href="#comparison"
            onClick={() => tunely.click({ volume: 0.25 })}
            className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition"
          >
            Benchmark
          </a>
        </nav>

        {/* Right side: Install Toggle + NPM + GitHub */}
        <div className="flex items-center gap-2.5">
          {/* Header Toggle Install (like compressly) */}
          <div className="hidden sm:block">
            <InstallTabs compact />
          </div>

          {/* Official NPM Link & Icon */}
          <a
            href="https://www.npmjs.com/package/tunely"
            target="_blank"
            rel="noreferrer"
            onClick={() => tunely.click({ volume: 0.25 })}
            className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1.5 text-xs font-semibold text-rose-300 hover:text-white transition shadow-sm group cursor-pointer"
            title="View tunely on npm"
          >
            {/* Official NPM SVG Icon */}
            <svg
              className="h-3.5 w-3.5 fill-current transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.13h13.74v13.74h-3.435V8.565h-3.435v10.305H5.13z" />
            </svg>
            <span className="hidden md:inline font-mono">npm</span>
          </a>

          {/* GitHub Repo */}
          <a
            href="https://github.com/Mostafashadow1/tunely"
            target="_blank"
            rel="noreferrer"
            onClick={() => tunely.click({ volume: 0.25 })}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition shadow-sm group cursor-pointer"
            title="Star on GitHub"
            aria-label="GitHub Repository"
          >
            <Github className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
            <span className="hidden md:inline font-mono">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
