'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { tunely } from 'tunely';

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

export const INSTALL_COMMANDS: Record<PackageManager, string> = {
  pnpm: 'pnpm add tunely',
  npm: 'npm install tunely',
  yarn: 'yarn add tunely',
  bun: 'bun add tunely',
};

interface InstallTabsProps {
  compact?: boolean;
  className?: string;
}

export function InstallTabs({ compact = false, className }: InstallTabsProps) {
  const [selected, setSelected] = useState<PackageManager>('pnpm');
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(INSTALL_COMMANDS[selected]);
    tunely.pop({ volume: 0.4 });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (compact) {
    return (
      <div className={cn('flex items-center rounded-xl border border-slate-800 bg-slate-900/90 p-1 backdrop-blur-md shadow-inner', className)}>
        {/* PM Buttons */}
        <div className="flex items-center gap-0.5">
          {(['pnpm', 'npm', 'yarn', 'bun'] as PackageManager[]).map((pm) => (
            <button
              key={pm}
              type="button"
              onClick={() => {
                setSelected(pm);
                tunely.click({ volume: 0.25 });
              }}
              className={cn(
                'px-2 py-0.5 rounded-lg text-[11px] font-mono transition cursor-pointer',
                selected === pm
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              )}
            >
              {pm}
            </button>
          ))}
        </div>

        {/* Separator */}
        <div className="mx-1.5 h-3.5 w-px bg-slate-800" />

        {/* Command Display & Copy Button */}
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono text-slate-300 hover:text-white transition cursor-pointer"
          title="Click to copy command"
        >
          <span className="hidden sm:inline text-slate-400">{INSTALL_COMMANDS[selected]}</span>
          {copied ? (
            <Check className="h-3 w-3 text-emerald-400" />
          ) : (
            <Copy className="h-3 w-3 text-slate-400 hover:text-cyan-400" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className={cn('inline-flex flex-col items-center w-full max-w-lg mx-auto', className)}>
      <div className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md p-2 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2 px-2">
          {/* Package Manager Tabs */}
          <div className="flex items-center gap-1">
            <Terminal className="h-3.5 w-3.5 text-cyan-400 mr-1.5" />
            {(['pnpm', 'npm', 'yarn', 'bun'] as PackageManager[]).map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => {
                  setSelected(pm);
                  tunely.click({ volume: 0.25 });
                }}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer',
                  selected === pm
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                )}
              >
                {pm}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Copy command"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-mono text-[11px]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="font-mono text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Command line output */}
        <div className="px-3 py-2 flex items-center gap-3 font-mono text-sm text-slate-200">
          <span className="text-cyan-400 font-bold select-none">$</span>
          <span className="select-all">{INSTALL_COMMANDS[selected]}</span>
        </div>
      </div>
    </div>
  );
}

export default InstallTabs;
