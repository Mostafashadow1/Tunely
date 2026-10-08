import type { SoundName, SoundOptions, SoundTheme } from '../types';

interface SynthesizerParams {
  ctx: AudioContext;
  destination: AudioNode;
  options?: SoundOptions;
  globalTheme: SoundTheme;
}

/**
 * Procedural synthesizers for UI micro-interactions.
 * Generates pristine acoustic cues mathematically with zero external audio assets.
 */
export function synthesizeSound(
  name: SoundName,
  { ctx, destination, options, globalTheme }: SynthesizerParams
): void {
  const now = ctx.currentTime;
  const theme = options?.theme || globalTheme;
  const volumeScale = Math.max(0, Math.min(2, options?.volume ?? 1));
  const pitchMult = Math.max(0.2, Math.min(3, options?.pitch ?? 1));
  const rateMult = Math.max(0.3, Math.min(3, options?.playbackRate ?? 1));

  // Sub-gain node for this specific sound instance
  const instanceGain = ctx.createGain();
  instanceGain.gain.setValueAtTime(volumeScale, now);
  instanceGain.connect(destination);

  switch (name) {
    case 'success':
      synthesizeSuccess(ctx, instanceGain, now, theme, pitchMult, rateMult);
      break;
    case 'error':
      synthesizeError(ctx, instanceGain, now, theme, pitchMult, rateMult);
      break;
    case 'warning':
      synthesizeWarning(ctx, instanceGain, now, theme, pitchMult, rateMult);
      break;
    case 'info':
      synthesizeInfo(ctx, instanceGain, now, theme, pitchMult, rateMult);
      break;
    case 'click':
      synthesizeClick(ctx, instanceGain, now, theme, pitchMult, rateMult);
      break;
    case 'pop':
      synthesizePop(ctx, instanceGain, now, theme, pitchMult, rateMult);
      break;
    case 'toggle':
      synthesizeToggle(ctx, instanceGain, now, options?.active ?? true, theme, pitchMult, rateMult);
      break;
    case 'delete':
      synthesizeDelete(ctx, instanceGain, now, theme, pitchMult, rateMult);
      break;
    case 'glass':
      synthesizeGlass(ctx, instanceGain, now, theme, pitchMult, rateMult);
      break;
    case 'bubble':
      synthesizeBubble(ctx, instanceGain, now, theme, pitchMult, rateMult);
      break;
  }
}

/**
 * SUCCESS: Harmonic chord arpeggio chime (C5 -> E5 -> G5 -> C6)
 */
function synthesizeSuccess(
  ctx: AudioContext,
  dest: AudioNode,
  now: number,
  theme: SoundTheme,
  pitch: number,
  rate: number
) {
  const notes =
    theme === 'retro'
      ? [523.25, 659.25, 783.99, 1046.5]
      : theme === 'minimal'
        ? [523.25, 783.99]
        : [523.25, 659.25, 783.99];

  const oscType: OscillatorType =
    theme === 'retro' ? 'square' : theme === 'glass' ? 'sine' : 'sine';

  const stepTime = 0.08 * (1 / rate);
  const decayTime = (theme === 'glass' ? 0.45 : 0.32) * (1 / rate);

  notes.forEach((freq, idx) => {
    const startTime = now + idx * stepTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = oscType;
    osc.frequency.setValueAtTime(freq * pitch, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.18, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + decayTime);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(startTime);
    osc.stop(startTime + decayTime + 0.02);
  });
}

/**
 * ERROR: Gentle warning descending double-tone
 */
function synthesizeError(
  ctx: AudioContext,
  dest: AudioNode,
  now: number,
  theme: SoundTheme,
  pitch: number,
  rate: number
) {
  const notes = [329.63, 261.63]; // E4 -> C4
  const stepTime = 0.11 * (1 / rate);
  const duration = 0.28 * (1 / rate);

  notes.forEach((freq, idx) => {
    const startTime = now + idx * stepTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = theme === 'retro' ? 'square' : 'triangle';
    osc.frequency.setValueAtTime(freq * pitch, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  });
}

/**
 * WARNING: Dual-tone attention ping
 */
function synthesizeWarning(
  ctx: AudioContext,
  dest: AudioNode,
  now: number,
  theme: SoundTheme,
  pitch: number,
  rate: number
) {
  const notes = [440.0, 554.37]; // A4 -> C#5
  const stepTime = 0.09 * (1 / rate);
  const duration = 0.25 * (1 / rate);

  notes.forEach((freq, idx) => {
    const startTime = now + idx * stepTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = theme === 'retro' ? 'square' : 'sine';
    osc.frequency.setValueAtTime(freq * pitch, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.16, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  });
}

/**
 * INFO: Soft crisp ping
 */
function synthesizeInfo(
  ctx: AudioContext,
  dest: AudioNode,
  now: number,
  _theme: SoundTheme,
  pitch: number,
  rate: number
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const duration = 0.3 * (1 / rate);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(659.25 * pitch, now); // E5

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

/**
 * CLICK: Micro-transient tactile click for buttons and tabs
 */
function synthesizeClick(
  ctx: AudioContext,
  dest: AudioNode,
  now: number,
  theme: SoundTheme,
  pitch: number,
  _rate: number
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const duration = theme === 'minimal' ? 0.018 : 0.025;

  osc.type = theme === 'retro' ? 'square' : 'triangle';
  osc.frequency.setValueAtTime(1200 * pitch, now);
  osc.frequency.exponentialRampToValueAtTime(400 * pitch, now + duration);

  gain.gain.setValueAtTime(0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(now);
  osc.stop(now + duration + 0.01);
}

/**
 * POP: Bubble pop for modals and badges
 */
function synthesizePop(
  ctx: AudioContext,
  dest: AudioNode,
  now: number,
  _theme: SoundTheme,
  pitch: number,
  rate: number
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const duration = 0.08 * (1 / rate);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(380 * pitch, now);
  osc.frequency.exponentialRampToValueAtTime(950 * pitch, now + duration);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

/**
 * TOGGLE: Switch tone (pitch rises if true/on, pitch drops if false/off)
 */
function synthesizeToggle(
  ctx: AudioContext,
  dest: AudioNode,
  now: number,
  active: boolean,
  _theme: SoundTheme,
  pitch: number,
  rate: number
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const duration = 0.07 * (1 / rate);

  osc.type = 'sine';
  const startFreq = (active ? 480 : 720) * pitch;
  const endFreq = (active ? 720 : 480) * pitch;

  osc.frequency.setValueAtTime(startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(endFreq, now + duration);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.16, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

/**
 * DELETE: Soft descending deletion cue
 */
function synthesizeDelete(
  ctx: AudioContext,
  dest: AudioNode,
  now: number,
  _theme: SoundTheme,
  pitch: number,
  rate: number
) {
  const notes = [392.0, 293.66]; // G4 -> D4
  const stepTime = 0.09 * (1 / rate);
  const duration = 0.22 * (1 / rate);

  notes.forEach((freq, idx) => {
    const startTime = now + idx * stepTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq * pitch, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.16, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(dest);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  });
}

/**
 * GLASS: High-resonance crystal chime
 */
function synthesizeGlass(
  ctx: AudioContext,
  dest: AudioNode,
  now: number,
  _theme: SoundTheme,
  pitch: number,
  rate: number
) {
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  const duration = 0.45 * (1 / rate);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1046.5 * pitch, now); // C6

  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1046.5 * pitch, now);
  filter.Q.setValueAtTime(4, now);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(dest);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

/**
 * BUBBLE: Liquid droplet sound with frequency modulation
 */
function synthesizeBubble(
  ctx: AudioContext,
  dest: AudioNode,
  now: number,
  _theme: SoundTheme,
  pitch: number,
  rate: number
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const duration = 0.1 * (1 / rate);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320 * pitch, now);
  osc.frequency.exponentialRampToValueAtTime(1100 * pitch, now + duration);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}
