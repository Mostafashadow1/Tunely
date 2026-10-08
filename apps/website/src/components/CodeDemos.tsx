'use client';

import React, { useState } from 'react';
import { Code2, Copy, Check } from 'lucide-react';
import { tunely } from 'tunely';

const CODE_EXAMPLES = {
  react: `'use client';

import { useTunely } from 'tunely/react';

export function CheckoutButton() {
  const { success, error, click } = useTunely({ theme: 'glass' });

  const handleCheckout = async () => {
    click(); // Instant tactile response on click
    try {
      await processPayment();
      success(); // 🎶 Harmonic rising chime
    } catch (err) {
      error();   // ⚠️ Gentle warning double-tone
    }
  };

  return (
    <button onClick={handleCheckout} className="btn-primary">
      Complete Purchase
    </button>
  );
}`,

  nextServerActions: `'use client';

import { useTransition } from 'react';
import { tunely } from 'tunely';
import { updateUserProfile } from '@/actions/user';

export function ProfileForm() {
  const [isPending, startTransition] = useTransition();

  const onSubmit = (formData: FormData) => {
    tunely.click();
    startTransition(async () => {
      const result = await updateUserProfile(formData);
      if (result.ok) {
        tunely.success();
      } else {
        tunely.error();
      }
    });
  };

  return (
    <form action={onSubmit}>
      {/* ...fields... */}
      <button disabled={isPending}>Save Changes</button>
    </form>
  );
}`,

  sonner: `import { toast as baseToast } from 'sonner';
import { tunely } from 'tunely';

// Universal Sound-Enhanced Toast Helper
export const toast = {
  success: (msg: string) => {
    tunely.success();
    return baseToast.success(msg);
  },
  error: (msg: string) => {
    tunely.error();
    return baseToast.error(msg);
  },
  warning: (msg: string) => {
    tunely.warning();
    return baseToast.warning(msg);
  },
  info: (msg: string) => {
    tunely.info();
    return baseToast.info(msg);
  },
};`,

  vanilla: `import { tunely } from 'tunely';

// 1. Direct micro-interactions
document.querySelector('#btn-save').addEventListener('click', () => {
  tunely.click();
});

// 2. HTTP Status feedback (200 -> success, 500 -> error)
const res = await fetch('/api/checkout', { method: 'POST' });
tunely.fromStatus(res.status);

// 3. One-line fetch wrapper
const enhancedFetch = tunely.wrapFetch();
await enhancedFetch('/api/data'); // Auto-plays sound on 200 or 4xx!`,

  vue: `<script setup>
import { tunely } from 'tunely';

const onSave = async () => {
  tunely.click();
  try {
    await savePost();
    tunely.success();
  } catch (e) {
    tunely.error();
  }
};
</script>

<template>
  <button @click="onSave">Publish</button>
</template>`,
};

export function CodeDemos() {
  const [activeCodeTab, setActiveCodeTab] = useState<keyof typeof CODE_EXAMPLES>('react');
  const [copied, setCopied] = useState<boolean>(false);

  const copyCode = () => {
    navigator.clipboard.writeText(CODE_EXAMPLES[activeCodeTab]);
    tunely.pop({ volume: 0.4 });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code" className="mt-28 scroll-mt-20">
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
          <Code2 className="h-4 w-4" />
          <span>Universal DX & Full Isomorphic Safety</span>
        </div>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Clean Integrations Across Any Stack
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Works server-side (Next.js SSR / Server Components / Actions) as a safe no-op, and client-side across React, Vue, Svelte, and Vanilla JS.
        </p>
      </div>

      <div className="mt-6">
        {/* Framework Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'react', label: 'React / useTunely' },
            { id: 'nextServerActions', label: 'Next.js 15 Server Actions' },
            { id: 'sonner', label: 'Sonner / Shadcn UI' },
            { id: 'vanilla', label: 'Vanilla JS / Fetch' },
            { id: 'vue', label: 'Vue 3' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCodeTab(tab.id as keyof typeof CODE_EXAMPLES);
                tunely.click({ volume: 0.25 });
              }}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                activeCodeTab === tab.id
                  ? 'border border-teal-500/50 bg-teal-500/20 text-teal-300 shadow-sm'
                  : 'border border-transparent text-slate-400 hover:border-slate-800 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Block Container */}
        <div className="relative mt-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-slate-400">
                {activeCodeTab}.tsx
              </span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 transition hover:bg-slate-700 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span className="text-[11px]">Copy Code</span>
                </>
              )}
            </button>
          </div>

          <div className="p-5 overflow-x-auto">
            <pre className="font-mono text-xs leading-relaxed text-slate-200">
              <code>{CODE_EXAMPLES[activeCodeTab]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CodeDemos;
