'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Check,
  Copy,
  Terminal,
  Play,
  Sliders,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  Github,
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Bell,
  Trash2,
  ToggleLeft,
  MousePointerClick,
  Wine,
  Droplet,
} from 'lucide-react';
import { tunely, type SoundName, type SoundTheme } from 'tunely';

interface SoundItem {
  name: SoundName;
  label: string;
  category: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const SOUNDS: SoundItem[] = [
  {
    name: 'success',
    label: 'Success (200 OK)',
    category: 'State & Feedback',
    description: 'Pleasant rising major chord arpeggio for saved records & mutations',
    icon: CheckCircle2,
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    name: 'error',
    label: 'Error (4xx / 5xx)',
    category: 'State & Feedback',
    description: 'Gentle dissonant double-tone for invalid inputs & server errors',
    icon: XCircle,
    color: 'from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400',
  },
  {
    name: 'warning',
    label: 'Warning',
    category: 'State & Feedback',
    description: 'Dual-tone attention cue for unsaved changes & critical warnings',
    icon: AlertTriangle,
    color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
  },
  {
    name: 'info',
    label: 'Info Ping',
    category: 'Notifications',
    description: 'Soft crisp sine chime for notifications, tooltips & badges',
    icon: Bell,
    color: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400',
  },
  {
    name: 'click',
    label: 'Tactile Click',
    category: 'Micro-interactions',
    description: 'Ultra-fast micro transient (25ms) for buttons, tabs & nav links',
    icon: MousePointerClick,
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
  },
  {
    name: 'pop',
    label: 'Bubble Pop',
    category: 'Micro-interactions',
    description: 'Bouncy upward frequency sweep for modal opens & dropdowns',
    icon: Sparkles,
    color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
  },
  {
    name: 'toggle',
    label: 'Switch Toggle',
    category: 'Inputs',
    description: 'Dual-direction tone: rises when enabled, drops when disabled',
    icon: ToggleLeft,
    color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400',
  },
  {
    name: 'delete',
    label: 'Delete / Trash',
    category: 'Actions',
    description: 'Soft muted descending double-tone for record removals',
    icon: Trash2,
    color: 'from-red-500/20 to-rose-500/10 border-red-500/30 text-red-400',
  },
  {
    name: 'glass',
    label: 'Crystal Glass',
    category: 'Sensory Polish',
    description: 'High-resonance crystalline shimmer with bandpass resonance',
    icon: Wine,
    color: 'from-teal-500/20 to-cyan-500/10 border-teal-500/30 text-teal-300',
  },
  {
    name: 'bubble',
    label: 'Liquid Drop',
    category: 'Sensory Polish',
    description: 'Organic modulated water droplet sound for likes & reactions',
    icon: Droplet,
    color: 'from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-300',
  },
];

const THEMES: { id: SoundTheme; label: string; desc: string }[] = [
  { id: 'modern', label: 'Modern (SaaS)', desc: 'Balanced, elegant & clean for modern web apps' },
  { id: 'glass', label: 'Glass (Apple-like)', desc: 'Pristine crystalline chimes & high harmonics' },
  { id: 'minimal', label: 'Minimal (Subtle)', desc: 'Micro transients designed to never distract' },
  { id: 'playful', label: 'Playful', desc: 'Bouncy, cheerful acoustic curves' },
  { id: 'retro', label: 'Retro (8-Bit)', desc: 'Chiptune arcade nostalgic square waves' },
];

const AI_PROMPTS = [
  {
    title: 'Integrate Tunely with Sonner & Shadcn UI',
    target: 'Cursor / Claude / Copilot',
    description: 'Wrap your existing toast notifications to automatically trigger harmonic procedural sounds.',
    prompt: `I want to integrate 'tunely' into my Next.js / React project. 
Please install 'tunely' and wrap my toast helper (Sonner / Shadcn UI) so that:
- toast.success() plays tunely.success()
- toast.error() plays tunely.error()
- toast.warning() plays tunely.warning()
- toast.info() plays tunely.info()
Ensure it is 100% SSR-safe and works seamlessly inside client components.`,
  },
  {
    title: 'Sound Feedback for Next.js Server Actions & Forms',
    target: 'Next.js 15 / Cursor',
    description: 'Add instant tactile feedback on form submit, success on 200, error on failure.',
    prompt: `Please update my form submissions and Next.js Server Actions using 'tunely':
1. When the user clicks the submit button, trigger tunely.click()
2. If the Server Action returns success or HTTP 200, play tunely.success()
3. If the Server Action returns validation errors or fails, play tunely.error()
Import { tunely } from 'tunely' and keep all audio calls strictly client-side.`,
  },
  {
    title: 'Automatic Fetch / Axios Response Status Interceptor',
    target: 'TanStack Query / Axios',
    description: 'Automatically chime on any API call depending on HTTP status code.',
    prompt: `I am using fetch / TanStack Query in my web app. 
Please configure a centralized helper using 'tunely' that maps HTTP responses:
- Status 2xx -> tunely.fromStatus(response.status) [success chime]
- Status 4xx / 5xx -> tunely.fromStatus(response.status) [gentle error tone]
Ensure audio playback is smooth, non-blocking, and respects user gestures.`,
  },
  {
    title: 'Add Micro-interactions to Buttons & Modals',
    target: 'v0 / Antigravity / Cursor',
    description: 'Enhance navigation, dialogs, and toggle switches with responsive micro sounds.',
    prompt: `Enhance my UI components using the 'tunely' library:
- Add tunely.click() to primary action buttons and tab switches
- Add tunely.pop() when modals or dropdown menus open
- Add tunely.toggle(activeState) to switches and checkboxes
- Add tunely.delete() when deleting items
Keep it clean, subtle, and responsive with zero external audio assets.`,
  },
];

const CODE_EXAMPLES = {
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

  react: `'use client';

import { useTunely } from 'tunely/react';

export function CheckoutButton() {
  const { success, error, click } = useTunely({ theme: 'glass' });

  const handleCheckout = async () => {
    click();
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

export default function HomePage() {
  const [selectedTheme, setSelectedTheme] = useState<SoundTheme>('modern');
  const [volume, setVolume] = useState<number>(0.75);
  const [pitch, setPitch] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [toggleState, setToggleState] = useState<boolean>(true);
  const [activeCodeTab, setActiveCodeTab] = useState<keyof typeof CODE_EXAMPLES>('react');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [installCopied, setInstallCopied] = useState<boolean>(false);
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);

  const handlePlaySound = useCallback(
    (name: SoundName) => {
      if (isMuted) return;

      if (name === 'toggle') {
        const nextState = !toggleState;
        setToggleState(nextState);
        tunely.play('toggle', {
          volume,
          pitch,
          theme: selectedTheme,
          active: nextState,
        });
      } else {
        tunely.play(name, {
          volume,
          pitch,
          theme: selectedTheme,
        });
      }

      setLastPlayed(name);
      setTimeout(() => setLastPlayed(null), 600);
    },
    [volume, pitch, selectedTheme, isMuted, toggleState]
  );

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    tunely.pop({ volume: 0.5 });
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const copyInstall = () => {
    navigator.clipboard.writeText('pnpm add tunely');
    tunely.pop({ volume: 0.5 });
    setInstallCopied(true);
    setTimeout(() => setInstallCopied(false), 2500);
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    tunely.setMuted(nextMute);
    if (!nextMute) {
      tunely.click({ volume });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#06090e] text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-600/15 via-teal-500/10 to-amber-500/5 blur-[140px]" />
        <div className="absolute top-[600px] -left-40 h-[450px] w-[600px] rounded-full bg-cyan-900/10 blur-[130px]" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#06090e]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-900 p-1 shadow-lg shadow-cyan-500/10">
              <Image
                src="/icon.png"
                alt="Tunely Mark"
                width={40}
                height={40}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">TUNELY</span>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                  v0.1.0
                </span>
              </div>
              <p className="hidden text-[11px] text-slate-400 sm:block">Zero-asset Synthesized UI Sounds</p>
            </div>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6">
            <a
              href="#soundboard"
              onClick={() => tunely.click({ volume: 0.3 })}
              className="text-sm font-medium text-slate-300 transition hover:text-cyan-400"
            >
              Soundboard
            </a>
            <a
              href="#prompts"
              onClick={() => tunely.click({ volume: 0.3 })}
              className="text-sm font-medium text-slate-300 transition hover:text-cyan-400"
            >
              AI Prompts
            </a>
            <a
              href="#code"
              onClick={() => tunely.click({ volume: 0.3 })}
              className="text-sm font-medium text-slate-300 transition hover:text-cyan-400"
            >
              Code Demos
            </a>
            <button
              onClick={copyInstall}
              className="group flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-mono text-slate-300 shadow-sm transition hover:border-cyan-500/50 hover:bg-slate-800"
            >
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              <span>pnpm add tunely</span>
              {installCopied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400" />
              )}
            </button>
            <a
              href="https://github.com/Mostafashadow1/tunely"
              target="_blank"
              rel="noreferrer"
              onClick={() => tunely.click({ volume: 0.3 })}
              className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-300 transition hover:border-slate-500 hover:text-white"
              aria-label="GitHub Repository"
            >
              <Github className="h-4 w-4" />
            </a>
          </nav>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 sm:pt-16">
        {/* Hero Section */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-medium text-cyan-300 backdrop-blur-sm">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            <span>Procedural Web Audio API • 0 KB Audio Assets • &lt; 1.5 KB JS</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Give Your Web UI a Voice.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Without Shipping a Single MP3.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
            Modern SaaS apps deserve rich multi-sensory feedback. Tunely synthesizes clean, pleasant micro-interactions
            at runtime with <strong>zero external audio files</strong>, <strong>zero HTTP requests</strong>, and <strong>zero network latency</strong>.
          </p>

          {/* Instant Hero Sound Triggers */}
          <div className="mx-auto mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handlePlaySound('success')}
              className="flex items-center gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-5 py-3 text-sm font-semibold text-emerald-300 shadow-lg shadow-emerald-950/50 transition hover:scale-105 hover:bg-emerald-900/40 active:scale-95"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Test Success (200 OK)</span>
            </button>
            <button
              onClick={() => handlePlaySound('error')}
              className="flex items-center gap-2.5 rounded-xl border border-rose-500/40 bg-rose-950/40 px-5 py-3 text-sm font-semibold text-rose-300 shadow-lg shadow-rose-950/50 transition hover:scale-105 hover:bg-rose-900/40 active:scale-95"
            >
              <XCircle className="h-4 w-4 text-rose-400" />
              <span>Test Error (500)</span>
            </button>
            <button
              onClick={() => handlePlaySound('glass')}
              className="flex items-center gap-2.5 rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-5 py-3 text-sm font-semibold text-cyan-300 shadow-lg shadow-cyan-950/50 transition hover:scale-105 hover:bg-cyan-900/40 active:scale-95"
            >
              <Wine className="h-4 w-4 text-cyan-400" />
              <span>Glass Chime</span>
            </button>
            <button
              onClick={() => handlePlaySound('pop')}
              className="flex items-center gap-2.5 rounded-xl border border-purple-500/40 bg-purple-950/40 px-5 py-3 text-sm font-semibold text-purple-300 shadow-lg shadow-purple-950/50 transition hover:scale-105 hover:bg-purple-900/40 active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>Bubble Pop</span>
            </button>
          </div>

          {/* Compatibility Banner */}
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-2 shadow-2xl backdrop-blur-sm">
            <Image
              src="/tunely-cover.png"
              alt="Tunely compatibility banner"
              width={1024}
              height={571}
              className="h-auto w-full rounded-xl object-cover"
              priority
            />
          </div>
        </section>

        {/* Section 1: Interactive Soundboard Playground */}
        <section id="soundboard" className="mt-24 scroll-mt-20">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                <Sliders className="h-4 w-4" />
                <span>Interactive Audio Studio</span>
              </div>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                The Tunely Soundboard
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Audition every procedural preset in real-time. Tweak sound palettes, master volume, and pitch multiplier.
              </p>
            </div>

            {/* Global Controls: Volume, Mute, Pitch */}
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-3 shadow-inner">
              <button
                onClick={toggleMute}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="h-4 w-4 text-rose-400" />
                    <span>Muted</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 text-cyan-400" />
                    <span>Mute</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400">Vol:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="h-1.5 w-20 cursor-pointer accent-cyan-400"
                />
                <span className="w-8 text-right font-mono text-xs text-slate-300">{Math.round(volume * 100)}%</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400">Pitch:</span>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="h-1.5 w-20 cursor-pointer accent-cyan-400"
                />
                <span className="w-8 text-right font-mono text-xs text-slate-300">{pitch.toFixed(1)}x</span>
              </div>
            </div>
          </div>

          {/* Theme Palette Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="self-center pr-2 text-xs font-medium text-slate-400">Palette:</span>
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTheme(t.id);
                  tunely.play('pop', { theme: t.id, volume: 0.4 });
                }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedTheme === t.id
                    ? 'border border-cyan-500/50 bg-cyan-500/20 text-cyan-300 shadow-sm shadow-cyan-500/20'
                    : 'border border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
                title={t.desc}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Sound Grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SOUNDS.map((item) => {
              const Icon = item.icon;
              const isPlaying = lastPlayed === item.name;

              return (
                <div
                  key={item.name}
                  onClick={() => handlePlaySound(item.name)}
                  className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition duration-200 hover:-translate-y-1 hover:shadow-xl ${
                    item.color
                  } ${isPlaying ? 'scale-105 border-cyan-400 shadow-lg shadow-cyan-500/30' : 'bg-slate-900/40'}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="rounded-lg border border-slate-700/50 bg-slate-950/70 p-2 shadow-inner">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="mt-3 text-sm font-bold text-white group-hover:text-cyan-300">
                      {item.label}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <code className="text-[11px] font-mono text-slate-300">
                      tunely.{item.name}()
                    </code>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800/80 text-slate-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition">
                      <Play className="h-3 w-3 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: AI Prompts Hub */}
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
                      onClick={() => copyToClipboard(promptItem.prompt, idx)}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:border-amber-400/50 hover:bg-slate-700"
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

        {/* Section 3: Senior Multi-Framework Code Examples */}
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
                    tunely.click({ volume: 0.3 });
                  }}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition ${
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
                  onClick={() => copyToClipboard(CODE_EXAMPLES[activeCodeTab], 999)}
                  className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 transition hover:bg-slate-700"
                >
                  {copiedIndex === 999 ? (
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

        {/* Section 4: Performance & Comparison Table */}
        <section className="mt-28">
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950 p-6 sm:p-10">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Why Procedural Web Audio API Wins
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              A side-by-side comparison between conventional MP3 asset hosting and Tunely.
            </p>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="pb-3 pr-4">Metric</th>
                    <th className="pb-3 px-4 text-slate-500">External Audio Files (MP3 / WAV)</th>
                    <th className="pb-3 pl-4 text-cyan-400 font-bold">Tunely (Procedural)</th>
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

        {/* Call to Action Footer Strip */}
        <section className="mt-24 text-center">
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-teal-950/30 p-8 sm:p-12">
            <h3 className="text-2xl font-black text-white sm:text-3xl">
              Ready to give your web applications tactile auditory polish?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
              Install the zero-dependency Tunely package now and start delighting your users with instant harmonic cues.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={copyInstall}
                className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 active:scale-95"
              >
                <Terminal className="h-4 w-4" />
                <span>pnpm add tunely</span>
              </button>
              <a
                href="https://github.com/Mostafashadow1/tunely"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                <Github className="h-4 w-4" />
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 overflow-hidden rounded-md border border-cyan-500/30 bg-slate-900 p-0.5">
              <Image src="/icon.png" alt="Tunely" width={24} height={24} className="h-full w-full object-contain" />
            </div>
            <span className="font-bold text-slate-300">TUNELY</span>
            <span>• MIT License</span>
          </div>
          <p>
            Crafted by{' '}
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
    </div>
  );
}
