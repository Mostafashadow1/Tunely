import { describe, it, expect, vi } from 'vitest';
import { tunely, createTunely, soundFromStatus } from '../src/index';

describe('Tunely Core Library', () => {
  it('should initialize default singleton instance', () => {
    expect(tunely).toBeDefined();
    expect(typeof tunely.play).toBe('function');
    expect(typeof tunely.success).toBe('function');
    expect(typeof tunely.error).toBe('function');
    expect(typeof tunely.click).toBe('function');
  });

  it('should allow volume adjustments', () => {
    const custom = createTunely({ volume: 0.5 });
    expect(custom.getVolume()).toBe(0.5);

    custom.setVolume(0.85);
    expect(custom.getVolume()).toBe(0.85);

    // Clamps to [0, 1]
    custom.setVolume(1.5);
    expect(custom.getVolume()).toBe(1);

    custom.setVolume(-0.2);
    expect(custom.getVolume()).toBe(0);
  });

  it('should allow muting and unmuting', () => {
    const custom = createTunely();
    expect(custom.isMuted()).toBe(false);

    custom.setMuted(true);
    expect(custom.isMuted()).toBe(true);

    custom.setMuted(false);
    expect(custom.isMuted()).toBe(false);
  });

  it('should support themes', () => {
    const custom = createTunely({ theme: 'glass' });
    expect(custom.getTheme()).toBe('glass');

    custom.setTheme('retro');
    expect(custom.getTheme()).toBe('retro');
  });

  it('should correctly map HTTP status codes to sound names', () => {
    expect(soundFromStatus(200)).toBe('success');
    expect(soundFromStatus(201)).toBe('success');
    expect(soundFromStatus(204)).toBe('success');

    expect(soundFromStatus(400)).toBe('error');
    expect(soundFromStatus(401)).toBe('error');
    expect(soundFromStatus(403)).toBe('error');
    expect(soundFromStatus(404)).toBe('error');
    expect(soundFromStatus(500)).toBe('error');
    expect(soundFromStatus(503)).toBe('error');

    expect(soundFromStatus(301)).toBe('info');
    expect(soundFromStatus(304)).toBe('info');
  });

  it('should resolve safely without throwing when play() is called in tests', async () => {
    const res = await tunely.play('success');
    expect(typeof res).toBe('boolean');
  });
});
