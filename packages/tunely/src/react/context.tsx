'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { tunely, createTunely } from '../index';
import type { TunelyInstance, TunelyConfig, SoundTheme } from '../types';

interface TunelyContextValue {
  instance: TunelyInstance;
  volume: number;
  setVolume: (v: number) => void;
  muted: boolean;
  setMuted: (m: boolean) => void;
  theme: SoundTheme;
  setTheme: (t: SoundTheme) => void;
}

const TunelyContext = createContext<TunelyContextValue | null>(null);

export interface TunelyProviderProps {
  children: React.ReactNode;
  config?: TunelyConfig;
}

export function TunelyProvider({ children, config }: TunelyProviderProps) {
  const [instance] = useState(() => (config ? createTunely(config) : tunely));
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

  return <TunelyContext.Provider value={value}>{children}</TunelyContext.Provider>;
}

export function useTunelyContext(): TunelyContextValue | null {
  return useContext(TunelyContext);
}
