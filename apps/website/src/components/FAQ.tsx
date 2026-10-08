import React from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/faq-data";

export function FAQ() {
  return (
    <section id="faq" className="mt-28 scroll-mt-20" aria-labelledby="faq-heading">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          <HelpCircle className="h-4 w-4" />
          <span>Technical Reference & FAQ</span>
        </div>
        <h2
          id="faq-heading"
          className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl"
        >
          Frequently Asked Questions
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Everything you need to know about procedural Web Audio API synthesis and Tonely architecture.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {FAQ_ITEMS.map((item, index) => (
          <details
            key={index}
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700 open:border-cyan-500/40 open:bg-slate-900/90"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-slate-200 transition-colors group-open:text-cyan-300">
              <span className="pr-4">{item.question}</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-cyan-400" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
