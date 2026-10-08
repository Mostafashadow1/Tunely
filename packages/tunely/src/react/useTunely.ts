'use client';

import { useCallback } from 'react';
import { tunely } from '../index';
import { useTunelyContext } from './context';
import type { SoundName, SoundOptions, SoundTheme } from '../types';

export interface UseTunelyOptions {
  volume?: number;
  theme?: SoundTheme;
}

/**
 * React Hook for playing synthesized UI sounds.
 * Integrates seamlessly with TunelyProvider or works standalone.
 */
export function useTunely(defaultOptions?: UseTunelyOptions) {
  const context = useTunelyContext();
  const instance = context?.instance ?? tunely;

  const play = useCallback(
    (name: SoundName, opts?: SoundOptions) => {
      const merged: SoundOptions = {
        volume: defaultOptions?.volume,
        theme: defaultOptions?.theme,
        ...opts,
      };
      return instance.play(name, merged);
    },
    [instance, defaultOptions?.volume, defaultOptions?.theme]
  );

  const success = useCallback((opts?: SoundOptions) => play('success', opts), [play]);
  const error = useCallback((opts?: SoundOptions) => play('error', opts), [play]);
  const warning = useCallback((opts?: SoundOptions) => play('warning', opts), [play]);
  const info = useCallback((opts?: SoundOptions) => play('info', opts), [play]);
  const click = useCallback((opts?: SoundOptions) => play('click', opts), [play]);
  const pop = useCallback((opts?: SoundOptions) => play('pop', opts), [play]);
  const toggle = useCallback(
    (active?: boolean, opts?: SoundOptions) => play('toggle', { ...opts, active }),
    [play]
  );
  const deleteSound = useCallback((opts?: SoundOptions) => play('delete', opts), [play]);
  const glass = useCallback((opts?: SoundOptions) => play('glass', opts), [play]);
  const bubble = useCallback((opts?: SoundOptions) => play('bubble', opts), [play]);
  const fromStatus = useCallback(
    (status: number, opts?: SoundOptions) => instance.fromStatus(status, { ...defaultOptions, ...opts }),
    [instance, defaultOptions]
  );

  return {
    play,
    success,
    error,
    warning,
    info,
    click,
    pop,
    toggle,
    delete: deleteSound,
    glass,
    bubble,
    fromStatus,
    volume: context?.volume ?? instance.getVolume(),
    setVolume: context?.setVolume ?? ((v: number) => instance.setVolume(v)),
    muted: context?.muted ?? instance.isMuted(),
    setMuted: context?.setMuted ?? ((m: boolean) => instance.setMuted(m)),
    theme: context?.theme ?? instance.getTheme(),
    setTheme: context?.setTheme ?? ((t: SoundTheme) => instance.setTheme(t)),
  };
}

export default useTunely;
