'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { tonely } from 'tonely';

const AI_PROMPTS = [
  {
    title: 'Integrate Tonely with Sonner & Shadcn UI',
    target: 'Cursor / Claude / Copilot',
    description: 'Wrap your existing toast notifications to automatically trigger harmonic procedural sounds.',
    prompt: `I want to integrate 'tonely' into my Next.js / React project. 
Please install 'tonely' and wrap my toast helper (Sonner / Shadcn UI) so that:
- toast.success() plays tonely.success()
- toast.error() plays tonely.error()
- toast.warning() plays tonely.warning()
- toast.info() plays tonely.info()
Ensure it is 100% SSR-safe and works seamlessly inside client components.`,
  },
  {
    title: 'Sound Feedback for Next.js Server Actions & Forms',
    target: 'Next.js 15 / Cursor',
    description: 'Add instant tactile feedback on form submit, success on 200, error on failure.',
    prompt: `Please update my form submissions and Next.js Server Actions using 'tonely':
1. When the user clicks the submit button, trigger tonely.click()
2. If the Server Action returns success or HTTP 200, play tonely.success()
3. If the Server Action returns validation errors or fails, play tonely.error()
Import { tonely } from 'tonely' and keep all audio calls strictly client-side.`,
  },
  {
    title: 'Automatic Fetch / Axios Response Status Interceptor',
    target: 'TanStack Query / Axios',
    description: 'Automatically chime on any API call depending on HTTP status code.',
    prompt: `I am using fetch / TanStack Query in my web app. 
Please configure a centralized helper using 'tonely' that maps HTTP responses:
- Status 2xx -> tonely.fromStatus(response.status) [success chime]
- Status 4xx / 5xx -> tonely.fromStatus(response.status) [gentle error tone]
Ensure audio playback is smooth, non-blocking, and respects user gestures.`,
  },
  {
    title: 'Add Micro-interactions to Buttons & Modals',
    target: 'v0 / Antigravity / Cursor',
    description: 'Enhance navigation, dialogs, and toggle switches with responsive micro sounds.',
    prompt: `Enhance my UI components using the 'tonely' library:
- Add tonely.click() to primary action buttons and tab switches
- Add tonely.pop() when modals or dropdown menus open
- Add tonely.toggle(activeState) to switches and checkboxes
- Add tonely.delete() when deleting items
Keep it clean, subtle, and responsive with zero external audio assets.`,
  },
];

export function AIPromptsHub() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    tonely.pop({ volume: 0.45 });
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="prompts" className="mt-28 scroll-mt-20">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
          <Sparkles className="h-4 w-4" />
          <span>Supercharge Your Agent Workflow</span>
        </div>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          AI Prompts Hub for Cursor, Claude & v0
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Copy and paste these pre-crafted instructions directly into Cursor Composer, Claude 3.7, v0, ChatGPT, or Antigravity to instrument your entire application in seconds.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {AI_PROMPTS.map((promptItem, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                  {promptItem.target}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(promptItem.prompt, idx)}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:border-amber-400/50 hover:bg-slate-700 cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="mt-3 text-base font-semibold text-white">
                {promptItem.title}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                {promptItem.description}
              </p>

              <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/80 p-3">
                <pre className="font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
                  {promptItem.prompt}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AIPromptsHub;
