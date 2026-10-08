'use client';

import React, { useState, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  Sliders,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Bell,
  MousePointerClick,
  Sparkles,
  ToggleLeft,
  Trash2,
  Wine,
  Droplet,
} from 'lucide-react';
import { tonely, type SoundName, type SoundTheme } from 'tonely';

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

export function Soundboard() {
  const [selectedTheme, setSelectedTheme] = useState<SoundTheme>('modern');
  const [volume, setVolume] = useState<number>(0.75);
  const [pitch, setPitch] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [toggleState, setToggleState] = useState<boolean>(true);
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);

  const handlePlaySound = useCallback(
    (name: SoundName) => {
      if (isMuted) return;

      if (name === 'toggle') {
        const nextState = !toggleState;
        setToggleState(nextState);
        tonely.play('toggle', {
          volume,
          pitch,
          theme: selectedTheme,
          active: nextState,
        });
      } else {
        tonely.play(name, {
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

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    tonely.setMuted(nextMute);
    if (!nextMute) {
      tonely.click({ volume });
    }
  };

  return (
    <section id="soundboard" className="mt-28 scroll-mt-20" aria-labelledby="soundboard-heading">
      {/* Studio Controls Header */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Sliders className="h-4 w-4" />
            <span>Interactive Audio Studio</span>
          </div>
          <h2 id="soundboard-heading" className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            The Tonely Soundboard
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Audition every procedural preset in real-time. Tweak sound palettes, master volume, and pitch multiplier.
          </p>
        </div>

        {/* Global Controls: Volume, Mute, Pitch */}
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-3 shadow-inner">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 cursor-pointer"
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
            <label htmlFor="volume-range" className="text-xs font-medium text-slate-400">Vol:</label>
            <input
              id="volume-range"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Master volume control"
              className="h-1.5 w-20 cursor-pointer accent-cyan-400"
            />
            <span className="w-8 text-right font-mono text-xs text-slate-300">{Math.round(volume * 100)}%</span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="pitch-range" className="text-xs font-medium text-slate-400">Pitch:</label>
            <input
              id="pitch-range"
              type="range"
              min="0.5"
              max="1.8"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              aria-label="Pitch multiplier control"
              className="h-1.5 w-20 cursor-pointer accent-cyan-400"
            />
            <span className="w-8 text-right font-mono text-xs text-slate-300">{pitch.toFixed(1)}x</span>
          </div>
        </div>
      </div>

      {/* Theme Palette Selector */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="self-center pr-2 text-xs font-medium text-slate-400">Palette:</span>
        {THEMES.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => {
              setSelectedTheme(t.id);
              tonely.play('pop', { theme: t.id, volume: 0.4 });
            }}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer ${
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

      {/* Sound Cards Grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {SOUNDS.map((item) => {
          const Icon = item.icon;
          const isPlaying = lastPlayed === item.name;

          return (
            <div
              key={item.name}
              role="button"
              tabIndex={0}
              aria-label={`Audition ${item.label} sound effect`}
              onClick={() => handlePlaySound(item.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePlaySound(item.name);
                }
              }}
              className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-hidden focus:ring-2 focus:ring-cyan-400 ${
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
                  tonely.{item.name}()
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
  );
}

export default Soundboard;
