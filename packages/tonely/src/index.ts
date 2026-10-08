import { AudioEngine } from './core/audio-engine';
import { synthesizeSound } from './presets';
import { soundFromStatus } from './utils/status';
import { createFetchWrapper, trackPromise } from './utils/interceptor';
import { isBrowser, isAudioSupported } from './utils/ssr';
import type {
  SoundName,
  SoundOptions,
  SoundTheme,
  TonelyConfig,
  TonelyInstance,
} from './types';

export * from './types';
export { soundFromStatus } from './utils/status';
export { isBrowser, isAudioSupported } from './utils/ssr';

/**
 * Creates an isolated Tonely audio instance.
 */
export function createTonely(config?: TonelyConfig): TonelyInstance & {
  wrapFetch: (customFetch?: typeof fetch) => (input: RequestInfo | URL, init?: RequestInit, opts?: SoundOptions) => Promise<Response>;
  track: <T>(promise: Promise<T>, opts?: SoundOptions) => Promise<T>;
} {
  const engine = new AudioEngine(config);

  const instance: TonelyInstance = {
    async play(name: SoundName, options?: SoundOptions): Promise<boolean> {
      // 100% SSR Safe: Return gracefully on server
      if (!isBrowser() || !isAudioSupported() || engine.isMuted()) {
        return false;
      }

      try {
        const ctx = engine.getContext();
        const destination = engine.getMasterDestination();

        if (!ctx || !destination) return false;

        synthesizeSound(name, {
          ctx,
          destination,
          options,
          globalTheme: engine.getTheme(),
        });
        return true;
      } catch {
        return false;
      }
    },

    success(options?: SoundOptions) {
      return instance.play('success', options);
    },

    error(options?: SoundOptions) {
      return instance.play('error', options);
    },

    warning(options?: SoundOptions) {
      return instance.play('warning', options);
    },

    info(options?: SoundOptions) {
      return instance.play('info', options);
    },

    click(options?: SoundOptions) {
      return instance.play('click', options);
    },

    pop(options?: SoundOptions) {
      return instance.play('pop', options);
    },

    toggle(active: boolean = true, options?: SoundOptions) {
      return instance.play('toggle', { ...options, active });
    },

    delete(options?: SoundOptions) {
      return instance.play('delete', options);
    },

    glass(options?: SoundOptions) {
      return instance.play('glass', options);
    },

    bubble(options?: SoundOptions) {
      return instance.play('bubble', options);
    },

    fromStatus(status: number, options?: SoundOptions) {
      const soundName = soundFromStatus(status);
      return instance.play(soundName, options);
    },

    setVolume(volume: number) {
      engine.setVolume(volume);
    },

    getVolume() {
      return engine.getVolume();
    },

    setMuted(muted: boolean) {
      engine.setMuted(muted);
    },

    isMuted() {
      return engine.isMuted();
    },

    setTheme(theme: SoundTheme) {
      engine.setTheme(theme);
    },

    getTheme() {
      return engine.getTheme();
    },
  };

  return {
    ...instance,
    wrapFetch: () => createFetchWrapper(instance),
    track: <T>(promise: Promise<T>, opts?: SoundOptions) => trackPromise(instance, promise, opts),
  };
}

// Backward compatibility alias
export const createTunely = createTonely;

/**
 * Global default Tonely singleton.
 * Ready for immediate zero-config use across React, Vue, Next.js, and Vanilla JS.
 */
export const tonely = createTonely();
export const tunely = tonely;

// Direct top-level functional helpers
export const play = (name: SoundName, opts?: SoundOptions) => tonely.play(name, opts);
export const success = (opts?: SoundOptions) => tonely.success(opts);
export const error = (opts?: SoundOptions) => tonely.error(opts);
export const warning = (opts?: SoundOptions) => tonely.warning(opts);
export const info = (opts?: SoundOptions) => tonely.info(opts);
export const click = (opts?: SoundOptions) => tonely.click(opts);
export const pop = (opts?: SoundOptions) => tonely.pop(opts);
export const toggle = (active?: boolean, opts?: SoundOptions) => tonely.toggle(active, opts);
export const deleteSound = (opts?: SoundOptions) => tonely.delete(opts);
export const glass = (opts?: SoundOptions) => tonely.glass(opts);
export const bubble = (opts?: SoundOptions) => tonely.bubble(opts);
export const fromStatus = (status: number, opts?: SoundOptions) => tonely.fromStatus(status, opts);
export const wrapFetch = tonely.wrapFetch;
export const track = tonely.track;

export default tonely;
