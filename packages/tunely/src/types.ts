/**
 * Tunely - TypeScript Definitions
 * High-fidelity, zero-asset UI sound synthesis system.
 */

export type SoundName =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'click'
  | 'pop'
  | 'toggle'
  | 'delete'
  | 'glass'
  | 'bubble';

export type SoundTheme = 'modern' | 'glass' | 'minimal' | 'playful' | 'retro';

export interface SoundOptions {
  /**
   * Sound volume scale between 0.0 (silent) and 1.0 (full).
   * @default 1.0
   */
  volume?: number;

  /**
   * Pitch multiplier (e.g. 1.0 = normal, 1.2 = higher pitch, 0.8 = lower pitch).
   * @default 1.0
   */
  pitch?: number;

  /**
   * Speed / duration multiplier (e.g. 0.8 = snappier, 1.2 = more sustained).
   * @default 1.0
   */
  playbackRate?: number;

  /**
   * Audio theme palette.
   * @default 'modern'
   */
  theme?: SoundTheme;

  /**
   * Boolean state for toggle sound: true for on/active, false for off/inactive.
   */
  active?: boolean;
}

export interface TunelyConfig {
  /**
   * Global master volume between 0 and 1.
   * @default 0.7
   */
  volume?: number;

  /**
   * Default theme palette for all sounds.
   * @default 'modern'
   */
  theme?: SoundTheme;

  /**
   * Whether audio is globally muted.
   * @default false
   */
  muted?: boolean;
}

export interface TunelyInstance {
  /**
   * Play any sound preset with optional overrides.
   */
  play(name: SoundName, options?: SoundOptions): Promise<boolean>;

  /**
   * Synthesize pleasant success chord (HTTP 200 OK / Completed).
   */
  success(options?: SoundOptions): Promise<boolean>;

  /**
   * Synthesize gentle warning double-tone (HTTP 4xx / 5xx Error).
   */
  error(options?: SoundOptions): Promise<boolean>;

  /**
   * Synthesize crisp warning chime.
   */
  warning(options?: SoundOptions): Promise<boolean>;

  /**
   * Synthesize subtle information ping.
   */
  info(options?: SoundOptions): Promise<boolean>;

  /**
   * Synthesize haptic micro-click for buttons and inputs.
   */
  click(options?: SoundOptions): Promise<boolean>;

  /**
   * Synthesize playful bubble pop for modals, dropdowns, and badges.
   */
  pop(options?: SoundOptions): Promise<boolean>;

  /**
   * Synthesize toggle switch tone (rising on active, falling on inactive).
   */
  toggle(active?: boolean, options?: SoundOptions): Promise<boolean>;

  /**
   * Synthesize soft descending deletion cue.
   */
  delete(options?: SoundOptions): Promise<boolean>;

  /**
   * Synthesize high-resonance crystalline glass chime.
   */
  glass(options?: SoundOptions): Promise<boolean>;

  /**
   * Synthesize playful water drop / bubble.
   */
  bubble(options?: SoundOptions): Promise<boolean>;

  /**
   * Automatically play sound mapped from an HTTP status code (200, 404, 500, etc.).
   */
  fromStatus(status: number, options?: SoundOptions): Promise<boolean>;

  /**
   * Set global volume level (0.0 to 1.0).
   */
  setVolume(volume: number): void;

  /**
   * Get current master volume.
   */
  getVolume(): number;

  /**
   * Toggle or set mute state.
   */
  setMuted(muted: boolean): void;

  /**
   * Check if sounds are muted.
   */
  isMuted(): boolean;

  /**
   * Set the default sound theme palette.
   */
  setTheme(theme: SoundTheme): void;

  /**
   * Get the current sound theme.
   */
  getTheme(): SoundTheme;
}
