'use client';

import React from 'react';

export function ComparisonTable() {
  return (
    <section id="comparison" className="mt-28 scroll-mt-20">
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-6 sm:p-10">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Why Procedural Web Audio API Wins
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          A side-by-side comparison between conventional MP3 asset hosting and Tonely.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="pb-3 pr-4">Metric</th>
                <th className="pb-3 px-4 text-slate-500">External Audio Files (MP3 / WAV)</th>
                <th className="pb-3 pl-4 text-cyan-400 font-bold">Tonely (Procedural)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              <tr>
                <td className="py-3.5 pr-4 text-slate-300 font-sans font-semibold">Total Asset Download</td>
                <td className="py-3.5 px-4 text-rose-400">50 KB – 300 KB+</td>
                <td className="py-3.5 pl-4 text-emerald-400 font-bold">0 KB (Zero assets!)</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 text-slate-300 font-sans font-semibold">Library Size (gzipped)</td>
                <td className="py-3.5 px-4 text-slate-400">~15 KB (Howler) + Assets</td>
                <td className="py-3.5 pl-4 text-emerald-400 font-bold">&lt; 1.5 KB</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 text-slate-300 font-sans font-semibold">First-Sound Latency</td>
                <td className="py-3.5 px-4 text-rose-400">120ms – 450ms (Network Lag)</td>
                <td className="py-3.5 pl-4 text-emerald-400 font-bold">&lt; 1ms (Instant synthesis)</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 text-slate-300 font-sans font-semibold">Server-Side Safety (SSR)</td>
                <td className="py-3.5 px-4 text-amber-400">Throws without "window" guards</td>
                <td className="py-3.5 pl-4 text-emerald-400 font-bold">100% Isomorphic Safe No-op</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 text-slate-300 font-sans font-semibold">Dynamic Pitch & Themes</td>
                <td className="py-3.5 px-4 text-slate-400">Requires separate audio tracks</td>
                <td className="py-3.5 pl-4 text-emerald-400 font-bold">Mathematical realtime adjustment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ComparisonTable;
