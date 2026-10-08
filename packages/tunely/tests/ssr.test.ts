import { describe, it, expect } from 'vitest';
import { isBrowser, isAudioSupported } from '../src/utils/ssr';
import { createTunely } from '../src/index';

describe('SSR Safety Guards', () => {
  it('should detect environment safely', () => {
    // In Happy-DOM or Node, functions should return booleans without throwing
    expect(typeof isBrowser()).toBe('boolean');
    expect(typeof isAudioSupported()).toBe('boolean');
  });

  it('should never throw when calling all sound methods in server context', async () => {
    const serverInstance = createTunely();

    await expect(serverInstance.success()).resolves.toBeDefined();
    await expect(serverInstance.error()).resolves.toBeDefined();
    await expect(serverInstance.warning()).resolves.toBeDefined();
    await expect(serverInstance.info()).resolves.toBeDefined();
    await expect(serverInstance.click()).resolves.toBeDefined();
    await expect(serverInstance.pop()).resolves.toBeDefined();
    await expect(serverInstance.toggle(true)).resolves.toBeDefined();
    await expect(serverInstance.delete()).resolves.toBeDefined();
    await expect(serverInstance.glass()).resolves.toBeDefined();
    await expect(serverInstance.bubble()).resolves.toBeDefined();
    await expect(serverInstance.fromStatus(200)).resolves.toBeDefined();
  });
});
