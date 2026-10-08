import { isBrowser, isAudioSupported } from '../utils/ssr';
import type { TunelyConfig, SoundTheme } from '../types';

/**
 * Procedural Web Audio Engine
 * Manages the singleton AudioContext lifecycle, master volume gain node,
 * and user-gesture autoplay unlock mechanism.
 */
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.7;
  private muted: boolean = false;
  private theme: SoundTheme = 'modern';
  private unlocked: boolean = false;

  constructor(config?: TunelyConfig) {
    if (config?.volume !== undefined) this.volume = Math.max(0, Math.min(1, config.volume));
    if (config?.theme !== undefined) this.theme = config.theme;
    if (config?.muted !== undefined) this.muted = Boolean(config.muted);

    if (isBrowser()) {
      this.attachUnlockListeners();
    }
  }

  /**
   * Lazily obtain or initialize the single shared AudioContext.
   */
  public getContext(): AudioContext | null {
    if (!isAudioSupported()) return null;

    if (!this.ctx) {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

        if (!AudioContextClass) return null;

        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.updateMasterGain();
        this.masterGain.connect(this.ctx.destination);
      } catch {
        return null;
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public getMasterDestination(): AudioNode | null {
    this.getContext();
    return this.masterGain;
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.updateMasterGain();
  }

  public getVolume(): number {
    return this.volume;
  }

  public setMuted(muted: boolean): void {
    this.muted = Boolean(muted);
    this.updateMasterGain();
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setTheme(theme: SoundTheme): void {
    this.theme = theme;
  }

  public getTheme(): SoundTheme {
    return this.theme;
  }

  private updateMasterGain(): void {
    if (!this.ctx || !this.masterGain) return;
    const targetGain = this.muted ? 0 : this.volume;
    try {
      this.masterGain.gain.setValueAtTime(targetGain, this.ctx.currentTime);
    } catch {
      this.masterGain.gain.value = targetGain;
    }
  }

  /**
   * Browser Autoplay Policy Unlocker:
   * Browsers restrict audio before first user gesture.
   * We attach passive listeners to resume the audio context on first user action.
   */
  private attachUnlockListeners(): void {
    if (this.unlocked || typeof window === 'undefined') return;

    const unlock = () => {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().then(() => {
          this.unlocked = true;
        }).catch(() => {});
      } else {
        this.unlocked = true;
      }

      ['click', 'keydown', 'touchstart', 'pointerdown'].forEach((evt) => {
        window.removeEventListener(evt, unlock);
      });
    };

    ['click', 'keydown', 'touchstart', 'pointerdown'].forEach((evt) => {
      window.addEventListener(evt, unlock, { once: true, passive: true });
    });
  }
}
