'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { tonely, createTonely } from '../index';
import type { TonelyInstance, TonelyConfig, SoundTheme } from '../types';

interface TonelyContextValue {
  instance: TonelyInstance;
  volume: number;
  setVolume: (v: number) => void;
  muted: boolean;
  setMuted: (m: boolean) => void;
  theme: SoundTheme;
  setTheme: (t: SoundTheme) => void;
}

const TonelyContext = createContext<TonelyContextValue | null>(null);

export interface TonelyProviderProps {
  children: React.ReactNode;
  config?: TonelyConfig;
}

export function TonelyProvider({ children, config }: TonelyProviderProps) {
  const [instance] = useState(() => (config ? createTonely(config) : tonely));
  const [volume, setVolumeState] = useState(() => instance.getVolume());
  const [muted, setMutedState] = useState(() => instance.isMuted());
  const [theme, setThemeState] = useState<SoundTheme>(() => instance.getTheme());

  const setVolume = (v: number) => {
    instance.setVolume(v);
    setVolumeState(instance.getVolume());
  };

  const setMuted = (m: boolean) => {
    instance.setMuted(m);
    setMutedState(instance.isMuted());
  };

  const setTheme = (t: SoundTheme) => {
    instance.setTheme(t);
    setThemeState(instance.getTheme());
  };

  const value = useMemo(
    () => ({
      instance,
      volume,
      setVolume,
      muted,
      setMuted,
      theme,
      setTheme,
    }),
    [instance, volume, muted, theme]
  );

  return <TonelyContext.Provider value={value}>{children}</TonelyContext.Provider>;
}

export function useTonelyContext(): TonelyContextValue | null {
  return useContext(TonelyContext);
}

// Backward compatibility aliases
export const TunelyProvider = TonelyProvider;
export const useTunelyContext = useTonelyContext;
