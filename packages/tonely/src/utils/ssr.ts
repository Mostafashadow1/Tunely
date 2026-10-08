/**
 * SSR & Environment Safety Guards
 * Ensures Tunely can be imported and executed anywhere (Server Components,
 * Server Actions, Node.js, Bun, Edge runtime, or Browser) without crashing.
 */

export function isBrowser(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    (typeof window.AudioContext !== 'undefined' ||
      typeof (window as unknown as { webkitAudioContext?: unknown }).webkitAudioContext !== 'undefined')
  );
}

export function isAudioSupported(): boolean {
  if (!isBrowser()) return false;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    return Boolean(AudioContextClass);
  } catch {
    return false;
  }
}
